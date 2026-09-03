import type { RiskLevel } from '../types/sensor'

const levelColor: Record<RiskLevel, string> = {
  SAFE: '#1d8348',
  WARNING: '#b9770e',
  DANGER: '#c0392b',
}

interface StatusBannerProps {
  level: RiskLevel
  mode: 'DEMO' | 'LIVE'
}

export const StatusBanner = ({ level, mode }: StatusBannerProps) => {
  return (
    <section className="panel status-banner" aria-live="polite">
      <div>
        <p className="eyebrow">SlopeShield Monitoring Center</p>
        <h1>Prototype Risk Status: {level}</h1>
        <p>
          Operating mode: <strong>{mode}</strong> {mode === 'DEMO' ? '(simulated data)' : '(live telemetry)'}
        </p>
      </div>
      <span className="risk-chip" style={{ backgroundColor: levelColor[level] }}>
        {level}
      </span>
    </section>
  )
}
