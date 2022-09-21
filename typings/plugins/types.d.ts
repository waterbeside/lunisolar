type FetalGodData = {
  stemPlace: string
  branchPlace: string
  directionValue: number
  direction: string
  description: string
}

type YMDH = 'year' | 'month' | 'day' | 'hour'

type CheckGodFunc = {
  <T = number>(lsr: Lunisolar, fromYmdh?: YMDH): T
  <T = number>(lsr: Lunisolar, fromYmdh: YMDH | undefined, toYmdh: null): T
  (lsr: Lunisolar, fromYmdh: YMDH | undefined, toYmdh: YMDH): boolean
}
type GodDictItem = [CheckGodFunc, string[] | null, string[] | null, number]
