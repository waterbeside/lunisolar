import { FETAL_GOD_DAY_DIRECTION } from './constants/fetalGod'
import { TAKE_SOUND_ELEMENT5 } from './constants/takeSound'

import zh from './locale/zh'

interface SB extends lunisolar.SB {
  _takeSoundValue: string
  takeSound: string
  takeSoundE5: string
}

interface LocaleDataEx extends LocaleData {
  takeSound: string[]
}

interface LunisolarEx extends lunisolar.Lunisolar {
  fetalGodData: FetalGodData
  fetalGod: string
}

const advanced: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh)
  const lsProto = lsClass.prototype as unknown as LunisolarEx
  // **** 胎神 ****
  Object.defineProperty(lsProto, 'fetalGodData', {
    get(): FetalGodData {
      if (this._fetalGodData) return this._fetalGodData
      const lang = this._config.lang
      const locale = this._config.locales[lang] as typeof zh
      const daySb = this.char8.day as lunisolar.SB
      const stemPlace = locale.stemFetalGodPlace[daySb.stem.value % 5]
      const branchPlace = locale.branchFetalGodPlace[daySb.branch.value % 6]
      const directionValue = FETAL_GOD_DAY_DIRECTION[daySb.value % 60]
      const inOrOutSide =
        directionValue === 0
          ? ''
          : directionValue > 0
          ? locale.fetalGodOutsideDesc
          : locale.fetalGodInsideDesc
      const direction = inOrOutSide + locale.fetalGodDirection[Math.abs(directionValue)]
      const description = locale.fetalGodDayDesc[daySb.value]
      this._fetalGodData = {
        stemPlace,
        branchPlace,
        directionValue,
        direction,
        description
      }
      return this._fetalGodData
    }
  })
  Object.defineProperty(lsProto, 'fetalGod', {
    get(): string {
      return this.fetalGodData.description
    }
  })

  // **** 纳音 ****
  const sbProto = lsFactory.SB.prototype as unknown as SB
  // takeSound
  Object.defineProperty(sbProto, 'takeSound', {
    get(): string {
      const _GlobalConfig = lsFactory._globalConfig

      if (this._takeSoundValue === undefined) {
        this._takeSoundValue = ((this as lunisolar.SB).value >> 1) % 30
      }
      return (_GlobalConfig.locales[this._config.lang] as LocaleDataEx).takeSound[
        this._takeSoundValue
      ]
    }
  })
  // takeSoundE5
  Object.defineProperty(sbProto, 'takeSoundE5', {
    get(): string {
      const _GlobalConfig = lsFactory._globalConfig
      if (this._takeSoundValue === undefined) {
        this._takeSoundValue = ((this as lunisolar.SB).value >> 1) % 30
      }
      return _GlobalConfig.locales[this._config.lang].fiveElements[
        TAKE_SOUND_ELEMENT5[this._takeSoundValue]
      ]
    }
  })
  // 加到Lunisolar对象中
  Object.defineProperty(lsProto, 'takeSound', {
    get(): string {
      return this.char8.day.takeSound
    }
  })

  lsFactory
}
export default advanced
