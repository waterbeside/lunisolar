import { GodBase } from './godBase'
import { trans } from '../utils'
import { godKeysSet } from '../constants/godDict'
import { getGodLuckLevel } from '../utils/c8Gods'

export class C8God extends GodBase<string> {
  readonly luckLevel: number = 0
  readonly _config = {
    lang: 'zh'
  }
  static godkeysSet = godKeysSet
  static instances = new Map<string, C8God>()
  static create(godKey: string, config?: ClassCommonConfig) {
    const lang = config?.lang || 'zh'
    const instMapKey = `${godKey}:${lang}`
    if (C8God.instances.has(instMapKey)) return C8God.instances.get(instMapKey) as C8God
    const inst = new C8God(godKey, config)
    C8God.instances.set(instMapKey, inst)
    return inst
  }

  constructor(godKey: string, config?: ClassCommonConfig) {
    if (!godKeysSet.has(godKey)) throw new Error(`錯誤的八字神煞key:${godKey}`)
    super(godKey, config)
    this.luckLevel = getGodLuckLevel(godKey)
  }

  get name() {
    return trans(`gods.${this.key}`, this._config.lang)
  }
}
