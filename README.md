# RideX — Bengaluru carpool commute planner

Python backend, responsive web UI, and a React + Tailwind Google Maps dashboard.
Live site: https://firetech-murex.vercel.app/

## What works

- Ten genuine Bengaluru destinations; direction, weekday, time window and capacity matching.
- Search loading, matching results, no-result guidance and retry handling.
- Segment-by-segment cost estimates; 14-day recurring plans, cancellation and personal trip progress.
- Saving profile/preferences and recurring offers; local schedule ratings.
- Permission-based camera capture for a **profile photo only**, with local save/delete and camera shutdown on close.
- SOS contact saving, phone links, permission-based device location and location copying.
- Carpool benefits, accessible FAQ accordions and working help/footer controls.
- Google Maps JavaScript dark map, TrafficLayer, traffic-aware Google Routes polylines, route distance/ETA and optional device geolocation once configured.

## Run locally

Requires Python 3.9+; no Python packages are needed.

```sh
python3 app.py --port 8005
```

Open http://127.0.0.1:8005/. Local planning data uses SQLite (`routekind.db`, ignored by Git). Set `ROUTEKIND_DB` to select another database. Hosted Vercel planning records use isolated per-request databases with browser-owned snapshots saved in local storage. Old locations migrate without deleting bookings or contacts.

## Google Maps setup — keys not provided yet

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select/create your project. Enable billing and set budget alerts and API quotas.
2. Enable **Maps JavaScript API** and **Routes API** in APIs & Services → Library.
3. Create two separate API keys in APIs & Services → Credentials.
4. Browser key: select **Websites** restrictions. Allow `https://firetech-murex.vercel.app/*` and your chosen localhost URL, such as `http://127.0.0.1:8005/*`. Restrict API access to **Maps JavaScript API**.
5. Server key: restrict API access to **Routes API**. Do not use website/referrer restrictions for this server key. Add server IP restrictions if your deployment has fixed outbound IPs; otherwise use quotas and a suitable server gateway before a public production launch.
6. In Vercel → Project → Settings → Environment Variables, add:
   - `GOOGLE_MAPS_BROWSER_KEY` = browser key (intentionally public to the browser).
   - `GOOGLE_ROUTES_API_KEY` = private server key. **Never commit this key or give it a VITE_ prefix.**
7. Redeploy the project. Open Live map, choose locations and click **Show route**. The map uses the configured browser key; the Python server makes Routes requests with the private key.
8. Test valid routing, denied key/billing, no-route and quota failures. Until keys are configured, the map explains setup is pending and provides an external Google Maps directions link.

Local setup: set these two environment variables in your terminal environment before starting Python. Do not paste credentials into chat, screenshots, source files or GitHub.

`GET /api/map-config` returns only the browser key and a server-configured boolean. `GET /api/route?origin=indiranagar&destination=whitefield` accepts only the fixed location catalog. The Routes request uses `TRAFFIC_AWARE_OPTIMAL`, `TRAFFIC_ON_POLYLINE`, `GEO_JSON_LINESTRING` and an explicit field mask. Successful pairs cache for 120 seconds per Python process. Unknown traffic remains grey. The dashboard retrieves data when Show route is pressed; it does not claim continuous driver tracking. Device location is collected only by an explicit click, can be stopped, and is never a driver location.

Official references: [Load Maps JavaScript](https://developers.google.com/maps/documentation/javascript/load-maps-js-api), [Routes traffic polylines](https://developers.google.com/maps/documentation/routes/traffic_on_polylines), [API key security](https://developers.google.com/maps/api-security-best-practices).

## Locations and research

1. Indiranagar Metro Station
2. Whitefield (Kadugodi) Metro Station
3. Cubbon Park Metro Station
4. UB City, 24 Vittal Mallya Road
5. Pattanagere Metro Station
6. Nadaprabhu Kempegowda (Majestic) Metro Station
7. Jayanagar Metro Station
8. Koramangala, 80 Feet Road
9. Domlur Bus Stand
10. MG Road Metro Station

Sources: [BMRCL official station chart](https://english.bmrc.co.in/pd/RetailKioskRateChart.pdf), [Bengaluru Urban tourism](https://bengaluruurban.nic.in/en/tourism/), [UB City official address](https://ubcitybangalore.in/contact-us/). These are city pickup areas and landmarks, not ten central-city locations or designated pickup bays. Whitefield and Pattanagere are farther from the centre. Confirm the exact safe meeting point with the co-rider. RMZ Ecospace was removed at the user's request; it does exist ([RMZ official property page](https://www.rmz.com/real-estate/rmz-office/spaces/rmz-ecospace)).

## Scope and honest status

The schedules are **examples**, and saved offers/plans are private to one browser. They do not contact a driver, reserve a real seat, or charge money. Names, cars, graph distances and times are planning examples. The estimated road graph still powers matching/fare splitting; Google road distance/ETA is displayed separately and does not yet recalculate matched fares or route overlap.

A camera photo does **not** validate identity, gender, driving documents or liveness. Profiles remain unverified; the verified-only filter returns no matches. Women-only access uses self-reported profile information. No invented safety percentage, signal countdown or simulated live vehicle is presented.

A public multi-user launch still requires authenticated accounts, a durable shared database, real drivers and acceptance/notification flows, server-authoritative booking/capacity, GPS consent and tracking, identity/vehicle checks, payments if needed, policies and operational support. Editable browser snapshots are never trusted identity or booking credentials. Google API quotas should protect the public route proxy; authentication/rate limiting must be added for production.

## Build the React dashboard

Source is included in `dashboard-source.zip`. Extract separately, run:

```sh
npm install
npm run build
```

Copy `dist/` contents to `static/dashboard/`. Vite uses `/dashboard/` as its base. The integrated Python app serves API calls; use its preview for end-to-end testing. Old Mapbox simulation source is no longer used by the dashboard.

## Tests

```sh
python3 -m unittest discover -s tests -v
```

Seventeen tests cover matching, fares, women-only preferences, capacity, duplicate and recurring bookings, cancellation, progress/rating, isolated hosted state, legacy migration, location connectivity, Google traffic interval parsing, missing keys and refusing self-verification. Provider calls require keys for real integration testing.

## Deploy

Import the GitHub repository into Vercel. `vercel.json` wires Python API functions and static frontend assets. Uploads/commits trigger deployment. Do not upload `routekind.db`, credentials or private profile photos.
