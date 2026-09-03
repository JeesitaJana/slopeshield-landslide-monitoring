# SlopeShield dashboard

## Commands

- `npm run dev` - local development server
- `npm test` - risk engine and demo simulator tests
- `npm run build` - TypeScript check and production bundle
- `npm run lint` - Oxlint

Copy `.env.example` to `.env.local` for Firebase configuration. Without `VITE_FIREBASE_API_KEY`, the app runs an explicitly labeled local Demo Mode. With Firebase configured, it requires authentication and provides email/password, Google sign-in, registration, password reset, persistence, profile display, and sign out.

Routes cover monitoring, risk analysis, sensors, historical Recharts views, alerts with acknowledgement and severity filters, architecture, settings, and user profile. Demo Mode generates readings, history, events, and alerts locally. Live Mode uses the centralized Firestore service subscriptions, never falls back to demo data, and marks missing physical inputs as `NOT CONNECTED`.

Manual Firebase Console setup is required: enable authentication providers, add the authorized domain, populate `.env.local`, deploy the root Firestore rules, and deploy a secure HTTPS ingestion gateway for ESP32 telemetry. Service-account credentials stay in that gateway and never belong in the browser or firmware.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
