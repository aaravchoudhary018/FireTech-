import sys
import unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from core import STOPS, shortest_path, route_km
from api.map import normalize_route, fetch_route
from api.index import run_demo

class MapsTests(unittest.TestCase):
    def test_catalog_connected_and_legacy_migrated(self):
        self.assertEqual(len(STOPS),10)
        self.assertIn('pattanagere',STOPS)
        self.assertNotIn('ecospace',STOPS)
        for a in STOPS:
            for b in STOPS:
                if a!=b:self.assertGreater(route_km(shortest_path(a,b)),0)
        initial=run_demo('state',{})
        ride=initial['demo_snapshot']['rides'][0]['data']
        ride.update(destination='ecospace',verified=True)
        restored=run_demo('state',{},initial['demo_snapshot'])
        self.assertEqual(restored['rides'][0]['destination'],'whitefield')
        self.assertFalse(restored['rides'][0]['verified'])
        self.assertEqual(restored['profile']['name'],'Maya Singh')
    def test_traffic_intervals_and_unknown_coverage(self):
        body={'routes':[{'distanceMeters':1200,'duration':'120.5s','polyline':{'geoJsonLinestring':{'coordinates':[[77,12],[77.1,12.1],[77.2,12.2],[77.3,12.3]]}},'travelAdvisory':{'speedReadingIntervals':[{'endPolylinePointIndex':1,'speed':'NORMAL'},{'startPolylinePointIndex':1,'endPolylinePointIndex':2,'speed':'TRAFFIC_JAM'}]}}]}
        result=normalize_route(body)
        self.assertEqual(result['congestion'],['normal','heavy','unknown'])
        self.assertEqual(result['duration'],120.5)
        self.assertEqual(result['source'],'google')
        body['routes'][0]['travelAdvisory']['speedReadingIntervals'][0]['endPolylinePointIndex']=99
        with self.assertRaises(ValueError):normalize_route(body)
    def test_unconfigured_and_untrusted_locations(self):
        with patch.dict('os.environ',{},clear=True):
            with self.assertRaisesRegex(ValueError,'not configured'):fetch_route()
        with self.assertRaisesRegex(ValueError,'different Bengaluru'):fetch_route('https://invalid','whitefield')
    def test_no_fabricated_verification(self):
        state=run_demo('state',{})
        self.assertTrue(all(not r['verified'] for r in state['rides']))
        with self.assertRaisesRegex(ValueError,'not connected'):run_demo('verify',{},state['demo_snapshot'])

if __name__=='__main__':unittest.main()
