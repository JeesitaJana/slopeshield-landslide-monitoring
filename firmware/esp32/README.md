# ESP32 integration contract

## Pin map

The firmware preserves the supplied hardware assignments:

- LCD I2C: SDA GPIO 27, SCL GPIO 26
- HC-SR04: TRIG GPIO 14, ECHO GPIO 33
- Blue LED GPIO 32, yellow LED GPIO 13, red LED GPIO 25
- Tilt switch GPIO 12

Future soil moisture, water detection, buzzer, and servo pins should be assigned in one configuration header before assembly.

## Communication recommendation

Use an HTTPS endpoint backed by a Firebase Cloud Function or equivalent small gateway. The ESP32 sends a short-lived device token and JSON telemetry; the gateway validates the device, normalizes values, calculates or verifies risk, and writes Firestore documents. Direct Firestore access would require putting credentials and complex security behavior on the microcontroller. Realtime Database is a reasonable alternative for high-frequency telemetry, but the prototype's bounded Firestore history queries and event records make the gateway path easier to audit.

## Offline-first behavior

The device must continue sensor sampling, local risk classification, LEDs, LCD, buzzer, and optional barrier control when Wi-Fi or the gateway is unavailable. Failed uploads should be retried with backoff and must never block the local warning loop. The starter implementation in `src/main.cpp` is intentionally hardware-library-light so the physical team can add the selected sensor and actuator libraries without changing the data contract.

Payload fields mirror the dashboard `SensorReading` interface: timestamp, distance, baselineDistance, displacement, tiltDetected, soilMoisture, rainfallLevel, riskScore, riskLevel, and local output states.
