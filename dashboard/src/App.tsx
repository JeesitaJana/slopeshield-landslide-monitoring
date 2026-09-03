import { SensorCard } from './components/SensorCard'
import { StatusBanner } from './components/StatusBanner'
import { useSensorSnapshot } from './hooks/useSensorSnapshot'
import type { DataMode } from './services/sensorDataService'
import './App.css'

const mode: DataMode = 'DEMO'

function App() {
  const snapshot = useSensorSnapshot(mode)

  if (!snapshot) {
    return <main className="app-shell">Loading SlopeShield snapshot…</main>
  }

  return (
    <main className="app-shell">
      <StatusBanner level={snapshot.riskLevel} mode={mode} />

      <section className="grid" aria-label="Sensor overview">
        <SensorCard label="System Status" value="Monitoring Active" />
        <SensorCard label="Current Distance" value={`${snapshot.distance.toFixed(2)} cm`} />
        <SensorCard label="Baseline Distance" value={`${snapshot.baselineDistance.toFixed(2)} cm`} />
        <SensorCard label="Displacement" value={`${snapshot.displacement.toFixed(2)} cm`} />
        <SensorCard label="Tilt" value={snapshot.tiltDetected ? 'Detected' : 'Stable'} />
        <SensorCard label="Soil Moisture" value={`${snapshot.soilMoisture}%`} />
        <SensorCard label="Rainfall / Water" value={`${snapshot.rainfallLevel}%`} />
        <SensorCard label="LED Status" value={`B:${snapshot.blueLED ? 'ON' : 'OFF'} Y:${snapshot.yellowLED ? 'ON' : 'OFF'} R:${snapshot.redLED ? 'ON' : 'OFF'}`} />
        <SensorCard label="Buzzer" value={snapshot.buzzerStatus ? 'ACTIVE' : 'OFF'} />
        <SensorCard label="Barrier" value={snapshot.barrierStatus ? 'CLOSED' : 'OPEN'} />
        <SensorCard label="Last Update" value={new Date(snapshot.timestamp).toLocaleTimeString()} />
      </section>

      <p className="footnote">
        Prototype demonstration model only. Values and thresholds are configurable and not validated for real-world landslide prediction.
      </p>
    </main>
  )
}

export default App
