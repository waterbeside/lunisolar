import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  export class God {
    data: GodClassData
    private _config: {
      lang: string
      locale: { [key: string]: any }
    }
    constructor(
      data: {
        key: string
        good: string[] | null
        bad: string[] | null
        extra?: GodDictItemExtra | null
      },
      config: GodClassConfig
    )
    get key(): string
    get name(): string
    get good(): string
    get bad(): string
    toString(): string
  }

  export class TheGods {
    private _cache: { [key: string]: any }
    data: TheGodsClassData
    lsr: luisolar.Lunisolar
    constructor(lsr: lunisolar.Lunisolar)
    get locale(): { [key: string]: any }
    get godConfig(): GodClassConfig
    getDuty12God(): God
    getLife12God(ymdh: YMDH): God
    getBy12God(ymdh: 'day' | 'hour'): God
    getActs(
      actType?: 0 | 1 | 2 | 3,
      returnKey?: boolean,
      replacer?: { [key: string]: string }
    ): ActsDictList
    getGoodAct(
      actType?: 0 | 1 | 2 | 3,
      returnKey?: boolean,
      replacer?: { [key: string]: string }
    ): string[]
    getBadAct(
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
