import { _GlobalConfig } from '../config'

export class Element5 {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }
  constructor(value: number | string | Element5, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (value instanceof Element5) return value
    if (typeof value === 'number') {
      this._value = value % 5
    } else if (typeof value === 'string') {
      const elementIndex = _GlobalConfig.locales[this._config.lang].fiveElements.indexOf(value)
      if (elementIndex === -1) throw new Error('Invalid five-element value')
      this._value = elementIndex
    }
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
