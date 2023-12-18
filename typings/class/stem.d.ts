declare namespace lunisolar {
  /**
   * ## class Stem
   * 天干
   * @param value 天干索引 | 天干名稱 | 天干實例
   * @param config 设置
   */
  export class Stem extends CacheClass {
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Stem>
    static create(value: number | string | Stem, config?: ClassCommonConfig): Stem
    constructor(value: number | string | Stem, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * 天干的索引 0 ~ 9
     * ```
     *    0     1    2     3     4     5     6     7     8     9
     *  ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
     * ```
     */
    get name(): string
    /**
     * 可与天干组合的地支
     */
    branchs: Branch[]
    /**
     * 天干的五行属性
     */
    e5: Element5
    /**
     天干纳甲卦
     */
    trigram8: Trigram8
  }
}
