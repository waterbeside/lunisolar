import { getBranchValue, getStemTrigram8Value } from '../../../utils'
import { getCheckGodFunc } from '../utils'

// 年神隨歲方順行者
export const yearGods = {
  奏書: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  博士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  力士: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ],
  蠶室: [
    getCheckGodFunc(
      (lsr, ymdh = 'year') => [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][getBranchValue(lsr, ymdh)],
      getStemTrigram8Value
    ),
    null,
    null,
    8
  ]
}
