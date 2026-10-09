# FireTech — RideX carpooling prototype

A runnable hackathon prototype in **Python**, with a responsive web interface and local SQLite storage. Concept submitted by Akshita.

## Run it

Requires Python 3.9 or newer. **No packages, API keys, or installation needed.**

Clone this repository, or download and extract its ZIP. Open a terminal in the project folder (the extracted ZIP folder may be named `FireTech--main`):

```sh
cd FireTech-
python3 app.py
```

Open **http://127.0.0.1:8000** in your browser. On Windows, use `py app.py` if `python3` is unavailable. If the port is busy, run `python3 app.py --port 8001` and use that port instead. Stop with Ctrl+C.

The application works offline; optional Google Fonts fall back to system fonts when unavailable. The backend and route algorithm are Python; the browser interface uses HTML, CSS, and JavaScript.

## Five-minute presentation

1. **Find a ride:** Keep Indiranagar → RMZ Ecospace at 08:30. Use a weekday for the most demo drivers. Three drivers match the default weekday search, ranked by route efficiency and pickup time.
2. **Trust and preferences:** Enable Women-only rides and search again. Ananya's ride matches. Her verification and ratings are explicitly sample data.
3. **Fair costs:** Choose View ride. The 11 km demo trip at ₹8 per vehicle km costs ₹44 per person with a driver and one passenger. The breakdown shows the cost of every segment.
4. **Recurring commute:** Enable the recurring option, select the driver's weekdays, and confirm. The app reserves each selected date in the next 14 days atomically. My trips displays all bookings. No real payment is processed.
5. **Trip experience:** Start a demo trip, advance the simulated location, copy a trip status, and test the local SOS log. Five advances complete a trip. Leave a star rating and see it persist.
6. **Offer a ride:** Add your own recurring route, car, seats, and cost per km. It appears under Your offered rides. Your own ride is excluded from your passenger matches.
7. **Safety & profile:** Edit your profile and trusted contact. Try the clearly labeled verification simulation. Reload to demonstrate persistence.

## How the matching works

- A small, explicitly synthetic Bengaluru road graph connects nine neighborhoods. Dijkstra's algorithm finds the shortest driver route.
- Pickup and drop-off must lie on the driver's route **in the correct order**. The demo intentionally requires exact graph stops; it does not support arbitrary addresses or nearby detours.
- Pickup time includes the driver's travel before reaching you, assuming 24 km/h for the demo. A match must fall inside your chosen ±10/20/30/60-minute window and operate on the selected weekday.
- Seat availability is checked on every shared segment. Women-only and demo verification filters are enforced in the Python backend.
- Match score is 75% rider-route efficiency (shortest rider distance / shared distance) and 25% pickup-time fit. The UI separately shows how much of the driver's total route is shared.
- Each segment's vehicle cost is split between its driver and onboard passengers. Integer paise avoid floating-point fare accumulation. The requesting rider receives the floor share if a fractional paisa remainder exists; a production settlement system must assign all remaining paise explicitly.
- Recurring reservations validate every requested date before writing any booking. A database transaction prevents simultaneous writes from overselling seats.

## Prototype boundaries

This is a **local, single-user demonstration**, not a public transport or safety service. The default profile is Maya Singh; use Safety & profile to change it. Driver names, ratings, verification, road distances, vehicles, and journey times are sample data. Women-only eligibility uses a self-reported profile.

Tracking advances manually and does not use GPS. Copy trip status creates a static text snapshot, not a remotely accessible tracking link. SOS logs an event locally and contacts nobody. Verification is a simulation; no documents are collected or checked. Bookings are local records, with no actual passengers, notifications, charges, refunds, or emergency dispatch.

Booking prices are **stored estimates**, not final settlements; recurring totals preview the same initial estimate and the backend calculates each date individually. There is one reservation per passenger per date to keep the demo flow simple. Demo trips can be started early for presentations. Published driver schedules repeat indefinitely; passenger recurring reservations cover 14 days. The demo has no offered-ride editing or multi-user accounts.

A production version needs authentication and authorization, real routing/traffic data, consent-based GPS, driver/vehicle verification, vetted emergency integrations, payment and settlement services, reporting/moderation, secure storage, retention controls, and operational support. The development server binds to your own computer only and should not be exposed publicly.

## Files

```text
app.py             Python HTTP API, SQLite persistence, booking transactions
core.py            Graph routing, matching, timing, segment fares
static/index.html  Application screens
static/style.css   Responsive design
static/app.js      Browser interaction and illustrative SVG map
tests/test_app.py  Business-rule and end-to-end backend tests
routekind.db       Generated on first run; stores your local demo data
```

## Test

```sh
python3 -m unittest discover -s tests -v
```

Tests use temporary databases and do not change your demo records. To start fresh, stop the app and remove the generated `routekind.db` file. It is recreated next time you launch. To isolate another demo, set the `ROUTEKIND_DB` environment variable to another writable database path.


## Deploy the shareable demo to Vercel

Import this repository into Vercel with the repository root (`./`) as Root Directory. The committed `vercel.json` defines the Python function and static homepage routes. Leave framework as Other and clear custom Build Command / Output Directory overrides. Redeploy the latest commit after configuration changes.

The hosted version uses `api/index.py`, which exports Vercel's required Python `handler`. Its temporary database is isolated per request and removed afterwards. Each visitor's demo state is kept in their browser's local storage and sent to the function to process their actions. It survives reloads in the same browser but does not synchronize across devices or tabs. Clearing site data resets it. Use sample profile/contact details only. This is editable demo data, not authenticated accounts or authoritative reservations. The local `python3 app.py` version continues to use SQLite on disk.

No database service, API key, or additional Python package is required for the hosted demo. Real multi-user persistence would require a server-side database and authentication.


## RideX journey map and emergency contact

The navigation's **Live map** button opens the integrated React + Tailwind dark dashboard under `/dashboard/`. All built assets are included under `static/dashboard/`. The original search, booking, profile and ride-offer flows remain available.

The red **SOS** button opens a trusted-contact drawer. Its saved name/phone live only in browser local storage, separate from the booking API. The call links hand off to the device dialer; no call happens automatically. Location is requested only on **Use my current location**. The illustration is a placeholder; browser coordinates and their accuracy are displayed separately. **Copy location** copies a Maps link, ready to paste into a message yourself. RideX does not dispatch assistance.

### Enable Mapbox

Set these two environment variables in Vercel, then redeploy:

- `MAPBOX_PUBLIC_TOKEN`: a `pk.` token for browser map tiles, restricted to your website URLs. `/api/map-config` returns this browser-public token. Never place a secret token here.
- `MAPBOX_DIRECTIONS_TOKEN`: server-only token allowed to call Mapbox Directions. `/api/route` fetches the fixed Indiranagar → RMZ Ecospace route with `driving-traffic`, full GeoJSON geometry and congestion annotations. It caches successful responses for 120 seconds per Python process.

Select **Live Mapbox** in the dashboard after setting both tokens. With no credentials it stays in labeled demo mode. Distance/ETA become provider values; unknown traffic coverage stays grey. Movement, signal countdowns, savings and safety score are illustrative simulation, including in live route mode. No GPS vehicle tracking or live signal-phase feed is implemented.

Source for the React dashboard is included in `dashboard-source.zip`; extract it into a separate folder. to rebuild integrated assets use `npm run build` there and copy `dist/` into `static/dashboard/`. Its Vite base is `/dashboard/`. Official references: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/get-started/), [Directions/traffic annotations](https://docs.mapbox.com/api/navigation/directions/), [token restrictions](https://docs.mapbox.com/accounts/guides/tokens/).
