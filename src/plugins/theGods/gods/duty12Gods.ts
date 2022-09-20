/*
建除12神
*/

const duty12GodNames = [
  '建',
  '除',
  '滿',
  '平',
  '定',
  '執',
  '破',
  '危',
  '成',
  '收',
  '開',
  '閉'
] as const

/**
 * @param lsr The instance of Lunisolar
 * @returns [建除12神索引, 名稱，名稱+日]
 */
function getDutyGod(lsr: lunisolar.Lunisolar): [number, string, string] {
  const char8 = lsr.char8
  const godIdx = (char8.day.branch.value + 12 - char8.month.branch.value) % 12
  return [godIdx, duty12GodNames[godIdx], duty12GodNames[godIdx] + '日']
}
export { duty12GodNames, getDutyGod }
