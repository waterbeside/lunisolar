declare namespace lunisolar {
  /**
   * ## class SB
   * 天干地支组合(八字單柱)
   *
   * SB為 StemBranch 的簡寫
   * @param value 60位的天干地支組合的索引值
   * @param config 设置
   */
  export class SB {
    /**
     * 天干實例
     */
    readonly stem: Stem
    /**
     * 地支實例
     */
    readonly branch: Branch
    /**
     * 60位的天干地支組合的索引值 0 ~ 59
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, SB>
    static create(value: number | SB, config?: ClassCommonConfig): SB
    /**
     * @param value 60位的天干地支組合的索引值
     */
    constructor(value: number)
    /**
     * @param stemOrValue 天干索引 | 天干名稱 | 天干實例 (當branch為undefined時，則為天干地支組合索引值)
     * @param branch 地支索引 | 地支名稱 | 地支實例
     */
    constructor(
      stemOrValue: number | string | Stem,
      branch?: number | string | Branch,
      config?: ClassCommonConfig
    )
    toString(): string
    valueOf(): number
    /**
     * 天干地支名，如'甲子'
     */
    get name(): string
    /**
     * 旬空
     */
    get missing(): [Branch, Branch]
  }
}
