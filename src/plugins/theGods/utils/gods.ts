import { GodBase } from '../class/godBase'
import { getBy12GodDataByKey } from '../gods/by12Gods'
import { getDuty12GodDataBykey } from '../gods/duty12Gods'
import { life12GodNames } from '../gods/life12Gods'

import { godsPool } from './godsPool'
import { godsDicts } from './godsDicts'

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
