import type { Char8Ex } from '../class/char8ex'
import type { SBX } from '../types'
import { Pillar } from '../class/pillar'
import { SB } from '../../../class/stemBranch'

export const computeBigMoves = (c8ex: Char8Ex, length = 8) => {
  const sex = c8ex.sexValue
  const movesList = new Array<Pillar>(length)
  const startSBValue = c8ex.month.value
  const config = {
    lang: c8ex._lang
  }
  const isRev = (c8ex.year.stem.value + sex) % 2 !== 1 // 阳男阴女顺排 阴男阳女逆排
  // 计算交运时间
  

  // 计算大运天干地支
  for (let i = 0; i < length; i++) {
    let sbValue = isRev ? (60 - (startSBValue + i + 1)) % 60 : (startSBValue + i + 1) % 60
    const sb = new SB(sbValue, undefined, config)
    const pillar = new Pillar({ sb: sb as SBX, cate: 'BigMoves', me: c8ex.me, lang: c8ex._lang })
    movesList[i] = pillar
  }


}
