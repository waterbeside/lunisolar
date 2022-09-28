/*
----
長生十二神
----
*/

import { getBranchValue, getStemValue } from '../../../utils'

const life12GodNames = [
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
] as const

/**
 * @param lsr The instance of Lunisolar
 * @returns [長生12神索引, 名稱，名稱+日]
 */
function getLife12God(lsr: lunisolar.Lunisolar, ymdh: YMDH = 'day'): [number, string] {
  const stemValue = getStemValue(lsr, ymdh)
  const branchValue = getBranchValue(lsr, ymdh)
  const offsetList = [1, 6, 10, 9, 10, 9, 7, 0, 4, 3]
  const isRev = stemValue % 2 === 1
  const offset = offsetList[stemValue]
  console.log('offset', offset)
  const godIdx = (12 + (isRev ? 12 - branchValue : branchValue) + offset) % 12
  console.log('godIdx', godIdx)
  console.log('stemValue', stemValue)
  console.log('branchValue', branchValue)
  const key = life12GodNames[godIdx]
  return [godIdx, key]
}
export { life12GodNames, getLife12God }
