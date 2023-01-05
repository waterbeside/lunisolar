import type { Stem } from '../../../class/stemBranch'
import { TenGod } from '../class/tenGod'

import { getTranslation } from '../../../utils'
import { TEN_GOD_RELATIONS as TGR } from '../constants'

export const char8exGlobal: { locales: { [key: string]: any } } = {
  locales: {}
}

export const setTheGodsLocales = function (locales: { [key: string]: any }) {
  char8exGlobal.locales = locales
}

export const trans = function (key: string, lang: string = 'zh') {
  const locale = char8exGlobal.locales[lang]
  if (!locale) return key
  const tKey = `theGods.${key}`
  return getTranslation(locale, tKey)
}

/**
 * 通过两天干五生生克计算十神
 */
export const computeTenGodByStem = function (
  me: Stem,
  targetStem: Stem,
  lang: string = 'zh'
): TenGod {
  const isNotSame = me.value % 2 === me.value % 2 ? 0 : 1
  // const meE5V = me.e5.value
  const targetE5V = targetStem.e5.value
  let trgKey: keyof typeof TGR
  if (me.e5.generating().value === targetE5V) {
    // 我生者
    trgKey = 'generating'
  } else if (me.e5.weakening().value === targetE5V) {
    // 生我者
    trgKey = 'weakening'
  } else if (me.e5.overcoming().value === targetE5V) {
    // 我克者
    trgKey = 'overcoming'
  } else if (me.e5.counteracting().value === targetE5V) {
    trgKey = 'counteracting'
  } else {
    // 同我者
    trgKey = 'sibling'
  }
  return TenGod.create(TGR[trgKey][isNotSame], { lang })
}
