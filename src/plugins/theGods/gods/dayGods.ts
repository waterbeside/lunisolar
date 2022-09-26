import { getBranchValue, getStemValue, getYmdhSB } from '../../../utils'
import { getCheckGodFunc } from '../utils'
import { goDeadBadAct, getAct } from '../actData'

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
  '長星',
  '短星',
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
    '覃恩 肆赦 施恩惠 恤孤煢 布政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 行幸'.split(' '),
    null,
    2
  ],
  五合: [
    getCheckGodFunc(
      lsr => [2, 3],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    ['宴會', '結婚姻', '立券', '交易'],
    null,
    2
  ],
  除神: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    ['解除', '沐浴', '整容', '剃頭', '整手足甲', '求醫療病', '掃舍宇'],
    null,
    2
  ],
  五離: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    null,
    getAct([8, 12, '立券 交易'], false),
    2
  ],
  鳴吠: [
    getCheckGodFunc(
      lsr => [30, 42, 6, 18, 20, 32, 56, 8, 21, 33, 45, 57, 9],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['破土', '安葬'],
    null,
    2
  ],
  鳴吠對: [
    getCheckGodFunc(
      lsr => [12, 36, 48, 50, 2, 26, 38, 51, 4, 27, 39],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['破土', '啟攢'],
    null,
    2
  ],
  寶日: [
    getCheckGodFunc(
      lsr => [13, 22, 30, 36, 38, 39, 41, 43, 44, 45, 47, 52],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選選將訓兵', '出師'],
    null,
    2
  ],
  義日: [
    getCheckGodFunc(
      lsr => [0, 3, 4, 5, 7, 8, 9, 11, 16, 37, 46, 54],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選選將訓兵', '出師'],
    null,
    2
  ],
  製日: [
    getCheckGodFunc(
      lsr => [1, 10, 18, 24, 26, 27, 29, 31, 32, 33, 35, 40],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選選將訓兵', '出師'],
    null,
    2
  ],
  專日: [
    getCheckGodFunc(
      lsr => [4, 5, 34, 42, 48, 50, 51, 53, 55, 56, 57, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10], false),
    2
  ],
  伐日: [
    getCheckGodFunc(
      lsr => [6, 12, 14, 15, 17, 19, 20, 21, 23, 28, 49, 58],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10], false),
    2
  ],
  八專: [
    getCheckGodFunc(
      lsr => [50, 43, 55, 56, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10, '012a'], false),
    2
  ],
  觸水龍: [
    getCheckGodFunc(
      lsr => [12, 19, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([26], false),
    2
  ],
  無祿: [
    getCheckGodFunc(
      lsr => [40, 41, 32, 23, 34, 25, 16, 17, 8, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct(['祭祀 解除 沐浴', 14, '掃舍宇 修飾垣墻 平治道涂 破屋壞垣 伐木'], false),
    2
  ],
  重日: [
    getCheckGodFunc(
      lsr => 35,
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    null,
    getAct(['025a'], false),
    2
  ],
  // 日神按年取干支者
  上朔: [
    getCheckGodFunc(
      lsr => [59, 5, 11, 17, 23, 29, 35, 41, 47, 53][getStemValue(lsr, 'year')],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    null,
    null,
    2
  ],
  // 日神按月取數者
  長星: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): number[] | boolean => {
      const res = [[7], [4], [1], [9], [15], [10], [8], [2, 5], [3, 4], [1], [12], [9]][
        lsr.lunar.month - 1
      ]
      if (!toYmdh) return res
      return res.length === 1 ? res[0] === lsr.lunar.day : res.includes(lsr.lunar.day)
    }) as CheckGodFunc,
    null,
    getAct(['進人口 裁製 經絡', '019a', '納畜'], false),
    2
  ],
  短星: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): number[] | boolean => {
      const res = [[21], [19], [16], [25], [25], [20], [22], [18, 19], [16, 17], [15], [22], [25]][
        lsr.lunar.month - 1
      ]
      if (!toYmdh) return res
      return res.length === 1 ? res[0] === lsr.lunar.day : res.includes(lsr.lunar.day)
    }) as CheckGodFunc,
    null,
    getAct(['進人口 裁製 經絡', '019a', '納畜'], false),
    2
  ],
  // 日神按朔取日数者
  反支: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): number | boolean => {
      const lunarDay = lsr.lunar.day
      // 取得当月月朔日
      const lunarFirst = lsr.add(-lunarDay + 1, 'day')
      const arr = [6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1]
      const res = arr[lunarFirst.char8.day.branch.value]
      if (!toYmdh) return res
      return res === lunarDay
    }) as CheckGodFunc,
    null,
    getAct(['上冊進表章', '陳詞訟'], false),
    2
  ],
  // 日神按节气取数者
  四離: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): boolean => {
      const nextDate = lsr.add(1, 'day')
      if (!nextDate.solarTerm) return false
      return [23, 11, 5, 17].includes(nextDate.solarTerm.value)
    }) as CheckGodFunc,
    null,
    null,
    2
  ],
  四絕: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): boolean => {
      const nextDate = lsr.add(1, 'day')
      if (!nextDate.solarTerm) return false
      return [2, 8, 14, 20].includes(nextDate.solarTerm.value)
    }) as CheckGodFunc,
    null,
    null,
    2
  ],
  氣往亡: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): number | boolean => {
      // 節後第幾天（相當于月建後的第幾天）
      const branchValue = getBranchValue(lsr, 'month')
      const res = [20, 30, 7, 14, 21, 8, 16, 24, 9, 18, 27, 10][branchValue]
      if (!toYmdh) return res
      const diffDate = lsr.add(-res + 1, 'day')
      if (!diffDate.solarTerm) return false
      // 節氣索引從小寒開始，對應丑月
      return ((diffDate.solarTerm.value >> 1) + 13) % 12 === branchValue
    }) as CheckGodFunc,
    null,
    goDeadBadAct,
    2
  ]
}

export { dayGodNames, dayGods, DayGods }
