import { describe, expect, it } from 'vitest'
import { createAlerts, createHistory, createReading } from './simulator'

describe('demo simulator', () => {
  it('creates a complete reading for every presenter scenario', () => {
    for (const scenario of ['stable', 'moisture', 'movement', 'tilt', 'rain', 'danger'] as const) {
      const reading = createReading(scenario, 1)
      expect(reading.timestamp).toBe(1)
      expect(reading.riskLevel).toMatch(/SAFE|WARNING|DANGER/)
    }
  })

  it('creates ordered history for charting', () => {
    const history = createHistory('stable')
    expect(history).toHaveLength(48)
    expect(history[0].timestamp).toBeLessThan(history[47].timestamp)
  })

  it('generates severity-aware alerts from simulated conditions', () => {
    expect(createAlerts('stable')[0].severity).toBe('INFO')
    expect(createAlerts('danger').some((alert) => alert.severity === 'CRITICAL')).toBe(true)
    expect(createAlerts('danger').every((alert) => alert.id && alert.relatedSensor)).toBe(true)
  })
})
