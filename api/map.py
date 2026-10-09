"""Google Routes proxy. Only catalog locations are accepted; server key stays private."""
import json
import os
import sys
import time
import threading
from pathlib import Path
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from urllib.request import Request, urlopen
from urllib.parse import urlparse, parse_qs
from urllib.error import HTTPError, URLError
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core import STOPS

_cache = {}
_lock = threading.Lock()


def normalize_route(body):
    routes = body.get('routes', [])
    if not routes:
        raise ValueError('Google Maps found no driving route for these locations.')
    route = routes[0]
    geometry = route['polyline']['geoJsonLinestring']
    coordinates = geometry['coordinates']
    if len(coordinates) < 2:
        raise ValueError('Incomplete route geometry.')
    congestion = ['unknown'] * (len(coordinates)-1)
    levels = {'NORMAL': 'normal', 'SLOW': 'slow', 'TRAFFIC_JAM': 'heavy'}
    for interval in route.get('travelAdvisory', {}).get('speedReadingIntervals', []):
        start = interval.get('startPolylinePointIndex', 0)
        end = interval['endPolylinePointIndex']
        if type(start) is not int or type(end) is not int or not 0 <= start <= end < len(coordinates):
            raise ValueError('Invalid traffic interval.')
        for index in range(start, end):
            congestion[index] = levels.get(interval.get('speed'), 'unknown')
    return {'source': 'google', 'coordinates': coordinates, 'congestion': congestion,
            'distance': route['distanceMeters'], 'duration': float(route['duration'].removesuffix('s')),
            'updated_at': datetime.now(timezone.utc).isoformat()}


def fetch_route(origin='indiranagar', destination='whitefield'):
    if origin not in STOPS or destination not in STOPS or origin == destination:
        raise ValueError('Choose two different Bengaluru locations.')
    token = os.environ.get('GOOGLE_ROUTES_API_KEY', '')
    if not token:
        raise ValueError('Google Routes is not configured yet. The site owner must add the server API key.')
    pair = (origin, destination)
    with _lock:
        cached = _cache.get(pair)
        if cached and time.monotonic()-cached[0] < 120:
            return cached[1]
    payload = {'origin': {'address': STOPS[origin]['address']},
               'destination': {'address': STOPS[destination]['address']},
               'travelMode': 'DRIVE', 'routingPreference': 'TRAFFIC_AWARE_OPTIMAL',
               'extraComputations': ['TRAFFIC_ON_POLYLINE'], 'polylineEncoding': 'GEO_JSON_LINESTRING',
               'polylineQuality': 'HIGH_QUALITY', 'languageCode': 'en-IN', 'units': 'METRIC'}
    request = Request('https://routes.googleapis.com/directions/v2:computeRoutes',
        data=json.dumps(payload).encode(), method='POST', headers={
            'Content-Type':'application/json', 'X-Goog-Api-Key':token,
            'X-Goog-FieldMask':'routes.distanceMeters,routes.duration,routes.polyline.geoJsonLinestring,routes.travelAdvisory.speedReadingIntervals'})
    try:
        with urlopen(request, timeout=12) as response:
            value = normalize_route(json.load(response))
    except HTTPError as error:
        if error.code in (401,403):
            raise ValueError('Google Maps rejected the server key. Check Routes API, billing and key restrictions.') from None
        if error.code == 429:
            raise ValueError('Google Maps quota reached. Try again later.') from None
        raise ValueError('Google routing is temporarily unavailable. Check the API configuration.') from None
    except (URLError, TimeoutError, KeyError, TypeError, json.JSONDecodeError):
        raise ValueError('Could not retrieve a valid Google Maps route. Please try again.') from None
    with _lock:
        _cache[pair] = (time.monotonic(), value)
    return value


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        if query.get('action') == ['config']:
            result, status = {'browser_key':os.environ.get('GOOGLE_MAPS_BROWSER_KEY',''),
                              'routes_configured':bool(os.environ.get('GOOGLE_ROUTES_API_KEY'))}, 200
        else:
            try:
                result, status = fetch_route(query.get('origin',['indiranagar'])[0],query.get('destination',['whitefield'])[0]), 200
            except ValueError as error:
                result, status = {'error':str(error)}, 503
        body=json.dumps(result).encode()
        self.send_response(status)
        self.send_header('Content-Type','application/json')
        self.send_header('Cache-Control','no-store')
        self.send_header('Content-Length',str(len(body)))
        self.end_headers()
        self.wfile.write(body)
