import { getBranchValue, getStemValue } from '../../../utils'
import { getCheckGodFunc } from '../utils'
import { deGoodAct, snDeGoodAct } from '../actData'

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
    ['納財', '栽種', '牧養', '納畜'],
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
    (
      '頒詔 覃恩 肆赦 施恩封拜 詔命公卿 ' +
      '招賢 舉正直 施恩惠 恤孤煢 宣政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 行幸 ' +
      '遣使 安撫邊境 選將訓兵 上官赴任 臨政親民 裁製'
    ).split(' '),
    null,
    4
  ],
  官日: [
    getCheckGodFunc(
      // '卯午酉子'
      lsr => [3, 6, 9, 0][lsr.getSeasonIndex()],
      getBranchValue
    ),
    ['襲爵受封', '上官赴任', '臨政親民'],
    null,
    4
  ],
  守日: [
    getCheckGodFunc(
      // '辰未戌丑'
      lsr => [4, 7, 10, 1][lsr.getSeasonIndex()],
      getBranchValue
    ),
    ['襲爵受封', '上官赴任', '臨政親民', '安撫邊境'],
    null,
    4
  ],
  相日: [
    getCheckGodFunc(
      // '巳申亥寅'
      lsr => [5, 8, 11, 2][lsr.getSeasonIndex()],
      getBranchValue
    ),
    ['襲爵受封', '上官赴任', '臨政親民'],
    null,
    4
  ],
  民日: [
    getCheckGodFunc(
      // '午酉子卯'
      lsr => [6, 9, 0, 3][lsr.getSeasonIndex()],
      getBranchValue
    ),
    '宴會 結婚姻 納采問名 進人口 般移 開市 立券 交易 納財 栽種 牧養 納畜'.split(' '),
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
    null,
    4
  ],
  四忌: [
    getCheckGodFunc(
      // '甲子', '丙子', '庚子', '壬子
      lsr => [0, 12, 36, 48][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    null,
    4
  ],
  四窮: [
    getCheckGodFunc(
      // '乙亥', '丁亥', '辛亥', '癸亥'
      lsr => [11, 23, 47, 59][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    null,
    4
  ],
  四耗: [
    getCheckGodFunc(
      // '壬子', '乙卯', '戊午', '辛酉'
      lsr => [48, 51, 54, 57][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    null,
    null,
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
    null,
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
    null,
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
    null,
    4
  ]
}

export { monthSeasonGodNames, monthSeasonGods, MonthSeasonGods }
