import { getBranchValue, getStemValue, getStemTrigram8Value } from '../../utils'
import {
  getCommonCheckGodFunc,
  getCheckGodFunc,
  branchAscGodFunc,
  branchDescGodFunc
} from './utils'

const godList: { [key: string]: GodDictItem } = {
  // key : [取得方法, [宜], [忌], 属于年月日时用四位二进程表示]
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
  歲馬: [getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4), 12],
  歲刑: [getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0), 8],
  劫煞: [getCommonCheckGodFunc([5, 2, 11, 8], getBranchValue, 4), 8],
  災煞: [getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4), 12],
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
  飛廉: [getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0), 8],
  // 月神取月建三合者
  天德: [
    /**
    ```
      正丁二申宫，三壬四辛同。
      五亥六甲上，七癸八寅逢。
      九丙十居乙，子巳丑庚中。
      ```
     */
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [5, 6, 3, 8, 8, 7, 11, 0, 9, 2, 2, 1]
      const val = arr[idxMonth]
      const isStem = idxMonth % 3 ? false : true // 子午卯酉月和地支比較
      if (!ymdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, 'day') : val === getBranchValue(lsr, 'day')
    }) as CheckGodFunc,
    4
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
      return isStem ? val === getStemValue(lsr, 'day') : val === getBranchValue(lsr, 'day')
    }) as CheckGodFunc,
    4
  ],
  月德: [
    /**
      ```
      寅午戌月在丙，亥卯未月在甲。
      申子辰月在壬，巳酉丑月在庚。
      ```
      // 参考华龄出版社《辨方书》p101, p212表格似乎有误（把甲印成了申）
    */
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [5, 6, 2, 0]
      const val = arr[idxMonth % 4]
      const isStem = (idxMonth + 3) % 4 ? false : true
      if (!ymdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, 'day') : val === getBranchValue(lsr, 'day')
    }) as CheckGodFunc,
    4
  ],
  月德合: [
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [3, 1, 7, 5]
      const val = arr[idxMonth]
      const isStem = (idxMonth + 3) % 4 ? false : true
      if (!ymdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, 'day') : val === getBranchValue(lsr, 'day')
    }) as CheckGodFunc,
    4
  ],
  // 按’丙甲壬庚‘顺序，同样是p212页印误
  月空: [getCommonCheckGodFunc([2, 0, 8, 6], getBranchValue, 4, getStemValue), 4],
  三合: [
    ((
      lsr: lunisolar.Lunisolar,
      ymdh?: null | 'year' | 'month' | 'day' | 'hour'
    ): [lunisolar.Branch, lunisolar.Branch] | boolean => {
      const res = lsr.char8.month.branch.triad
      if (!ymdh) return res
      return res.map(item => item.value).includes(getBranchValue(lsr, ymdh))
    }) as CheckGodFunc,
    4
  ],
  五富: [getCommonCheckGodFunc([5, 8, 11, 2], getBranchValue, 4, getBranchValue), 4],
  临日: [getCommonCheckGodFunc([4, 9, 6, 11, 8, 1, 10, 3, 0, 5, 2, 7], getBranchValue, 0), 4],
  驛馬: [getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4), 4],
  天火: [getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4), 4],
  月煞: [getCommonCheckGodFunc([7, 4, 1, 10], getBranchValue, 4), 4],
  大時: [getCommonCheckGodFunc([9, 6, 3, 0], getBranchValue, 4), 4],
  遊禍: [getCommonCheckGodFunc([11, 8, 5, 2], getBranchValue, 4), 4],
  天吏: [getCommonCheckGodFunc([3, 0, 9, 6], getBranchValue, 4), 4],
  九空: [getCommonCheckGodFunc([10, 7, 4, 1], getBranchValue, 4), 4],
  月刑: [getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0), 4],
  // 月神随四季者
  大赦: [
    getCheckGodFunc(
      lsr => [14, 30, 44, 0][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
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
    4
  ],
  時德: [
    getCheckGodFunc(
      // '午辰子寅'
      lsr => [6, 4, 0, 2][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  王日: [
    getCheckGodFunc(
      // '寅巳申亥'
      lsr => [2, 5, 8, 11][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  官日: [
    getCheckGodFunc(
      // '卯午酉子'
      lsr => [3, 6, 9, 0][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  守日: [
    getCheckGodFunc(
      // '辰未戌丑'
      lsr => [4, 7, 10, 1][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  相日: [
    getCheckGodFunc(
      // '巳申亥寅'
      lsr => [5, 8, 11, 2][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  民日: [
    getCheckGodFunc(
      // '午酉子卯'
      lsr => [6, 9, 0, 3][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  四擊: [
    getCheckGodFunc(
      // '戌丑辰未'
      lsr => [10, 1, 4, 7][lsr.getSeasonIndex()],
      getBranchValue
    ),
    4
  ],
  四忌: [
    getCheckGodFunc(
      // '甲子', '丙子', '庚子', '壬子
      lsr => [0, 12, 36, 48][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    4
  ],
  四窮: [
    getCheckGodFunc(
      // '乙亥', '丁亥', '辛亥', '癸亥'
      lsr => [11, 23, 47, 59][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
    4
  ],
  四耗: [
    getCheckGodFunc(
      // '壬子', '乙卯', '戊午', '辛酉'
      lsr => [48, 51, 54, 57][lsr.getSeasonIndex()],
      (lsr, ymdh) => lsr.char8[ymdh].value
    ),
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
    4
  ],
  // 月神隨月建三合逆行一方者
  九坎: [getCommonCheckGodFunc([8, 5, 4, 1, 10, 7, 3, 0, 9, 6, 2, 11], getBranchValue, 0), 4],
  // 月神随四序行三合者
  土符: [getCommonCheckGodFunc([8, 0, 1, 5, 9, 2, 6, 10, 3, 7, 11, 4], getBranchValue, 0), 4]
  // 月神随月建逆行一方者
  // 大煞
  // 月神隨月建三合順行一方者
  // 往亡
}

godList.畜官 = [...godList.官符]
godList.死符 = [...godList.支德]
godList.小耗 = [...godList.支德]
godList.天后 = [godList.驛馬[0], 4]
godList.大敗 = [godList.大時[0], 4]
godList.咸池 = [godList.大時[0], 4]
godList.致死 = [godList.天吏[0], 4]
godList.九焦 = [godList.九坎[0], 4]

export default godList
