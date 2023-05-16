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
  lh: 'lunarhour',
  ld: 'lunarday',
  lM: 'lunarmonth',
  ly: 'lunaryear',
  ch: 'char8hour',
  cd: 'char8day',
  cM: 'char8month',
  cy: 'char8year'
}

export const LUNAR_UNITS_SET = new Set(['lunarhour', 'lunarday', 'lunarmonth', 'lunaryear'])
export const CHAR8_UNITS_SET = new Set(['char8hour', 'char8day', 'char8month', 'char8year'])

export const INVALID_DATE_STRING = 'Invalid Date'
export const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'

// --- regex ---
// format
export const REGEX_FORMAT =
  /\[([^\]]+)]|cZ|t|T|lYn|lMn|lDn|lHn|lY|lM|lL|lD|lH|cYsn|cYs|cYbn|cYb|cYn|cY|cMsn|cMs|cMbn|cMb|cMn|cM|cDsn|cDs|cDbn|cDb|cDn|cD|cHsn|cHs|cHbn|cHb|cHn|cH|dRr|dR|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
