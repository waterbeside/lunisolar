import { _GlobalConfig } from '../config'
import { parseCommonCreateClassValue } from '../utils'

export class Element5 {
  readonly _value: number = -1
  readonly _config: Required<ClassCommonConfig> = {
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

  get name(): string {
    return this._value === -1
      ? ''
      : _GlobalConfig.locales[this._config.lang].fiveElements[this._value]
  }
  /**
   * 相生
   * Inter-promoting (相生 xiāngshēng): the effect in the generating (生 shēng) cycle
   */
  generating(): Element5 {
    const nextValue = (this._value + 1) % 5
    return Element5.create(nextValue, this._config)
  }

  /**
   * 相克
   * Inter-regulating (相克 xiāngkè): the effect in the overcoming (克 kè) cycle
   */
  overcoming(): Element5 {
    const nextValue = (this._value + 2) % 5
    return Element5.create(nextValue, this._config)
  }

  /**
   * 相洩
   *  Weakening (相洩/相泄 xiāngxiè): the effect in a deficient or reverse generating (生 shēng) cycle
   */
  weakening(): Element5 {
    const nextValue = (this._value + 4) % 5
    return Element5.create(nextValue, this._config)
  }

  /**
   * 相侮
   * Counteracting (相侮 xiāngwǔ or 相耗 xiānghào??): the effect in a deficient or reverse overcoming (克 kè) cycle
   */
  counteracting(): Element5 {
    const nextValue = (this._value + 3) % 5
    return Element5.create(nextValue, this._config)
  }

  toString(): string {
    return this._value === -1 ? 'Invalid five-element value' : this.name
  }

  valueOf(): number {
    return this._value
  }
}
