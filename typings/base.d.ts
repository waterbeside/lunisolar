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

interface ILunisolar {
  _config: GlobalConfig
  _date: Date
  _term?: Term | null
  _lunar?: Lunar
  _char8?: Char8
  get lunar(): Lunar
  get date(): Date
  get term(): Term | null
  get char8(): Char8
  clone(): Lunisolar
  valueOf(): number
  diff(date: DateConfigType | Lunisolar, unit?: Unit, config?: any): number
  [props: string]: any
  // add(value: number, unit?: Unit, config?: any): Lunisolar
}
