import { getBranchValue, getStemValue, getStemTrigram8Value } from '../../../utils'
import {
  getCommonCheckGodFunc,
  getCheckGodFunc,
  branchAscGodFunc,
  branchDescGodFunc
} from '../utils'
import { MEETING_DES } from '../constants'
import { getAct } from '../actData'

const yearGodNames = [
  '歲德',
  '歲德合',
  '歲禄',
  '陽貴',
  '陰貴',
  '金神',
  '破敗五鬼',
  '陰府太歲',
  '奏書',
  '博士',
  '力士',
  '蠶室',
  '太歲',
  '太陽',
  '喪門',
  '太陰',
  '官符',
  '支德',
  '歲破',
  '龍德',
  '白虎',
  '福德',
  '吊客',
  '病符',
  '神后',
  '功曹',
  '天罡',
  '勝光',
  '傳送',
  '河魁',
  '六害',
  '五鬼',
  '歲馬',
  '歲刑',
  '歲煞',
  '伏兵',
  '大禍',
  '坐煞',
  '向煞',
  '天官符',
  '大煞',
  '黃幡',
  '豹尾',
  '炙退',
  '飛廉',
  '畜官',
  '死符',
  '小耗'
] as const

type YearGods = { [key in typeof yearGodNames[number]]: GodDictItem }

