import { getBranchValue, getStemValue } from '../../../utils'
import { getCommonCheckGodFunc, getCheckGodFunc } from '../utils'

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
  土符: [getCommonCheckGodFunc([8, 0, 1, 5, 9, 2, 6, 10, 3, 7, 11, 4], getBranchValue, 0), 4],
  // 月神随月建逆行一方者
  大煞: [getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0), 4],
  // 月神隨月建三合順行一方者
  往亡: [getCommonCheckGodFunc([10, 1, 2, 5, 8, 11, 3, 6, 9, 0, 4, 7], getBranchValue, 0), 4],
  // 月神隨孟仲季順行三支者
  歸忌: [getCommonCheckGodFunc([2, 0, 1], getBranchValue, 3), 4],

  // 月神隨月建陰陽順行六辰者
  要安: [getCommonCheckGodFunc([7, 1, 2, 8, 3, 9, 4, 10, 5, 11, 6, 0], getBranchValue, 0), 4], // 未丑寅申卯酉辰戌巳亥午子
  玉宇: [getCommonCheckGodFunc([8, 2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1], getBranchValue, 0), 4], // 申寅卯酉辰戌巳亥午子未丑
  金堂: [getCommonCheckGodFunc([9, 3, 4, 10, 5, 11, 6, 0, 7, 1, 8, 2], getBranchValue, 0), 4], // 酉卯辰戌巳亥午子未丑申寅
  敬安: [getCommonCheckGodFunc([0, 6, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5], getBranchValue, 0), 4], // 子午未丑申寅酉卯戌辰亥巳
  普護: [getCommonCheckGodFunc([1, 7, 8, 2, 9, 3, 10, 4, 11, 5, 0, 6], getBranchValue, 0), 4], // 丑未申寅酉卯戌辰亥巳子午
  福生: [getCommonCheckGodFunc([2, 8, 9, 3, 10, 4, 11, 5, 0, 6, 1, 7], getBranchValue, 0), 4], // 寅申酉卯戌辰亥巳子午丑未
  聖心: [getCommonCheckGodFunc([4, 10, 11, 5, 0, 6, 1, 7, 2, 8, 9, 3], getBranchValue, 0), 4], // 辰戌亥巳子午丑未寅申卯酉
  益后: [getCommonCheckGodFunc([5, 11, 0, 6, 1, 7, 2, 8, 9, 3, 4, 10], getBranchValue, 0), 4], // 巳亥子午丑未寅申卯酉辰戌
  續世: [getCommonCheckGodFunc([0, 6, 1, 7, 2, 8, 9, 3, 4, 10, 5, 11], getBranchValue, 0), 4], // 午子丑未寅申卯酉辰戌巳亥
  // 月神隨月將逆行者
  // TODO: 先要添加取月將功能
}

// 其它，與上邊有一樣的取神方法
monthGods.天后 = [monthGods.驛馬[0], 4]
monthGods.大敗 = [monthGods.大時[0], 4]
monthGods.咸池 = [monthGods.大時[0], 4]
monthGods.致死 = [monthGods.天吏[0], 4]
monthGods.九焦 = [monthGods.九坎[0], 4]
// 月神隨月建陰陽順行六辰者
monthGods.血忌 = [monthGods.續世[0], 4]

export { monthGods }
