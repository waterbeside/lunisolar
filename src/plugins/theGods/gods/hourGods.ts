import { getBranchValue, getStemValue, getYmdhSB } from '../../../utils'
import { getCheckGodFunc, getCommonCheckGodFunc } from '../utils'
import { NINE_UGLILY_DAY, NINE_UGLILY_TERM_ORDER } from '../constants'

const hourGodNames = [
  '日祿',
  '天乙貴人',
  '喜神',
  '天官貴人',
  '福星貴人',
  '五不遇',
  '路空',
  '日建',
  '日合',
  '日馬',
  '日破',
  '日害',
  '日刑',
  '貴登天門',
  '九醜',
  '旬空'
] as const

export type HourGods = Record<(typeof hourGodNames)[number], GodDictItem>

export const hourGods: HourGods = {
  // 時神從日干起者
  日祿: [
    getCommonCheckGodFunc([2, 3, 5, 6, 5, 6, 8, 9, 11, 0], getStemValue, 0, 'day', getBranchValue),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  天乙貴人: [
    getCheckGodFunc(
      (lsr, ymdh = 'day') =>
        [
          [7, 1],
          [8, 0],
          [9, 11],
          [11, 9],
          [1, 7],
          [0, 8],
          [1, 7],
          [2, 6],
          [3, 5],
          [5, 3]
        ][getStemValue(lsr, ymdh)],
      getBranchValue,
      'includes'
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  喜神: [
    getCommonCheckGodFunc([2, 10, 8, 6, 4], getStemValue, 5, 'day', getBranchValue),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  天官貴人: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [[9], [8], [0], [11], [3], [2], [6], [5], [7, 1], [4, 10]][getStemValue(lsr, ymdh)],
      getBranchValue,
      'includes'
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  福星貴人: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [[2], [1, 11], [0, 10], [9], [8], [7], [6], [5], [4], [3]][getStemValue(lsr, ymdh)],
      getBranchValue,
      'includes'
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  // 时干克日干为五不遇
  五不遇: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [6, 7, 8, 9, 0, 1, 2, 3, 4, 5][getStemValue(lsr, ymdh)],
      getStemValue
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'stem',
      isDay60HourGod: true
    }
  ],
  路空: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [
          [8, 9],
          [6, 7],
          [4, 5],
          [2, 3],
          [0, 1, 10, 11]
        ][getStemValue(lsr, ymdh, 5)],
      getBranchValue,
      'includes'
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  // 時神從日支起者
  日建: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') => getBranchValue(lsr, ymdh),
      getBranchValue
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  日合: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2][getBranchValue(lsr, ymdh)],
      getBranchValue
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  日馬: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') => [2, 11, 8, 5][getBranchValue(lsr, ymdh, 4)],
      getBranchValue
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  日破: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') => (getBranchValue(lsr, ymdh) + 6) % 12,
      getBranchValue
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  日害: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8][getBranchValue(lsr, ymdh)],
      getBranchValue
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  日刑: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') =>
        [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11][getBranchValue(lsr, ymdh)],
      getBranchValue
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ],
  // 時神隨月將及日干支者
  貴登天門: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') => {
        const arr = [
          [[5, 11], [4, 10], [3, 9], null, null, null, null, null, [9], [8, 2], [7, 1], [6, 0]], // 甲
          [[4, 0], [3, 11], [10], [9], null, null, [10], [9], [8], [7, 3], [6, 2], [5, 1]], // 乙
          [[1], [0], [11], [10], null, [10], [9], [8], [7], [6], [5, 3], [4, 2]], // 丙
          [[3], [2], [1], [0], [9, 11], [8], [7], [6], [5], [4], [3], null], // 丁
          [null, null, [9, 3], [8, 2], [7, 1], [6, 0], [5, 11], [4, 10], [3, 9], null, null, null], // 戊
          [null, [3], [2], [9, 1], [8, 0], [7, 11], [6, 10], [5], [4], [3], null, null], // 已
          [null, null, [9, 3], [8, 2], [7, 1], [6, 0], [5, 11], [4, 10], [3, 9], null, null, null], // 庚
          [null, null, [8], [7, 3], [6, 2], [5, 1], [4, 0], [3, 11], [10], [9], null, null], // 辛
          [null, [8], [7], [6], [4, 2], [3, 1], [2, 0], [11], [10], [9], null], // 壬
          [[7, 9], [6, 8], [5], [4], [3], [2], null, [2], [1], [0], [9, 11], [8, 10]] // 癸
        ]
        return arr[getStemValue(lsr, ymdh)][lsr.getMonthBuilder(1)[0].branch.value]
      },
      getBranchValue,
      'includes'
    ),
    null,
    null,
    1,
    {
      showGB: true,
      checkBy: 'branch'
    }
  ],
  九醜: [
    // 待查
    getCheckGodFunc((lsr: lunisolar.Lunisolar, ymdh = 'day') => {
      if (!NINE_UGLILY_DAY.has(lsr.char8.day.value)) return null
      const branchOrder = NINE_UGLILY_TERM_ORDER
      return branchOrder[
        (lsr.getMonthBuilder(1)[0].branch.value + 12 - getBranchValue(lsr, ymdh)) % 12
      ]
    }, getBranchValue),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch'
    }
  ],
  旬空: [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh = 'day') => {
        const sbValue = getYmdhSB(lsr, ymdh, 0).value
        return [
          [10, 11],
          [8, 9],
          [6, 7],
          [4, 5],
          [2, 3],
          [0, 1]
        ][(sbValue / 10) >> 0]
      },
      getBranchValue,
      'includes'
    ),
    null,
    null,
    -1,
    {
      showGB: true,
      checkBy: 'branch',
      isDay60HourGod: true
    }
  ]
}
