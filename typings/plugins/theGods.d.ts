import { PluginFunc } from 'lunisolar'

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
  get good(): string[]
  get bad(): string[]
  toString(): string
}

export class TheGods {
  /**
   * 取得当日宜忌
   * @param actType 筛选方式
  ```text
    0：未筛选前的词条，不会按通书、御用、民事里的词条进行筛选
    1：按`通书六十事`的词条进行筛选，不在此60个词条内者，不会出现
    2：按`御用六十七事`的词条进行筛选
    3: 按`民用三十七事`的词条进行筛选
  ```
   * @param lang 语言包名称，默认'zh'
   */
  static getAllActs(actType: 0 | 1 | 2 | 3 = 0, lang?: string): string[]
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
  /**
   * 取得建除十二值神
   */
  getDuty12God(): God
  /**
   * 取得长生十十二神
   * @param ymdh 四柱哪一柱？
   */
  getLife12God(ymdh: YMDH): God
  /**
   * 取得青龙明堂十二神（黄黑道十二神）
   *
   ```
   道远几时通达，路遥何日还乡
   ```
   * @param dh day or hour
   */
  getBy12God(dh: 'day' | 'hour'): God
  /**
   * 取得全天十二时辰各神煞
   */
  getAllDayHourGods(): God[][]
  /**
   * 取得十二时辰吉凶
   * @param luckType  0默认，按串宫十二神定吉凶，1，按吉凶神个数定吉凶
   */
  getLuckHours(luckType: 0 | 1 = 0): number[]
  /**
   * 取务本日所有神煞吉方
   * @return [二十四山对象, 神煞对象][]
   */
  getAllLuckDirection(): DayLuckDirectionGodRes[]
  /**
   * 取得吉神所在方位
   * @param godKeyOrName 吉神名称
   * @return [二十四山对象, 神煞对象]
   */
  getLuckDirection(godKeyOrName: DayLuckDirectionGodNames): DayLuckDirectionGodRes
  getLuckDirection(godKeyOrName: string): DayLuckDirectionGodRes | null
  /**
   * 取得当日宜忌
   * @param actType 筛选方式
  ```text
    0：未筛选前的词条，不会按通书、御用、民事里的词条进行筛选
    1：按`通书六十事`的词条进行筛选，不在此60个词条内者，不会出现
    2：按`御用六十七事`的词条进行筛选
    3: 按`民用三十七事`的词条进行筛选
  ```
   * @param returnKey 默认false, 当为true时不进行国际化翻译
   * @param replacer 宜忌词条替换设置
   */
  getActs(
    actType?: 0 | 1 | 2 | 3,
    returnKey?: boolean,
    replacer?: { [key: string]: string }
  ): ActsDictList
  /**
   * 取得今天所宜
   * @param actType  筛选方式
  ```text
    0：所有词条，不会按通书、御用、民事里的词条进行筛选
    1：按`通书六十事`的词条进行筛选，不在此60个词条内者，不会出现
    2：按`御用六十七事`的词条进行筛选
    3: 按`民用三十七事`的词条进行筛选
  ```
   * @param returnKey 默认false, 当为true时不进行国际化翻译
   * @param replacer 宜忌词条替换设置
   */
  getGoodActs(
    actType?: 0 | 1 | 2 | 3,
    returnKey?: boolean,
    replacer?: { [key: string]: string }
  ): string[]
  /**
   * 取得今天所忌
   * @param actType  筛选方式
  ```text
    0：所有词条，不会按通书、御用、民事里的词条进行筛选
    1：按`通书六十事`的词条进行筛选，不在此60个词条内者，不会出现
    2：按`御用六十七事`的词条进行筛选
    3: 按`民用三十七事`的词条进行筛选
  ```
   * @param returnKey 默认false, 当为true时不进行国际化翻译
   * @param replacer 宜忌词条替换设置
   */
  getBadActs(
    actType?: 0 | 1 | 2 | 3,
    returnKey?: boolean,
    replacer?: { [key: string]: string }
  ): string[]
  /**
   * 传入指定的字符串，可取得对应的神煞或宜忌
   * @param queryString
  | key | zh | 说明 | 返回类型 |
  |---| ---  | --- | ---- |
  | year gods  | 年神 | 取得年神 | God[] |
  | month gods  | 月神 | 取得月神 | God[] |
  | day gods  | 日神 | 取得日神 | God[] |
  | hour gods  | 時神 | 取得時神 | God[] |
  | this day gods  | 本日神煞 | 取得本日神煞 | God[] |
  | day of yellow-black god  | 本日黃黑十二神 | 取得本日的串宫十二神 | God[] |
  | hour of yellow-black god  | 此時黃黑十二神 | 取得此时辰的串宫十二神 | God[] |
  | duty god | 建除十二神 | 取得建除 | God |
  | year of long-life god | 年長生十二神 | 取得年长生十二神 | God |
  | month of long-life god | 月長生十二神 | 取得月长生十二神 | God |
  | day of long-life god | 日長生十二神 | 取得日长生十二神 | God |
  | hour of long-life god | 時長生十二神 | 取得时辰长生十二神 | God |
  | good act | 宜 | 取得本日所宜 | string[] |
  | good act 1 | 宜1 | 取得本日通书所宜 | string[] |
  | good act 2 | 宜2 | 取得本日御用所宜 | string[] |
  | good act 3 | 宜3 | 取得本日民用所宜 | string[] |
  | bad act | 忌 | 取得本日所忌 | string[] |
  | bad act 1 | 忌1 | 取得本日通书所忌  | string[] |
  | bad act 2 | 忌2 | 取得本日御用所忌 | string[] |
  | bad act 3 | 忌3 | 取得本日民用所忌 | string[] |
   */
  query(queryString: string): God | God[] | string[] | null
}

declare module 'lunisolar' {
  interface Lunisolar {
    theGods: TheGods
  }
}

declare const plugin: PluginFunc
export = plugin
