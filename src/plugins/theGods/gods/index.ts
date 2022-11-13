// 神煞对象池

import { GodBase } from '../class/godBase'
import { God } from '../class/god'
import { commonGods } from './commonGods'
import { yearGods } from './yearGods'
import { monthGods } from './monthGods'
import { dayGods } from './dayGods'
import { hourGods } from './hourGods'
import { monthSeasonGods } from './monthSeasonGods'
import { getBy12GodDataByKey } from './by12Gods'
import { getDuty12GodDataBykey } from './duty12Gods'
import { life12GodNames } from './life12Gods'
import { prettyGetGodsYMDH } from '../utils'
import type { TheGods } from '../class/theGods'

const godsDicts = {
  common: commonGods,
  year: yearGods,
  month: monthGods,
  day: dayGods,
  hour: hourGods,
  monthSeason: monthSeasonGods
}

export const godsPool = new Map<string, GodBase>()

/**
验证是否附合神煞
 */
export function checkGod(
  lsr: lunisolar.Lunisolar,
  godKey: string,
  godDict: { [key: string]: GodDictItem },
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
) {
  const [checkFunc] = godDict[godKey]
  return checkFunc(lsr, fromYmdh, toYmdh)
}

/**
 * 取得神煞初始数据字典
 * @param dictKey 从哪份数据创建
 */
export function getGodDict(dictKey: string) {
  if (!godsDicts.hasOwnProperty(dictKey)) return undefined
  return godsDicts[dictKey as keyof typeof godsDicts]
}

/**
 * 创建一个GodBase实例
 * @param godKey 神煞key
 * @param cate 类型
 * @param fromDict 从哪份数据创建
 * @returns { GodBase | undefined }
 */
export function createGodBase(
  godKey: string,
  cate: YMDH,
  fromDict?: FromGodsType
): GodBase | undefined {
  const godsPoolKey = `${godKey}:${cate || 0}`
  if (godsPool.has(godsPoolKey)) return godsPool.get(godsPoolKey)
  const godData: GodBaseClassDataParam = {
    key: godKey,
    good: [],
    bad: [],
    luckLevel: 0,
    cate,
    extra: null
  }
  // 黄黑道十二神
  if (fromDict === 'blackYellow') {
    const byData = getBy12GodDataByKey(godKey)
    if (!byData) return undefined
    godData.good = byData[0]
    godData.bad = byData[1]
    godData.luckLevel = byData[2]
    godData.extra = {
      showGB: true
    }
  } else if (fromDict === 'duty') {
    const duData = getDuty12GodDataBykey(godKey)
    if (!duData) return undefined
    godData.good = duData[0]
    godData.bad = duData[1]
    godData.extra = duData[2]
    godData.luckLevel = duData[3]
  } else if (fromDict === 'life') {
    if (!life12GodNames.includes(godKey)) return undefined
    // pass
  } else {
    let godDict: { [key: string]: GodDictItem } | undefined
    if (fromDict && godsDicts.hasOwnProperty(fromDict)) {
      godDict = godsDicts[fromDict as keyof typeof godsDicts]
    } else if (cate && godsDicts.hasOwnProperty(cate)) {
      godDict = godsDicts[cate as keyof typeof godsDicts]
    }
    if (!godDict || !godDict.hasOwnProperty(godKey)) return undefined
    const [_, good, bad, luckNum, extra] = godDict[godKey]
    const luckLevel = luckNum > 0 ? 1 : -1
    godData.good = good
    godData.bad = bad
    godData.luckLevel = luckLevel
    godData.extra = extra || null
  }
  const godbase = new GodBase(godData)
  if (godbase) godsPool.set(godsPoolKey, godbase)
  return godbase
}

export function createGod(
  lsr: lunisolar.Lunisolar,
  godKey: string,
  cate: YMDH,
  fromDict?: FromGodsType
): God {
  return new God({
    key: godKey,
    cate: cate,
    fromDict: fromDict,
    lang: lsr.getConfig('lang') as string
  })
}

// 根据lsr验证该神煞是否存在，并生成god实例
export const checkAndCreateGod = (
  lsr: lunisolar.Lunisolar,
  godDictKey: FromGodsType,
  godKey: string,
  godCate: YMDH,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
): God | undefined => {
  const godDict = getGodDict(godDictKey)
  if (!godDict) return undefined
  if (!checkGod(lsr, godKey, godDict, fromYmdh, toYmdh)) return undefined
  return createGod(lsr, godKey, godCate, godDictKey)
}

// 根据lsr从神煞数据生成当天对应数据的神煞
export const createLsrGods = (
  lsr: lunisolar.Lunisolar,
  godDictKey: FromGodsType,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH,
  godCate: YMDH
): God[] => {
  const res: God[] = []
  const godDict = getGodDict(godDictKey)
  if (!godDict) return res
  for (const key in godDict) {
    if (checkGod(lsr, key, godDict, fromYmdh, toYmdh)) {
      const god = createGod(lsr, key, godCate, godDictKey)
      if (god) res.push(god)
    }
  }
  return res
}

export const getGods = function (
  theGods: TheGods,
  ymdh: YmdhSu | YMDH | string,
  cache?: Map<string, any>
): God[] {
  const pYmdh = prettyGetGodsYMDH(ymdh, true)
  const cacheKey = `theGods:godsData:${ymdh}`
  if (cache && cache.has(cacheKey)) {
    return cache.get(cacheKey) as God[]
  }
  let gods: God[] = []
  let setCache = pYmdh !== null
  if (pYmdh === 'y') {
    gods = createLsrGods(theGods.lsr, 'year', 'year', 'day', 'year')
    gods.push(...createLsrGods(theGods.lsr, 'common', 'year', 'day', 'year'))
  } else if (pYmdh === 'm') {
    gods = createLsrGods(theGods.lsr, 'month', 'month', 'day', 'month')
    gods.push(...createLsrGods(theGods.lsr, 'common', 'month', 'day', 'month'))
    gods.push(...createLsrGods(theGods.lsr, 'monthSeason', 'month', 'day', 'month'))
  } else if (pYmdh === 'd') {
    gods = createLsrGods(theGods.lsr, 'day', undefined, 'day', 'day')
    gods.push(theGods.getBy12God('day'))
  } else if (pYmdh === 'h') {
    gods = createLsrGods(theGods.lsr, 'hour', 'day', 'hour', 'hour')
    gods.push(theGods.getBy12God('hour'))
  }
  if (cache && setCache) cache.set(cacheKey, gods)
  return gods
}
