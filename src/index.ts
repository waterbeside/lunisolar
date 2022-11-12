import { Lunisolar } from './class/lunisolar'
import { Lunar } from './class/lunar'
import { SolarTerm } from './class/solarTerm'
import { Char8 } from './class/char8'
import { SB, Stem, Branch } from './class/stemBranch'
import { Element5 } from './class/element5'
import { Trigram8 } from './class/trigram8'
import { Direction24 } from './class/direction24'
import { _GlobalConfig } from './config'
import zh from './locale/zh'

export default function lunisolar(
  date: DateConfigType | Lunisolar,
  config?: ConfigType
): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.toDate()
  }
  return new Lunisolar(date, config)
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

/**
 * 更新全局配置
 */
lunisolar.config = (config: ConfigType): typeof lunisolar => {
  if (!config) return lunisolar
  Object.assign(_GlobalConfig, config)
  return lunisolar
}

/**
 * 插件加载
 */
lunisolar.extend = <T = any>(plugin: PluginFunc, options?: T): typeof lunisolar => {
  if (!(plugin as any).$once) {
    plugin(options, Lunisolar, lunisolar)
    ;(plugin as any).$once = true
  }
  return lunisolar
}

/**
 * 加载语言包
 */
lunisolar.locale = (
  localeData: ILocale | ILocale[],
  unChangeLang: boolean = false
): typeof lunisolar => {
  if (Array.isArray(localeData)) {
    for (const item of localeData) {
      lunisolar.locale(item, unChangeLang)
    }
    return lunisolar
  }
  if (!localeData || !localeData.name) return lunisolar
  if (!unChangeLang) _GlobalConfig.lang = localeData.name
  _GlobalConfig.locales[localeData.name] = Object.assign(
    {},
    _GlobalConfig.locales[localeData.name],
    zh,
    localeData
  )
  return lunisolar
}

lunisolar.getLocale = (lang: string): LocaleData => {
  return _GlobalConfig.locales[lang]
}

lunisolar.createLocale = (localeData: ILocale): ILocale => localeData

lunisolar._globalConfig = _GlobalConfig

Object.defineProperty(lunisolar, '_globalConfig', {
  writable: false
})
