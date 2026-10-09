import sys
import unittest
from concurrent.futures import ThreadPoolExecutor
from datetime import timedelta
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
from api.index import run_demo


class HostedTests(unittest.TestCase):
    def test_state_roundtrip_and_isolation(self):
        initial = run_demo('state', {})
        edited = run_demo('profile', {'name': 'Visitor A', 'gender': 'woman'}, initial['demo_snapshot'])
        restored = run_demo('state', {}, edited['demo_snapshot'])
        self.assertEqual(restored['profile']['name'], 'Visitor A')
        self.assertEqual(run_demo('state', {})['profile']['name'], 'Maya Singh')
        self.assertIsNone(app.REQUEST_DB.get())

    def test_booking_survives_new_function_request(self):
        day = app.today()
        day += timedelta(days=(7-day.weekday()) % 7)
        query = dict(origin='indiranagar', destination='ecospace', date=day.isoformat(),
                     time='08:30', tolerance=20, women_only=True, verified_only=True)
        first = run_demo('search', query)
        self.assertEqual(first['matches'][0]['id'], 'r1')
        booked = run_demo('book', {**query, 'ride_id': 'r1'}, first['demo_snapshot'])
        restored = run_demo('state', {}, booked['demo_snapshot'])
        self.assertEqual(len(restored['bookings']), 1)
        self.assertEqual(restored['bookings'][0]['amount'], 44)
        self.assertEqual(run_demo('state', {})['bookings'], [])

    def test_parallel_visitors_do_not_share_state(self):
        def visitor(i):
            result = run_demo('profile', {'name': f'Visitor {i}', 'gender': 'woman'})
            return run_demo('state', {}, result['demo_snapshot'])['profile']['name']
        with ThreadPoolExecutor(max_workers=4) as pool:
            self.assertEqual(list(pool.map(visitor, range(8))), [f'Visitor {i}' for i in range(8)])

    def test_bad_snapshot_does_not_leak_context(self):
        with self.assertRaises(ValueError):
            run_demo('state', {}, {'invalid': []})
        self.assertIsNone(app.REQUEST_DB.get())
        self.assertEqual(run_demo('state', {})['profile']['name'], 'Maya Singh')

    def test_endpoint_allowlist(self):
        with self.assertRaises(ValueError):
            run_demo('../../app.py', {})


if __name__ == '__main__':
    unittest.main()
