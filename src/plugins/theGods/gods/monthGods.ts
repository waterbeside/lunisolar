import { getBranchValue, getStemValue, computeSBValue } from '../../../utils'
import { getCommonCheckGodFunc, monthGeneralDescGodFunc, getCheckGodFunc } from '../utils'
import { getHateFrontAndBack } from '../../../utils/direction24'
import { deGoodAct, heavenWishGoodAct, snDeGoodAct } from '../actData'

const monthGodNames = [
  '天德',
  '天德合',
  '月德',
  '月德合',
  '月空',
  '三合',
  '五富',
  '臨日',
  '驛馬',
  '天火',
  '月煞',
  '大時',
  '遊禍',
  '天吏',
  '九空',
  '月刑',
  '九坎',
  '土符',
  '大煞',
  '往亡',
  '歸忌',
  '要安',
  '玉宇',
  '金堂',
  '敬安',
  '普護',
  '福生',
  '聖心',
  '益后',
  '續世',
  '月厭',
  '六合',
  '天賊',
  '天倉',
  '六儀',
  '六害',
  '天願',
  '兵吉',
  '月恩',
  '複日',
  '不將',
  '大會',
  '小會',
  '行狠',
  '了戾',
  '孤辰',
  '單陰',
  '純陽',
  '孤陽',
  '純陰',
  '歲薄',
  '遂陣',
  '陰陽交破',
  '陰陽擊沖',
  '陽破陰沖',
  '陰位',
  '陰道沖陽',
  '三陰',
  '陽錯',
  '陰錯',
  '陰陽俱錯',
  '絕陰',
  '絕陽',
  '天后',
  '大敗',
  '咸池',
  '致死',
  '九焦',
  '血忌',
  '厭對',
  '招搖'
] as const

type MonthGods = { [key in typeof monthGodNames[number]]: GodDictItem }

