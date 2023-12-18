declare namespace lunisolar {
  /**
   * ## class Branch
   * 地支
   * @param value 地支索引 | 天干名稱 | 天干實例
   * @param config 设置
   */
  export class Branch extends CacheClass {
    /**
     * 地支索引 0 ~ 11
     * ```
     *    0     1    2     3     4     5     6     7     8     9    10    11
     *  ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
     * ```
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Branch>
    static create(value: number | string | Branch, config?: ClassCommonConfig): Branch
    constructor(value: number | string | Branch, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    get name(): string
    /**
     * 地支藏干
     * ```
     * 返回地支數組，數組長度1~3個，
     * [本氣，中氣，余氣]
     * ```
     */
    get hiddenStems(): Stem[]
    /**
     * 地支五行
     */
    get e5(): Element5
    /**
     * 三合
     */
    get triad(): [Branch, Branch]

    /**
     * 三合五行属性
     */
    get triadE5(): Element5

    /**
     * 六合
     */
    get group6(): Branch

    /**
     * 六合五行属性
     */
    get group6E5(): Element5

    /**
     * 相刑
     */
    get punishing(): Branch

    /**
     * 被刑
     */
    get punishBy(): Branch

    /**
     * 相冲
     */
    get conflict(): Branch

    /**
     * 相破
     */
    get destroying(): Branch

    /**
     * 相害
     */
    get harming(): Branch
  }
}
