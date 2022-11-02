/*
----
長生十二神
----
*/

import { getBranchValue, getStemValue } from '../../../utils'

export const life12GodNames = [
  '長生',
  '沐浴',
  '冠帶',
  '臨官',
  '帝旺',
  '衰',
  '病',
  '死',
  '墓',
  '絕',
  '胎',
  '養'
]

/**
 * @param lsr The instance of Lunisolar
 * @returns [長生12神索引, 名稱key]
 */
export const getLife12God = function (
  lsr: lunisolar.Lunisolar,
  ymdh: YMDH = 'day'
): [number, string] {
  const stemValue = getStemValue(lsr, ymdh)
  const branchValue = getBranchValue(lsr, ymdh)
  const offsetList = [1, 6, 10, 9, 10, 9, 7, 0, 4, 3]
  const isRev = stemValue % 2 === 1
  const offset = offsetList[stemValue]
  const godIdx = (12 + (isRev ? 12 - branchValue : branchValue) + offset) % 12
  const key = life12GodNames[godIdx]
  return [godIdx, key]
}
