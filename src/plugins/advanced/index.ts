import {
  STEM_TIRE_GOD_PLACE,
  BRANCH_TIRE_GOD_PLACE,
  TIRE_GOD_DAY_DIRECTION,
  DIRECTION,
  FETAL_GOD_DAY_LIST
} from './constants/tireGod'

const advanced: lunisolar.PluginFunc = (options, lsClass, lsFactory) => {
  const lsProto = lsClass.prototype
  // 胎神
  Object.defineProperty(lsProto, 'tireGodData', {
    get(): TireGodData {
      if (this._tireGodData) return this._tireGodData
      const daySb = this.char8.day as lunisolar.SB
      const stemPlace = STEM_TIRE_GOD_PLACE[daySb.stem.value % 5]
      const branchPlace = BRANCH_TIRE_GOD_PLACE[daySb.branch.value % 6]
      const directionValue = TIRE_GOD_DAY_DIRECTION[daySb.value % 60]
      const inOrOutSide = directionValue === 0 ? '' : directionValue > 0 ? '外' : '內'
      const direction = inOrOutSide + DIRECTION[Math.abs(directionValue)]
      const description = FETAL_GOD_DAY_LIST[daySb.value]
      this._tireGodData = {
        stemPlace,
        branchPlace,
        directionValue,
        direction,
        description
      }
      return this._tireGodData
    }
  })
  Object.defineProperty(lsProto, 'tireGod', {
    get(): string {
      return this.tireGodData.description
    }
  })
}

export default advanced
