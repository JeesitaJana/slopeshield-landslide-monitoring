# SlopeShield Monitoring Center (Dashboard)

This folder contains the React + Vite + TypeScript dashboard foundation for SlopeShield.

## Operating modes

- **DEMO mode** (implemented): simulated sensor snapshots
- **LIVE mode** (planned): ESP32 + Firebase-backed telemetry

## Current structure

- `src/components/` UI widgets and cards
- `src/types/` shared data contracts
- `src/demo/` simulated sensor snapshots
- `src/services/` risk logic + mode-aware sensor service + cloud placeholders
- `src/hooks/` data consumption hooks
- `src/config/` prototype model configuration

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Scientific limitation

This dashboard visualizes a configurable prototype risk model and does not claim validated real-world landslide prediction capability.
