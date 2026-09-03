import { describe, expect, it } from 'vitest'
import { calculateRisk } from './riskEngine'

describe('calculateRisk', () => {
  it('classifies baseline readings as safe', () => {
    const result = calculateRisk({ displacement: 0.2, tiltDetected: false, soilMoisture: 38, rainfallLevel: 'LOW' })
    expect(result.level).toBe('SAFE')
    expect(result.score).toBeLessThanOrEqual(30)
  })

  it('includes independent factors in a danger score', () => {
    const result = calculateRisk({ displacement: 23, tiltDetected: true, soilMoisture: 86, rainfallLevel: 'HIGH' })
    expect(result.level).toBe('DANGER')
    expect(result.contributions.filter((factor) => factor.active)).toHaveLength(4)
  })

  it('honors configurable weights', () => {
    const result = calculateRisk({ displacement: 18, tiltDetected: false, soilMoisture: 35, rainfallLevel: 'LOW' }, { displacementWarning: 8, displacementDanger: 18, moistureWarning: 55, moistureDanger: 78, rainfallWarning: 1, rainfallDanger: 2, movementWeight: 10, moistureWeight: 25, tiltWeight: 20, rainfallWeight: 15 })
    expect(result.score).toBe(10)
  })
})
