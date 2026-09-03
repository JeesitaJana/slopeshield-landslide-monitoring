# ESP32 Firmware Workspace

This folder is reserved for ESP32 firmware sources and headers.

## Current prototype pin mapping (do not change without hardware rewiring)

- LCD SDA: GPIO 27
- LCD SCL: GPIO 26
- Ultrasonic TRIG: GPIO 14
- Ultrasonic ECHO: GPIO 33
- Blue LED: GPIO 32
- Yellow LED: GPIO 13
- Red LED: GPIO 25
- Tilt switch: GPIO 12 (INPUT_PULLUP, second terminal to GND)

Future firmware should publish telemetry for dashboard LIVE mode integration.
