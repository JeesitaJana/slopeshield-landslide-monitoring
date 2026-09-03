export type RiskLevel = 'SAFE' | 'WARNING' | 'DANGER'

export interface SensorSnapshot {
  timestamp: string
  distance: number
  baselineDistance: number
  displacement: number
  tiltDetected: boolean
  soilMoisture: number
  rainfallLevel: number
  riskLevel: RiskLevel
  blueLED: boolean
  yellowLED: boolean
  redLED: boolean
  buzzerStatus: boolean
  barrierStatus: boolean
}
