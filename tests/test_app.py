import sys
import tempfile
import unittest
from datetime import timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
from core import fare, match, shortest_path


class PrototypeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        app.DB = Path(self.temp.name) / 'test.db'
        app.init_db()
        day = app.today()
        day += timedelta(days=(7 - day.weekday()) % 7)
        self.query = dict(origin='indiranagar', destination='whitefield', date=day.isoformat(),
                          time='08:30', tolerance=20, women_only=False, verified_only=False)

    def tearDown(self):
        self.temp.cleanup()

    def search(self, **kwargs):
        return app.dispatch('/api/search', {**self.query, **kwargs})['matches']

    def book(self, **kwargs):
        return app.dispatch('/api/book', {**self.query, 'ride_id': 'r1', **kwargs})['bookings']

    def test_direction_and_time(self):
        self.assertGreater(len(self.search()), 0)
        self.assertEqual(self.search(origin='whitefield', destination='indiranagar'), [])
        self.assertEqual(self.search(time='13:00'), [])
        self.assertEqual(self.search()[0]['score'], 100)

    def test_pickup_time_accounts_for_drivers_earlier_route(self):
        rahul = next(r for r in self.search() if r['id'] == 'r2')
        self.assertEqual(rahul['pickup'], '08:26')
        self.assertEqual(rahul['gap'], 4)

    def test_fare_changes_only_on_shared_segments(self):
        path = shortest_path('indiranagar', 'whitefield')
        me = {'origin': 'indiranagar', 'destination': 'whitefield'}
        alone = fare(path, **me, passengers=[me])
        other = {'origin': 'domlur', 'destination': 'whitefield'}
        shared = fare(path, **me, passengers=[other, me])
        self.assertEqual(alone['amount'], 79.2)
        self.assertEqual(shared['amount'], 56.53)
        self.assertEqual([s['people'] for s in shared['segments']], [2, 3])

    def test_women_filter_enforced_from_profile(self):
        self.assertTrue(all(r['women_only'] for r in self.search(women_only=True)))
        app.dispatch('/api/profile', {'name': 'Test User', 'gender': 'man'})
        self.assertEqual(self.search(women_only=True, gender='woman'), [])
        self.assertFalse(any(r['women_only'] for r in self.search()))

    def test_recurring_atomicity_and_cancellation(self):
        with self.assertRaises(ValueError):
            self.book(recurring=True, days=[0, 5])
        with app.connection() as conn:
            self.assertEqual(app.records(conn, 'bookings'), [])
        bookings = self.book(recurring=True, days=[0, 1, 2, 3, 4])
        self.assertEqual(len(bookings), 10)
        app.dispatch('/api/booking', {'id': bookings[0]['id'], 'action': 'cancel', 'series': True})
        with app.connection() as conn:
            self.assertTrue(all(b['status'] == 'cancelled' for b in app.records(conn, 'bookings')))

    def test_capacity_and_duplicate_booking(self):
        booking = self.book()[0]
        with self.assertRaises(ValueError):
            self.book()
        with app.connection() as conn:
            ride = app.get(conn, 'rides', 'r1')
        ride['seats'] = 1
        self.assertIsNone(match(ride, {**self.query, 'gender': 'woman'}, [booking]))

    def test_full_trip_and_rating_flow(self):
        booking = self.book()[0]
        with self.assertRaises(ValueError):
            app.dispatch('/api/booking', {'id': booking['id'], 'action': 'rate', 'rating': 5})
        app.dispatch('/api/booking', {'id': booking['id'], 'action': 'start'})
        result = app.dispatch('/api/sos', {'id': booking['id']})
        self.assertIn('Nobody was contacted', result['message'])
        for _ in range(5):
            result = app.dispatch('/api/booking', {'id': booking['id'], 'action': 'progress'})
        self.assertEqual(result['booking']['status'], 'completed')
        result = app.dispatch('/api/booking', {'id': booking['id'], 'action': 'rate', 'rating': 5})
        self.assertEqual(result['booking']['rating'], 5)
        with self.assertRaises(ValueError):
            app.dispatch('/api/booking', {'id': booking['id'], 'action': 'rate', 'rating': 1})

    def test_offer_cannot_self_verify(self):
        app.dispatch('/api/offer', {'origin': 'indiranagar', 'destination': 'whitefield',
            'departure': '08:00', 'seats': 2, 'rate': 8, 'car': 'Demo car', 'days': [0, 1],
            'women_only': True})
        with self.assertRaisesRegex(ValueError, 'not connected'):
            app.dispatch('/api/verify', {})
        with app.connection() as conn:
            rides = [r for r in app.records(conn, 'rides') if r['driver_id'] == 'you']
            self.assertEqual(len(rides), 1)
            self.assertFalse(rides[0]['verified'])
        self.assertFalse(any(r['driver_id'] == 'you' for r in self.search()))


if __name__ == '__main__':
    unittest.main()
