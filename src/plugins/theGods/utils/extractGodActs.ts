import type { TheGods } from '../class/theGods'
import type { God } from '../class/god'
import type { ProcessData } from '../constants'
import { removeSetByList, filterActsNotInSet } from './index'
import { MEETING_DES_SET } from '../constants'
import { getTheSignGodSet, findLevel, filterActByLevel, filterActAfterLevel } from './goodBadLevel'
import { defaultActs, commonActs, emperorActs, civilActs } from '../actData'
import { trans } from '../locale'

import { yearGods } from '../gods/yearGods'
import { monthGods } from '../gods/monthGods'
import { monthSeasonGods } from '../gods/monthSeasonGods'
import { dayGods } from '../gods/dayGods'

function filterGodActsByExtra(
  god: God,
  theGods: TheGods,
  gods: Set<string>,
  processData: ProcessData
) {
  const extra = god.data.extra
  const godActs = {
    good: new Set(god.data.good),
    bad: new Set(god.data.bad)
  }

  const actsFilterRes = extra && extra.actsFilter ? extra.actsFilter(theGods.lsr, gods) : null

  if (extra) {
    const modifyGodActs = (gb: 'good' | 'bad') => {
      // replace
      if (actsFilterRes?.replace && actsFilterRes?.replace[gb]) {
        godActs[gb] = new Set(actsFilterRes.replace[gb] as string[])
      } else {
        // add
        if (actsFilterRes?.add && actsFilterRes?.add[gb]) {
          ;(actsFilterRes.add[gb] as string[]).forEach(i => {
            godActs[gb].add(i)
          })
        }
        // remove
        if (actsFilterRes?.remove && actsFilterRes?.remove[gb]) {
          ;(actsFilterRes.remove[gb] as string[]).forEach(i => {
            godActs[gb].delete(i)
          })
        }
      }
      // global queue
      if (actsFilterRes?.gRemove) {
        ;(actsFilterRes.gRemove[gb] || []).forEach(item => {
          processData.gRemove[gb].push(item)
        })
      }
    }
    modifyGodActs('good')
    modifyGodActs('bad')
    if (actsFilterRes?.gOnlySign) {
      ;(actsFilterRes.gOnlySign || []).forEach(item => {
        processData.gOnlySign.push(item)
      })
    }
  }
  const badArray = Array.from(godActs.bad.keys())
  const goodArray = Array.from(godActs.good.keys())

  for (const item of badArray) {
    // 遇德犹忌
    if (actsFilterRes?.meetDeStillBad || extra?.meetDeStillBad) processData.mdsbActs.push(item)
    // 遇赦愿犹忌
    if (actsFilterRes?.meetWishStillBad || extra?.meetWishStillBad) processData.mwsbActs.push(item)
    if (item) processData.acts.bad.add(item)
  }
  for (const item of goodArray) {
    if (item) processData.acts.good.add(item)
  }
  return godActs
}

/**
 * 提取神煞宜忌
 * @param theGods 諸神對象
 */
export const extractGodActs = function (theGods: TheGods): ProcessData {
  // const mbValue = getBranchValue(theGods.lsr, 'month')
  const dutyGodKey = theGods.getDuty12God().key + '日'
  const life12GodKey = theGods.getLife12God('month').key
  const signGodsSet = getTheSignGodSet()
  const signGods = new Set<string>()
  const gods = new Set<string>()
  const acts: ActsSet = {
    good: new Set<string>(),
    bad: new Set<string>()
  }
  const processData: ProcessData = {
    gods,
    signGods,
    acts,
    mdsbActs: [],
    mwsbActs: [],
    gRemove: {
      good: [],
      bad: []
    },
    gOnlySign: []
  }
  if (signGodsSet.has(dutyGodKey)) signGods.add(dutyGodKey)
  if (signGodsSet.has(`月令${life12GodKey}`)) signGods.add(`月令${life12GodKey}`)
  const godsList = theGods.getGods('MD')
  // 第一次循环生成gods set，以及signGods
  for (const godItem of godsList) {
    if (signGodsSet.has(godItem.key)) signGods.add(godItem.key)
    // 遇德
    if (MEETING_DES_SET.has(godItem.key)) signGods.add('德')
    gods.add(godItem.key)
  }
  for (const godItem of godsList) {
    filterGodActsByExtra(godItem, theGods, gods, processData)
  }
  filterGodActsByExtra(theGods.getDuty12God(), theGods, gods, processData)
  return processData
}

