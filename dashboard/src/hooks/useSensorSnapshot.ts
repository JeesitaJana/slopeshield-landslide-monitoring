import { useEffect, useState } from 'react'
import { readLatestSnapshot, type DataMode } from '../services/sensorDataService'
import type { SensorSnapshot } from '../types/sensor'

export const useSensorSnapshot = (mode: DataMode) => {
  const [snapshot, setSnapshot] = useState<SensorSnapshot | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      const latest = await readLatestSnapshot(mode)
      if (active) {
        setSnapshot(latest)
      }
    }

    load()
    const interval = setInterval(load, 3000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [mode])

  return snapshot
}
