import { FETAL_GOD_DAY_DIRECTION } from './constants/fetalGod'

import zh from './locale/zh'

const advanced: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh)
  const lsProto = lsClass.prototype
  // 胎神
  Object.defineProperty(lsProto, 'fetalGodData', {
    get(): TireGodData {
      if (this._fetalGodData) return this._fetalGodData
      const lang = this._config.lang
      const locale = this._config.locales[lang] as typeof zh
      const daySb = this.char8.day as lunisolar.SB
      const stemPlace = locale.stemFetalGodPlace[daySb.stem.value % 5]
      const branchPlace = locale.branchFetalGodPlace[daySb.branch.value % 6]
      const directionValue = FETAL_GOD_DAY_DIRECTION[daySb.value % 60]
      const inOrOutSide = directionValue === 0 ? '' : directionValue > 0 ? '外' : '內'
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
}

export default advanced
