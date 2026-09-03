import { prototypeRiskConfig, type PrototypeRiskConfig } from '../config/riskModel'
import type { RiskLevel, SensorSnapshot } from '../types/sensor'

type Inputs = Pick<
  SensorSnapshot,
  'displacement' | 'tiltDetected' | 'soilMoisture' | 'rainfallLevel'
>

export const classifyRiskLevel = (
  input: Inputs,
  config: PrototypeRiskConfig = prototypeRiskConfig,
): RiskLevel => {
  const dangerSignals = [
    input.displacement >= config.dangerDisplacementCm,
    input.tiltDetected,
    input.soilMoisture >= config.dangerSoilMoisturePercent,
    input.rainfallLevel >= config.dangerRainfallPercent,
  ].filter(Boolean).length

  if (dangerSignals >= 2) {
    return 'DANGER'
  }

  const warningSignals = [
    input.displacement >= config.warningDisplacementCm,
    input.tiltDetected,
    input.soilMoisture >= config.warningSoilMoisturePercent,
    input.rainfallLevel >= config.warningRainfallPercent,
  ].filter(Boolean).length

  if (warningSignals >= 1) {
    return 'WARNING'
  }

  return 'SAFE'
}

export const withDerivedStatuses = (
  snapshot: Omit<
    SensorSnapshot,
    'riskLevel' | 'blueLED' | 'yellowLED' | 'redLED' | 'buzzerStatus' | 'barrierStatus'
  >,
): SensorSnapshot => {
  const riskLevel = classifyRiskLevel(snapshot)

  return {
    ...snapshot,
    riskLevel,
    blueLED: riskLevel === 'SAFE',
    yellowLED: riskLevel === 'WARNING',
    redLED: riskLevel === 'DANGER',
    buzzerStatus: riskLevel === 'DANGER',
    barrierStatus: riskLevel === 'DANGER',
  }
}
