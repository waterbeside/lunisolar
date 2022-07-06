type UnitFullName =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
type UnitShortName = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'q' | 'y'
type Unit = UnitShortName | UnitFullName
type GreLun = 'GRE' | 'LUN'

type DateParamType = lunisolar.DateConfigType | Lunisolar
type DateConfigType = string | number | Date | null | undefined

type PluginFunc = lunisolar.PluginFunc

type GlobalConfig = {
  [props: string]: any
}
