import { getAct } from '../actData'
import { getStemValue } from '../../../utils'
import { godsPool } from '../utils/godsPool'
import { GodBase } from '../class/godBase'
import { God } from '../class/god'

export const dayGoodGodNames = ['喜神', '福神', '財神', '陽貴', '陰貴'] as const

type GodDataItem = {
  rule: number[]
  ruleValueType: string
  ruleIndexType: string
  good?: string[]
  bad?: string[]
  extra?: GodDictItemExtra
}

export const dayGoodGods: Record<DayLuckDirectionGodNames, GodDataItem> = {
  /**
   ## 1、喜神方
   ```

   > 甲己在艮乙庚乾，丙辛坤位喜神安;
   > 丁壬只向離宮坐，戊癸原來在巽間。

   喜神喜怒歌：
   > 甲己端坐乙庚睡，丙辛怒色皺雙眉;
   > 丁壬吃得醺醺醉，戊癸原來喜笑誰。
   ```

   - 凡嫁娶、冠帶,新人向之大吉,出行、移徙、修造等向喜神大吉。
   - 嫁娶時候還需注意喜神喜怒歌，如丙、辛日喜神在西南方位時，喜神生怒，也要避之。
  */
  喜神: {
    rule: [3, 21, 15, 12, 9],
    ruleValueType: 'Direction24',
    ruleIndexType: 'Stem',
    good: getAct(['嫁娶 冠帶 般移', '017b']),
    extra: {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getStemValue(lsr, 'day')
        if (mbValue % 5 === 2) {
          // 丙辛位時喜神發怒不宜嫁娶
          return {
            remove: {
              good: ['嫁娶']
            }
          }
        }
        return null
      }
    }
  },
  /**
   ## 2、福神方位
   ```
   > 甲己正北是福神，丙辛西北乾宮存;
   > 乙庚坤位戊癸艮，丁壬巽上好追尋。
   ```
  */
  福神: {
    rule: [0, 15, 21, 9, 3],
    ruleValueType: 'Direction24',
    ruleIndexType: 'Stem'
  },
  /**
   ## 3、財神方
   ```

   > 甲乙艮方丙丁坤，戊己財神坐坎位。
   > 庚辛正東壬癸南，此是財神正方位。
  */
  財神: {
    rule: [3, 3, 15, 15, 0, 0, 6, 6, 12, 12],
    ruleValueType: 'Direction24',
    ruleIndexType: 'Stem'
  },
  /**
   ## 陽貴神歌
   ```
   > 甲戊坤艮位，乙己是坤坎，
   > 庚辛居離艮，丙丁兌與乾，
   > 震巽屬何日，壬癸貴神安。
   ```
  */
  陽貴: {
    rule: [15, 15, 18, 21, 3, 0, 12, 3, 6, 9],
    ruleValueType: 'Direction24',
    ruleIndexType: 'Stem'
  },
  /**
   ## 陰貴神歌
   阴贵与阳贵起发相反
   阳贵 甲坤 戊艮
   阴贵 甲艮 戊坤
   。。。
  */
  陰貴: {
    rule: [3, 0, 21, 18, 15, 15, 3, 12, 9, 6],
    ruleValueType: 'Direction24',
    ruleIndexType: 'Stem'
  }
}

export const createGod = (key: string, lang: string): God => {
  const cate = 'day'
  const godsPoolKey = `${key}:day:direction`
  let godBase: GodBase
  if (godsPool.has(godsPoolKey)) {
    godBase = godsPool.get(godsPoolKey) as GodBase
    return new God({ godBase, lang })
  }
  const godData = dayGoodGods[key as keyof typeof dayGoodGods]
  if (!godData) throw new Error(`Invalid god data`)
  const godDataParam: GodBaseClassDataParam = {
    key,
    good: godData.good ?? [],
    bad: godData.bad ?? [],
    luckLevel: 1,
    cate,
    extra: godData.extra ?? null
  }
  godBase = new GodBase(godDataParam)
  return new God({ godBase, lang })
}
