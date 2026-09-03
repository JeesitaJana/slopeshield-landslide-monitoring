# System Architecture (Prototype)

SlopeShield follows a prototype flow:

**Detection → Analysis → Risk Classification → Early Warning → Automated Response**

## Layers

1. **Sensor Layer**
   - Ultrasonic, tilt, and planned moisture/rain sensors
2. **Edge Layer (ESP32)**
   - Reads sensor values and controls local warnings
3. **Data Layer**
   - DEMO mode: simulated snapshots
   - LIVE mode: ESP32 and Firebase telemetry (planned)
4. **Application Layer**
   - SlopeShield Monitoring Center dashboard

## Important limitation

This architecture is a configurable educational prototype and not a scientifically validated landslide prediction system.
