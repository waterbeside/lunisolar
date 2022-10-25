/*
```
-----------------------------------
卷十  p251
goodBadLevel:
宜忌等第表
[級別, 地支[], 神煞名[]]
級別: 0 to 5
0：上     吉足胜凶，从宜不从忌
1：上次   吉足抵凶，遇德从宜不从忌，不遇从宜亦从忌
2：中     吉不抵凶，遇德从宜不从忌，不遇从忌不从宜
3：中次   凶胜于吉，遇德从宜亦从忌，不遇从忌不从宜
4：下     凶又逢凶，遇德从忌不从宜，不遇诸事皆忌
5: 下下   凶叠大凶，遇德亦诸事皆忌
------------------------------------
actLevel:
通过goodBadLevel是否遇德再分级
0: 从宜不从忌
1: 从宜亦从忌
2：从忌不从宜
3：诸事皆忌
```
*/

import type { TheGods } from '../class/theGods'
import type { ProcessData } from '../constants'
import { getAct, monthHateBadAct } from '../actData'
import {
  LEVEL_SIGNGOD_LIST,
  LEVEL_GOD_KEYS,
  MEETING_DES,
  PARDON_WISH,
  GOD_LEVEL_DICT
} from '../constants'
import { getBranchValue } from '../../../utils'

type FilterActHooksKey = 'l0' | 'l1' | 'l2' | 'l3'

type FilterActHooks = {
  [key in FilterActHooksKey[number]]?: ((actLevel: number, acts: ActsSet) => void | true)[]
}

export function getTheSignGodSet(): Set<string> {
  const gs = new Set<string>()
  for (const item of LEVEL_GOD_KEYS) gs.add(item)
  for (const item of LEVEL_SIGNGOD_LIST) gs.add(item)
  return gs
}

/**
 * 查询等第
 * @param monthBranchValue 月的地支
 * @param signGods 用于计算等第的神煞
 * @returns {[number, number]}
 */
export const findLevel = function (theGods: TheGods, signGods: Set<string>): [number, number] {
  const mbValue = getBranchValue(theGods.lsr, 'month')
  let levelDictItem = null
  // let currLevelKey = null
  for (const levelkey of LEVEL_GOD_KEYS) {
    if (signGods.has(levelkey)) {
      levelDictItem = GOD_LEVEL_DICT[levelkey]
      // currLevelKey = levelDict[levelkey]
    }
  }
  if (!levelDictItem) return [-1, -1]
  let level = -1
  outer: for (const levelItem of levelDictItem) {
    const [lv, mv, gl] = levelItem
    if (mv.includes(mbValue)) {
      for (const glItem of gl) {
        if (signGods.has(glItem)) {
          level = lv
          break outer
        }
      }
    }
  }
  let actLevel = 1
  if (level === 5) actLevel = 3
  else if (level === 4) actLevel = signGods.has('德') ? 2 : 3
  else if (level === 3) actLevel = signGods.has('德') ? 1 : 2
  else if (level === 2) actLevel = signGods.has('德') ? 0 : 2
  else if (level === 1) actLevel = signGods.has('德') ? 0 : 1
  else if (level === 0) actLevel = 0
  return [level, actLevel]
}

// 諸事不忌日
function unBadDay(lsr: lunisolar.Lunisolar, gods: Set<string>, acts: ActsSet) {
  // 二月甲戌、四月丙申、六月甲子、七月戊申、八月庚辰、九月辛卯、十月甲子、十二月甲子，德和与赦、愿所汇之辰，诸事不忌。
  const sbArr = [null, 10, null, 32, null, 0, 44, 16, 27, 0, null, 0]
  if (
    sbArr[lsr.lunar.month] === lsr.char8.day.value &&
    (MEETING_DES.some(i => gods.has(i)) || PARDON_WISH.some(i => gods.has))
  ) {
    acts.bad = new Set<string>()
  }
}

