import { trans } from '../utils'

export class GodBase {
  readonly key: string
  readonly _config: Required<ClassCommonConfig> = {
    lang: 'zh'
  }

  constructor(godKey: string, config?: ClassCommonConfig) {
    this.key = godKey
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
  }

  get name(): string {
    return trans(`gods.${this.key}`, this._config.lang)
  }

  toString() {
    return this.name
  }
}
