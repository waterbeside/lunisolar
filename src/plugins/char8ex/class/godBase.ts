import { trans } from '../utils'

export class GodBase<T = string> {
  readonly key: string
  readonly _config = {
    lang: 'zh'
  }

  constructor(godKey: string, config?: ClassCommonConfig) {
    this.key = godKey
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
  }

  get name(): T {
    return trans(`gods.${this.key}`, this._config.lang) as T
  }

  toString() {
    return this.name
  }
}
