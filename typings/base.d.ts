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

type DateParamType = lunisolar.DateConfigType | Lunisolar
type DateConfigType = lunisolar.DateConfigType

type PluginFunc = lunisolar.PluginFunc

interface GlobalConfig {
  changeEgeTrem: number
  locales: { [key: string]: LocaleData }
  lang: string
  [props: string]: any
}

type ConfigType = lunisolar.ConfigType

interface ClassCommonConfig extends pick<ConfigType, 'lang'> {
  [props: string]: any
}

interface Char8Config extends pick<ConfigType, 'lang' | 'changeEgeTrem'> {
  [props: string]: any
}

interface ILunisolar {
  _config: GlobalConfig
  _date: Date
  _term?: Term | null
  _lunar?: Lunar
  _char8?: Char8
  get lunar(): Lunar
  get term(): Term | null
  get char8(): Char8
  toDate(): Date
  clone(): Lunisolar
  unix(): number
  valueOf(): number
  utcOffset(): number
  toISOString(): string
  toString(): string
  diff(date: DateConfigType | Lunisolar, unit?: Unit, config?: any): number
  [props: string]: any
  // add(value: number, unit?: Unit, config?: any): Lunisolar
}
