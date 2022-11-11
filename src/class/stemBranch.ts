import { HIDDEN_STEMS } from '../constants/calendarData'
import { Element5 } from './element5'
import { _GlobalConfig } from '../config'
import { getTrigramValueByStem, computeSBValue, parseCommonCreateClassValue } from '../utils'
import { Trigram8 } from './trigram8'

/**
 * 地支
 */
export class Branch {
  private _value: number = -1
  private _e5?: Element5
  private _hiddenStems: Stem[] = []
  private _config = {
    lang: _GlobalConfig.lang
  }

  static instances = new Map<string, Branch>()
  static create(value: number | string | Branch, config?: ClassCommonConfig): Branch {
    if (value instanceof Branch) return value
    const lang = config?.lang || _GlobalConfig.lang
    value = parseCommonCreateClassValue(value, 'branch', lang, _GlobalConfig)
    const instMapKey = `${value}:${lang}`
    if (Branch.instances.has(instMapKey)) return Branch.instances.get(instMapKey) as Branch
    const inst = new Branch(value, config)
    Branch.instances.set(instMapKey, inst)
    return inst
  }

  constructor(value: number | string | Branch, config?: ClassCommonConfig) {
    if (value instanceof Branch) return value
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    this._value = parseCommonCreateClassValue(value, 'branch', this._config.lang, _GlobalConfig)
  }

  get value(): number {
    return this._value
  }

  get hiddenStems(): Stem[] {
    if (this._hiddenStems.length) return this._hiddenStems
    const hiddenStemsValue = HIDDEN_STEMS[this._value]
    this._hiddenStems = hiddenStemsValue.map(v => new Stem(v))
    return this._hiddenStems
  }

  get e5(): Element5 {
    if (this._e5) return this._e5
    const i = Math.floor((this._value + 10) / 3) % 4
    if ((this._value + 10) % 3 === 2) {
      this._e5 = Element5.create(2, this._config)
    } else {
      this._e5 = Element5.create(i < 2 ? i : i + 1, this._config)
    }
    return this._e5
  }
  /**
   * 三合
   */
  get triad(): [Branch, Branch] {
    return [
      Branch.create((this._value + 4) % 12, this._config),
      Branch.create((this._value + 8) % 12, this._config)
    ]
  }

  toString(): string {
    return _GlobalConfig.locales[this._config.lang].branchs[this._value]
  }

  valueOf(): number {
    return this._value
  }
}

/**
 * 天干
 */
export class Stem {
  private _value: number = -1
  private _branchs: Branch[] = []
  private _e5?: Element5
  private _config = {
    lang: _GlobalConfig.lang
  }

  static instances = new Map<string, Stem>()
  static create(value: number | string | Stem, config?: ClassCommonConfig): Stem {
    if (value instanceof Stem) return value
    const lang = config?.lang || _GlobalConfig.lang
    value = parseCommonCreateClassValue(value, 'stem', lang, _GlobalConfig)
    const instMapKey = `${value}:${lang}`
    if (Stem.instances.has(instMapKey)) return Stem.instances.get(instMapKey) as Stem
    const inst = new Stem(value, config)
    Stem.instances.set(instMapKey, inst)
    return inst
  }

  constructor(value: number | string | Stem, config?: ClassCommonConfig) {
    if (value instanceof Stem) return value
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    this._value = parseCommonCreateClassValue(value, 'stem', this._config.lang, _GlobalConfig)
  }

  get value(): number {
    return this._value
  }

  get branchs(): Branch[] {
    if (this._branchs.length) return this._branchs
    const branchs = _GlobalConfig.locales[this._config.lang].branchs.filter(
      (_: string, index: number) => index % 2 === this._value % 2
    )
    this._branchs = branchs.map((branch: string) => Branch.create(branch, this._config))
    return this._branchs
  }

  get e5(): Element5 {
    if (this._e5) return this._e5
    this._e5 = Element5.create(Math.floor(this._value / 2), this._config)
    return this._e5
  }

  get trigram8(): Trigram8 {
    return Trigram8.create(getTrigramValueByStem(this._value), this._config)
  }

  toString(): string {
    return _GlobalConfig.locales[this._config.lang].stems[this._value]
  }

  valueOf(): number {
    return this._value
  }
}

/**
 * 天干地支组合
 */
export class SB {
  private _stem: Stem
  private _branch: Branch
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }

  constructor(
    stemOrValue: number | string | Stem,
    branch?: number | string | Branch,
    config?: ClassCommonConfig
  ) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (typeof branch === 'number' || typeof branch === 'string' || branch instanceof Branch) {
      this._stem = Stem.create(stemOrValue, this._config)
      this._branch = Branch.create(branch, this._config)
      const stemValue = this._stem.valueOf(),
        branchValue = this._branch.valueOf()
      // 如果一个为奇数一个为偶数，则不能组合
      this._value = computeSBValue(stemValue, branchValue)
    } else if (typeof stemOrValue === 'number') {
      this._value = stemOrValue % 60
      const stemValue = this._value % 10
      const branchValue = this._value % 12
      this._stem = Stem.create(stemValue, this._config)
      this._branch = Branch.create(branchValue, this._config)
    } else {
      throw new Error('Invalid SB value')
    }
  }

  get stem(): Stem {
    return this._stem
  }

  get branch(): Branch {
    return this._branch
  }

  get value(): number {
    return this._value
  }

  toString(): string {
    const locale = _GlobalConfig.locales[this._config.lang]
    return `${this._stem}${locale?.stemBranchSeparator ?? ''}${this._branch}`
  }

  valueOf(): number {
    return this._value
  }
}