// 返回諸事不宜
const returnAllBad = function () {
  return {
    good: new Set(['諸事不宜']),
    bad: new Set(['諸事不宜'])
  }
}

/**
 * 取得當日宜忌
 * @param theGods 諸神對象
 * @returns {good, bad}
 */
export const getTodayActs = function (theGods: TheGods): ActsSet {
  const processData = extractGodActs(theGods)
  // 先處理gRemove
  removeSetByList(processData.acts.good, processData.gRemove.good)
  removeSetByList(processData.acts.bad, processData.gRemove.bad)
  // 處理gOnlySign，（無祿日的處理）
  if (processData.gOnlySign && processData.gOnlySign.length > 0) {
    filterActsNotInSet(processData.acts, processData.gOnlySign)
  }
  // 查出宜忌等第
  const levelData = findLevel(theGods, processData.signGods)
  // 使用等第表篩選宜忌
  const acts = processData.acts
  filterActByLevel(levelData[1], acts)
  if (acts.good.has('諸事不宜') && acts.bad.has('諸事不宜')) {
    return returnAllBad()
  }
  // 等第表之后的鋪注條例
  filterActAfterLevel(theGods, levelData, processData)
  return processData.acts
}

export const actsReplace = function (acts: ActsSet, replacer: { [key: string]: string }) {
  for (const key in replacer) {
    const value = replacer[key]
    if (acts.good.has(key)) {
      acts.good.delete(key)
      acts.good.add(value)
    }
    if (acts.bad.has(key)) {
      acts.bad.delete(key)
      acts.bad.add(value)
    }
  }
}

/**
 * 按指定順序和規則整理宜忌。（宜忌處理的最後工序）
 * @param acts 宜忌數據
 * @param actType 宜忌類型 0 默認，1通書，2御用，3民用
 * @param locale 語方包，為false時返key
 * @param replacer 要替換的宜忌
 * @return 返回 {good, bad} 宜忌列表
 */
export const orderActs = function (
  acts: ActsSet,
  actType: 0 | 1 | 2 | 3 = 0,
  lang: string | false = false,
  replacer?: { [key: string]: string }
): ActsDictList {
  const t = (key: string) => (lang ? trans(key, lang, 'acts') : key)
  if (acts.good.has('諸事不宜')) {
    return {
      good: [t('諸事不宜')],
      bad: [t('諸事不宜')]
    }
  }
  let filterList: string[]
  let rpr: { [key: string]: string } = {}
  if (actType === 1) {
    // 通書六十事
    filterList = commonActs
    rpr = {
      上冊進表章: '上冊受封',
      興造動土: '修造動土',
      宴會: '會親友',
      遣使: '出行',
      般移: '移徒',
      製裁: '裁衣',
      施恩封拜: '襲爵受封'
    }
  } else if (actType === 2) {
    // 御用六十七事
    filterList = emperorActs
    rpr = {
      補垣塞穴: '補垣',
      襲爵受封: '施恩封拜'
    }
  } else if (actType === 3) {
    // 民用三十七事
    filterList = civilActs
    rpr = {
      興造動土: '修造動土',
      宴會: '會親友',
      遣使: '出行',
      上官赴任: '上官',
      般移: '移徒',
      製裁: '裁衣'
    }
  } else {
    filterList = defaultActs
    rpr = { 襲爵受封: '施恩封拜' }
  }
  actsReplace(acts, Object.assign({}, rpr, replacer ?? {}))

  const good: string[] = []
  const bad: string[] = []
  for (const item of filterList) {
    if (acts.good.has(item)) good.push(t(item))
    if (acts.bad.has(item)) bad.push(t(item))
  }
  return {
    good: good.length === 0 ? [t('諸事不宜')] : good,
    bad
  }
}

/**
 * 通過神煞key取得宜忌
 * @param godKeys 神煞key列表
 * @returns 宜忌
 */
export function getActsByYmdGodKeys(godKeys: string[]): ActsSet {
  const good = new Set<string>()
  const bad = new Set<string>()
  for (const k of godKeys) {
    for (const godDict of [monthGods, monthSeasonGods, dayGods, yearGods]) {
      if (godDict.hasOwnProperty(k)) {
        const [_, gAct, bAct] = godDict[k]
        if (gAct) {
          gAct.forEach(g => {
            good.add(g)
          })
        }
        if (bAct) {
          bAct.forEach(g => {
            bad.add(g)
          })
        }
        break
      }
    }
  }
  return { good, bad }
}
