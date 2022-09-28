import zh from './locale/zh'
import { TheGods } from './class/theGods'

export interface LunisolarEx extends lunisolar.Lunisolar {
  theGods: TheGods
}

const dayGods: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
  const lsProto = lsClass.prototype as unknown as LunisolarEx
  Object.defineProperty(lsProto, 'theGods', {
    get(): TheGods {
      const cacheData = this.cache('theGods')
      if (cacheData instanceof TheGods) return cacheData
      const theGods = new TheGods(this)
      this.cache('theGods', theGods)
      return theGods
    }
  })
}
export default dayGods
