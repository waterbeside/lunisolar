type GreUnitFullName =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
type LunarUnitFullName = 'lunarHour' | 'lunarDay' | 'lunarMonth' | 'lunarYear'
type LunarUnitFullNameLower = 'lunarhour' | 'lunarday' | 'lunarmonth' | 'lunaryear'
type Char8UnitFullName = 'char8Hour' | 'char8Day' | 'char8Month' | 'char8Year'
type Char8UnitFullNameLower = 'char8hour' | 'char8day' | 'char8month' | 'char8year'

type GreUnitShortName = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'q' | 'y'
type LunarUnitShortName = 'lh' | 'ld' | 'lM' | 'ly'
type Char8UnitShortName = 'ch' | 'cd' | 'cM' | 'cy'

type GreUnit = GreUnitFullName | GreUnitShortName
type LunarUnit = LunarUnitFullName | LunarUnitShortName | LunarUnitFullNameLower
type Char8Unit = Char8UnitFullName | Char8UnitFullName | Char8UnitFullNameLower

type UnitFullName = GreUnitFullName | LunarUnitFullName | Char8UnitFullName
type UnitFullNameLower = GreUnitFullName | LunarUnitFullNameLower | Char8UnitFullNameLower
type Unit = GreUnit | LunarUnit | Char8Unit

type DateConfigType = lunisolar.DateConfigType
type DateParamType = DateConfigType | lunisolar.Lunisolar

type DateAddUnitFullName = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
type DateAddUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'M' | 'y' | DateAddUnitFullName

type PluginFunc<T> = lunisolar.PluginFunc<T>

interface GlobalConfig {
  isUTC: boolean // 是否使用UTC时间，为true时，lunisolar生成的所有时间都是UTC时间，需要用local转为本地时
  offset: number // 时间偏移，以分钟为单位
  changeAgeTerm: number | null // 换岁节气, 默认为立春，如果为null刚为正月初一换岁
  locales: { [key: string]: LocaleData } // 用于記錄語言的具體數據
  lang: string // 默認語言
  // [props: string]: any
}
type SettingGlobalConfig = Partial<Omit<GlobalConfig, 'locales'>>

type ConfigType = lunisolar.ConfigType
type LunisolarConfigData = Required<Omit<ConfigType, 'locales'>>

interface ClassCommonConfig extends Pick<ConfigType, 'lang'> {
  [props: string]: any
}

interface LunarConfig extends Pick<ConfigType, 'lang' | 'isUTC'> {
  [props: string]: any
}

interface Char8Config extends Pick<ConfigType, 'lang' | 'changeAgeTerm' | 'isUTC'> {
  [props: string]: any
}

interface TermFindNodeConfigBase {
  nodeFlag: number
  lang: string
  isUTC: boolean
}

interface TermFindNodeConfig0 extends TermFindNodeConfigBase {
  returnValue: boolean
}

interface TermFindNodeConfig<T extends boolean = false> extends Partial<TermFindNodeConfigBase> {
  returnValue: T
}

type StemOrBranchValueFunc = (
  lsr: lunisolar.Lunisolar,
  ymdh: 'year' | 'month' | 'day' | 'hour',
  div?: number
) => number

type ParseFromLunarParam = {
  year?: number | string
  month: number | string
  day: number | string
  hour?: number | string
  isLeapMonth?: boolean
}

type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void

class CacheClass {
  readonly cache: Map<string, unknown>
}
