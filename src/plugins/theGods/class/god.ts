import { getTranslation } from '../../../utils'

class God {
  data: GodClassData
  private _config: {
    lang: string
    locale: { [key: string]: any }
  }
  constructor(
    data: {
      key: string
      good: string[] | null
      bad: string[] | null
      extra?: GodDictItemExtra | null
    },
    config: GodClassConfig
  ) {
    this.data = {
      key: data.key,
      good: data.good || [],
      bad: data.bad || [],
      extra: data?.extra || null
    }
    this._config = {
      lang: config.lang ?? 'zh',
      locale: config.locale
    }
  }

  get key() {
    return this.data.key
  }

  get name() {
    return getTranslation(this._config.locale, `theGods.names.${this.data.key}`)
  }

  get good() {
    return this.data.good.map(item => {
      return getTranslation(this._config.locale, `theGods.acts.${item}`)
    })
  }

  get bad() {
    return this.data.bad.map(item => {
      return getTranslation(this._config.locale, `theGods.acts.${item}`)
    })
  }

  toString() {
    return getTranslation(this._config.locale, `theGods.names.${this.data.key}`)
  }
}

export { God }