const yearGods: YearGods = {
  // key : [取得方法, 属于年月日时用四位二进程表示]
  歲德: [getCommonCheckGodFunc('06284', getStemValue, 5, 'year'), [], [], null, null, 8],
  歲德合: [getCommonCheckGodFunc('51739', getStemValue, 5, 'year'), [], [], null, null, 8],
  歲禄: [
    getCommonCheckGodFunc([2, 3, 5, 6, 5, 6, 8, 9, 11, 0], getStemValue, 0, 'year', getBranchValue),
    null,
    null,
    8
  ],
  陽貴: [
    getCommonCheckGodFunc([7, 8, 9, 11, 1, 0, 1, 2, 3, 5], getStemValue, 0, 'year', getBranchValue),
    null,
    null,
    8
  ],
  陰貴: [
    getCommonCheckGodFunc([1, 0, 11, 9, 7, 8, 7, 6, 5, 3], getStemValue, 0, 'year', getBranchValue),
    null,
    null,
    8
  ],
  金神: [
    getCheckGodFunc<number[], number>(
      (lsr, ymdh) =>
        [
          [6, 7, 8, 9],
          [4, 5],
          [2, 3, 6, 7, 0, 1],
          [2, 3, 10, 11],
          [8, 9, 0, 1]
        ][getStemValue(lsr, ymdh ?? 'year', 5)],
      getBranchValue,
      'includes'
    ),
    null,
    null,
    8
  ],
  破敗五鬼: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [6, 4, 0, 1, 5, 2, 3, 7, 6, 4][getStemValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    8
  ],
  陰府太歲: [
    getCheckGodFunc<number[], number>(
      (lsr, ymdh = 'year') =>
        [
          [2, 6],
          [3, 7],
          [4, 0],
          [7, 5],
          [0, 1]
        ][getStemValue(lsr, ymdh, 5)],
      getStemTrigram8Value,
      'includes'
    ),
    null,
    null,
    8
  ],
  // 年神隨歲方順行者
  奏書: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  博士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  力士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  蠶室: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  // 年神隨支順行者
  太歲: [branchAscGodFunc(0), null, null, 8],
  太陽: [branchAscGodFunc(1), null, null, 8],
  喪門: [branchAscGodFunc(2), null, null, 8],
  太陰: [branchAscGodFunc(3), null, null, 8],
  官符: [branchAscGodFunc(4), null, null, 8],
  // godList.畜官 = [...godList.官符]
  支德: [branchAscGodFunc(5), null, null, 8],
  // godList.死符 = [...godList.支德]; godList.小耗 = [...godList.支德];
  歲破: [branchAscGodFunc(6), null, null, 8],
  // godList.大耗 = [...godList.歲破]
  龍德: [branchAscGodFunc(7), null, null, 8],
  白虎: [branchAscGodFunc(8), null, null, 8],
  福德: [branchAscGodFunc(9), null, null, 8],
  吊客: [branchAscGodFunc(10), null, null, 8],
  病符: [branchAscGodFunc(11), null, null, 8],
  // 巡山羅㬋: [],
  // 年支隨歲退行者
  神后: [branchDescGodFunc(0), null, null, 8],
  功曹: [branchDescGodFunc(2), null, null, 8],
  天罡: [branchDescGodFunc(4), null, null, 8],
  勝光: [branchDescGodFunc(6), null, null, 8],
  傳送: [branchDescGodFunc(8), null, null, 8],
  河魁: [branchDescGodFunc(10), null, null, 8],
  六害: [branchDescGodFunc(7), null, null, 8],
  五鬼: [branchDescGodFunc(4), null, null, 8],
  // 年神從歲支三合者
  歲馬: [getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4, 'year'), null, null, 8],
  歲刑: [
    getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0, 'year'),
    null,
    null,
    8
  ],
  // 劫煞 災煞移到commonGods
  // 災煞: [getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4), 12],
  歲煞: [getCommonCheckGodFunc([7, 4, 1, 10], getBranchValue, 4, 'year'), null, null, 8],
  伏兵: [
    getCommonCheckGodFunc([2, 0, 8, 6], getBranchValue, 4, 'year', getStemValue),
    null,
    null,
    8
  ],
  大禍: [
    getCommonCheckGodFunc([3, 1, 9, 7], getBranchValue, 4, 'year', getStemValue),
    null,
    null,
    8
  ],
  坐煞: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [2, 3],
          [0, 1],
          [8, 9],
          [6, 7]
        ][getBranchValue(lsr, 'year') % 4],
      getStemValue,
      'includes'
    ),
    null,
    null,
    8
  ],
  向煞: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [8, 9],
          [6, 7],
          [2, 3],
          [0, 1]
        ][getBranchValue(lsr, 'year') % 4],
      getStemValue,
      'includes'
    ),
    null,
    null,
    8
  ],
  天官符: [getCommonCheckGodFunc([11, 8, 5, 2], getBranchValue, 4, 'year'), null, null, 8],
  大煞: [
    getCommonCheckGodFunc([0, 9, 6, 3], getBranchValue, 4, 'year'),
    null,
    getAct([10], false),
    8,
    {
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  黃幡: [getCommonCheckGodFunc([4, 1, 10, 7], getBranchValue, 4, 'year'), null, null, 8],
  豹尾: [getCommonCheckGodFunc([10, 7, 4, 1], getBranchValue, 4, 'year'), null, null, 8],
  炙退: [getCommonCheckGodFunc([3, 0, 9, 6], getBranchValue, 4, 'year'), null, null, 8],
  // 年神隨歲支順行一方者
  飛廉: [
    getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0, 'year'),
    null,
    null,
    8
  ]
} as unknown as YearGods

yearGods.畜官 = [...yearGods.官符]
yearGods.死符 = [...yearGods.支德]
yearGods.小耗 = [
  yearGods.支德[0],
  null,
  getAct(['020b']),
  // ['修倉庫', '開市', '立券', '交易', '納財', '開倉庫', '出貨財'],
  8,
  {
    actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
      const mbValue = getBranchValue(lsr, 'month')
      if (MEETING_DES.some(i => gods.has(i))) {
        return {
          replace: {
            bad: []
          }
        }
      }
      if ([0, 3, 6, 9].includes(mbValue) && gods.has('劫煞')) {
        return {
          meetDeStillBad: true
        }
      }
      return null
    }
  }
]

export { yearGodNames, yearGods, YearGods }
