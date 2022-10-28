import { getTranslation } from '../../../utils'

class God {
  data: GodClassData
  private locale: { [key: string]: any }
  constructor(data: GodClassDataParam, config: GodClassConfig) {
    const aliasList = data?.extra?.alias || []
    this.data = {
      key: data.key,
      good: [...(data.good || [])],
      bad: [...(data.bad || [])],
      luckLevel: data?.luckLevel || 0,
      cate: data?.cate || null,
      extra: data?.extra || null,
      alias: [...aliasList]
    }
    this.locale = config.locale
  }

  get alias() {
    return this.data.alias.map(i => getTranslation(this.locale, `theGods.names.${i}`))
  }

  get key() {
    return this.data.key
  }

  get name() {
    return getTranslation(this.locale, `theGods.names.${this.data.key}`)
  }

  get cate(): YMDH | null {
    return this.data.cate
  }

  get luckLevel(): number {
    return this.data.luckLevel
  }

  get good() {
    return this.data.good.map(item => {
      return getTranslation(this.locale, `theGods.acts.${item}`)
    })
  }

  get bad() {
    return this.data.bad.map(item => {
      return getTranslation(this.locale, `theGods.acts.${item}`)
    })
  }

  toString() {
    return this.name
  }
}

export { God }
