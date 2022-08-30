import { branchValue, stemValue, stemTrigram8Value } from '../../utils'
import {
  getCommonCheckGodFunc,
  getCheckGodFunc,
  branchAscGodFunc,
  branchDescGodFunc
} from './utils'

const godList: { [key: string]: GodDictItem } = {
  // key : [取得方法, [宜], [忌], 属于年月日时用四位二进程表示]
  歲德: [getCommonCheckGodFunc('06284', stemValue, 'year', 5), 8],
  歲德合: [getCommonCheckGodFunc('51739', stemValue, 'year', 5), 8],
  歲禄: [
    getCommonCheckGodFunc([2, 3, 5, 6, 5, 6, 8, 9, 11, 0], stemValue, 'year', 0, branchValue),
    8
  ],
  陽貴: [
    getCommonCheckGodFunc([7, 8, 9, 11, 1, 0, 1, 2, 3, 5], stemValue, 'year', 0, branchValue),
    8
  ],
  陰貴: [
    getCommonCheckGodFunc([1, 0, 11, 9, 7, 8, 7, 6, 5, 3], stemValue, 'year', 0, branchValue),
    8
  ],
  金神: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [6, 7, 8, 9],
          [4, 5],
          [2, 3, 6, 7, 0, 1],
          [2, 3, 10, 11],
          [8, 9, 0, 1]
        ][stemValue(lsr, 'year') % 5],
      branchValue,
      'includes'
    ),
    8
  ],
  破敗五鬼: [
    getCheckGodFunc(
      lsr => [6, 4, 0, 1, 5, 2, 3, 7, 6, 4][stemValue(lsr, 'year')],
      stemTrigram8Value
    ),
    8
  ],
  陰府太歲: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [2, 6],
          [3, 7],
          [4, 0],
          [7, 5],
          [0, 1]
        ][stemValue(lsr, 'year') % 5],
      stemTrigram8Value,
      'includes'
    ),
    8
  ],
  // 年神隨歲方順行者
  奏書: [
    getCheckGodFunc(
      lsr => [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][branchValue(lsr, 'year')],
      stemTrigram8Value
    ),
    8
  ],
  博士: [
    getCheckGodFunc(
      lsr => [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][branchValue(lsr, 'year')],
      stemTrigram8Value
    ),
    8
  ],
  力士: [
    getCheckGodFunc(
      lsr => [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][branchValue(lsr, 'year')],
      stemTrigram8Value
    ),
    8
  ],
  蠶室: [
    getCheckGodFunc(
      lsr => [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][branchValue(lsr, 'year')],
      stemTrigram8Value
    ),
    8
  ],
  // 年神隨支順行者
  太歲: [branchAscGodFunc(0, 'year'), 8],
  太陽: [branchAscGodFunc(1, 'year'), 8],
  喪門: [branchAscGodFunc(2, 'year'), 8],
  太陰: [branchAscGodFunc(3, 'year'), 8],
  官符: [branchAscGodFunc(4, 'year'), 8],
  // godList.畜官 = [...godList.官符]
  支德: [branchAscGodFunc(5, 'year'), 8],
  // godList.死符 = [...godList.支德]; godList.小耗 = [...godList.支德];
  歲破: [branchAscGodFunc(6, 'year'), 8],
  // godList.大耗 = [...godList.歲破]
  龍德: [branchAscGodFunc(7, 'year'), 8],
  白虎: [branchAscGodFunc(8, 'year'), 8],
  福德: [branchAscGodFunc(9, 'year'), 8],
  吊客: [branchAscGodFunc(10, 'year'), 8],
  病符: [branchAscGodFunc(11, 'year'), 8],
  // 巡山羅㬋: [],
  // 年支隨歲退行者
  神后: [branchDescGodFunc(0, 'year'), 8],
  功曹: [branchDescGodFunc(2, 'year'), 8],
  天罡: [branchDescGodFunc(4, 'year'), 8],
  勝光: [branchDescGodFunc(6, 'year'), 8],
  傳送: [branchDescGodFunc(8, 'year'), 8],
  河魁: [branchDescGodFunc(10, 'year'), 8],
  六害: [branchDescGodFunc(7, 'year'), 8],
  五鬼: [branchDescGodFunc(4, 'year'), 8],
  // 年神從歲支三合者
  歲馬: [getCommonCheckGodFunc([2, 11, 8, 5], branchValue, 'year', 4), 8],
  歲刑: [getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], branchValue, 'year', 0), 8],
  劫煞: [getCommonCheckGodFunc([5, 2, 11, 8], branchValue, 'year', 4), 8],
  災煞: [getCommonCheckGodFunc([6, 3, 0, 9], branchValue, 'year', 4), 8],
  歲煞: [getCommonCheckGodFunc([7, 4, 1, 10], branchValue, 'year', 4), 8],
  伏兵: [getCommonCheckGodFunc([2, 0, 8, 6], branchValue, 'year', 4, stemValue), 8],
  大禍: [getCommonCheckGodFunc([3, 1, 9, 7], branchValue, 'year', 4, stemValue), 8],
  坐煞: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [2, 3],
          [0, 1],
          [8, 9],
          [6, 7]
        ][branchValue(lsr, 'year') % 4],
      stemValue,
      'includes'
    ),
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
        ][branchValue(lsr, 'year') % 4],
      stemValue,
      'includes'
    ),
    8
  ],
  天官符: [getCommonCheckGodFunc([11, 8, 5, 2], branchValue, 'year', 4), 8],
  大煞: [getCommonCheckGodFunc([0, 9, 6, 3], branchValue, 'year', 4), 8],
  黃幡: [getCommonCheckGodFunc([4, 1, 10, 7], branchValue, 'year', 4), 8],
  豹尾: [getCommonCheckGodFunc([10, 7, 4, 1], branchValue, 'year', 4), 8],
  炙退: [getCommonCheckGodFunc([3, 0, 9, 6], branchValue, 'year', 4), 8],
  // 年神隨歲支順行一方者
  飛廉: [getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], branchValue, 'year', 0), 8],
  // 月神取月建三合者
  天德: [
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [5, 6, 3, 8, 8, 7, 11, 0, 9, 2, 2, 1]
      const val = arr[idxMonth]
      const isStem = idxMonth % 3 ? false : true // 子午卯酉月和地支比較
      if (!ymdh) return [val, isStem]
      return isStem ? val === stemValue(lsr, 'day') : val === branchValue(lsr, 'day')
    }) as CheckGodFunc,
    8
  ],
  天德合: [
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [8, 1, 8, 5, 3, 2, 2, 5, 4, 11, 7, 6]
      const val = arr[idxMonth]
      const isStem = idxMonth % 3 ? false : true // 子午卯酉月和地支比較
      if (!ymdh) return [val, isStem]
      return isStem ? val === stemValue(lsr, 'day') : val === branchValue(lsr, 'day')
    }) as CheckGodFunc,
    8
  ]
}

godList.畜官 = [...godList.官符]
godList.死符 = [...godList.支德]
godList.小耗 = [...godList.支德]

export default godList