/**
 * 等第表篩選宜忌
 * @param actLevel 宜忌分級 0: 从宜不从忌 1: 从宜亦从忌 2：从忌不从宜 3：诸事皆忌
 * @param acts 宜忌對象 {good, bad}
 */
export function filterActByLevel(actLevel: number, acts: ActsSet, hooks?: FilterActHooks): void {
  const setHooks = function (level: FilterActHooksKey): boolean {
    if (!hooks) return false
    const fns =
      hooks[level] === undefined
        ? []
        : (hooks[level] as ((actLevel: number, acts: ActsSet) => void | true)[])
    for (let i = 0; i < fns.length; i++) {
      if (fns[i](actLevel, acts)) return true
    }
    return false
  }
  if (actLevel === 3) {
    if (setHooks('l3')) return
    acts.good = new Set(['諸事不宜'])
    acts.bad = new Set(['諸事不宜'])
    return
  }
  for (const b of Array.from(acts.bad.keys())) {
    if (acts.good.has(b)) {
      // 2：从忌不从宜
      if (actLevel === 2) {
        if (setHooks('l2')) return
        acts.good.delete(b)
      }
      // 1: 从宜亦从忌
      else if (actLevel === 1) {
        if (setHooks('l1')) return
        acts.good.delete(b)
        acts.bad.delete(b)
      } else if (actLevel === 0) {
        if (setHooks('l0')) return
        acts.bad.delete(b)
      }
    }
  }
  return
}

/**
 * 鋪注條例，等第表之后再篩選 卷十 p251
 ```
 凡鋪注 萬年書 通書，先依用事次第，察其所宜忌之日，
 於某日下注宜某事，某日下注忌某事, 次按宜忌，較量其吉凶之輕重，以定去取。
 ```
 * @param theGods 諸神對象
 * @param levelData 等第數據
 * @param processData 由extractGodActs函數返回的數據
 */
