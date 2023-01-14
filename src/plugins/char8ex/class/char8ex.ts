import type { Stem } from '../../../class/stemBranch'
import type { Char8 } from '../../../class/char8'
import type { Lunisolar } from '../../../class/lunisolar'
import { SB } from '../../../class/stemBranch'
import { Pillar } from './pillar'
import { cacheClass, cache } from '../../../utils/decorators'
import { computeRatStem } from '../../../utils'
import { trans } from '../utils'
import { SBX } from '../types'
import { C8God } from './c8God'
import { createAllC8Gods } from '../utils/c8Gods'

@cacheClass
export class Char8Ex {
  readonly _pillars: [Pillar, Pillar, Pillar, Pillar]
  readonly _lang: string = 'zh'
  readonly me: Stem
  readonly char8: Char8
  readonly lsr: Lunisolar
  readonly sexValue: 0 | 1 | null
  readonly gods: {
    [x in YMDH]: C8God[]
  } = { year: [], month: [], day: [], hour: [] }

  constructor(lsr: Lunisolar, sexValue: 0 | 1 | null) {
    this.sexValue = sexValue
    this.lsr = lsr
    this.me = lsr.char8.me
    this.char8 = lsr.char8
    this._lang = lsr.getConfig().lang
    const ymdhList = ['year', 'month', 'day', 'hour']
    this._pillars = lsr.char8.list.map(
      (item, index) =>
        new Pillar({
          sb: item as SBX,
          me: this.me,
          cate: ymdhList[index] as YMDH,
          lang: lsr.char8.getConfig().lang
        })
    ) as [Pillar, Pillar, Pillar, Pillar]
    this.gods = createAllC8Gods(this)
    for (let i = 0; i < 4; i++) {
      const ymdh: YMDH = ymdhList[i] as YMDH
      this._pillars[i]._pushGods(this.gods[ymdh])
    }
  }

  get list(): [Pillar, Pillar, Pillar, Pillar] {
    return [...this._pillars]
  }

  get year(): Pillar {
    return this._pillars[0]
  }

  get month(): Pillar {
    return this._pillars[1]
  }

  get day(): Pillar {
    return this._pillars[2]
  }

  get hour(): Pillar {
    return this._pillars[3]
  }

  get sex() {
    return trans(`sex.${this.sexValue}`, this._lang)
  }

  /**
   * 胎元
   * 生月干进一干，
   * 生月支进三支
   */
  @cache('char8ex:embryo')
  embryo(): SB {
    const s = (this.month.stem.value + 1) % 10
    const b = (this.month.branch.value + 3) % 12
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  /**
   * 命宫
   ```
   口诀：
   若问命主何命宫，子起正月逆查行。
   生月支上起生时，顺查至卯知命宫。
   命宫天干如何定，月柱干支相对应，
   年定月诀也可行。
   ```
   * 掌上推命宫法，以排山掌子位为正月，
   * 也就是将正月固定在子位上，逆数亥为二月，戌为三月，酉为四月，申为五月，未为六月，午为七月，已为八月，辰为九月，卯为十月，寅为十一月，丑为十二月，
   * 然后再把出生时间安在这个月支上，顺数至卯，卯就是命宫。
   */
  @cache('char8ex:ownSign')
  ownSign(): SB {
    // const month = this.lsr.lunar.month
    const month = ((this.month.branch.value + 10) % 12) + 1
    const c8hour = this.hour.branch.value
    const monthSign = (13 - month) % 12
    const b = (12 + 3 - c8hour + monthSign) % 12
    // 命宫天干按五虎遁（五鼠遁+2）
    const s = (computeRatStem(this.year.stem.value, this.month.branch.value) + 2) % 10
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  /**
   * 身宫
   ```
   口诀：
   身宫口诀记心中，子起正月顺查行。
   生月支上起生时，逆推至酉知身宫。
   生月天干两头查，顺逆宫支天干停。
   ```
   */
  @cache('char8ex:bodySign')
  bodySign(): SB {
    // const month = this.lsr.lunar.month
    const month = ((this.month.branch.value + 10) % 12) + 1
    const c8hour = this.hour.branch.value
    const monthSign = (month - 1) % 12
    const b = (12 + c8hour - 9 + monthSign) % 12
    // 查身宫天干
    const s = (10 + this.month.stem.value + b - this.month.branch.value) % 10
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  toString() {
    return `${this.sex}:\n${this.year} ${this.month} ${this.day} ${this.hour}`
  }
}
