import { getBranchValue } from '../../../utils'
import { getCommonCheckGodFunc } from '../utils'
import { jieShaBadAct } from '../actData'

const commonGods: { [key: string]: GodDictItem } = {
  劫煞: [getCommonCheckGodFunc([5, 2, 11, 8], getBranchValue, 4), null, jieShaBadAct, 12],
  災煞: [
    getCommonCheckGodFunc([6, 3, 0, 9], getBranchValue, 4),
    null,
    [...jieShaBadAct, '苫蓋'],
    12
  ]
}

export { commonGods }
