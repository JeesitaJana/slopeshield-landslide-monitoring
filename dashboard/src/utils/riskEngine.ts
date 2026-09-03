import { DEFAULT_RISK_CONFIG, type RiskConfig, type RiskResult, type SensorReading } from '../types/slopeShield'

const clamp = (value: number, minimum = 0, maximum = 100) => Math.min(maximum, Math.max(minimum, value))

export function calculateRisk(reading: Pick<SensorReading, 'displacement' | 'tiltDetected' | 'soilMoisture' | 'rainfallLevel'>, config: RiskConfig = DEFAULT_RISK_CONFIG): RiskResult {
  const movement = clamp((reading.displacement / config.displacementDanger) * config.movementWeight)
  const moisture = clamp(((reading.soilMoisture - 35) / (config.moistureDanger - 35)) * config.moistureWeight)
  const tilt = reading.tiltDetected ? config.tiltWeight : 0
  const rainfall = reading.rainfallLevel === 'HIGH' ? config.rainfallWeight : reading.rainfallLevel === 'MODERATE' ? config.rainfallWeight * 0.55 : 0
  const score = Math.round(clamp(movement + moisture + tilt + rainfall))
  const level = score <= 30 ? 'SAFE' : score <= 60 ? 'WARNING' : 'DANGER'
  const active = [movement, moisture, tilt, rainfall].filter((factor) => factor > 0).length
  return {
    score, level,
    explanation: level === 'SAFE' ? 'All monitored prototype parameters are currently within the configured normal range.' : level === 'WARNING' ? `${active} monitored prototype factor${active === 1 ? '' : 's'} indicate increasing instability.` : 'Multiple significant prototype risk indicators are active.',
    contributions: [
      { label: 'Displacement', score: Math.round(movement), maximum: config.movementWeight, active: movement > 0 },
      { label: 'Soil moisture', score: Math.round(moisture), maximum: config.moistureWeight, active: moisture > 0 },
      { label: 'Tilt / movement', score: Math.round(tilt), maximum: config.tiltWeight, active: tilt > 0 },
      { label: 'Rain / water', score: Math.round(rainfall), maximum: config.rainfallWeight, active: rainfall > 0 },
    ],
  }
}