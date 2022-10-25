import { getBranchValue, getStemValue, computeSBValue, getYmdhSB } from '../../../utils'
import { getCommonCheckGodFunc, monthGeneralDescGodFunc, getCheckGodFunc } from '../utils'
import { getHateFrontAndBack } from '../../../utils/direction24'
import {
  deGoodAct,
  heavenWishGoodAct,
  snDeGoodAct,
  jieShaBadActStr,
  monthHateBadAct,
  bigTimeBadAct,
  earthBagBadAct,
  goDeadBadAct,
  getAct,
  commonOnlyBad,
  commonOnlyBad2
} from '../actData'
import { MEETING_DES } from '../constants'
import { getDuty12GodIndexAndKey } from './duty12Gods'

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
  '月建',
  '兵福',
  '小時',
  '土府',
  '兵寶',
  '吉期',
  '天巫',
  '福德',
  '天罡',
  '河魁',
  '死神',
  '死氣',
  '時陰',
  '小耗',
  '月破',
  '大耗',
  '天喜',
  '天醫',
  '時陽',
  '血支',
  '生氣',
  '五墓',
  '九坎',
  '土符',
  '地囊',
  '陽德',
  '陰德',
  '天馬',
  '兵禁',
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
  '益後',
  '續世',
  '月厭',
  '六合',
  '天賊',
  '天倉',
  '六儀',
  '月害',
  '天願',
  '兵吉',
  '解神',
  '月恩',
  '復日',
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
  '逐陣',
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
  '天狗',
  '天后',
  '大敗',
  '咸池',
  '致死',
  '九焦',
  '血忌',
  '厭對',
  '招搖',
  '地火'
] as const

type MonthGods = Record<typeof monthGodNames[number], GodDictItem>

