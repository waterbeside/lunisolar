declare function lunisolar(date?: lunisolar.DateConfigType): lunisolar.Lunisolar

declare namespace lunisolar {
  export type DateConfigType = string | number | Date | null | undefined
  export type ConfigType = { [P in keyof GlobalConfig]?: GlobalConfig[P] }
  export class Lunar {
    constructor(date: Date)
    getMonth(): number
    getDate(): number
    isLeapMonth(): boolean
    isBigMonth(): boolean
    lunarNewYearDate(year?: number): Date
  }
  // 五行
  export class Element5 extends EleBase<Element5> {
    constructor(value: number | string | Element5)
  }
  // 天干
  export class Stem {
    constructor(value: number | string | Stem)
    get value(): number
    toString(): string
    valueOf(): number
    branchs: Branch[]
    e5: Element5
  }
  // 地支
  export class Branch {
    constructor(value: number | string | Branch)
    get value(): number
    toString(): string
    valueOf(): number
    hiddenStems: Stem[]
    e5: Element5
  }
  // 天干地支组合
  export class SB {
    constructor(stemOrValue: number | string | Stem, branch?: number | string | Branch)
    get value(): number
    toString(): string
    valueOf(): number
    get stem(): Stem
    get branch(): Branch
  }
  // 节气
  export class Term {
    constructor(value: number | string | Term)
    get value(): number
    toString(): string
    valueOf(): number
    static getNames: () => string[]
    static getYearTermDayList: (year: number) => number[]
    static findDate(year: number, termValue: number | string | Term): [number, number, number]
    static findNode(date: Date, returnValue: true): [number, number]
    static findNode(date: Date, returnValue: false): [Term, number]
  }

  export class Char8 {
    constructor(dateOrSbList: [SB, SB, SB, SB])
    constructor(dateOrSbList: Date, changeEgeTrem?: number)
    get value(): number
    toString(): string
    valueOf(): number
    get list(): [SB, SB, SB, SB]
    get year(): SB
    get month(): SB
    get day(): SB
    get hour2(): SB
    get me(): Stem
    static computeSBYear(date: Date | number, changeEgeTrem?: number): SB
    static computeSBMonth(date: Date): SB
    static computeSBDay(date: Date): SB
    static computeSBHour2(date: Date, sbDay?: SB)
  }

  export class Lunisolar {
    _config: GlobalConfig
    _date: Date
    _term?: Term | null
    _lunar?: Lunar
    _char8?: Char8
    constructor(date?: lunisolar.DateConfigType, config?: ConfigType)
    get lunar(): Lunar
    get date(): Date
    get term(): Term | null
    get char8(): Char8
    clone(): Lunisolar
    valueOf(): number
    diff(date: DateConfigType | Lunisolar, unit?: Unit, config?: any): number
    // add(value: number, unit?: Unit, config?: any): Lunisolar
  }

  export type PluginFunc<T = any> = (
    option: T,
    lsClass: typeof lunisolar.Lunisolar,
    lsFactory: typeof lunisolar
  ) => void

  export function extend<T = any>(plugin: PluginFunc<T>, options?: T): typeof lunisolar
}
