import type { SB, Stem, Branch } from '../../../class/stemBranch'
import type { TenGod } from './tenGod'
import { computeTenGodByStem } from '../utils'

interface PillarDataParam {
  sb: SB
  cate: YMDH
  me: Stem
  lang?: string
}

export class Pillar {
  private _sb: SB
  private _me: Stem
  private _cate: YMDH
  private _lang: string = 'zh'
  constructor(data: PillarDataParam) {
    this._sb = data.sb
    this._cate = data.cate
    this._me = data.me
    if (data.lang) {
      this._lang = data.lang
    }
  }

  get stem(): Stem {
    return this._sb.stem
  }

  get branch(): Branch {
    return this._sb.branch
  }

  get value(): number {
    return this._sb.value
  }

  get stemTenGod() {
    if (this._cate === 'day') return null
    return computeTenGodByStem(this._me, this.stem, this._lang)
  }

  get branchTenGod(): TenGod[] {
    return this.branch.hiddenStems.map(item => {
      return computeTenGodByStem(this._me, item, this._lang)
    })
  }
}