const monthGodsA: { [key: string]: GodDictItem } = {
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
    4,
    {
      showGB: true
    }
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
    4,
    {
      showGB: true
    }
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
    4,
    {
      showGB: true
    }
  ],
  // 按’丙甲壬庚‘顺序，同样是p212页印误
  月空: [
    getCommonCheckGodFunc([2, 0, 8, 6], getBranchValue, 4, 'month', getStemValue),
    ['上表章'],
    null,
    4,
    {
      showGB: true
    }
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
    getAct([8, '012b', '裁製 修宮室 繕城郭', 17, '修倉庫', 18, '019a', '安碓磑 納畜'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  五富: [
    getCommonCheckGodFunc([5, 8, 11, 2], getBranchValue, 4, 'month', getBranchValue),
    getAct([18, '020a', '牧養 納畜'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  臨日: [
    getCommonCheckGodFunc([4, 9, 6, 11, 8, 1, 10, 3, 0, 5, 2, 7], getBranchValue, 0, 'month'),
    getAct(['上冊進表章', 11, '陳詞訟'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  驛馬: [
    getCommonCheckGodFunc([2, 11, 8, 5], getBranchValue, 4, 'month'),
    getAct([9, '求醫療病'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  天火: [
    getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4, 'month'),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  // 月煞又名月虛
  月煞: [
    getCommonCheckGodFunc([7, 4, 1, 10], getBranchValue, 4, 'month'),
    null,
    `${jieShaBadActStr} 修倉庫 開倉庫 出貨財`.split(' '),
    -4,
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        if (
          // 卯酉值六合，與月德天愿并
          [2, 8, 5, 11].includes(mbValue) &&
          gods.has('六合') &&
          ['月德', '天願'].some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: commonOnlyBad2
            }
          }
        }
        return null
      }
    }
  ],
  // 大時又名咸池故又忌取魚、乘船渡水
  大時: [
    getCommonCheckGodFunc([9, 6, 3, 0], getBranchValue, 4, 'month'),
    null,
    [...bigTimeBadAct],
    -4,
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 寅申巳亥月值除日官日, 辰戌月值執日六合，丑未月值執日六害與二德并
          ([2, 8, 5, 11].includes(mbValue) && (duty12GodKey === '除' || gods.has('官日'))) ||
          ([4, 10].includes(mbValue) && (duty12GodKey === '執' || gods.has('六合'))) ||
          ([1, 7].includes(mbValue) &&
            (duty12GodKey === '執' || gods.has('六害')) &&
            ['月德', '天德'].some(i => gods.has(i)))
        ) {
          return {
            replace: {
              bad: commonOnlyBad
            }
          }
        }
        return null
      }
    }
  ],
  遊禍: [
    getCommonCheckGodFunc([11, 8, 5, 2], getBranchValue, 4, 'month'),
    null,
    ['祈福', '求嗣', '解除', '求醫療病'],
    -4,
    {
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  天吏: [
    getCommonCheckGodFunc([3, 0, 9, 6], getBranchValue, 4, 'month'),
    null,
    bigTimeBadAct,
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 寅申巳亥月值危日 遇德
          [2, 8, 5, 11].includes(mbValue) &&
          duty12GodKey === '危' &&
          MEETING_DES.some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: commonOnlyBad2
            }
          }
        }
        return null
      }
    }
  ],
  九空: [
    getCommonCheckGodFunc([10, 7, 4, 1], getBranchValue, 4, 'month'),
    null,
    getAct(['進人口', '020b'], false),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          (([2, 8].includes(mbValue) && duty12GodKey === '滿') ||
            ([0, 3, 6, 9].includes(mbValue) && duty12GodKey === '開')) &&
          ['月德', '天德合', '月德合'].some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: []
            }
          }
        }
        return null
      }
    }
  ],
  // 月刑為月建所傷之地，故所忌與三煞同
  月刑: [
    getCommonCheckGodFunc([3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11], getBranchValue, 0, 'month'),
    null,
    `${jieShaBadActStr} 進人口`.split(' '),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 巳月值平日相日六合，相日遇月德天愿天德合
          mbValue === 5 &&
          (duty12GodKey === '平' || ['相日', '六合'].some(i => gods.has(i))) &&
          ['月德', '天德合', '天願'].some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: commonOnlyBad2
            }
          }
        }
        return null
      }
    }
  ],
  // 月建
  月建: [
    getCheckGodFunc((lsr, ymdh = 'month') => getBranchValue(lsr, ymdh), getBranchValue),
    null,
    getAct(
      [
        1,
        '上冊進表章',
        '012a',
        '般移',
        '014a',
        '求醫療病',
        '017b',
        '20-23',
        '安碓磑 補垣 平治道涂 伐木 栽種',
        '025a'
      ],
      false
    ),
    // (
    //   '祈福 求嗣 上冊進表章 結婚姻 納采問名 嫁娶 般移 ' +
    //   '解除 整容 剃頭 整手足甲 求醫療病 營建宮室 修宮室 繕城郭 興造動土 豎柱上梁 修倉庫 ' +
    //   '開倉庫 出貨財 修置產室 破屋壞垣 伐木 栽種 破土 安葬 啟攢'
    // ).split(' '),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || ['天赦', '月恩', '四相'].some(i => gods.has(i))) {
          return {
            replace: {
              bad: getAct(
                [
                  16,
                  '興造動土 修倉庫 修置產室 開渠穿井 安碓磑 補垣 平治道涂',
                  23,
                  '伐木 栽種 破土'
                ],
                false
              )
            }
          }
        }
        // 正月建日又忌出師
        if (getBranchValue(lsr, 'month') === 2 && getBranchValue(lsr, 'day') === 2) {
          return {
            add: {
              bad: ['出師']
            }
          }
        }
        return null
      }
    }
  ],
  兵福: [
    getCheckGodFunc((lsr, ymdh = 'month') => getBranchValue(lsr, ymdh) % 12, getBranchValue),
    getAct([10]),
    null,
    4,
    {
      showGB: true
    }
  ],
  小時: [
    getCheckGodFunc((lsr, ymdh = 'month') => getBranchValue(lsr, ymdh) % 12, getBranchValue),
    null,
    null,
    4,
    {
      showGB: true
    }
  ],
  土府: [
    getCheckGodFunc((lsr, ymdh = 'month') => getBranchValue(lsr, ymdh) % 12, getBranchValue),
    null,
    null,
    4,
    {
      showGB: true
    }
  ],
  兵寶: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 1) % 12, getBranchValue),
    getAct([10]),
    null,
    4,
    {
      showGB: true
    }
  ],
  吉期: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 1) % 12, getBranchValue),
    getAct(['施恩封拜 舉正直', 9, 11]),
    null,
    4,
    {
      showGB: true
    }
  ],
  天巫: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 2) % 12, getBranchValue),
    ['祭祀', '祈福'],
    null,
    4,
    {
      showGB: true
    }
  ],
  福德: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 2) % 12, getBranchValue),
    getAct(['上冊進表章', 8, '修宮室 繕城郭']),
    null,
    4,
    {
      showGB: true
    }
  ],
  天罡: [
    getCheckGodFunc((lsr, ymdh = 'month') => {
      return [3, 10, 5, 0, 7, 2, 9, 4, 11, 6, 1, 8][getBranchValue(lsr, ymdh)]
    }, getBranchValue),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  河魁: [
    getCheckGodFunc((lsr, ymdh = 'month') => {
      return [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2][getBranchValue(lsr, ymdh)]
    }, getBranchValue),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  死神: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 3) % 12, getBranchValue),
    null,
    getAct([10, '進人口 解除 求醫療病 修置產室', 24]),
    -4,
    {
      showGB: true
    }
  ],
  // 定日 又為死氣
  死氣: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 4) % 12, getBranchValue),
    null,
    getAct([10, '解除 求醫療病 修置產室 栽種'], false),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i))) {
          return {
            replace: {
              bad: commonOnlyBad2
            }
          }
        }
        const mbValue = getBranchValue(lsr, 'month')
        if ([4, 10].includes(mbValue) && gods.has('月厭')) {
          return {
            meetDeStillBad: true
          }
        }
        return null
      }
    }
  ],
  時陰: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 4) % 12, getBranchValue),
    ['運謀算', '畫計策'],
    null,
    4,
    {
      showGB: true
    }
  ],
  // 執日 = 小耗 = 支德
  小耗: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 5) % 12, getBranchValue),
    null,
    getAct(['020b'], false),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || gods.has('天願')) {
          return {
            replace: {
              bad: []
            }
          }
        }
        const mbValue = getBranchValue(lsr, 'month')
        if ([0, 3, 6, 9].includes(mbValue) && gods.has('劫煞')) {
          return {
            meetDeStillBad: true
          }
        }
        return null
      }
    }
  ],
  // 月破又名大耗
  月破: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 6) % 12, getBranchValue),
    null,
    getAct(
      [
        1,
        '上冊進表章 頒詔',
        '3-4',
        6,
        '8-11',
        '012b',
        '13-14',
        '裁製',
        '營建宮室 繕城郭',
        '017a',
        '鼓鑄',
        18,
        '020a',
        '修置產室',
        22,
        '安碓磑 補垣塞穴 修飾垣墻 伐木',
        24,
        '025a'
      ],
      false
    ),
    // (
    //   '祈福 求嗣 上冊進表章 頒詔 施恩封拜 詔命公卿 ' +
    //   '招賢 舉正直 宣政事 布政事 慶賜 賞賀 宴會 行幸 ' +
    //   '遣使 安撫邊境 選將訓兵 出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 進人口 般移 安床 ' +
    //   '整容 剃頭 整手足甲 ' +
    //   '裁製 營建宮室 繕城郭 興造動土 豎柱上梁 修倉庫 ' +
    //   '鼓鑄 經絡 醞釀 開市 立券 交易 納財 開倉庫 出貨財 ' +
    //   '修置產室 破屋壞垣 開渠穿井 安碓磑 補垣塞穴 修飾垣墻 伐木 ' +
    //   '栽種 牧養 納畜 破土 安葬 啟攢'
    // ).split(' '),
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      alias: ['大耗']
    }
  ],
  // 月破又名大耗
  大耗: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 6) % 12, getBranchValue),
    null,
    getAct(['020b']),
    -4,
    {
      showGB: true,
      meetDeStillBad: true
    }
  ],
  天喜: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 8) % 12, getBranchValue),
    getAct(['施恩封拜 舉正直', 8, 9, 11, '012a']),
    null,
    4,
    {
      showGB: true
    }
  ],
  天醫: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 8) % 12, getBranchValue),
    ['求醫療病'],
    null,
    4,
    {
      showGB: true
    }
  ],
  時陽: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 10) % 12, getBranchValue),
    null,
    null,
    4,
    {
      showGB: true
    }
  ],
  生氣: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 10) % 12, getBranchValue),
    null,
    null,
    4,
    {
      showGB: true
    }
  ],
  血支: [
    getCheckGodFunc((lsr, ymdh = 'month') => (getBranchValue(lsr, ymdh) + 11) % 12, getBranchValue),
    null,
    ['針刺'],
    -4,
    {
      showGB: true
    }
  ],
  // 月神随四季者 （ 已移到monthSeasonGods ）
  // 月神随建旺取墓辰者
  五墓: [
    getCommonCheckGodFunc(
      [28, 4, 31, 31, 4, 22, 22, 4, 37, 37, 4, 28],
      getBranchValue,
      0,
      'month',
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value
    ),
    null,
    getAct(['冠帶', 9, '011a', '012b', 13, '解除 求醫療病', '16-17', 19, 21, 24, '25a']),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        if ([6, 0].includes(mbValue) && gods.has('月德')) {
          return {
            replace: {
              bad: []
            }
          }
        }
        return null
      }
    }
  ],
  // 月神隨月建三合逆行一方者
  九坎: [
    getCommonCheckGodFunc([8, 5, 4, 1, 10, 7, 3, 0, 9, 6, 2, 11], getBranchValue, 0, 'month'),
    null,
    getAct(['補垣塞穴', 26], false),
    -4,
    {
      showGB: true,
      meetDeStillBad: true
    }
  ],
  // 月神随四序行三合者
  土符: [
    getCommonCheckGodFunc([8, 0, 1, 5, 9, 2, 6, 10, 3, 7, 11, 4], getBranchValue, 0, 'month'),
    null,
    earthBagBadAct,
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神隨四時行三合納甲者
  地囊: [
    getCheckGodFunc<number[], number>(
      (lsr, ymdh = 'month') =>
        [
          [27, 57],
          [51, 9],
          [35, 6],
          [31, 49],
          [0, 18],
          [15, 45],
          [40, 58],
          [52, 22],
          [53, 23],
          [2, 31],
          [37, 7],
          [14, 44]
        ][getBranchValue(lsr, ymdh)],
      (lsr, ymdh = 'day') => getYmdhSB(lsr, ymdh, 0).value,
      'includes'
    ),
    null,
    earthBagBadAct,
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神随月建行纳甲六辰者
  陽德: [
    getCommonCheckGodFunc([6, 8, 10, 0, 2, 4], getBranchValue, 6, 'month'),
    getAct([5, '007a'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  陰德: [
    getCommonCheckGodFunc([1, 11, 9, 7, 5, 3], getBranchValue, 6, 'month'),
    getAct([5, '007a'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  天馬: [
    getCommonCheckGodFunc([2, 4, 6, 8, 10, 0], getBranchValue, 6, 'month'),
    getAct([9, '般移'], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  兵禁: [
    getCommonCheckGodFunc([6, 4, 2, 0, 10, 8], getBranchValue, 6, 'month'),
    null,
    getAct([10], false),
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神随月建逆行一方者
  大煞: [
    getCommonCheckGodFunc([8, 9, 10, 5, 6, 7, 2, 3, 4, 11, 0, 1], getBranchValue, 0, 'month'),
    null,
    getAct([10], false),
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神隨月建三合順行一方者
  往亡: [
    getCommonCheckGodFunc([10, 1, 2, 5, 8, 11, 3, 6, 9, 0, 4, 7], getBranchValue, 0, 'month'),
    null,
    goDeadBadAct,
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神隨孟仲季順行三支者
  歸忌: [
    getCommonCheckGodFunc([2, 0, 1], getBranchValue, 3),
    null,
    getAct(['013a'], false),
    -4,
    {
      showGB: true,
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],

  // 月神隨月建陰陽順行六辰者
  要安: [
    getCommonCheckGodFunc([7, 1, 2, 8, 3, 9, 4, 10, 5, 11, 6, 0], getBranchValue, 0, 'month'),
    ['安神'],
    null,
    4,
    {
      showGB: true
    }
  ], // 未丑寅申卯酉辰戌巳亥午子
  玉宇: [
    getCommonCheckGodFunc([8, 2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1], getBranchValue, 0, 'month'),
    ['修祠宇'],
    null,
    4,
    {
      showGB: true
    }
  ], // 申寅卯酉辰戌巳亥午子未丑
  金堂: [
    getCommonCheckGodFunc([9, 3, 4, 10, 5, 11, 6, 0, 7, 1, 8, 2], getBranchValue, 0, 'month'),
    ['修祠宇'],
    null,
    4,
    {
      showGB: true
    }
  ], // 酉卯辰戌巳亥午子未丑申寅
  敬安: [
    getCommonCheckGodFunc([0, 6, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5], getBranchValue, 0, 'month'),
    ['安神'],
    null,
    4,
    {
      showGB: true
    }
  ], // 子午未丑申寅酉卯戌辰亥巳
  普護: [
    getCommonCheckGodFunc([1, 7, 8, 2, 9, 3, 10, 4, 11, 5, 0, 6], getBranchValue, 0, 'month'),
    ['祭祀', '祈福'],
    null,
    4,
    {
      showGB: true
    }
  ], // 丑未申寅酉卯戌辰亥巳子午
  福生: [
    getCommonCheckGodFunc([2, 8, 9, 3, 10, 4, 11, 5, 0, 6, 1, 7], getBranchValue, 0, 'month'),
    ['祭祀', '祈福'],
    null,
    4,
    {
      showGB: true
    }
  ], // 寅申酉卯戌辰亥巳子午丑未
  聖心: [
    getCommonCheckGodFunc([4, 10, 11, 5, 0, 6, 1, 7, 2, 8, 9, 3], getBranchValue, 0, 'month'),
    ['祭祀', '祈福'],
    null,
    4,
    {
      showGB: true
    }
  ], // 辰戌亥巳子午丑未寅申卯酉
  益後: [
    getCommonCheckGodFunc([5, 11, 0, 6, 1, 7, 2, 8, 9, 3, 4, 10], getBranchValue, 0, 'month'),
    getAct(['001a']),
    null,
    4,
    {
      showGB: true
    }
  ], // 巳亥子午丑未寅申卯酉辰戌
  續世: [
    getCommonCheckGodFunc([0, 6, 1, 7, 2, 8, 9, 3, 4, 10, 5, 11], getBranchValue, 0, 'month'),
    getAct(['001a']),
    null,
    4,
    {
      showGB: true
    }
  ], // 午子丑未寅申卯酉辰戌巳亥
  // 月神隨月將逆行者
  月厭: [
    monthGeneralDescGodFunc(0),
    null,
    monthHateBadAct,
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 寅申月值成日，丑未月值開日，遇天德合月德月德合
          (([2, 8].includes(mbValue) && duty12GodKey === '成') ||
            ([1, 7].includes(mbValue) && duty12GodKey === '開')) &&
          ['月德', '天德合', '月德合'].some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: getAct(['9-10', '012a', 15, '013a', '栽種'])
            }
          }
        }
        return null
      }
    }
  ],
  六合: [
    monthGeneralDescGodFunc(1),
    getAct(['宴會 結婚姻 嫁娶 進人口', 18, '立券 交易 納財 納畜 安葬'], false),
    // '宴會 結婚姻 嫁娶 進人口 經絡 醞釀 立券 交易 納財 納畜 安葬'.split(' '),
    null,
    4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (['月恩', '四相', '時德'].some(i => gods.has(i))) {
          return {
            add: {
              good: ['修倉庫']
            }
          }
        }
        return null
      }
    }
  ],
  天賊: [
    monthGeneralDescGodFunc(3),
    null,
    getAct([9, '修倉庫', '納財', '出貨財'], false),
    -4,
    {
      showGB: true,
      meetDeStillBad: true
    }
  ],
  天倉: [monthGeneralDescGodFunc(4), ['進人口', '納財', '納畜'], null, 4, { showGB: true }],
  六儀: [monthGeneralDescGodFunc(5), ['臨政親民'], null, 4],
  月害: [
    monthGeneralDescGodFunc(6),
    null,
    getAct([1, '上冊進表章 頒詔', 8, 10, '012b', 18, '020a', '修置產室 牧養', '025a'], false),
    // ('
    //   '祈福 求嗣 上冊進表章 頒詔 ' +
    //   '慶賜 賞賀 宴會 ' +
    //   '安撫邊境 選將訓兵 出師 結婚姻 納采問名 嫁娶 進人口 ' +
    //   '求醫療病 修倉庫 ' +
    //   '經絡 醞釀 開市 立券 交易 納財 開倉庫 出貨財 修置產室 ' +
    //   '牧養 納畜 破土 安葬 啟攢'
    // ).split(' '),
    -4,
    {
      showGB: true,
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 卯酉值除日守日，丑未值執日，大時 ，遇天德月德
          (([3, 9].includes(mbValue) && (duty12GodKey === '除' || gods.has('守日'))) ||
            ([1, 7].includes(mbValue) && (duty12GodKey === '執' || gods.has('大時')))) &&
          ['月德', '天德合', '天願'].some(i => gods.has(i))
        ) {
          return {
            replace: {
              bad: commonOnlyBad2
            }
          }
        }
        return null
      }
    }
  ],
  //
  天願: [
    getCheckGodFunc(
      lsr => [49, 0, 11, 10, 21, 32, 43, 54, 5, 16, 27, 38][lsr.getMonthBuilder(1)[0].branch.value],
      (lsr, ymdh = 'day') => lsr.char8[ymdh].value
    ),
    heavenWishGoodAct,
    null,
    4,
    {
      showGB: true
    }
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
    getAct([10], false),
    null,
    4,
    {
      showGB: true
    }
  ],
  解神: [
    getCheckGodFunc(
      (lsr, ymdh = 'month') => [6, 6, 8, 8, 10, 10, 0, 0, 2, 2, 4, 4][getBranchValue(lsr, ymdh)],
      getBranchValue
    ),
    getAct(['上表章 陳詞訟 沐浴', '014a', 15], false),
    // ['上表章', '陳詞訟', '解除', '沐浴', '整容', '剃頭', '整手足甲', '求醫療病'],
    null,
    4,
    {
      showGB: true
    }
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
    4,
    {
      showGB: true
    }
  ],
  復日: [
    getCommonCheckGodFunc(
      [9, 5, 0, 1, 4, 2, 3, 5, 6, 7, 4, 8],
      getBranchValue,
      0,
      'month',
      getStemValue
    ),
    ['裁製'],
    getAct(['025a'], false),
    -4,
    {
      showGB: true,
      // 與重日同
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || ['天赦', '六合'].some(i => gods.has(i))) {
          return {
            replace: {
              bad: []
            },
            gRemove: {
              good: getAct(['025a'], false)
            }
          }
        }
        return null
      }
    }
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
    ['嫁娶'],
    null,
    4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
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
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  單陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => (getBranchValue(lsr, ymdh) === 4 ? 4 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  純陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => (getBranchValue(lsr, ymdh) === 5 ? 5 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  孤陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => (getBranchValue(lsr, ymdh) === 11 ? 34 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  純陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => (getBranchValue(lsr, ymdh) === 11 ? 35 : null),
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
  ],
  逐陣: [
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
    -4,
    {
      showGB: true
    }
  ],
  陰陽交破: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 5) return 59
        if (branchValue === 11) return 53
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  陰陽擊沖: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 0) return 42
        if (branchValue === 6) return 48
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  陽破陰沖: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 1) return 43
        if (branchValue === 7) return 49
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  陰位: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 4) return 16
        if (branchValue === 10) return 10
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  陰道沖陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 3) return 45
        if (branchValue === 9) return 15
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    4,
    {
      showGB: true
    }
  ],
  三陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 2) return 57
        if (branchValue === 8) return 51
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
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
    -4,
    {
      showGB: true
    }
  ],
  陰陽俱錯: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 1) return 48
        if (branchValue === 6) return 42
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  絕陰: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 5) return 4
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  絕陽: [
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null => {
        const branchValue = getBranchValue(lsr, ymdh)
        if (branchValue === 0) return 34
        return null
      },
      lsr => lsr.char8.day.value
    ),
    null,
    null,
    -4,
    {
      showGB: true
    }
  ],
  天狗: [
    // 盖天狗者，戌日值满也 （必定是申月）
    getCheckGodFunc(
      (lsr, ymdh = 'month'): number | null =>
        (getBranchValue(lsr, ymdh) + 2) % 12 === 10 ? 10 : null,
      lsr => lsr.char8.day.value
    ),
    null,
    ['祭祀'],
    -4,
    {
      showGB: true
    }
  ]
}

