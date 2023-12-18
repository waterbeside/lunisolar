declare namespace lunisolar {
  /**
   * ## class Trigram8
   * 八卦
   * @param value 八卦各爻作为二进制时的总和数
   * @param config 设置
   */
  export class Trigram8 {
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    /**
     * 顺序为 坤震坎兌艮離巽乾
     * @param lang 语言包名，不设置时为使用当前语言包
     * @returns string[]
     */
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Trigram8>
    static create(value: number, config?: ClassCommonConfig): Trigram8
    constructor(value: number, config?: ClassCommonConfig)
    get name(): string
    toString(): string
    valueOf(): number
  }
}
