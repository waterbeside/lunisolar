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