// 其它，與上邊有一樣的取神方法
const monthGodsB: { [key: string]: GodDictItem } = {
  天后: [...monthGodsA.驛馬],
  大敗: [monthGodsA.大時[0], null, null, -4],
  咸池: [monthGodsA.大時[0], null, ['取魚', '乘船渡水'], -4, monthGodsA.大時[4]],
  致死: [monthGodsA.天吏[0], null, null, -4],
  九焦: [monthGodsA.九坎[0], null, getAct(['鼓鑄 栽種 修筑園圃'], false), -4],
  // 月神隨月建陰陽順行六辰者
  血忌: [
    monthGodsA.續世[0],
    null,
    ['針刺'],
    -4,
    {
      meetDeStillBad: true,
      meetWishStillBad: true
    }
  ],
  // 月神隨月將逆行者
  厭對: [
    monthGodsA.六儀[0],
    null,
    ['嫁娶'],
    -4,
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (MEETING_DES.some(i => gods.has(i)) || gods.has('天赦')) {
          return {
            replace: {
              bad: []
            }
          }
        }
        return null
      }
    }
  ],
  招搖: [monthGodsA.六儀[0], null, ['嫁娶'], -4],
  地火: [...monthGodsA.月厭]
}

const monthGods: MonthGods = Object.assign({}, monthGodsA, monthGodsB) as MonthGods

export { monthGods, MonthGods }
