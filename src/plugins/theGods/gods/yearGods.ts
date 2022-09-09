import { getBranchValue, getStemValue, getStemTrigram8Value } from '../../../utils'
import {
  getCommonCheckGodFunc,
  getCheckGodFunc,
  branchAscGodFunc,
  branchDescGodFunc
} from '../utils'

const yearGods: { [key: string]: GodDictItem } = {
  // key : [取得方法, 属于年月日时用四位二进程表示]
  歲德: [getCommonCheckGodFunc('06284', getStemValue, 5), 8],
  歲德合: [getCommonCheckGodFunc('51739', getStemValue, 5), 8],
  歲禄: [
    getCommonCheckGodFunc([2, 3, 5, 6, 5, 6, 8, 9, 11, 0], getStemValue, 0, getBranchValue),
    8
  ],
  陽貴: [
    getCommonCheckGodFunc([7, 8, 9, 11, 1, 0, 1, 2, 3, 5], getStemValue, 0, getBranchValue),
    8
  ],
  陰貴: [
    getCommonCheckGodFunc([1, 0, 11, 9, 7, 8, 7, 6, 5, 3], getStemValue, 0, getBranchValue),
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
    8
  ],
  // 年神隨歲方順行者
  奏書: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    8
  ],
  博士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    8
  ],
  力士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    8
  ],
  蠶室: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    8
  ],
  // 年神隨支順行者
  太歲: [branchAscGodFunc(0), 8],
  太陽: [branchAscGodFunc(1), 8],
  喪門: [branchAscGodFunc(2), 8],
  太陰: [branchAscGodFunc(3), 8],
  官符: [branchAscGodFunc(4), 8],
  // godList.畜官 = [...godList.官符]
  支德: [branchAscGodFunc(5), 8],
  // godList.死符 = [...godList.支德]; godList.小耗 = [...godList.支德];
  歲破: [branchAscGodFunc(6), 8],
  // godList.大耗 = [...godList.歲破]
  龍德: [branchAscGodFunc(7), 8],
  白虎: [branchAscGodFunc(8), 8],
  福德: [branchAscGodFunc(9), 8],
  吊客: [branchAscGodFunc(10), 8],
  病符: [branchAscGodFunc(11), 8],
  // 巡山羅㬋: [],
  // 年支隨歲退行者
  神后: [branchDescGodFunc(0), 8],
  功曹: [branchDescGodFunc(2), 8],
  天罡: [branchDescGodFunc(4), 8],
  勝光: [branchDescGodFunc(6), 8],
  傳送: [branchDescGodFunc(8), 8],
  河魁: [branchDescGodFunc(10), 8],
  六害: [branchDescGodFunc(7), 8],
  五鬼: [branchDescGodFunc(4), 8],
  // 年神從歲支三合者
  歲馬: [getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4), 8],
  歲刑: [getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0), 8],
  // 劫煞 災煞移到commonGods
  // 劫煞: [getCommonCheckGodFunc([5, 2, 11, 8], getBranchValue, 4), 12],
  // 災煞: [getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4), 12],
  歲煞: [getCommonCheckGodFunc([7, 4, 1, 10], getBranchValue, 4), 8],
  伏兵: [getCommonCheckGodFunc([2, 0, 8, 6], getBranchValue, 4, getStemValue), 8],
  大禍: [getCommonCheckGodFunc([3, 1, 9, 7], getBranchValue, 4, getStemValue), 8],
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
    8
  ],
  天官符: [getCommonCheckGodFunc([11, 8, 5, 2], getBranchValue, 4), 8],
  大煞: [getCommonCheckGodFunc([0, 9, 6, 3], getBranchValue, 4), 8],
  黃幡: [getCommonCheckGodFunc([4, 1, 10, 7], getBranchValue, 4), 8],
  豹尾: [getCommonCheckGodFunc([10, 7, 4, 1], getBranchValue, 4), 8],
  炙退: [getCommonCheckGodFunc([3, 0, 9, 6], getBranchValue, 4), 8],
  // 年神隨歲支順行一方者
  飛廉: [getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0), 8]
}

yearGods.畜官 = [...yearGods.官符]
yearGods.死符 = [...yearGods.支德]
yearGods.小耗 = [...yearGods.支德]

export { yearGods }
