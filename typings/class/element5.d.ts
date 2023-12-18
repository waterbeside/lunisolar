declare namespace lunisolar {
  /**
   * ## class Element5
   * 五行
   * @param value 五行索引值或五行对象
   * @param config 设置
   */
  export class Element5 {
    /**
     * the Element5.value is the index of ['木', '火', '土', '金', '水']
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Element5>
    static create(value: number | string | Element5, config?: ClassCommonConfig): Element5
    constructor(value: number | string | Element5, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * 取得五行名称
     */
    get name(): string
    /**
     * 相生
     * Inter-promoting (相生 xiāngshēng): the effect in the generating (生 shēng) cycle
     */
    generating(): Element5
    /**
     * 相克
     * Inter-regulating (相克 xiāngkè): the effect in the overcoming (克 kè) cycle
     */
    overcoming(): Element5

    /**
     * 相洩
     *  Weakening (相洩/相泄 xiāngxiè): the effect in a deficient or reverse generating (生 shēng) cycle
     */
    weakening(): Element5

    /**
     * 相侮
     * Counteracting (相侮 xiāngwǔ or 相耗 xiānghào??): the effect in a deficient or reverse overcoming (克 kè) cycle
     */
    counteracting(): Element5
  }
}
