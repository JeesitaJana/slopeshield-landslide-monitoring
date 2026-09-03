import { demoSnapshots } from '../demo/sensorSnapshots'
import { fetchLiveSnapshot } from './esp32Gateway'
import type { SensorSnapshot } from '../types/sensor'

export type DataMode = 'DEMO' | 'LIVE'

let cursor = 0

const nextDemoSnapshot = (): SensorSnapshot => {
  const snapshot = demoSnapshots[cursor % demoSnapshots.length]
  cursor += 1
  return {
    ...snapshot,
    timestamp: new Date().toISOString(),
  }
}

export const readLatestSnapshot = async (mode: DataMode): Promise<SensorSnapshot> => {
  if (mode === 'LIVE') {
    const live = await fetchLiveSnapshot()
    if (live) {
      return live
    }
  }

  return nextDemoSnapshot()
}
