# SlopeShield

**SlopeShield - Smart Landslide Monitoring, Risk Assessment and Early Warning System**

SlopeShield is a controlled IoT prototype for monitoring selected slope-model and environmental indicators, classifying prototype risk, and demonstrating local and cloud-connected warning workflows. It is not a scientifically validated real-world landslide prediction system.

## Repository

- `dashboard/`: React, Vite, TypeScript, Tailwind, Firebase, and Recharts web application.
- `firmware/esp32/`: Arduino framework firmware contract and local fallback implementation.
- `firestore.rules`: authenticated read boundary for the planned Firebase project.

## Quick start

```bash
cd dashboard
npm install
cp .env.example .env.local
npm run dev
```

The dashboard starts in clearly labeled **DEMO MODE** when Firebase web configuration is absent. When Firebase variables are configured, it requires an authenticated session and supports email/password, Google sign-in, registration, password reset, persistent sessions, profile display, and sign out. No Firebase credentials are committed.

## Firebase setup

Create a Web app in Firebase project `landslide-b78c0`, enable Email/Password and Google providers, and copy its public web configuration into `dashboard/.env.local` using `.env.example`. Deploy rules from the repository root with the Firebase CLI after selecting the correct project. Client-side writes are intentionally not enabled by these starter rules; an authenticated HTTPS ingestion endpoint or Cloud Function should validate and write ESP32 telemetry.

The recommended data shape is `projects/slopeShield/currentStatus/{deviceId}`, `projects/slopeShield/sensorReadings/{readingId}`, `projects/slopeShield/events/{eventId}`, `projects/slopeShield/alerts/{alertId}`, and `projects/slopeShield/configuration/system`. Time-series collections use a timestamp field for bounded descending queries. The centralized Firestore service owns all subscriptions and configuration persistence.

## Dashboard capabilities

Demo Mode uses local simulated readings, realistic history, generated INFO/WARNING/CRITICAL alerts, scenario controls, and prototype risk scoring. Live Mode uses Firestore real-time subscriptions, never falls back to demo values, and reports missing soil moisture or rain hardware as `NOT CONNECTED`. Routes cover monitoring, risk analysis, sensors, historical Recharts charts, alerts, architecture, settings, and user profile.

Risk settings are explicitly prototype demonstration parameters, not scientifically validated thresholds.

## Risk model

The current model assigns configurable prototype weights of 40 points to displacement, 25 to soil moisture, 20 to tilt, and 15 to rain/water conditions. Scores 0-30 are `SAFE`, 31-60 `WARNING`, and 61-100 `DANGER`. These values are demonstration configuration only and must not be presented as geotechnical thresholds.

## Hardware integration

The ESP32 should read and respond locally even without Wi-Fi. The cloud path is ESP32 -> HTTPS ingestion endpoint -> Firebase Admin SDK -> Firestore -> realtime dashboard. The gateway authenticates device tokens, validates payloads, and keeps service-account credentials off the device. See `firmware/esp32/README.md` for the pin map, payload contract, and offline behavior.

## Testing and manual setup

Firebase Console setup is required: enable Email/Password and Google providers, add the authorized domain, create an operator account, populate `.env.local` from `.env.example`, deploy `firestore.rules`, and deploy the HTTPS ingestion gateway. Local validation:

```bash
cd dashboard
npm test
npm run build
npm run lint
npm run dev
```

The firmware continues sensor reads, local risk classification, LCD, LEDs, buzzer, and servo behavior during cloud outages; retries must never block that local warning loop.

## Limitations and disclaimer

This project demonstrates prototype monitoring, data synchronization, risk classification, and alert UX on a controlled physical model. Sensor calibration, environmental variability, model scale, selected inputs, and the rule-based risk model mean it cannot accurately predict real-world landslides. Real deployments require geotechnical engineering, validated instrumentation, site-specific thresholds, redundancy, secure operations, and regulatory review.
