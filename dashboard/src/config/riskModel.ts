export interface PrototypeRiskConfig {
  warningDisplacementCm: number
  dangerDisplacementCm: number
  warningSoilMoisturePercent: number
  dangerSoilMoisturePercent: number
  warningRainfallPercent: number
  dangerRainfallPercent: number
}

export const prototypeRiskConfig: PrototypeRiskConfig = {
  warningDisplacementCm: 2,
  dangerDisplacementCm: 4,
  warningSoilMoisturePercent: 55,
  dangerSoilMoisturePercent: 70,
  warningRainfallPercent: 45,
  dangerRainfallPercent: 65,
}
