import { Lunisolar } from './class/lunisolar'
import { Lunar } from './class/lunar'
import { SolarTerm } from './class/solarTerm'
import { Char8 } from './class/char8'
import { SB, Stem, Branch } from './class/stemBranch'
import { Element5 } from './class/element5'
import { Trigram8 } from './class/trigram8'
import { Direction24 } from './class/direction24'
import { _GlobalConfig } from './config'
import { parseFromLunar, defineLocale } from './utils'
import { utils } from './utils/export'
import { JD } from '@lunisolar/julian'
import zh from './locale/zh'
import { Markers } from './class/markers'

export default function lunisolar(date?: DateConfigType | JDDict, config?: ConfigType): Lunisolar {
  return new Lunisolar(date, config)
}

lunisolar.utc = function (date?: DateConfigType | JDDict, config?: ConfigType): Lunisolar {
  return new Lunisolar(date, Object.assign({}, config, { isUTC: true }))
}

lunisolar.Lunar = Lunar
lunisolar.SolarTerm = SolarTerm
lunisolar.Char8 = Char8
lunisolar.SB = SB
lunisolar.Stem = Stem
lunisolar.Branch = Branch
lunisolar.Element5 = Element5
lunisolar.Lunisolar = Lunisolar
lunisolar.Trigram8 = Trigram8
lunisolar.Direction24 = Direction24
lunisolar.JD = JD
lunisolar.utils = utils
lunisolar.fromLunar = function (
  param: ParseFromLunarParam,
  config?: SettingGlobalConfig
): Lunisolar {
  const date = parseFromLunar(param, config?.lang)
  return new Lunisolar(date, config)
}

/**
 * 更新全局配置
 */
lunisolar.config = (config: SettingGlobalConfig): typeof lunisolar => {
  if (!config) return lunisolar
  Object.assign(_GlobalConfig, config)
  return lunisolar
}

/**
 * 插件加载
 */
lunisolar.extend = <T = unknown>(plugin: PluginFunc<T>, options?: T): typeof lunisolar => {
  if (!plugin.$once) {
    plugin(options as T, Lunisolar, lunisolar)
    plugin.$once = true
  }
  return lunisolar
}

/**
 * 加载语言包
 */
lunisolar.locale = (
  localeData: LsrLocale | LsrLocale[],
  unChangeLang: boolean = false
): typeof lunisolar => {
  if (Array.isArray(localeData)) {
    for (const item of localeData) {
      lunisolar.locale(item, unChangeLang)
    }
    return lunisolar
  }
  if (!localeData || !localeData.name) return lunisolar
  _GlobalConfig.locales[localeData.name] = Object.assign(
    {},
    _GlobalConfig.locales[localeData.name],
    zh,
    localeData
  )
  if (!unChangeLang) _GlobalConfig.lang = localeData.name
  if (unChangeLang && _GlobalConfig.lang !== 'zh') {
    _GlobalConfig.locales[_GlobalConfig.lang] = Object.assign(
      {},
      _GlobalConfig.locales['zh'],
      _GlobalConfig.locales[_GlobalConfig.lang]
    )
  }

  return lunisolar
}

lunisolar.getLocale = (lang: string): LocaleData => {
  return _GlobalConfig.locales[lang]
}

lunisolar.defineLocale = defineLocale

lunisolar.Markers = Markers

lunisolar._globalConfig = _GlobalConfig

Object.defineProperty(lunisolar, '_globalConfig', {
  writable: false
})
