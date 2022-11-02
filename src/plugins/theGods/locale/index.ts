import { getTranslation } from '../../../utils'

export const theGodsGlobal: { locales: { [key: string]: any } } = {
  locales: {}
}

export const setTheGodsLocales = function (locales: { [key: string]: any }) {
  theGodsGlobal.locales = locales
}

export const trans = function (
  key: string,
  lang: string = 'zh',
  type?: 'acts' | 'gods' | 'queryString'
) {
  const locale = theGodsGlobal.locales[lang]
  if (!locale) return key
  const tKey = type ? `theGods.${type}.${key}` : key
  return getTranslation(locale, tKey)
}
