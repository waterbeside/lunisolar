declare function lunisolar(
  date?: DateConfigType,
  configType?: lunisolar.ConfigType
): lunisolar.Lunisolar

declare namespace lunisolar {
  export type DateConfigType =
    | string
    | number
    | Date
    | null
    | undefined
    | DateDictPart
    | JD
    | JDDict
  export interface FromLunarData extends ParseFromLunarParam {
    [k: string]: any
  }
  export interface ConfigType extends Partial<Omit<GlobalConfig, 'locales'>> {
    extra?: any
  }
  export interface Locale extends LsrLocale {}
  export const _globalConfig: GlobalConfig

  /**
   * The type for Lunisolar Plugin Function
   * @param option 插件配置
   * @param lsClass Lunisolar Class
   * @param lsInstance lunisolar
   */
  export type PluginFunc<T = unknown> = {
    (
      option: T,
      lsClass: typeof lunisolar.Lunisolar,
      lsFactory: typeof lunisolar
    ): Promise<void> | void
    $once?: any
    [x: string]: any
  }

  export function utc(date?: DateConfigType | Lunisolar, config?: ConfigType): Lunisolar

  /**
   * Get the Lunisolar instance by lunar data
   *
   * 通过阴历数据创建lunisolar实例（阴历反查）
   * @param lunarData 阴历数据 {year, month, day, hour, isLeapMonth}
   * @param config 创建Lunisolar实例时对应的设置
   */
  export function fromLunar(lunarData: ParseFromLunarParam, config?: configType): Lunisolar

  /**
   * Setting global Configuration
   *
   * 设置全局配置
   * @param config 配置内容
   */
  export function config(config: ConfigType): typeof lunisolar

  /**
   * lunisolar 加載插件方法
   *
   * This method is used for luisolar to load plugins
   * @param pluginFunc 插件（以函数型式存在）
   * @param option 插件配置
   */
  export function extend<T = unknown>(plugin: PluginFunc<T>, options?: T): typeof lunisolar

  /**
   * Loading language packs
   *
   * 加载语言包
   * @param localeData 语言包, 可以存入单个或多个，多个则以数组形式传入，最后一个语言包会覆盖前面的。
   */
  export function locale(
    localeData: LsrLocale | LsrLocale[],
    unChangeLang?: boolean
  ): typeof lunisolar

  /**
   * 取得语言包
   *
   * @param lang 语言名称，如en, zh等
   */
  export function getLocale(lang: string): LocaleData

  export function defineLocale(localeData: { name: string; [x: string]: any }): LsrLocale

  export const g: LunisolarG
}
