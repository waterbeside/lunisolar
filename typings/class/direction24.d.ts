declare namespace lunisolar {
  /**
   * ## class Direction24
   * 廿四山
   * @param value 24山索引值 | 天干实例 | 地支实例 | 八卦实例
   * @param config 设置
   */
  export class Direction24 {
    readonly value: number
    readonly _sign: Stem | Branch | Trigram8
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Direction24>
    static create(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig): Direction24
    static createFromAngle(angle: number, config: ClassCommonConfig): Direction24
    constructor(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig)
    /**
     * 当前所在的二十四山位置的对象，可以是天干、地支、八卦对象
     */
    get sign(): Stem | Branch | Trigram8
    /**
     * 当前所在的二十四山的位置的对象的名称
     */
    get name(): string
    /**
     *  当前所在的二十四山的位置的对象的原型类名
     */
    get type(): 'Branch' | 'Stem' | 'Trigram8'
    /**
     * 角度，
     ```text
     360度均分为24份，从子山为0度开始，顺时针行走，每山15度，到壬山345度结束
     ```
     */
    get angle(): number
    /**
     * 方向名称
     * 返回国际化翻译后的名称
     */
    get direction(): string
    /**
     * 方向名索引
     * 返回方向名称的索引，其索引顺序为九宫数号
     */
    get directionIndex(): number
    toString(): string
    valueOf(): number
  }
}
