import { _GlobalConfig } from '../config'
import { Stem, Branch } from './stemBranch'
import type { Trigram8 } from './trigram8'
import { stemD24Idx, d24Trigrams, d24Directions } from '../constants/direction24'
import { getDirection24List } from '../utils/direction24'

function parseValue(value: number | Branch | Stem | Trigram8): number {
  if (typeof value === 'number') return value
  const className = value.constructor.name
  const signValue = value.value
  if (className === 'Stem') value = stemD24Idx[signValue]
  else if (className === 'Branch') value = signValue * 2
  else if (className === 'Trigram8') {
    const idOf = d24Trigrams.indexOf(signValue)
    if (idOf === -1) throw new Error('Invalid direction24 value')
    value = (2 * idOf + 1) * 3
  } else {
    throw new Error('Invalid direction24 value')
  }
  return value
}

export class Direction24 {
  private _value: number
  private _sign: Stem | Branch | Trigram8
  _config = {
    lang: _GlobalConfig.lang
  }

  static instances = new Map<string, Direction24>()

  static create(value: number | Branch | Stem | Trigram8, config: ClassCommonConfig): Direction24 {
    const idx = parseValue(value)
    const lang = config?.lang || 'zh'
    const instKey = `${idx}:${lang}`
    if (Direction24.instances.has(instKey)) return Direction24.instances.get(instKey) as Direction24
    const inst = new Direction24(idx, config)
    Direction24.instances.set(instKey, inst)
    return inst
  }

  static createFromAngle(angle: number, config: ClassCommonConfig): Direction24 {
    const value = Math.round((angle % 360) / 15)
    return Direction24.create(value, config)
  }

  constructor(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig) {
    const idx = parseValue(value)
    this._value = idx
    const lang = config?.lang || _GlobalConfig.lang
    const direction24List = getDirection24List(lang)
    if (idx === -1) this._sign = Stem.create(4, config)
    else if (idx === -1) this._sign = Stem.create(5, config)
    else this._sign = direction24List[idx % 24]
  }

  get value(): number {
    return this._value
  }

  get sign() {
    return this._sign
  }

  get signName() {
    return this._sign.toString()
  }

  get type(): 'Branch' | 'Stem' | 'Trigram8' {
    return this._sign.constructor.name as 'Branch' | 'Stem' | 'Trigram8'
  }

  get angle(): number {
    return this._value > 0 ? this._value * 15 : NaN
  }

  get direction(): string {
    return _GlobalConfig.locales[this._config.lang].directions[this.directionIndex]
  }

  get directionIndex(): number {
    if (this._value < 0) return 5
    return d24Directions[this._value]
  }

  toString() {
    return this._sign.toString()
  }

  valueOf() {
    return this._value
  }
}

export const createDirection24 = function () {}
