import { getBranchValue, getStemValue } from '../../../utils'
import { getCheckGodFunc } from '../utils'
import { deGoodAct, snDeGoodAct, getAct } from '../actData'

const monthSeasonGodNames = [
  '天赦',
  '母倉',
  '四相',
  '時德',
  '王日',
  '官日',
  '守日',
  '相日',
  '民日',
  '四擊',
  '四忌',
  '四窮',
  '四耗',
  '四廢',
  '五虛',
  '八風'
]

type MonthSeasonGods = { [key in typeof monthSeasonGodNames[number]]: GodDictItem }

const monthSeasonGods: MonthSeasonGods = {
  // 月神随四季者
  天赦: [
    getCheckGodFunc(
      lsr => [14, 30, 44, 0][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    deGoodAct,
    ['畋獵', '取魚'],
    4
  ],
  母倉: [
    getCheckGodFunc(
      lsr =>
        [
          [11, 0],
          [2, 3],
          [4, 7, 10, 1],
          [8, 9]
        ][lsr.getSeasonIndex()],
      getBranchValue,
      'includes'
    ),
    getAct(['納財', 24]),
    null,
    4
  ],
  四相: [
    getCheckGodFunc(
      // '丙丁', '戊己', '壬癸', '甲乙'
      lsr =>
        [
          [2, 3],
          [4, 5],
          [8, 9],
          [0, 1]
        ][lsr.getSeasonIndex()],
      getStemValue,
      'includes'
    ),
    snDeGoodAct,
    null,
    4
  ],
  時德: [
    getCheckGodFunc(
      // '午辰子寅'
      lsr => [6, 4, 0, 2][lsr.getSeasonIndex()],
      getBranchValue
    ),
    snDeGoodAct,
    null,
    4
  ],
  王日: [
    getCheckGodFunc(
      // '寅巳申亥'
      lsr => [2, 5, 8, 11][lsr.getSeasonIndex()],
      getBranchValue
    ),
    getAct(['頒詔', 2, 3, '008a', 9, '011a', '裁製'], false),
    null,
    4
  ],
  官日: [
    getCheckGodFunc(
      // '卯午酉子'
      lsr => [3, 6, 9, 0][lsr.getSeasonIndex()],
      getBranchValue
    ),
    getAct(['011b'], false),
    null,
    4
  ],
  守日: [
    getCheckGodFunc(
      // '辰未戌丑'
      lsr => [4, 7, 10, 1][lsr.getSeasonIndex()],
      getBranchValue
    ),
    getAct(['011b', '安撫邊境'], false),
    null,
    4
  ],
  相日: [
    getCheckGodFunc(
      // '巳申亥寅'
      lsr => [5, 8, 11, 2][lsr.getSeasonIndex()],
      getBranchValue
    ),
    getAct(['011b'], false),
    null,
    4
  ],
  民日: [
    getCheckGodFunc(
      // '午酉子卯'
      lsr => [6, 9, 0, 3][lsr.getSeasonIndex()],
      getBranchValue
    ),
    getAct(['宴會', 12, '進人口', '019a', 24], false),
    null,
    4
  ],
  四擊: [
    getCheckGodFunc(
      // '戌丑辰未'
      lsr => [10, 1, 4, 7][lsr.getSeasonIndex()],
      getBranchValue
    ),
    null,
    getAct([10], false),
    4
  ],
  四忌: [
    getCheckGodFunc(
      // '甲子', '丙子', '庚子', '壬子
      lsr => [0, 12, 36, 48][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    getAct([10, '012a', '安葬'], false),
    4
  ],
  四窮: [
    getCheckGodFunc(
      // '乙亥', '丁亥', '辛亥', '癸亥'
      lsr => [11, 23, 47, 59][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    getAct([10, '012b', '020b', '安葬'], false),
    4
  ],
  四耗: [
    getCheckGodFunc(
      // '壬子', '乙卯', '戊午', '辛酉'
      lsr => [48, 51, 54, 57][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    getAct([10, '020b'], false),
    4
  ],
  四廢: [
    getCheckGodFunc(
      // '庚申辛酉', '壬子癸亥', '甲寅乙卯', '丙午丁巳'
      lsr =>
        [
          [56, 57],
          [48, 59],
          [50, 51],
          [53, 42]
        ][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value,
      'includes'
    ),
    null,
    getAct(
      [
        1,
        '上冊進表章 頒詔',
        3,
        4,
        6,
        8,
        '冠帶',
        '9-11',
        '012b',
        13,
        '解除 求醫療病 裁製',
        '017b',
        '鼓鑄',
        18,
        '020a',
        21,
        '開渠穿井 安碓磑 補垣塞穴 修飾垣墻',
        24,
        '025a'
      ],
      false
    ),
    4
  ],
  五虛: [
    getCheckGodFunc(
      // '巳酉丑', '申子辰', '亥卯未', '寅午戌'
      lsr =>
        [
          [5, 9, 1],
          [8, 0, 4],
          [11, 3, 7],
          [2, 6, 10]
        ][lsr.getSeasonIndex()],
      getBranchValue,
      'includes'
    ),
    null,
    getAct(['修倉庫', 20], false),
    4
  ],
  八風: [
    getCheckGodFunc(
      // '丁丑丁巳', '甲辰甲申', '丁未丁亥', '甲戌甲寅'
      lsr =>
        [
          [13, 53],
          [40, 20],
          [43, 23],
          [10, 50]
        ][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value,
      'includes'
    ),
    null,
    getAct([26], false),
    4
  ]
}

export { monthSeasonGodNames, monthSeasonGods, MonthSeasonGods }
