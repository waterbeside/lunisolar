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

type GodClassData = {
  key: string
  good: string[]
  bad: string[]
}

type GodClassConfig = {
  lang?: string
  locale: { [key: string]: any }
}

type TheGodsClassData = {
  gods: {
    y: God[]
    m: God[]
    d: God[]
    h: God[]
  }
  day: God[]
  hour: God[]
  goodAct: string[]
  badAct: string[]
  [key: string]: any
}
