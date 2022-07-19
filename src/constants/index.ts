// 月朔周期平均天数
export const MOON_CYCLE = 29.53059

// 月球自转周期天数
export const MOON_ROTATION_CYCLE = 27.32166

export const UNITS = {
  ms: 'millisecond',
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  q: 'quarter',
  y: 'year',
  lh: 'lunarHour',
  ld: 'lunarDay',
  lM: 'lunarMonth',
  ly: 'lunarYear',
  ch: 'char8Hour',
  cd: 'char8Day',
  cM: 'char8Month',
  cy: 'char8Year'
}

export const LUNAR_UNITS_SET = new Set(['lunarHour', 'lunarDay', 'lunarMonth', 'lunarYear'])
export const CHAR8_UNITS_SET = new Set(['char8Hour', 'char8Day', 'char8Month', 'char8Year'])

export const INVALID_DATE_STRING = 'Invalid Date'
export const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'

// --- regex ---
// parse
export const REGEX_PARSE =
  /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
// format
export const REGEX_FORMAT =
  /\[([^\]]+)]|zo|lYn|lMn|lDn|lHn|lY|lM|lL|lD|lH|cYs|cYb|cY|cMs|cMb|cM|cDs|cDb|cD|cHs|cHb|cH|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
