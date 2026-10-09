"""Routekind: zero-dependency local Python web app. Run: python3 app.py"""
import argparse
import json
import sqlite3
import os
import uuid
from contextvars import ContextVar
from datetime import date, datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from core import STOPS, EDGES, shortest_path, minutes, match, next_dates

ROOT = Path(__file__).resolve().parent
DB = Path(os.environ.get('ROUTEKIND_DB', str(ROOT / 'routekind.db')))
REQUEST_DB = ContextVar('request_db', default=None)


def today():
    return datetime.now(timezone(timedelta(hours=5, minutes=30))).date()


def connection():
    conn = sqlite3.connect(REQUEST_DB.get() or DB, timeout=15)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with connection() as conn:
        conn.executescript('''
            CREATE TABLE IF NOT EXISTS rides (id TEXT PRIMARY KEY, data TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, data TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS settings (id TEXT PRIMARY KEY, data TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, data TEXT NOT NULL);
        ''')
        if not conn.execute('SELECT 1 FROM rides LIMIT 1').fetchone():
            people = [
                ('r1', 'Ananya Rao', 'woman', 'indiranagar', 'whitefield', '08:30', True, 4.9, 'Hyundai i20 · White', 3, [0,1,2,3,4]),
                ('r2', 'Rahul Mehta', 'man', 'mgroad', 'whitefield', '08:15', False, 4.8, 'Maruti Baleno · Blue', 3, [0,1,2,3,4]),
                ('r3', 'Priya Sharma', 'woman', 'indiranagar', 'whitefield', '08:35', True, 4.9, 'Tata Nexon · Silver', 2, [0,1,2,3,4,5,6]),
                ('r4', 'Dev Patel', 'man', 'indiranagar', 'whitefield', '08:45', False, 4.7, 'Honda City · Grey', 3, [0,1,2,3,4,5,6]),
                ('r5', 'Neha Iyer', 'woman', 'koramangala', 'whitefield', '09:00', True, 4.8, 'Maruti Swift · Red', 2, [0,1,2,3,4]),
            ]
            for rid, name, gender, origin, destination, departure, women, rating, car, seats, days in people:
                put(conn, 'rides', rid, dict(id=rid, driver_id=rid, name=name, gender=gender,
                    origin=origin, destination=destination, departure=departure, women_only=women,
                    rating=None, reviews=0, example=True, car=car, seats=seats, days=days, verified=False,
                    rate=8, path=shortest_path(origin, destination)))
        if not conn.execute('SELECT 1 FROM settings WHERE id="profile"').fetchone():
            put(conn, 'settings', 'profile', {'name': 'Maya Singh', 'gender': 'woman', 'verified': False,
                                            'contact': '', 'phone': ''})


def migrate_locations():
    """Upgrade saved planning records without losing reservations or contacts."""
    aliases = {'ecospace': 'whitefield', 'ejipura': 'koramangala',
               'bellandur': 'domlur', 'marathahalli': 'whitefield'}
    with connection() as conn:
        for table in ('rides', 'bookings'):
            for item in records(conn, table):
                for key in ('origin', 'destination'):
                    item[key] = aliases.get(item.get(key), item.get(key))
                if item.get('origin') == item.get('destination'):
                    item['destination'] = 'ubcity' if item['origin'] != 'ubcity' else 'indiranagar'
                if table == 'rides':
                    item['path'] = shortest_path(item['origin'], item['destination'])
                    item['verified'] = False  # No identity provider is connected.
                    if 'example' not in item and item['driver_id'] != 'you':
                        item['rating'], item['reviews'] = None, 0
                    item['example'] = item['driver_id'] != 'you'
                put(conn, table, item['id'], item)
        profile = get(conn, 'settings', 'profile')
        profile['verified'] = False
        put(conn, 'settings', 'profile', profile)


def put(conn, table, key, data):
    conn.execute(f'INSERT OR REPLACE INTO {table} (id,data) VALUES (?,?)', (key, json.dumps(data)))


def records(conn, table):
    return [json.loads(row['data']) for row in conn.execute(f'SELECT data FROM {table}')]


def get(conn, table, key):
    row = conn.execute(f'SELECT data FROM {table} WHERE id=?', (key,)).fetchone()
    if not row:
        raise ValueError('That item could not be found.')
    return json.loads(row['data'])


def clean_text(data, key, maximum=80):
    value = str(data.get(key, '')).strip()
    if not value or len(value) > maximum:
        raise ValueError(f'Enter a valid {key} (up to {maximum} characters).')
    return value


def weekdays(values):
    if not isinstance(values, list) or not values or any(type(d) is not int or d not in range(7) for d in values):
        raise ValueError('Choose at least one valid weekday.')
    return sorted(set(values))


