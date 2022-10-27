type FetalGodData = {
  stemPlace: string
  branchPlace: string
  directionValue: number
  direction: string
  description: string
}

type YMDH = 'year' | 'month' | 'day' | 'hour'

type YmdhSu = 'Y' | 'M' | 'D' | 'H'
type YmdhSl = 'y' | 'm' | 'd' | 'h'

type CheckGodFunc = {
  <T = number>(lsr: Lunisolar, fromYmdh?: YMDH): T
  <T = number>(lsr: Lunisolar, fromYmdh: YMDH | undefined, toYmdh: null): T
  (lsr: Lunisolar, fromYmdh: YMDH | undefined, toYmdh: YMDH): boolean
}

type ActsDictList = {
  good: string[]
  bad: string[]
}

type GodDictItemExtraFilterFunc = (
  lsr: lunisolar.Lunisolar,
  gods: Set<string>
) => {
  add?: Partial<ActsDictList>
  remove?: Partial<ActsDictList>
  replace?: Partial<ActsDictList>
  gRemove?: Partial<ActsDictList>
  gOnlySign?: string[]
  meetGodStillBad?: string[]
  meetDeStillBad?: true
  meetWishStillBad?: true
  isAllBad?: true
} | null

/**
 * 神煞宜忌补充
 ```
 meetDeStillBad 是否遇德犹忌
 meetGodStillBad 遇到某些神煞犹忌 填写神煞key列表
 meetGodFilter: 遇到某些神煞要对宜忌进行筛选
  {
    withGodKeys： 神煞key列表
    acts: 宜或忌列表
    flag: 0犹忌， 1只忌， 2不忌, 3宜, 4不宜
  }
 ```
 */
type GodDictItemExtra = {
  alias?: sting[]
  showGB?: boolean
  checkBy?: 'branch' | 'stem' | 'sb'
  meetDeStillBad?: boolean
  meetWishStillBad?: true
  meetGodStillBad?: string[]
  actsFilter?: GodDictItemExtraFilterFunc
  [key: string]: any
}

type GodDictItem =
  | [CheckGodFunc, string[] | null, string[] | null, number]
  | [CheckGodFunc, string[] | null, string[] | null, number, GodDictItemExtra]
  | [CheckGodFunc, string[] | null, string[] | null, number, undefined]

type GodClassData = {
  key: string
  good: string[]
  bad: string[]
  luckLevel: number
  cate: YMDH | null
  extra: GodDictItemExtra | null
}

type GodClassDataParam = {
  key: string
  good: string[] | null
  bad: string[] | null
  luckLevel?: number
  cate?: YMDH | null
  extra?: GodDictItemExtra | null
}

type GodClassConfig = {
  locale: { [key: string]: any }
}

type ActsSet = {
  good: Set<string>
  bad: Set<string>
}
