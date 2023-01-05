import type { TenGodKeys } from '../constants'
import { trans } from '../utils'

export class TenGod {
  private godKey: TenGodKeys
  private _config = {
    lang: 'zh'
  }
  static instances = new Map<string, TenGod>()
  static create(godKey: TenGodKeys, config?: ClassCommonConfig) {
    const lang = config?.lang || 'zh'
    const instMapKey = `${godKey}:${lang}`
    if (TenGod.instances.has(instMapKey)) return TenGod.instances.get(instMapKey) as TenGod
    const inst = new TenGod(godKey, config)
    TenGod.instances.set(instMapKey, inst)
    return inst
  }

  constructor(godKey: TenGodKeys, config?: ClassCommonConfig) {
    this.godKey = godKey
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
  }

  get key() {
    return this.godKey
  }

  get name() {
    return trans(`tenGod.${this.key}`, this._config.lang)
  }

  toString() {
    return this.name
  }
}