def query_check(data, profile):
    shortest_path(data.get('origin'), data.get('destination'))
    minutes(data.get('time'))
    try:
        chosen = date.fromisoformat(data.get('date', ''))
    except (ValueError, TypeError):
        raise ValueError('Choose a valid travel date.')
    if chosen < today() or chosen > today() + timedelta(days=90):
        raise ValueError('Choose a travel date within the next 90 days.')
    tolerance = int(data.get('tolerance', 20))
    if tolerance not in (10, 20, 30, 60):
        raise ValueError('Choose a supported time window.')
    return {**data, 'tolerance': tolerance, 'gender': profile['gender']}


def dispatch(path, data):
    with connection() as conn:
        # Lock before reading availability to avoid competing seat reservations.
        conn.execute('BEGIN IMMEDIATE')
        profile = get(conn, 'settings', 'profile')
        if path == '/api/search':
            query = query_check(data, profile)
            bookings = records(conn, 'bookings')
            result = [match(r, query, bookings) for r in records(conn, 'rides')]
            return {'matches': sorted([m for m in result if m], key=lambda m: (-m['score'], m['fare']['amount']))}
        if path == '/api/book':
            query = query_check(data, profile)
            ride = get(conn, 'rides', data.get('ride_id'))
            dates = next_dates(query['date'], weekdays(data['days'])) if data.get('recurring') else [query['date']]
            bookings = records(conn, 'bookings')
            series = uuid.uuid4().hex
            pending = []
            for day in dates:
                candidate = {**query, 'date': day}
                if any(b['date'] == day and b['status'] != 'cancelled' and b['user'] == 'you' for b in bookings):
                    raise ValueError(f'You already have a ride on {day}. Cancel it first to change rides.')
                result = match(ride, candidate, bookings)
                if not result:
                    raise ValueError(f'This ride is not available on {day}. Choose days the driver operates.')
                bid = uuid.uuid4().hex[:12]
                booking = dict(id=bid, series=series, ride_id=ride['id'], user='you', date=day,
                    origin=query['origin'], destination=query['destination'], pickup=result['pickup'],
                    amount=result['fare']['amount'], fare=result['fare'], status='confirmed', progress=0,
                    rating=None, recurring=bool(data.get('recurring')))
                pending.append(booking)
            for booking in pending:
                put(conn, 'bookings', booking['id'], booking)
            return {'message': f'{len(pending)} ride' + ('s' if len(pending) != 1 else '') + ' saved to your planner. No driver contacted or payment taken.', 'bookings': pending}
        if path == '/api/booking':
            booking = get(conn, 'bookings', data.get('id'))
            action = data.get('action')
            if action == 'cancel':
                if booking['status'] != 'confirmed':
                    raise ValueError('Only upcoming rides can be cancelled.')
                targets = [booking]
                if data.get('series'):
                    targets = [b for b in records(conn, 'bookings') if b['series'] == booking['series'] and b['status'] == 'confirmed']
                for item in targets:
                    item['status'] = 'cancelled'
                    put(conn, 'bookings', item['id'], item)
                return {'message': f'{len(targets)} ride(s) cancelled.'}
            if action == 'start':
                if booking['status'] != 'confirmed':
                    raise ValueError('This trip cannot be started.')
                booking['status'] = 'in_progress'
                booking['started_at'] = datetime.now(timezone.utc).isoformat()
            elif action == 'progress':
                if booking['status'] != 'in_progress':
                    raise ValueError('Start the trip first.')
                booking['progress'] = min(100, booking['progress'] + 20)
                if booking['progress'] == 100:
                    booking['status'] = 'completed'
            elif action == 'rate':
                if booking['status'] != 'completed' or booking['rating'] is not None:
                    raise ValueError('Rate a completed, unrated trip.')
                rating = int(data.get('rating', 0))
                if rating not in range(1, 6):
                    raise ValueError('Choose a rating from 1 to 5.')
                booking['rating'] = rating
                ride = get(conn, 'rides', booking['ride_id'])
                ride['rating'] = round(((ride['rating'] or 0) * ride['reviews'] + rating) / (ride['reviews'] + 1), 2)
                ride['reviews'] += 1
                put(conn, 'rides', ride['id'], ride)
            elif action not in ('start', 'progress'):
                raise ValueError('Unknown trip action.')
            put(conn, 'bookings', booking['id'], booking)
            return {'booking': booking, 'message': 'Trip updated.'}
        if path == '/api/profile':
            gender = data.get('gender')
            if gender not in ('woman', 'man', 'other'):
                raise ValueError('Choose a profile option.')
            profile.update(name=clean_text(data, 'name'), gender=gender,
                           contact=str(data.get('contact', ''))[:80], phone=str(data.get('phone', ''))[:30])
            put(conn, 'settings', 'profile', profile)
            return {'message': 'Profile and emergency contact saved locally.'}
        if path == '/api/verify':
            raise ValueError('Identity verification is not connected. A profile photo cannot verify identity.')
        if path == '/api/offer':
            route = shortest_path(data.get('origin'), data.get('destination'))
            minutes(data.get('departure'))
            if minutes(data['departure']) > 22 * 60:
                raise ValueError('Choose departure before 10 pm.')
            seats, rate = int(data.get('seats', 0)), float(data.get('rate', 0))
            if seats not in range(1, 5) or not 2 <= rate <= 20:
                raise ValueError('Choose 1–4 passenger seats and a cost between ₹2 and ₹20 per km.')
            if data.get('women_only') and profile['gender'] != 'woman':
                raise ValueError('Women-only rides require a woman driver profile.')
            rid = uuid.uuid4().hex[:10]
            ride = dict(id=rid, driver_id='you', name=profile['name'], gender=profile['gender'],
                origin=data['origin'], destination=data['destination'], departure=data['departure'],
                women_only=bool(data.get('women_only')), rating=None, reviews=0,
                car=clean_text(data, 'car'), seats=seats, days=weekdays(data.get('days')),
                verified=profile['verified'], rate=rate, path=route)
            put(conn, 'rides', rid, ride)
            return {'message': 'Your recurring ride is saved in your personal planner. Other visitors cannot access it.'}
        if path == '/api/sos':
            booking = get(conn, 'bookings', data.get('id'))
            if booking['status'] != 'in_progress':
                raise ValueError('Start the trip before recording an alert.')
            eid = uuid.uuid4().hex
            put(conn, 'events', eid, {'booking_id': booking['id'], 'type': 'demo_sos',
                'time': datetime.now(timezone.utc).isoformat(), 'progress': booking['progress']})
            return {'message': 'Alert recorded locally. Nobody was contacted. Use your phone for a real emergency.'}
        raise ValueError('Unknown action.')


