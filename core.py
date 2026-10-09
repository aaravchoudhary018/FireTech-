"""Route matching and segment-based fare sharing, using a small demo road graph."""
import heapq
from datetime import date, datetime, timedelta

STOPS = {
    'indiranagar': {'name': 'Indiranagar Metro Station', 'x': 430, 'y': 180, 'address': 'Indiranagar Metro Station, Bengaluru, Karnataka'},
    'whitefield': {'name': 'Whitefield (Kadugodi) Metro Station', 'x': 665, 'y': 95, 'address': 'Whitefield Kadugodi Metro Station, Bengaluru, Karnataka'},
    'cubbonpark': {'name': 'Cubbon Park Metro Station', 'x': 295, 'y': 170, 'address': 'Cubbon Park Metro Station, Bengaluru, Karnataka'},
    'ubcity': {'name': 'UB City, Vittal Mallya Road', 'x': 305, 'y': 260, 'address': 'UB City, 24 Vittal Mallya Road, Bengaluru, Karnataka'},
    'pattanagere': {'name': 'Pattanagere Metro Station', 'x': 70, 'y': 390, 'address': 'Pattanagere Metro Station, Bengaluru, Karnataka'},
    'majestic': {'name': 'Nadaprabhu Kempegowda (Majestic)', 'x': 180, 'y': 205, 'address': 'Nadaprabhu Kempegowda Majestic Metro Station, Bengaluru, Karnataka'},
    'jayanagar': {'name': 'Jayanagar Metro Station', 'x': 260, 'y': 420, 'address': 'Jayanagar Metro Station, Bengaluru, Karnataka'},
    'koramangala': {'name': 'Koramangala, 80 Feet Road', 'x': 425, 'y': 450, 'address': 'Koramangala 80 Feet Road, Bengaluru, Karnataka'},
    'domlur': {'name': 'Domlur Bus Stand', 'x': 475, 'y': 290, 'address': 'Domlur Bus Stand, Bengaluru, Karnataka'},
    'mgroad': {'name': 'MG Road Metro Station', 'x': 355, 'y': 180, 'address': 'MG Road Metro Station, Bengaluru, Karnataka'},
}
# Planning estimates only. Google Routes provides actual navigation distance/ETA.
EDGES = [('majestic', 'cubbonpark', 4.0), ('cubbonpark', 'mgroad', 1.5),
         ('cubbonpark', 'ubcity', 2.0), ('mgroad', 'indiranagar', 4.2),
         ('indiranagar', 'domlur', 2.8), ('domlur', 'whitefield', 17.0),
         ('domlur', 'koramangala', 5.0), ('koramangala', 'jayanagar', 5.5),
         ('jayanagar', 'ubcity', 5.0), ('pattanagere', 'majestic', 13.0)]
DISTANCES = {(a, b): km for a, b, km in EDGES}
DISTANCES.update({(b, a): km for a, b, km in EDGES})


def shortest_path(start, end):
    if start not in STOPS or end not in STOPS or start == end:
        raise ValueError('Choose two different Bengaluru locations.')
    queue, visited = [(0, start, [start])], set()
    while queue:
        distance, current, path = heapq.heappop(queue)
        if current == end:
            return path
        if current in visited:
            continue
        visited.add(current)
        for (a, b), km in DISTANCES.items():
            if a == current and b not in visited:
                heapq.heappush(queue, (distance + km, b, path + [b]))
    raise ValueError('No route found.')


def route_km(path):
    return round(sum(DISTANCES[a, b] for a, b in zip(path, path[1:])), 2)


def minutes(value):
    try:
        parsed = datetime.strptime(value, '%H:%M')
        return parsed.hour * 60 + parsed.minute
    except (ValueError, TypeError):
        raise ValueError('Enter a valid departure time.')


def clock(value):
    return f'{int(value) // 60:02d}:{int(value) % 60:02d}'


def segment(path, origin, destination):
    if origin not in path or destination not in path:
        return None
    start, end = path.index(origin), path.index(destination)
    return (start, end) if start < end else None


def fare(path, origin, destination, passengers, rate=8.0):
    """Split each road segment equally among its driver and onboard riders.

    passengers includes the requesting passenger, each with origin/destination.
    Using integer paise and assigning remainders by passenger order conserves cost.
    """
    bounds = segment(path, origin, destination)
    if bounds is None:
        raise ValueError('Pickup and drop-off must follow the driver’s route.')
    total, breakdown = 0, []
    for i in range(bounds[0], bounds[1]):
        a, b = path[i:i + 2]
        onboard = [p for p in passengers if segment(path, p['origin'], p['destination'])
                   and segment(path, p['origin'], p['destination'])[0] <= i
                   < segment(path, p['origin'], p['destination'])[1]]
        # The requesting passenger is appended last; driver takes index zero.
        count = 1 + len(onboard)
        cost = round(DISTANCES[a, b] * rate * 100)
        share = cost // count + (1 if len(onboard) < cost % count else 0)
        total += share
        breakdown.append({'from': STOPS[a]['name'], 'to': STOPS[b]['name'],
                          'km': DISTANCES[a, b], 'people': count, 'share': share / 100})
    return {'amount': round(total / 100, 2), 'segments': breakdown,
            'distance': route_km(path[bounds[0]:bounds[1] + 1])}


def match(ride, query, bookings):
    if ride['driver_id'] == 'you':
        return None
    path = ride['path']
    bounds = segment(path, query['origin'], query['destination'])
    if not bounds or date.fromisoformat(query['date']).weekday() not in ride['days']:
        return None
    if query.get('women_only') and not ride['women_only']:
        return None
    if ride['women_only'] and query.get('gender') != 'woman':
        return None
    if query.get('verified_only') and not ride['verified']:
        return None
    relevant = [b for b in bookings if b['ride_id'] == ride['id'] and b['date'] == query['date']
                and b['status'] != 'cancelled']
    max_onboard = max((sum(1 for b in relevant
                          if segment(path, b['origin'], b['destination'])[0] <= i
                          < segment(path, b['origin'], b['destination'])[1])
                       for i in range(bounds[0], bounds[1])), default=0)
    seats = ride['seats'] - max_onboard
    if seats < 1:
        return None
    pickup = minutes(ride['departure']) + int(route_km(path[:bounds[0] + 1]) * 60 / 24 + 0.5)
    gap = abs(pickup - minutes(query['time']))
    if gap > query['tolerance']:
        return None
    shared = route_km(path[bounds[0]:bounds[1] + 1])
    direct = route_km(shortest_path(query['origin'], query['destination']))
    efficiency = min(1, direct / shared)
    timing = max(0, 1 - gap / max(1, query['tolerance']))
    cost = fare(path, query['origin'], query['destination'], relevant + [query], ride['rate'])
    return {**ride, 'pickup': clock(pickup), 'gap': gap, 'available': seats,
            'score': round(100 * (0.75 * efficiency + 0.25 * timing)),
            'shared_km': shared, 'driver_overlap': round(100 * shared / route_km(path)),
            'duration': round(shared / 24 * 60), 'fare': cost}


def next_dates(start, weekdays, weeks=2):
    first = date.fromisoformat(start)
    return [(first + timedelta(days=i)).isoformat() for i in range(weeks * 7)
            if (first + timedelta(days=i)).weekday() in weekdays]
