import { _GlobalConfig } from '../config'

export class Trigram8 {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }

  constructor(value: number, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    this._value = value % 8
  }

  toString() {
    return _GlobalConfig.locales[this._config.lang].eightTrigram[this._value]
  }

  valueOf() {
    return this._value
  }
}
