import { getBranchValue, getStemValue, getYmdhSB } from '../../../utils'
import { getCommonCheckGodFunc, monthGeneralDescGodFunc, getCheckGodFunc } from '../utils'

const dayGodNames = [
  '天恩',
  '五合',
  '除神',
  '五離',
  '鳴吠',
  '鳴吠對',
  '寶日',
  '義日',
  '製日',
  '專日',
  '伐日',
  '八專',
  '觸水龍',
  '無祿',
  '重日',
  '上朔',
  // '長星',
  // '短星',
  '反支',
  '四離',
  '四絕',
  '氣往亡'
] as const

type DayGods = { [key in typeof dayGodNames[number]]: GodDictItem }

const dayGods: DayGods = {
  天恩: [
    getCheckGodFunc(
      lsr => [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  五合: [
    getCheckGodFunc(
      lsr => [2, 3],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    2
  ],
  除神: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    2
  ],
  五離: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    2
  ],
  鳴吠: [
    getCheckGodFunc(
      lsr => [30, 42, 6, 18, 20, 32, 56, 8, 21, 33, 45, 57, 9],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  鳴吠對: [
    getCheckGodFunc(
      lsr => [12, 36, 48, 50, 2, 26, 38, 51, 4, 27, 39],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  寶日: [
    getCheckGodFunc(
      lsr => [13, 22, 30, 36, 38, 39, 41, 43, 44, 45, 47, 52],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  義日: [
    getCheckGodFunc(
      lsr => [0, 3, 4, 5, 7, 8, 9, 11, 16, 37, 46, 54],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  製日: [
    getCheckGodFunc(
      lsr => [1, 10, 18, 24, 26, 27, 29, 31, 32, 33, 35, 40],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  專日: [
    getCheckGodFunc(
      lsr => [4, 5, 34, 42, 48, 50, 51, 53, 55, 56, 57, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  伐日: [
    getCheckGodFunc(
      lsr => [6, 12, 14, 15, 17, 19, 20, 21, 23, 28, 49, 58],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  八專: [
    getCheckGodFunc(
      lsr => [50, 43, 55, 56, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  觸水龍: [
    getCheckGodFunc(
      lsr => [12, 19, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  無祿: [
    getCheckGodFunc(
      lsr => [40, 41, 32, 23, 34, 25, 16, 17, 8, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    2
  ],
  重日: [
    getCheckGodFunc(
      lsr => 35,
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    2
  ],
  // 日神按年取干支者
  上朔: [
    getCheckGodFunc(
      lsr => [59, 5, 11, 17, 23, 29, 35, 41, 47, 53][getStemValue(lsr, 'year')],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    2
  ]
}
