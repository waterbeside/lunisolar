import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  export class God {
    data: GodClassData
    _config: {
      lang: string
      locale: { [key: string]: any }
    }
    constructor(
      data: {
        key: string
        good: string[] | null
        bad: string[] | null
      },
      config: GodClassConfig
    )
    get name(): string
    get good(): string
    get bad(): string
    toString(): string
  }

  export class TheGods {
    _cache: { [key: string]: any }
    private data: TheGodsClassData
    constructor(lsr: lunisolar.Lunisolar)
  }

  interface Lunisolar {
    // duty12God: God
    theGods: TheGods
  }
}

declare const plugin: PluginFunc
export = plugin
