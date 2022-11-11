import { _GlobalConfig } from '../config'
import { parseCommonCreateClassValue } from '../utils'

export class Trigram8 {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }

  static instances = new Map<string, Trigram8>()
  static create(value: number, config?: ClassCommonConfig): Trigram8 {
    const lang = config?.lang || _GlobalConfig.lang
    value = parseCommonCreateClassValue(value, 'trigram8', lang, _GlobalConfig)
    const instMapKey = `${value}:${lang}`
    if (Trigram8.instances.has(instMapKey)) return Trigram8.instances.get(instMapKey) as Trigram8
    const inst = new Trigram8(value, config)
    Trigram8.instances.set(instMapKey, inst)
    return inst
  }

  constructor(value: number, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    this._value = value % 8
  }

  get value(): number {
    return this._value
  }

  toString() {
    return _GlobalConfig.locales[this._config.lang].eightTrigram[this._value]
  }

  valueOf() {
    return this._value
  }
}
