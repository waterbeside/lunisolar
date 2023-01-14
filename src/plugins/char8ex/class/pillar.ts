import type { Stem, Branch } from '../../../class/stemBranch'
import type { TenGod } from './tenGod'
import type { Element5 } from '../../../class/element5'
import { C8God } from './c8God'
import { computeTenGodByStem } from '../utils'

import { SBX } from '../types'

interface PillarDataParam {
  sb: SBX
  cate: YMDH
  me: Stem
  lang?: string
}

export class Pillar {
  readonly _sb: SBX
  readonly _me: Stem
  readonly _cate: YMDH
  readonly _lang: string = 'zh'
  readonly gods: C8God[] = []
  constructor(data: PillarDataParam) {
    this._sb = data.sb
    this._cate = data.cate
    this._me = data.me
    if (data.lang) {
      this._lang = data.lang
    }
  }

  _pushGods(gods: C8God[]) {
    this.gods.push(...gods)
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

  get takeSound(): string {
    return this._sb.takeSound
  }

  get takeSoundE5(): Element5 {
    return this._sb.takeSoundE5
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

  valueOf() {
    return this._sb.valueOf()
  }

  toString() {
    return this._sb.toString()
  }
}
