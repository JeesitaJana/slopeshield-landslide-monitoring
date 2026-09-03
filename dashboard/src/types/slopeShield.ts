export type RiskLevel = 'SAFE' | 'WARNING' | 'DANGER'
export type DemoScenario = 'stable' | 'moisture' | 'movement' | 'tilt' | 'rain' | 'danger'

export interface RiskConfig {
  displacementWarning: number
  displacementDanger: number
  moistureWarning: number
  moistureDanger: number
  rainfallWarning: number
  rainfallDanger: number
  movementWeight: number
  moistureWeight: number
  tiltWeight: number
  rainfallWeight: number
}

export interface SensorReading {
  timestamp: number
  distance: number
  baselineDistance: number
  displacement: number
  tiltDetected: boolean
  soilMoisture: number
  rainfallLevel: 'LOW' | 'MODERATE' | 'HIGH'
  riskScore: number
  riskLevel: RiskLevel
  blueLED: boolean
  yellowLED: boolean
  redLED: boolean
  buzzerStatus: boolean
  barrierStatus: 'READY' | 'DEPLOYED'
}

export interface RiskResult {
  score: number
  level: RiskLevel
  contributions: { label: string; score: number; maximum: number; active: boolean }[]
  explanation: string
}

export interface TimelineEvent {
  id: string
  timestamp: number
  type: string
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
  description: string
}

export interface SensorAvailability {
  ultrasonic: boolean
  tilt: boolean
  soilMoisture: boolean
  rainfall: boolean
}

export interface Alert {
  id: string
  timestamp: number
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
  title: string
  description: string
  relatedSensor: string
  acknowledged: boolean
}

export interface DisplayPreferences {
  compactCards: boolean
  showUnavailableSensors: boolean
  refreshSeconds: number
}

export interface SystemConfiguration {
  risk: RiskConfig
  demoMode: boolean
  display: DisplayPreferences
}

export const DEFAULT_RISK_CONFIG: RiskConfig = {
  displacementWarning: 8, displacementDanger: 18, moistureWarning: 55, moistureDanger: 78,
  rainfallWarning: 1, rainfallDanger: 2, movementWeight: 40, moistureWeight: 25, tiltWeight: 20, rainfallWeight: 15,
}