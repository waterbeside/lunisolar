import { HIDDEN_STEMS } from '../constants/calendarData'
import { Element5 } from './element5'
import { _GlobalConfig } from '../config'
import {
  getTrigramValueByStem,
  computeSBValue,
  parseCommonCreateClassValue,
  computeTriadE5Value,
  computeGroup6E5Value
} from '../utils'
import { Trigram8 } from './trigram8'
import { cache, cacheClass } from '../utils/decorators'

/**
 * 地支
 */
@cacheClass
export class Branch {
  readonly _value: number = -1
  readonly _config: Required<ClassCommonConfig> = {
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

  @cache('branch:hiddenStems')
  get hiddenStems(): Stem[] {
    const hiddenStemsValue = HIDDEN_STEMS[this._value]
    return hiddenStemsValue.map(v => new Stem(v))
  }

  @cache('branch:e5')
  get e5(): Element5 {
    const i = Math.floor((this._value + 10) / 3) % 4
    if ((this._value + 10) % 3 === 2) {
      return Element5.create(2, this._config)
    } else {
      return Element5.create(i < 2 ? i : i + 1, this._config)
    }
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

  /**
   * 三合五行
   */
  get triadE5(): Element5 {
    return Element5.create(computeTriadE5Value(this._value), this._config)
  }

  /**
   * 六合
   */
  get group6(): Branch {
    return Branch.create((13 - this._value) % 12, this._config)
  }

  get group6E5(): Element5 {
    return Element5.create(computeGroup6E5Value(this._value), this._config)
  }

  // 相刑
  @cache('branch:punishing')
  get punishing(): Branch {
    const b = [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11]
    return Branch.create(b[this.value], this._config)
  }

  // 被刑
  @cache('branch:punishBy')
  get punishBy(): Branch {
    const b = [3, 7, 8, 0, 4, 2, 6, 10, 5, 9, 1, 11]
    return Branch.create(b[this.value], this._config)
  }

  // 相冲
  @cache('branch:conflict')
  get conflict(): Branch {
    return Branch.create((this.value + 6) % 12, this._config)
  }

  // 相破
  @cache('branch:destroying')
  get destroying(): Branch {
    const b = [9, 4, 11, 6, 1, 8, 3, 10, 5, 0, 7, 2]
    return Branch.create(b[this.value], this._config)
  }

  // 相害
  @cache('branch:harming')
  get harming(): Branch {
    const value = this.value > 7 ? 19 - this.value : 7 - this.value
    return Branch.create(value, this._config)
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
@cacheClass
export class Stem {
  readonly _value: number = -1
  readonly _config: Required<ClassCommonConfig> = {
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

  @cache('stem:branchs')
  get branchs(): Branch[] {
    const branchs = _GlobalConfig.locales[this._config.lang].branchs.filter(
      (_: string, index: number) => index % 2 === this._value % 2
    )
    return branchs.map((branch: string) => Branch.create(branch, this._config))
  }

  @cache('stem:e5')
  get e5(): Element5 {
    return Element5.create(Math.floor(this._value / 2), this._config)
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
  readonly _stem: Stem
  readonly _branch: Branch
  readonly _value: number = -1
  readonly _config: Required<ClassCommonConfig> = {
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
