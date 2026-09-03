#include <Arduino.h>

namespace Pins {
constexpr uint8_t lcdSda = 27;
constexpr uint8_t lcdScl = 26;
constexpr uint8_t ultrasonicTrig = 14;
constexpr uint8_t ultrasonicEcho = 33;
constexpr uint8_t blueLed = 32;
constexpr uint8_t yellowLed = 13;
constexpr uint8_t redLed = 25;
constexpr uint8_t tiltSwitch = 12;
}

struct PrototypeRisk {
  float displacement;
  bool tiltDetected;
  float soilMoisture;
  uint8_t rainfallLevel;
};

uint8_t localRiskScore(const PrototypeRisk& reading) {
  const float movement = min(40.0f, (reading.displacement / 18.0f) * 40.0f);
  const float moisture = min(25.0f, max(0.0f, (reading.soilMoisture - 35.0f) / 43.0f * 25.0f));
  const float tilt = reading.tiltDetected ? 20.0f : 0.0f;
  const float rain = reading.rainfallLevel == 2 ? 15.0f : reading.rainfallLevel == 1 ? 8.25f : 0.0f;
  return static_cast<uint8_t>(min(100.0f, movement + moisture + tilt + rain));
}

void setup() {
  pinMode(Pins::ultrasonicTrig, OUTPUT);
  pinMode(Pins::ultrasonicEcho, INPUT);
  pinMode(Pins::tiltSwitch, INPUT_PULLUP);
  pinMode(Pins::blueLed, OUTPUT);
  pinMode(Pins::yellowLed, OUTPUT);
  pinMode(Pins::redLed, OUTPUT);
}

void loop() {
  // Keep local sampling and warning output independent of cloud connectivity.
  PrototypeRisk reading{0.0f, digitalRead(Pins::tiltSwitch) == LOW, 35.0f, 0};
  const uint8_t score = localRiskScore(reading);
  digitalWrite(Pins::blueLed, score <= 30);
  digitalWrite(Pins::yellowLed, score > 30 && score <= 60);
  digitalWrite(Pins::redLed, score > 60);
  delay(1000);
}