class Handler(BaseHTTPRequestHandler):
    def send_json(self, payload, status=200):
        content = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(content)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(content)

    def do_GET(self):
        path = urlparse(self.path).path
        if path in ('/api/route', '/api/map-config'):
            from api.map import handler as MapHandler
            if path == '/api/map-config':
                self.path = '/api/map.py?action=config'
            return MapHandler.do_GET(self)
        if path.startswith('/dashboard/') or path == '/rx-logo.png':
            import mimetypes
            relative = 'dashboard/index.html' if path == '/dashboard/' else path.lstrip('/')
            target = (ROOT / 'static' / relative).resolve()
            if not target.is_relative_to((ROOT / 'static').resolve()) or not target.is_file():
                return self.send_json({'error':'Not found'},404)
            content=target.read_bytes()
            self.send_response(200)
            self.send_header('Content-Type',mimetypes.guess_type(str(target))[0] or 'application/octet-stream')
            self.send_header('Content-Length',str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        if path == '/api/state':
            with connection() as conn:
                rides = records(conn, 'rides')
                bookings = records(conn, 'bookings')
                self.send_json({'stops': STOPS, 'edges': EDGES, 'rides': rides,
                    'bookings': sorted(bookings, key=lambda b: (b['date'], b['pickup'])),
                    'profile': get(conn, 'settings', 'profile'), 'today': today().isoformat()})
            return
        files = {'/': ('index.html', 'text/html'), '/app.js': ('app.js', 'text/javascript'),
                 '/style.css': ('style.css', 'text/css'), '/hero.png': ('hero.png', 'image/png')}
        if path not in files:
            self.send_json({'error': 'Not found'}, 404)
            return
        name, mime = files[path]
        content = (ROOT / 'static' / name).read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mime + '; charset=utf-8')
        self.send_header('Content-Length', str(len(content)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        # Local single-user prototype; reject cross-origin browser writes.
        origin = self.headers.get('Origin')
        if origin and origin != 'http://' + self.headers.get('Host', ''):
            self.send_json({'error': 'Cross-origin requests are disabled.'}, 403)
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if size > 16384:
                raise ValueError('Request too large.')
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise ValueError('Expected an object.')
            self.send_json(dispatch(urlparse(self.path).path, data))
        except (ValueError, TypeError, KeyError) as exc:
            self.send_json({'error': str(exc)}, 400)
        except Exception:
            self.send_json({'error': 'Something went wrong. Please try again.'}, 500)
            import traceback
            traceback.print_exc()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run the Routekind hackathon prototype')
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    init_db()
    migrate_locations()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Routekind is ready → http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
