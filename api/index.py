"""Vercel entry point: isolated, browser-owned demo state, no shared user DB."""
import json
import sys
import tempfile
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app

TABLES = ('rides', 'bookings', 'settings', 'events')
ACTIONS = {'state', 'search', 'book', 'booking', 'profile', 'verify', 'offer', 'sos'}
LIMIT = 512 * 1024


def run_demo(action, payload, snapshot=None):
    if action not in ACTIONS or not isinstance(payload, dict):
        raise ValueError('Unknown action.')
    # Every request gets its own disposable SQLite database. A visitor's saved
    # snapshot is untrusted demo input, never an account or real reservation.
    with tempfile.TemporaryDirectory(prefix='routekind-') as folder:
        token = app.REQUEST_DB.set(str(Path(folder) / 'demo.db'))
        try:
            app.init_db()
            if snapshot is not None:
                if not isinstance(snapshot, dict) or set(snapshot) != set(TABLES):
                    raise ValueError('Invalid saved data. Clear this site’s browser data to reset it.')
                if len(json.dumps(snapshot).encode()) > LIMIT:
                    raise ValueError('Planner storage is full. Clear this site’s browser data to reset it.')
                with app.connection() as conn:
                    for table in TABLES:
                        rows = snapshot[table]
                        if not isinstance(rows, list) or len(rows) > 250:
                            raise ValueError('Invalid records or storage limit reached.')
                        conn.execute(f'DELETE FROM {table}')
                        for row in rows:
                            if (not isinstance(row, dict) or set(row) != {'id', 'data'}
                                    or not isinstance(row['id'], str) or len(row['id']) > 100
                                    or not isinstance(row['data'], dict)):
                                raise ValueError('Invalid saved record.')
                            app.put(conn, table, row['id'], row['data'])
            app.migrate_locations()
            if action == 'state':
                with app.connection() as conn:
                    result = {'stops': app.STOPS, 'edges': app.EDGES,
                        'rides': app.records(conn, 'rides'),
                        'bookings': sorted(app.records(conn, 'bookings'), key=lambda b: (b['date'], b['pickup'])),
                        'profile': app.get(conn, 'settings', 'profile'), 'today': app.today().isoformat()}
            else:
                result = app.dispatch('/api/' + action, payload)
            with app.connection() as conn:
                saved = {table: [{'id': r['id'], 'data': json.loads(r['data'])}
                    for r in conn.execute(f'SELECT id,data FROM {table}')] for table in TABLES}
            if any(len(rows) > 250 for rows in saved.values()) or len(json.dumps(saved).encode()) > LIMIT:
                raise ValueError('Planner storage is full. Clear this site’s browser data to reset it.')
            return {**result, 'storage_mode': 'browser', 'demo_snapshot': saved}
        finally:
            app.REQUEST_DB.reset(token)


class handler(BaseHTTPRequestHandler):
    def reply(self, value, status=200):
        body = json.dumps(value).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(body)

    def action_name(self):
        parsed = urlparse(self.path)
        return parse_qs(parsed.query).get('action', [parsed.path.rsplit('/', 1)[-1]])[0]

    def do_GET(self):
        if self.action_name() != 'state':
            return self.reply({'error': 'Not found'}, 404)
        self.reply(run_demo('state', {}))

    def do_POST(self):
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if not 0 < size <= LIMIT + 16384:
                return self.reply({'error': 'Invalid request size.'}, 413)
            if self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
                return self.reply({'error': 'Expected JSON.'}, 415)
            body = json.loads(self.rfile.read(size))
            if not isinstance(body, dict):
                raise ValueError('Expected a JSON object.')
            self.reply(run_demo(self.action_name(), body.get('payload', {}), body.get('demo_snapshot')))
        except (ValueError, TypeError, KeyError, AttributeError, IndexError):
            self.reply({'error': 'Invalid request or unavailable ride. Check your choices; if needed, clear this site’s saved browser data.'}, 400)
        except Exception:
            self.reply({'error': 'The service could not process this request. Try again.'}, 500)
