import { _GlobalConfig } from '../config'
import { parseCommonCreateClassValue } from '../utils'

export class Element5 {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }

  static instances = new Map<string, Element5>()
  static create(value: number | string | Element5, config?: ClassCommonConfig): Element5 {
    if (value instanceof Element5) return value
    const lang = config?.lang || _GlobalConfig.lang
    value = parseCommonCreateClassValue(value, 'element5', lang, _GlobalConfig)
    const instMapKey = `${value}:${lang}`
    if (Element5.instances.has(instMapKey)) return Element5.instances.get(instMapKey) as Element5
    const inst = new Element5(value, config)
    Element5.instances.set(instMapKey, inst)
    return inst
  }

  constructor(value: number | string | Element5, config?: ClassCommonConfig) {
    if (value instanceof Element5) return value
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }

    this._value = parseCommonCreateClassValue(value, 'element5', this._config.lang, _GlobalConfig)
  }

  get value(): number {
    return this._value
  }

  toString(): string {
    return this._value === -1
      ? 'Invalid five-element value'
      : _GlobalConfig.locales[this._config.lang].fiveElements[this._value]
  }

  valueOf(): number {
    return this._value
  }
}
