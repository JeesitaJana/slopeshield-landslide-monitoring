interface SensorCardProps {
  label: string
  value: string
}

export const SensorCard = ({ label, value }: SensorCardProps) => {
  return (
    <article className="panel sensor-card">
      <p className="sensor-label">{label}</p>
      <p className="sensor-value">{value}</p>
    </article>
  )
}
