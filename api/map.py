"""Fixed route API. Mapbox token stays on the server; no user-supplied URL."""
import json
import os
import time
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError, URLError

_cache = None
_cached_at = 0
_lock = threading.Lock()
COORDINATES = '77.6408,12.9784;77.6951,12.9149'


def normalize_route(body):
    routes = body.get('routes', [])
    if not routes:
        raise ValueError('No driving route returned.')
    route = routes[0]
    coordinates = route['geometry']['coordinates']
    if len(coordinates) < 2:
        raise ValueError('Incomplete route geometry.')
    levels = []
    for leg in route.get('legs', []):
        levels.extend(leg.get('annotation', {}).get('congestion', []))
    # Unknown coverage remains grey, never presented as free-flow traffic.
    levels = (levels + ['unknown'] * (len(coordinates)-1))[:len(coordinates)-1]
    return {'source': 'mapbox', 'coordinates': coordinates, 'congestion': levels,
            'distance': route['distance'], 'duration': route['duration'],
            'updated_at': datetime.now(timezone.utc).isoformat()}


def fetch_route():
    global _cache, _cached_at
    token = os.environ.get('MAPBOX_DIRECTIONS_TOKEN')
    if not token:
        raise ValueError('Set MAPBOX_DIRECTIONS_TOKEN on the Python server to enable live routing.')
    with _lock:
        if _cache and time.monotonic()-_cached_at < 120:
            return _cache
        params = urlencode({'access_token': token, 'geometries': 'geojson',
                            'overview': 'full', 'annotations': 'congestion,distance,duration',
                            'steps': 'false', 'alternatives': 'false'})
        url = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' + COORDINATES + '?' + params
        try:
            with urlopen(Request(url, headers={'Accept': 'application/json'}), timeout=12) as response:
                value = normalize_route(json.load(response))
        except HTTPError as error:
            # Do not return the upstream URL: it contains the access token.
            if error.code in (401, 403):
                raise ValueError('Mapbox rejected the server token. Check its permissions.') from None
            if error.code == 429:
                raise ValueError('Mapbox rate limit reached. Try again later.') from None
            raise ValueError('Mapbox routing is temporarily unavailable.') from None
        except (URLError, TimeoutError, KeyError, TypeError, json.JSONDecodeError):
            raise ValueError('Could not retrieve a valid Mapbox route. Try again later.') from None
        _cache, _cached_at = value, time.monotonic()
        return value


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        from urllib.parse import urlparse, parse_qs
        if parse_qs(urlparse(self.path).query).get('action') == ['config']:
            public_token=os.environ.get('MAPBOX_PUBLIC_TOKEN', '')
            result={'public_token': public_token if public_token.startswith('pk.') else ''}
            body=json.dumps(result).encode()
            self.send_response(200)
            self.send_header('Content-Type','application/json')
            self.send_header('Cache-Control','no-store')
            self.send_header('Content-Length',str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        try:
            result, status = fetch_route(), 200
        except ValueError as error:
            result, status = {'error': str(error)}, 503
        body = json.dumps(result).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
