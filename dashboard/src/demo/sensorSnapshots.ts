import { withDerivedStatuses } from '../services/riskAnalysis'
import type { SensorSnapshot } from '../types/sensor'

const baselineDistance = 100

const baseSnapshots = [
  { distance: 100, tiltDetected: false, soilMoisture: 34, rainfallLevel: 18 },
  { distance: 98.7, tiltDetected: false, soilMoisture: 42, rainfallLevel: 25 },
  { distance: 97.6, tiltDetected: true, soilMoisture: 59, rainfallLevel: 52 },
  { distance: 96.2, tiltDetected: true, soilMoisture: 74, rainfallLevel: 70 },
] as const

export const demoSnapshots: SensorSnapshot[] = baseSnapshots.map((sample, index) =>
  withDerivedStatuses({
    timestamp: new Date(Date.now() - (baseSnapshots.length - index) * 60_000).toISOString(),
    baselineDistance,
    distance: sample.distance,
    displacement: Number((baselineDistance - sample.distance).toFixed(2)),
    tiltDetected: sample.tiltDetected,
    soilMoisture: sample.soilMoisture,
    rainfallLevel: sample.rainfallLevel,
  }),
)
