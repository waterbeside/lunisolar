import { PluginFunc, Branch, Stem } from 'lunisolar'

class GodBase {
  readonly key: string
  readonly _config: Required<ClassCommonConfig>
  constructor(godKey: string, config?: ClassCommonConfig)
  /**
   * 取得名称
   */
  get name(): string
  toString(): string
}

export class C8God extends GodBase {
  readonly luckLevel: number
  static godkeysSet = godKeysSet
  static instances = new Map<string, C8God>()
  static create(godKey: string, config?: ClassCommonConfig): C8God
}

export class TenGod extends GodBase {
  static godkeysSet = godKeysSet
  static instances = new Map<string, C8God>()
  static create(godKey: string, config?: ClassCommonConfig): TenGod
  constructor(godKey: TenGodKeys | '日主', config?: ClassCommonConfig)
}

export class Pillar extends CacheClass {
  readonly _sb: lunisolar.SB
  readonly _me: Stem
  readonly _cate: YMDH
  readonly _lang: string
  /**
   * 当前柱的神煞
   */
  readonly gods: C8God[]
  constructor(data: PillarDataParam)
  _pushGods(gods: C8God[])
  /**
   * 天干
   */
  get stem(): Stem
  /**
   * 地支
   */
  get branch(): Branch
  /**
   * 天干地支组合的索引值 范围[0, 59]
   */
  get value(): number
  /**
   * 返回天干地支组合名
   */
  get name(): number
  /**
   * 纳音
   */
  get takeSound(): string
  /**
   * 纳音的五行
   */
  get takeSoundE5(): Element5
  /**
   * 天干的十神
   */
  get stemTenGod(): TenGod
  /**
   * 地支的十神，（返回十神列表，其个数等同于该地支藏干的个数）
   */
  get branchTenGod(): TenGod[]
  /**
   * 旬空，返回地支元组 `[Branch, Branch]`
   */
  get missing(): [Branch, Branch]
  valueOf(): number
  toString(): string
}

export class Char8Ex extends CacheClass {
  readonly _lang: string
  /**
   * 取日主
   */
  readonly me: Stem
  /**
   * 原八字实例
   */
  readonly char8: Char8
  /**
   * lsr实例
   */
  readonly lsr: Lunisolar
  /**
   * 性别值: 0代表坤造，1代表乾造
   */
  readonly sexValue: 0 | 1 | null
  /**
   * 年柱
   */
  readonly year: Pillar
  /**
   * 月柱
   */
  readonly month: Pillar
  /**
   * 日柱
   */
  readonly day: Pillar
  /**
   * 时柱
   */
  readonly hour: Pillar
  /**
   * 神煞 {year, month, day, hour}
   */
  readonly gods: {
    [x in YMDH]: C8God[]
  }
  constructor(lsr: Lunisolar, sexValue: 0 | 1 | null)
  /**
   * 四柱列表，以元组 `[年, 月, 日, 时]` 返回
   */
  get list(): [Pillar, Pillar, Pillar, Pillar]
  /**
   * 性别字符串描述
   * 如：`乾造`或`坤造`
   */
  get sex(): string
  /**
   * 空亡地支
   * 返回元组 `[Branch, Branch]`
   */
  get missing(): [Branch, Branch]
  /**
   * 胎元
   */
  embryo(): lunisolar.SB
  /**
   * 命宫
   */
  ownSign(): lunisolar.SB
  /**
   * 身宫
   */
  bodySign(): lunisolar.SB
  toString(): string
}

declare module 'lunisolar' {
  interface SB {
    /**
     * 纳音
     */
    takeSound: string
    /**
     * 纳音五行
     */
    takeSoundE5: lunisolar.Element5
  }
  interface Lunisolar {
    takeSound: string
    /**
     * 八字增强
     * @param sex 性别: 0为女，1为男
     */
    char8ex(sex: 0 | 1): Char8Ex
  }
}

declare const plugin: PluginFunc
export = plugin