export function filterActAfterLevel(
  theGods: TheGods,
  levelData: [number, number],
  processData: ProcessData
) {
  const [_, actLevel] = levelData
  const { acts, mdsbActs, gods, signGods } = processData
  const mdsbActsSet = new Set(mdsbActs)
  const { good, bad } = acts

  // 凡鋪宜宜政事，布政事之日，止注宜宣政事
  if (good.has('宣政事') && good.has('布政事')) good.delete('布政事')
  // 凡宜營建宮室，修宮室之日，止注宜營建宮室
  if (good.has('營建宮室') && good.has('修宮室')) {
    good.delete('修宮室')
  }
  // --- 处理遇德犹忌之事
  // 凡吉足胜凶，从宜不从忌者，如遇德犹忌之事，仍注忌;
  // 凡吉凶相抵，不注宜不注忌者，如遇德犹忌之事，仍注忌;
  if (mdsbActs.length > 0) {
    for (const actItem of mdsbActs) {
      good.delete(actItem)
      bad.add(actItem)
    }
  }

  // 凡德合、赦愿、月恩、四相、时德等日，不注忌进人口、安床、经络、酝酿、开市、立券、交易、纳财、开仓库、出货财。
  // 如遇德犹忌，及从忌不从宜之日，则仍注忌
  if ([...MEETING_DES, ...PARDON_WISH, '月恩', '四相', '时德'].some(item => gods.has(item))) {
    ;['進人口', '安床', '經絡', '醞釀', '開市', '立券', '交易', '納財', '開倉庫', '出貨財'].forEach(
      item => {
        // 遇德猶忌，及从忌不从宜之日, 仍注忌
        if (!(mdsbActsSet.has(item) || actLevel > 1) && bad.has(item)) {
          bad.delete(item)
        }
      }
    )
  }
  var branchValue = theGods.lsr.char8.day.branch.value
  var stemValue = theGods.lsr.char8.day.stem.value
  // 凡天狗寅日忌祭祀，不注宜求福、祈嗣。（应为祈福，求嗣？）
  if (gods.has('天狗') || branchValue === 2) {
    bad.add('祭祀')
    good.delete('祭祀')
    good.delete('祈福')
    good.delete('求嗣')
  }
  // 凡卯日忌穿井，不注宜開渠
  if (branchValue === 3) {
    bad.add('穿井')
    good.delete('穿井')
    good.delete('開渠')
  }
  // 壬日忌開渠，不注宜穿井
  if (stemValue === 8) {
    bad.add('開渠')
    good.delete('開渠')
    good.delete('穿井')
  }
  // 凡巳日忌出行，不注宜出师、遣使。
  if (branchValue === 5) {
    bad.add('出行')
    good.delete('出行')
    good.delete('出師')
    good.delete('遣使')
  }
  // 凡酉日忌宴會，亦不注慶賜 賞賀
  if (branchValue === 9) {
    bad.add('宴會')
    good.delete('宴會')
    good.delete('慶賜')
    good.delete('賞賀')
  }
  // 凡丁日忌剃頭，亦不注宜整容
  if (stemValue === 3) {
    bad.add('剃頭')
    good.delete('剃頭')
    good.delete('整容')
  }
  // 凡吉凶相抵，不注忌祈福，亦不注忌求嗣
  if (actLevel === 1 && !bad.has('祈福')) {
    if (!mdsbActsSet.has('求嗣')) bad.delete('求嗣')
  }
  // 凡忌诏命公卿、招贤，不注宜施恩封拜、举正直、袭爵受封。
  if (['詔命公卿', '招賢'].some(item => bad.has(item))) {
    ;['施恩封拜', '舉正直', '襲爵受封'].forEach(it => good.delete(it))
  }
  // 凡忌施恩封拜、举正直、袭爵受封，不注宜诏命公卿、招贤。
  if (['施恩封拜', '舉正直', '襲爵受封'].some(item => bad.has(item))) {
    ;['詔命公卿', '招賢'].forEach(it => good.delete(it))
  }
  // 凡宜宣政事之日遇往亡则改宣为布
  if (good.has('宣政事') && gods.has('往亡')) {
    good.delete('宣政事')
    good.add('布政事')
  }
  // 凡月厌忌行幸、上官，不注宜颁诏、施恩封拜、诏命公卿、招贤、举正直。
  // 遇宜宣政事之日，则改宣为布
  if (gods.has('月厭')) {
    ;['行幸', '上官赴任'].forEach(item => {
      good.delete(item)
      bad.add(item)
    })
    ;['頒詔', '施恩封拜', '詔命公卿', '招賢', '舉正直'].forEach(item => {
      good.delete(item)
    })
    if (good.has('宣政事')) {
      good.delete('宣政事')
      good.add('布政事')
    }
  }
  if (actLevel === 1) {
    // 凡吉凶相抵，不注忌结婚姻，亦不注忌冠带、纳采问名、嫁娶、进人口，如遇德犹忌之日则仍注忌。
    if (!bad.has('結婚姻')) {
      ;['冠帶', '納采問名', '嫁娶', '進人口'].forEach(item => {
        if (!mdsbActsSet.has(item)) bad.delete(item)
      })
    }
    // 凡吉凶相抵，不注忌嫁娶，亦不注忌冠带、结婚姻、纳采问名、进人口、搬移、安床，如遇德犹忌之日，则仍注忌
    if (!bad.has('嫁娶')) {
      ;['冠帶', '結婚姻', '納采問名', '進人口', '般移', '安床'].forEach(item => {
        if (!mdsbActsSet.has(item) && !gods.has('不將')) bad.delete(item)
      })
    }
    // 遇亥日、厌对、八专、四忌、四穷而仍注忌嫁娶者，只注所忌之事，其不忌者仍不注忌。
    // ? 不理解“不忌仍不注忌”，不忌肯定不注忌？
    ;(function () {
      const tempGods = ['厭對', '八專', '四忌', '四窮']
      if (stemValue === 9 || tempGods.some(item => gods.has(item))) {
        bad.add('嫁娶')
      }
    })()
    // 凡吉凶相抵，不注忌般移，亦不注忌安床; 不注忌安床，亦不注忌般移。如遇德犹忌之日，则仍注忌
    if (!bad.has('般移') && !mdsbActsSet.has('安床')) bad.delete('安床')
    if (!bad.has('安床') && !mdsbActsSet.has('般移')) bad.delete('般移')
    // 凡吉凶相抵，不注注忌解除，亦不注忌整容剃头，整手足甲，如遇德犹忌之日，则仍注忌
    if (!bad.has('解除')) {
      getAct([14], false).forEach(i => {
        if (!mdsbActsSet.has(i)) bad.delete(i)
      })
    }
    if (!bad.has('修造動土') && !bad.has('豎柱上梁')) {
      ;[
        '修宮室',
        '繕城郭',
        '筑堤防',
        '鼓鑄',
        '苫蓋',
        '修置產室',
        '開渠穿井',
        '安碓磑',
        '補垣塞穴',
        '修鉓垣墻',
        '平治道涂',
        '破屋壞垣'
      ].forEach(i => {
        if (!mdsbActsSet.has(i)) bad.delete(i)
      })
    }
    // 凡吉凶相相抵，不注忌開市 ，亦不注忌立券 交易 納財。
    // 不注忌納財，亦不注忌開市 立券 交易。
    // 不注立券交易, 亦不注忌立券交易，亦不注忌 開市 納財
    if (!bad.has('開市') || !bad.has('納財') || (!bad.has('立券') && !bad.has('交易'))) {
      getAct(['019a']).forEach(i => {
        bad.delete(i)
      })
    }
    // 凡吉凶相抵，不注忌開市 立券 交易，不注忌開倉庫出貨財，如遇專忌之日，仍注忌
    if (['開市', '立券', '交易'].every(i => !bad.has(i))) {
      ;['開倉庫', '出貨財'].forEach(i => {
        bad.delete(i)
      })
    }
    // 凡吉凶相抵，不注忌牧養，亦不注忌納畜，不注忌納畜，亦不注忌牧養。
    if (!bad.has('牧養')) bad.delete('納畜')
    if (!bad.has('納畜')) bad.delete('牧養')
    // 凡吉兇相抵，有宜安葬，不注忌啟攢。有宜啟攢，不注忌安葬
    if (good.has('安葬')) bad.delete('啟攢')
    if (good.has('啟攢')) bad.delete('安葬')
  }
  // 凡土符土府地囊，止注忌補垣，亦不注宜塞穴
  if (['土符', '土府', '地囊'].some(i => good.has(i)) && bad.has('補垣塞穴')) {
    good.delete('補垣塞穴')
  }
  // 凡開日，不注宜破土，安葬，啟攢，亦不注忌。遇忌則注
  if (signGods.has('開日')) {
    ;['破土', '安葬', '啟攢'].forEach(i => {
      good.delete(i)
      if (!gods.has('四忌')) bad.delete(i)
    })
  }
  //  凡四忌、四穷止忌安葬。如遇鸣吠、鸣吠对亦不注宜破土、启攒。
  if (gods.has('四忌') || gods.has('四窮')) {
    bad.add('安葬')
    good.delete('安葬')
    if (gods.has('鳴吠') || gods.has('鳴吠對')) {
      good.delete('破土')
      good.delete('啟攢')
    }
  }
  // 凡歲薄，逐陣日所宜事，照月厭所忌刪，所忌仍從本日。
  if (gods.has('歲薄') || gods.has('逐陣')) {
    monthHateBadAct.forEach(i => {
      good.delete(i)
    })
  }
  // 諸事不忌日
  unBadDay(theGods.lsr, gods, acts)
}
