import { getBranchValue } from '../../../utils'
import { getCommonCheckGodFunc } from '../utils'
import { jieShaBadAct, jieShaBadActStr, commonOnlyBad2 } from '../actData'
import { MEETING_DES } from '../constants'
import { getLife12God } from './life12Gods'
import { getDuty12GodIndexAndKey } from './duty12Gods'

const commonGods: { [key: string]: GodDictItem } = {
  劫煞: [
    getCommonCheckGodFunc([5, 2, 11, 8], getBranchValue, 4),
    null,
    jieShaBadAct,
    12,
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 寅申巳亥月值收日
          ([2, 8, 5, 11].includes(mbValue) &&
            getLife12God(lsr, 'month')[0] === 0 &&
            duty12GodKey === '收') ||
          // 寅申月又值六合
          ([2, 8].includes(mbValue) && gods.has('六合')) ||
          // 巳亥值又月害，遇天德月德
          ([5, 11].includes(mbValue) &&
            gods.has('月害') &&
            ['月德', '天德'].some(i => gods.has(i))) ||
          // 辰戌丑未值除日，相日， 與德并
          ([4, 7, 10, 1].includes(mbValue) &&
            (duty12GodKey === '除' || (gods.has('相日') && MEETING_DES.some(i => gods.has(i)))))
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
  災煞: [
    getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4),
    null,
    `${jieShaBadActStr} 苫蓋`.split(' '),
    12,
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        const duty12GodKey = getDuty12GodIndexAndKey(lsr)[1]
        if (
          // 寅申巳亥月值開日 辰戌丑未值滿日， 遇德
          (([2, 8, 5, 11].includes(mbValue) && duty12GodKey === '開') ||
            ([4, 7, 10, 1].includes(mbValue) && duty12GodKey === '滿')) &&
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
  ]
}

export { commonGods }
