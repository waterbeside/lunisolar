import { _GlobalConfig } from '../config'
import { parseCommonCreateClassValue } from '../utils'

export class Trigram8 {
  readonly value: number = -1
  readonly _config: Required<ClassCommonConfig> = {
    lang: _GlobalConfig.lang
  }

  /**
   * 顺序为 坤震坎兌艮離巽乾
   * @param lang 语言包名，不设置时为使用当前语言包
   * @returns string[]
   */
  static getNames(lang?: string): string[] {
    lang = lang || _GlobalConfig.lang
    return [..._GlobalConfig.locales[lang].eightTrigram]
  }

  static instances = new Map<string, Trigram8>()
  static create(value: number, config?: ClassCommonConfig): Trigram8 {
    const lang = config?.lang || _GlobalConfig.lang
    value = parseCommonCreateClassValue(value, 'trigram8', lang, _GlobalConfig)
    const instMapKey = `${value}:${lang}`
    if (Trigram8.instances.has(instMapKey)) return Trigram8.instances.get(instMapKey) as Trigram8
    const inst = new Trigram8(value, config)
    Trigram8.instances.set(instMapKey, inst)
    return inst
  }

  constructor(value: number, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    this.value = value % 8
  }

  get name(): string {
    return _GlobalConfig.locales[this._config.lang].eightTrigram[this.value]
  }

  toString() {
    return this.name
  }

  valueOf() {
    return this.value
  }
}
