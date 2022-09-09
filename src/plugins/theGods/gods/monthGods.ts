import { getBranchValue, getStemValue } from '../../../utils'
import { getCommonCheckGodFunc } from '../utils'

const monthGods: { [key: string]: GodDictItem } = {
  // key : [取得方法, 属于年月日时用四位二进程表示]
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
  // 月神随四季者 （ 已移到monthSeasonGods ）
  // 月神隨月建三合逆行一方者
  九坎: [getCommonCheckGodFunc([8, 5, 4, 1, 10, 7, 3, 0, 9, 6, 2, 11], getBranchValue, 0), 4],
  // 月神随四序行三合者
  土符: [getCommonCheckGodFunc([8, 0, 1, 5, 9, 2, 6, 10, 3, 7, 11, 4], getBranchValue, 0), 4]
  // 月神随月建逆行一方者
  // 大煞
  // 月神隨月建三合順行一方者
  // 往亡
}

monthGods.天后 = [monthGods.驛馬[0], 4]
monthGods.大敗 = [monthGods.大時[0], 4]
monthGods.咸池 = [monthGods.大時[0], 4]
monthGods.致死 = [monthGods.天吏[0], 4]
monthGods.九焦 = [monthGods.九坎[0], 4]

export { monthGods }
