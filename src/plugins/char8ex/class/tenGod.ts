import { TenGodKeys, TEN_GOD_LIST } from '../constants'
import { GodBase } from './godBase'
import { trans } from '../utils'

export class TenGod extends GodBase {
  static godkeysSet = new Set(TEN_GOD_LIST)
  static instances = new Map<string, TenGod>()
  static create(godKey: TenGodKeys | '日主', config?: ClassCommonConfig) {
    const lang = config?.lang || 'zh'
    const instMapKey = `${godKey}:${lang}`
    if (TenGod.instances.has(instMapKey)) return TenGod.instances.get(instMapKey) as TenGod
    const inst = new TenGod(godKey, config)
    TenGod.instances.set(instMapKey, inst)
    return inst
  }

  constructor(godKey: TenGodKeys | '日主', config?: ClassCommonConfig) {
    if (godKey !== '日主' && !TenGod.godkeysSet.has(godKey))
      throw new Error(`錯誤的十神key:${godKey}`)
    super(godKey, config)
  }

  get name() {
    return trans(`tenGod.${this.key}`, this._config.lang)
  }
}
