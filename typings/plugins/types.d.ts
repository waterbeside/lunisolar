type FetalGodData = {
  stemPlace: string
  branchPlace: string
  directionValue: number
  direction: string
  description: string
}

type CheckGodFunc = (lsr: lunisolar.Lunisolar, ymdh?: 'year' | 'month' | 'day' | 'hour') => boolean

type GodDictItem = [CheckGodFunc, string[], string[], number]
