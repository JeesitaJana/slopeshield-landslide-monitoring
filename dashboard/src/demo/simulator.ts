import { calculateRisk } from '../utils/riskEngine'
import { DEFAULT_RISK_CONFIG, type Alert, type DemoScenario, type SensorReading, type TimelineEvent } from '../types/slopeShield'

const scenarioValues: Record<DemoScenario, Omit<SensorReading, 'timestamp' | 'riskScore' | 'riskLevel' | 'blueLED' | 'yellowLED' | 'redLED' | 'buzzerStatus' | 'barrierStatus'>> = {
  stable: { distance: 124.8, baselineDistance: 125, displacement: 0.2, tiltDetected: false, soilMoisture: 38, rainfallLevel: 'LOW' },
  moisture: { distance: 119.4, baselineDistance: 125, displacement: 5.6, tiltDetected: false, soilMoisture: 72, rainfallLevel: 'MODERATE' },
  movement: { distance: 111.8, baselineDistance: 125, displacement: 13.2, tiltDetected: false, soilMoisture: 48, rainfallLevel: 'LOW' },
  tilt: { distance: 114.2, baselineDistance: 125, displacement: 10.8, tiltDetected: true, soilMoisture: 54, rainfallLevel: 'LOW' },
  rain: { distance: 115.8, baselineDistance: 125, displacement: 9.2, tiltDetected: false, soilMoisture: 64, rainfallLevel: 'HIGH' },
  danger: { distance: 101.6, baselineDistance: 125, displacement: 23.4, tiltDetected: true, soilMoisture: 86, rainfallLevel: 'HIGH' },
}

export function createReading(scenario: DemoScenario, timestamp = Date.now()): SensorReading {
  const values = scenarioValues[scenario]
  const risk = calculateRisk(values, DEFAULT_RISK_CONFIG)
  return { timestamp, ...values, riskScore: risk.score, riskLevel: risk.level, blueLED: risk.level === 'SAFE', yellowLED: risk.level === 'WARNING', redLED: risk.level === 'DANGER', buzzerStatus: risk.level === 'DANGER', barrierStatus: risk.level === 'DANGER' ? 'DEPLOYED' : 'READY' }
}

export function createHistory(scenario: DemoScenario): SensorReading[] {
  const base = Date.now()
  return Array.from({ length: 48 }, (_, index) => {
    const reading = createReading(scenario, base - (47 - index) * 30 * 60_000)
    const wave = Math.sin(index / 3) * (scenario === 'stable' ? 0.15 : 0.8)
    return { ...reading, displacement: Math.max(0, reading.displacement + wave), distance: reading.distance - wave }
  })
}

export function createScenarioEvent(scenario: DemoScenario): TimelineEvent {
  const descriptions: Record<DemoScenario, string> = { stable: 'Simulation returned to baseline conditions.', moisture: 'Soil moisture is trending upward.', movement: 'Distance change exceeded the configured movement watch point.', tilt: 'Tilt switch event received from the slope model.', rain: 'Heavy rain / water condition simulated.', danger: 'High-risk demonstration event activated.' }
  const level = createReading(scenario).riskLevel
  return { id: `${scenario}-${Date.now()}`, timestamp: Date.now(), type: level === 'SAFE' ? 'System initialized' : 'Risk state changed', severity: level === 'DANGER' ? 'CRITICAL' : level === 'WARNING' ? 'WARNING' : 'INFO', description: descriptions[scenario] }
}

export function createAlerts(scenario: DemoScenario): Alert[] {
  const reading = createReading(scenario)
  if (reading.riskLevel === 'SAFE') return [{ id: 'demo-info', timestamp: reading.timestamp, severity: 'INFO', title: 'Monitoring nominal', description: 'All simulated parameters are within the configured prototype range.', relatedSensor: 'System', acknowledged: true }]
  const alerts: Alert[] = []
  if (reading.displacement > 8) alerts.push({ id: `movement-${reading.timestamp}`, timestamp: reading.timestamp, severity: reading.displacement > 18 ? 'CRITICAL' : 'WARNING', title: 'Movement watch point exceeded', description: `Displacement is ${reading.displacement.toFixed(1)} mm in the simulated reading.`, relatedSensor: 'Ultrasonic distance', acknowledged: false })
  if (reading.tiltDetected) alerts.push({ id: `tilt-${reading.timestamp}`, timestamp: reading.timestamp, severity: 'CRITICAL', title: 'Tilt switch active', description: 'The simulated tilt input indicates a model movement event.', relatedSensor: 'Tilt detection', acknowledged: false })
  if (reading.soilMoisture > 55) alerts.push({ id: `moisture-${reading.timestamp}`, timestamp: reading.timestamp, severity: reading.soilMoisture > 78 ? 'CRITICAL' : 'WARNING', title: 'Soil moisture elevated', description: `Simulated moisture is ${reading.soilMoisture}% capacity.`, relatedSensor: 'Soil moisture', acknowledged: false })
  if (reading.rainfallLevel !== 'LOW') alerts.push({ id: `rain-${reading.timestamp}`, timestamp: reading.timestamp, severity: reading.rainfallLevel === 'HIGH' ? 'CRITICAL' : 'WARNING', title: 'Water conditions detected', description: `${reading.rainfallLevel} simulated rainfall condition is active.`, relatedSensor: 'Rain / water', acknowledged: false })
  return alerts
}