import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  class GodBase {
    readonly data: GodBaseClassData
    constructor(data: GodBaseClassDataParam)
    get key(): string
    toString(): string
  }

  export class God {
    private godBase: GodBase
    private lang: string
    constructor(opt: GodClassOpt)
    get key(): string
    get data(): GodBaseClassData
    get alias(): string[]
    get name(): string
    get cate(): YMDH | null
    get luckLevel(): number
    get good(): string
    get bad(): string
    toString(): string
  }

  export class TheGods {
    private _cache: Map<string, any>
    lsr: luisolar.Lunisolar
    constructor(lsr: lunisolar.Lunisolar)
    get lang(): string
    /**
     * 取得神煞
     * @param ymdh 指定年月日时或其组合
     */
    getGods(ymdh: YmdhSu | string = 'MD'): God[]
    /**
     * 取得吉神
     * @param ymdh 指定年月日时或其组合
     */
    getGoodGods(ymdh: YmdhSu | string = 'MD'): God[]
    /**
     * 取得凶神
     * @param ymdh 指定年月日时或其组合
     */
    getBadGods(ymdh: YmdhSu | string = 'MD'): God[]
    getDuty12God(): God
    getLife12God(ymdh: YMDH): God
    getBy12God(dh: 'day' | 'hour'): God
    getAllDayHourGods(): God[][]
    getLuckHours(luckType: 0 | 1 = 0): number[]
    getActs(
      actType?: 0 | 1 | 2 | 3,
      returnKey?: boolean,
      replacer?: { [key: string]: string }
    ): ActsDictList
    getGoodActs(
      actType?: 0 | 1 | 2 | 3,
      returnKey?: boolean,
      replacer?: { [key: string]: string }
    ): string[]
    getBadActs(
      actType?: 0 | 1 | 2 | 3,
      returnKey?: boolean,
      replacer?: { [key: string]: string }
    ): string[]
    query(queryString: string): God | God[] | string[] | null
  }

  interface Lunisolar {
    theGods: TheGods
  }
}

declare const plugin: PluginFunc
export = plugin