const monthGods: MonthGods = {
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
      fromYmdh: YMDH = 'month',
      toYmdh?: YMDH
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8[fromYmdh].branch.value
      const arr = [5, 6, 3, 8, 8, 7, 11, 0, 9, 2, 2, 1]
      const val = arr[idxMonth]
      const isStem = idxMonth % 3 ? false : true // 子午卯酉月和地支比較
      if (!toYmdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, toYmdh) : val === getBranchValue(lsr, toYmdh)
    }) as CheckGodFunc,
    deGoodAct,
    ['畋獵', '取魚'],
    4
  ],
  天德合: [
    ((
      lsr: lunisolar.Lunisolar,
      fromYmdh: YMDH = 'month',
      toYmdh?: YMDH
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8[fromYmdh].branch.value
      const arr = [8, 1, 8, 5, 3, 2, 2, 5, 4, 11, 7, 6]
      const val = arr[idxMonth]
      const isStem = idxMonth % 3 ? false : true // 子午卯酉月和地支比較
      if (!toYmdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, toYmdh) : val === getBranchValue(lsr, toYmdh)
    }) as CheckGodFunc,
    deGoodAct,
    ['畋獵', '取魚'],
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
      fromYmdh: YMDH = 'month',
      toYmdh?: YMDH
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8.month.branch.value
      const arr = [5, 6, 2, 0]
      const val = arr[idxMonth % 4]
      const isStem = (idxMonth + 3) % 4 ? false : true
      if (!toYmdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, toYmdh) : val === getBranchValue(lsr, toYmdh)
    }) as CheckGodFunc,
    deGoodAct,
    ['畋獵', '取魚'],
    4
  ],
  月德合: [
    ((
      lsr: lunisolar.Lunisolar,
      fromYmdh: YMDH = 'month',
      toYmdh?: YMDH
    ): [number, boolean] | boolean => {
      const idxMonth = lsr.char8[fromYmdh].branch.value
      const arr = [3, 1, 7, 5]
      const val = arr[idxMonth]
      const isStem = (idxMonth + 3) % 4 ? false : true
      if (!toYmdh) return [val, isStem]
      return isStem ? val === getStemValue(lsr, toYmdh) : val === getBranchValue(lsr, toYmdh)
    }) as CheckGodFunc,
    deGoodAct,
    ['畋獵', '取魚'],
    4
  ],
  // 按’丙甲壬庚‘顺序，同样是p212页印误
  月空: [
    getCommonCheckGodFunc([2, 0, 8, 6], getBranchValue, 4, 'month', getStemValue),
    ['上表章'],
    null,
    4
  ],
  三合: [
    ((
      lsr: lunisolar.Lunisolar,
      fromYmdh: YMDH = 'month',
      toYmdh?: YMDH
    ): [lunisolar.Branch, lunisolar.Branch] | boolean => {
      const res = lsr.char8[fromYmdh].branch.triad
      if (!toYmdh) return res
      return res.map(item => item.value).includes(getBranchValue(lsr, toYmdh))
    }) as CheckGodFunc,
    (
      '慶賜 賞賀 宴會 結婚姻 納采問名 嫁娶 進人口 裁製 ' +
      '修宮室 繕城郭 興造動土 豎柱上梁 修倉庫 經絡 醞釀 開市 立券 交易 納財 安碓磑 納畜'
    ).split(' '),
    null,
    4
  ],
  五富: [
    getCommonCheckGodFunc([5, 8, 11, 2], getBranchValue, 4, 'month', getBranchValue),
    null,
    null,
    4
  ],
  臨日: [
    getCommonCheckGodFunc([4, 9, 6, 11, 8, 1, 10, 3, 0, 5, 2, 7], getBranchValue, 0, 'month'),
    ['上冊進表章', '上官赴任', '上官赴任', ' 臨政親民', '陳詞訟'],
    null,
    4
  ],
  驛馬: [
    getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4, 'month'),
    ['行幸', '遣使', '求醫療病'],
    null,
    4
  ],
  天火: [getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4, 'month'), null, null, 4],
  月煞: [getCommonCheckGodFunc([7, 4, 1, 10], getBranchValue, 4, 'month'), null, null, 4],
  大時: [getCommonCheckGodFunc([9, 6, 3, 0], getBranchValue, 4, 'month'), null, null, 4],
  遊禍: [getCommonCheckGodFunc([11, 8, 5, 2], getBranchValue, 4, 'month'), null, null, 4],
  天吏: [getCommonCheckGodFunc([3, 0, 9, 6], getBranchValue, 4, 'month'), null, null, 4],
  九空: [getCommonCheckGodFunc([10, 7, 4, 1], getBranchValue, 4, 'month'), null, null, 4],
  月刑: [
    getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ],
  // 月神随四季者 （ 已移到monthSeasonGods ）
  // 月神隨月建三合逆行一方者
  九坎: [
    getCommonCheckGodFunc([8, 5, 4, 1, 10, 7, 3, 0, 9, 6, 2, 11], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ],
  // 月神随四序行三合者
  土符: [
    getCommonCheckGodFunc([8, 0, 1, 5, 9, 2, 6, 10, 3, 7, 11, 4], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ],
  // 月神随月建逆行一方者
  大煞: [
    getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ],
  // 月神隨月建三合順行一方者
  往亡: [
    getCommonCheckGodFunc([10, 1, 2, 5, 8, 11, 3, 6, 9, 0, 4, 7], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ],
  // 月神隨孟仲季順行三支者
  歸忌: [getCommonCheckGodFunc([2, 0, 1], getBranchValue, 3), null, null, 4],

  // 月神隨月建陰陽順行六辰者
  要安: [
    getCommonCheckGodFunc([7, 1, 2, 8, 3, 9, 4, 10, 5, 11, 6, 0], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 未丑寅申卯酉辰戌巳亥午子
  玉宇: [
    getCommonCheckGodFunc([8, 2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 申寅卯酉辰戌巳亥午子未丑
  金堂: [
    getCommonCheckGodFunc([9, 3, 4, 10, 5, 11, 6, 0, 7, 1, 8, 2], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 酉卯辰戌巳亥午子未丑申寅
  敬安: [
    getCommonCheckGodFunc([0, 6, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 子午未丑申寅酉卯戌辰亥巳
  普護: [
    getCommonCheckGodFunc([1, 7, 8, 2, 9, 3, 10, 4, 11, 5, 0, 6], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 丑未申寅酉卯戌辰亥巳子午
  福生: [
    getCommonCheckGodFunc([2, 8, 9, 3, 10, 4, 11, 5, 0, 6, 1, 7], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 寅申酉卯戌辰亥巳子午丑未
  聖心: [
    getCommonCheckGodFunc([4, 10, 11, 5, 0, 6, 1, 7, 2, 8, 9, 3], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 辰戌亥巳子午丑未寅申卯酉
  益后: [
    getCommonCheckGodFunc([5, 11, 0, 6, 1, 7, 2, 8, 9, 3, 4, 10], getBranchValue, 0, 'month'),
    4
  ], // 巳亥子午丑未寅申卯酉辰戌
  續世: [
    getCommonCheckGodFunc([0, 6, 1, 7, 2, 8, 9, 3, 4, 10, 5, 11], getBranchValue, 0, 'month'),
    null,
    null,
    4
  ], // 午子丑未寅申卯酉辰戌巳亥
  // 月神隨月將逆行者
  月厭: [monthGeneralDescGodFunc(0), null, null, 4],
  六合: [monthGeneralDescGodFunc(1), null, null, 4],
  天賊: [monthGeneralDescGodFunc(3), null, null, 4],
  天倉: [monthGeneralDescGodFunc(4), null, null, 4],
  六儀: [monthGeneralDescGodFunc(5), null, null, 4],
  六害: [monthGeneralDescGodFunc(6), null, null, 4],
  //
  天願: [
    getCheckGodFunc(
      lsr => [49, 0, 11, 10, 21, 32, 43, 54, 5, 16, 27, 38][lsr.getMonthBuilder(1)[0].branch.value],
      (lsr, ymdh = 'day') => lsr.char8[ymdh].value
    ),
    heavenWishGoodAct,
    null,
    4
  ],
  兵吉: [
    getCheckGodFunc<number[], number>(
      lsr => {
        const startBranch = lsr.getMonthBuilder(1)[0].branch.value
        const arr = []
        for (let i = 2; i < 6; i++) {
          arr.push((i + startBranch) % 12)
        }
        return arr
      },
      getBranchValue,
      'includes'
    ),
    null,
    null,
    4
  ],
  // 月神取月建生比者
  月恩: [
    getCommonCheckGodFunc(
      [0, 7, 2, 3, 6, 5, 4, 7, 8, 9, 6, 1],
      getBranchValue,
      0,
      'month',
      getStemValue
    ),
    snDeGoodAct,
    null,
    4
  ],
  複日: [
    getCommonCheckGodFunc(
      [9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8],
      getBranchValue,
      0,
      'month',
      getStemValue
    ),
    null,
    null,
    4
  ],
  // 月神從厭建起者
  // 不将
  不將: [
    getCheckGodFunc<number[], number>(
      lsr => {
        // 厌前天干配厌后地支即为阴阳不将
        const [front, back] = getHateFrontAndBack(lsr.getMonthBuilder(0)[0].branch.value)
        const res: number[] = []
        const sn = lsr.getSeasonIndex()
        const frontStemValue = front.stem.map(item => item.value)
        // 冬春己不将
        if (sn === 0 || sn === 3) frontStemValue.push(5)
        // 夏秋戊不将
        if (sn === 1 || sn === 2) frontStemValue.push(4)
        for (const fValue of frontStemValue) {
          for (const b of back.branch) {
            if ((fValue + b.value) % 2 !== 0) continue
            res.push(computeSBValue(fValue, b.value))
          }
        }
        return res
      },
      lsr => lsr.char8.day.value,
      'includes'
    ),
    null,
    null,
    4
  ],
  大會: [
    getCommonCheckGodFunc(
      [48, 59, 10, 21, null, null, 42, null, 53, 16, 27, null],
      getBranchValue,
      0,
      'month',
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  小會: [
    getCommonCheckGodFunc(
      [35, 24, null, 15, 4, 5, 54, null, null, null, 45, 34],
      getBranchValue,
      0,
      'month',
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  行狠: [
    getCommonCheckGodFunc(
      [37, null, null, null, 20, 31, null, null, null, null, null, 26],
      getBranchValue,
      0,
      'month',
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  了戾: [
    getCommonCheckGodFunc(
      [49, null, null, null, 32, 43, null, null, null, null, null, 38],
      getBranchValue,
      0,
      'month',
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  孤辰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') =>
        [
          [1, 13, 25],
          null,
          null,
          null,
          [32, 56, 44],
          [55, 7, 19],
          null,
          null,
          null,
          null,
          null,
          [50, 2, 14]
        ][getBranchValue(lsr, ymdh)],
      lsr => lsr.char8.day.value,
      'includes'
    ),
    4
  ],
  單陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) === 4 ? 4 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  純陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) === 5 ? 5 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  孤陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) === 11 ? 34 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  純陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) === 11 ? 35 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  歲薄: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 5) return [42, 54]
        if (branchValue === 11) return [48, 24]
        return null
      },
      lsr => lsr.char8.day.value,
      'includes'
    ),
    null,
    null,
    4
  ],
  遂陣: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 1) return [48, 24]
        if (branchValue === 7) return [42, 54]
        return null
      },
      lsr => lsr.char8.day.value,
      'includes'
    ),
    null,
    null,
    4
  ],
  陰陽交破: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 5) return 59
        if (branchValue === 11) return 53
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  陰陽擊沖: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 0) return 42
        if (branchValue === 6) return 48
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  陽破陰沖: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 1) return 43
        if (branchValue === 7) return 49
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  陰位: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 4) return 16
        if (branchValue === 10) return 10
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  陰道沖陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 3) return 45
        if (branchValue === 9) return 15
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  三陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 2) return 57
        if (branchValue === 8) return 51
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  陽錯: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') =>
        [null, [49], [50], [51], [40], [53, 5], null, [43, 55], [56], [57], [46], [59]][
          getBranchValue(lsr, ymdh)
        ],
      lsr => lsr.char8.day.value,
      'includes'
    ),
    null,
    null,
    4
  ],
  陰錯: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') =>
        [null, [59], [46], [57], [56], [43, 31], null, [53, 3], [40], [51], [50], [49]][
          getBranchValue(lsr, ymdh)
        ],
      lsr => lsr.char8.day.value,
      'includes'
    ),
    null,
    null,
    4
  ],
  陰陽俱錯: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 1) return 48
        if (branchValue === 6) return 42
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  絕陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 5) return 4
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ],
  絕陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 0) return 34
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4
  ]
} as unknown as MonthGods

// 其它，與上邊有一樣的取神方法
monthGods.天后 = [...monthGods.驛馬]
monthGods.大敗 = [monthGods.大時[0], null, null, 4]
monthGods.咸池 = [monthGods.大時[0], null, null, 4]
monthGods.致死 = [monthGods.天吏[0], null, null, 4]
monthGods.九焦 = [monthGods.九坎[0], null, null, 4]
// 月神隨月建陰陽順行六辰者
monthGods.血忌 = [monthGods.續世[0], null, null, 4]
// 月神隨月將逆行者
monthGods.厭對 = [monthGods.六儀[0], null, null, 4]
monthGods.招搖 = [monthGods.六儀[0], null, null, 4]

export { monthGodNames, monthGods, MonthGods }
