import { getBranchValue, getStemValue, getYmdhSB } from '../../../utils'
import { getCheckGodFunc } from '../utils'
import { goDeadBadAct, leave4BadAct, getAct, commonOnlyBad } from '../actData'
import { MEETING_DES } from '../constants'

export const dayGodNames = [
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

export type DayGods = { [key in (typeof dayGodNames)[number]]: GodDictItem }

export const dayGods: DayGods = {
  天恩: [
    getCheckGodFunc(
      lsr => [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    '覃恩 肆赦 施恩惠 恤孤煢 布政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 行幸'.split(' '),
    null,
    2,
    {
      showGB: true
    }
  ],
  五合: [
    getCheckGodFunc(
      lsr => [2, 3],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    ['宴會', '結婚姻', '立券', '交易'],
    null,
    2,
    {
      showGB: true
    }
  ],
  除神: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    ['解除', '沐浴', '整容', '剃頭', '整手足甲', '求醫療病', '掃舍宇'],
    null,
    2,
    {
      showGB: true
    }
  ],
  五離: [
    getCheckGodFunc(
      lsr => [8, 9],
      (lsr, ymdh = 'day') => getBranchValue(lsr, ymdh),
      'includes'
    ),
    null,
    getAct([8, 12, '立券 交易'], false),
    -2,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || ['天赦', '六合', '三合'].some(i => gods.has(i))) {
          return {
            replace: {
              bad: []
            }
          }
        }
        return null
      }
    }
  ],
  鳴吠: [
    getCheckGodFunc(
      lsr => [30, 42, 6, 18, 20, 32, 56, 8, 21, 33, 45, 57, 9],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['破土', '安葬'],
    null,
    2,
    {
      showGB: true
    }
  ],
  鳴吠對: [
    getCheckGodFunc(
      lsr => [12, 36, 48, 50, 2, 26, 38, 51, 4, 27, 39],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['破土', '啟攢'],
    null,
    2,
    {
      showGB: true
    }
  ],
  寶日: [
    getCheckGodFunc(
      lsr => [13, 22, 30, 36, 38, 39, 41, 43, 44, 45, 47, 52],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選將訓兵', '出師'],
    null,
    2,
    {
      showGB: true
    }
  ],
  義日: [
    getCheckGodFunc(
      lsr => [0, 3, 4, 5, 7, 8, 9, 11, 16, 37, 46, 54],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選將訓兵', '出師'],
    null,
    2,
    {
      showGB: true
    }
  ],
  製日: [
    getCheckGodFunc(
      lsr => [1, 10, 18, 24, 26, 27, 29, 31, 32, 33, 35, 40],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    ['安撫邊境', '選將訓兵', '出師'],
    null,
    2,
    {
      showGB: true
    }
  ],
  專日: [
    getCheckGodFunc(
      lsr => [4, 5, 34, 42, 48, 50, 51, 53, 55, 56, 57, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10], false),
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  伐日: [
    getCheckGodFunc(
      lsr => [6, 12, 14, 15, 17, 19, 20, 21, 23, 28, 49, 58],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10], false),
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  八專: [
    getCheckGodFunc(
      lsr => [50, 43, 55, 56, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([10, '012a'], false),
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (gods.has('天願')) {
          return {
            replace: {
              bad: commonOnlyBad
            }
          }
        }
        return null
      }
    }
  ],
  觸水龍: [
    getCheckGodFunc(
      lsr => [12, 19, 49],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    getAct([26], false),
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  無祿: [
    getCheckGodFunc(
      lsr => [40, 41, 32, 23, 34, 25, 16, 17, 8, 59],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    null,
    // getAct(['祭祀 解除 沐浴', 14, '掃舍宇 修飾垣墻 平治道涂 破屋壞垣 伐木'], false),
    -2,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const onlyActs = getAct(
          ['祭祀 解除 沐浴', 14, '掃舍宇 修飾垣墻 平治道涂 破屋壞垣 伐木'],
          false
        )
        const ybValue = getBranchValue(lsr, 'year')
        const mbValue = getBranchValue(lsr, 'month')
        const db = getBranchValue(lsr, 'day')
        const ds = getStemValue(lsr, 'day')
        const dsb = `${ds}-${db}`
        // 惟有癸亥为干支具尽日，虽值德、合、太阳、岁、月填实等，仍以无禄论。
        if (dsb === '9-11') {
          return {
            gOnlySign: onlyActs
          }
        }
        // 與天德月德并，不以無无禄论
        if (['天德', '月德'].some(i => gods.has(i))) return null
        // 太岁、月建填实禄位不以无禄论
        const exclude01: [number, string[]][] = [
          [2, ['0-4']],
          [3, ['1-5']],
          [5, ['2-8', '4-10']],
          [6, ['3-11', '5-1']],
          [8, ['6-4']],
          [9, ['7-5']],
          [11, ['8-8']]
        ]
        for (const item of exclude01) {
          if ((ybValue === item[0] || mbValue === item[0]) && item[1].includes(dsb)) return null
        }
        // 岁德合、月德合所会之辰不以无禄论。
        // 如甲、己年亥、卯、未月之己丑日；乙庚年巳酉丑月之乙巳日；
        // 丙辛年寅午戌月之辛巳日；丁壬年 申子辰月之丁亥日
        const exclude02: [number[], number[], string][] = [
          [[0, 5], [11, 3, 7], '5-1'],
          [[1, 6], [5, 9, 2], '1-5'],
          [[2, 7], [2, 6, 10], '7-5'],
          [[3, 8], [8, 0, 4], '3-11']
        ]
        for (const item of exclude02) {
          if (item[0].includes(ybValue) && item[1].includes(mbValue) && dsb === item[2]) return null
        }
        // 岁德、天德合所会之辰不以无禄论。
        // 如乙庚年亥月之庚辰日；丙辛年巳月之丙申日；
        // 丁壬年寅月之壬申日；戊癸年申月之戊戌日
        const exclude03: [number[], number, string][] = [
          // [[0, 5], [11, 3, 7], '5-1'],
          [[1, 6], 11, '6-4'],
          [[2, 7], 5, '2-8'],
          [[3, 8], 2, '8-8'],
          [[4, 9], 8, '4-10']
        ]
        for (const item of exclude03) {
          if (item[0].includes(ybValue) && item[1] === mbValue && dsb === item[2]) return null
        }
        return {
          gOnlySign: onlyActs
        }
      }
    }
  ],
  重日: [
    getCheckGodFunc(
      lsr => 35,
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    null,
    getAct(['025a'], false),
    -2,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || ['天赦', '六合'].some(i => gods.has(i))) {
          return {
            replace: {
              bad: []
            },
            gRemove: {
              good: getAct(['025a'], false)
            }
          }
        }
        return null
      }
    }
  ],
  // 日神按年取干支者
  上朔: [
    getCheckGodFunc(
      lsr => [59, 5, 11, 17, 23, 29, 35, 41, 47, 53][getStemValue(lsr, 'year')],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    null,
    leave4BadAct,
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
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
    -2,
    {
      showGB: true
    }
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
    -2,
    {
      showGB: true
    }
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
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 日神按节气取数者
  四離: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): boolean => {
      const nextDate = lsr.add(1, 'day')
      if (!nextDate.solarTerm) return false
      return [23, 11, 5, 17].includes(nextDate.solarTerm.value)
    }) as CheckGodFunc,
    null,
    leave4BadAct,
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  四絕: [
    ((lsr: lunisolar.Lunisolar, fromYmdh?: YMDH, toYmdh?: YMDH): boolean => {
      const nextDate = lsr.add(1, 'day')
      if (!nextDate.solarTerm) return false
      return [2, 8, 14, 20].includes(nextDate.solarTerm.value)
    }) as CheckGodFunc,
    null,
    leave4BadAct,
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
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
    -2,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ]
}
