import type { GodBase } from './godBase'
import { createGodBase } from '../gods/index'
import { trans } from '../locale'

export class God {
  private godBase: GodBase
  private lang: string = 'zh'
  supple = new Map<string, any>()
  constructor(opt: GodClassOpt) {
    // PASS
    const { key, cate, fromDict, lang } = opt
    const godBase = createGodBase(key, cate, fromDict)
    if (!godBase) {
      throw new Error('no this god')
    }
    // if (!godBase) throw new Error('no this god')
    this.godBase = godBase
    if (lang) this.lang = lang
  }

  get key() {
    return this.godBase.key
  }

  get data() {
    return this.godBase.data
  }

  get alias() {
    return this.data.alias.map(i => trans(i, this.lang, 'gods'))
  }

  get name() {
    return trans(this.godBase.key, this.lang, 'gods')
  }

  get cate() {
    return this.data.cate
  }

  get good() {
    return this.data.good.map(i => trans(i, this.lang, 'acts'))
  }

  get bad() {
    return this.data.bad.map(i => trans(i, this.lang, 'acts'))
  }

  get luckLevel() {
    return this.data.luckLevel
  }

  toString() {
    return this.name
  }
}
