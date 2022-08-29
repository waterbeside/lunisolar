type FetalGodData = {
  stemPlace: string
  branchPlace: string
  directionValue: number
  direction: string
  description: string
}

type CheckGodFunc = {
  <T = number>(lsr: Lunisolar): T
  <T = number>(lsr: Lunisolar, ymdh: null): T
  (lsr: Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour'): boolean
}
type GodDictItem = [CheckGodFunc, string[], string[], number]
