import { trans } from '../utils'

export class GodBase<T = string> {
  protected godKey: string
  protected _config = {
    lang: 'zh'
  }

  constructor(godKey: string, config?: ClassCommonConfig) {
    this.godKey = godKey
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
  }

  get key() {
    return this.godKey
  }

  get name(): T {
    return trans(`gods.${this.key}`, this._config.lang) as T
  }

  toString() {
    return this.name
  }
}
