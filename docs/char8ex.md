# Char8Ex 八字增强

- [Char8Ex 八字增强](#char8ex-八字增强)
  - [简介](#简介)
  - [快速上手](#快速上手)
  - [Char8Ex类](#char8ex类)
  - [Pillar 四柱类](#pillar-四柱类)
  - [C8God 四柱神煞类](#c8god-四柱神煞类)
  - [TenGod 十神类](#tengod-十神类)

## 简介

`lunisolar.js`本身可能过`Lunisolar`实例的`char8`属性实现基本的八字查询功能, 但未包括十神和神煞等功能。使用Char8Ex插件后，将会在`Lunisolar``实例上添加一个char8ex()`方法, 除了包含原char8的功能外，还加入了十神和神煞的查询。

```typescript
/**
 * @param sex 性别 0:坤造，1: 乾造
 * @return 返回一个Char8Ex实例对象
 */
lunisolar().char8ex(sex: 0 | 1): Char8Ex
```

> 注意：加载`char8ex`插件时，将自动加载`takeSound`插件（五行纳音插件），所以请不要再重复加`takeSound`

## 快速上手

```typescript
// ---  安装
// 引入lunisolar
import lunisolar from 'lunisolar'
// 引入 theGods 插件
import char8ex from 'lunisolar/plugins/char8ex'
// 加载插件
lunisolar.extend(char8ex)


// ---  使用
// 创建一个Char8Ex实例对象, 该八字为 2023-01-15 12:26出生的男孩
const c8ex =  lunisolar('2023-01-15 12:26').char8ex(1)

console.log(c8ex.toString()) // 乾造: 壬寅 癸丑 癸酉 戊午

// Char8Ex实例可通过year,month,day,hour属性取得四柱实例 Pillar
// 而每个四柱实例（Pillar）又包含纳音、天干、地支、天干十神、地支十神、四柱神煞等功能查询

// 取各柱天干十神, 十神和神煞都是以对象形式存在
console.log(c8ex.year.stemTenGod.name) // 劫財
console.log(c8ex.month.stemTenGod.name) // 比肩
// 注：日主实际并不是十神之一，它位于日柱天干，十神以此推算。
console.log(c8ex.day.stemTenGod.name) // 日主
console.log(c8ex.hour.stemTenGod.name) // 正官

// 取各柱地支藏干十神
// 地支十神通过地支所藏天干推算，所以各柱的地支十神可能存在的个数为1至3个，故以数组形式返回
console.log(c8ex.year.branchTenGod.map(i => i.name)) // [ '傷官', '正財', '正官' ]
console.log(c8ex.month.branchTenGod.map(i => i.name)) // ['七殺', '比肩', '梟神']
console.log(c8ex.day.branchTenGod.map(i => i.name)) // ['梟神']
console.log(c8ex.hour.branchTenGod.map(i => i.name)) // ['偏財', '七殺']

//取年柱纳音
console.log(c8ex.year.takeSound) // 金箔金

//空亡地支 missing属性返回一个元组，该元组包含两个地支实例： [Branch, Branch]
// c8ex.missing 等同于 c8ex.day.missing
console.log(c8ex.missing.map(i => i.name)) //  [ '戌', '亥' ]

// 取得年柱上的神煞,其它柱类似
console.log(c8ex.year.gods.map(item => item.name)) // ['文昌貴人', '金輿', '天廚貴人', '劫煞']
```

:::tip
char8ex插件默认语言与lunisolar一样为繁体中文，如需要其它语言，须再另外加载
:::

## Char8Ex类

通过 `lunisolar().char8ex(sex: 0 | 1): Char8Ex`取得Char8Ex实例

> 为什么char8ex方法要设置性别参数？
>
> 因为个别神煞的计算方法男女不同。

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| me | 取得日主 | | Stem |
| sexValue | 取得性别值  | | 0 \| 1 |
| sex | 取得性别 如'乾造' 或 '坤造' | string |
| year | 取得年柱对象 | | Pillar |
| month | 取得月柱对象 | | Pillar |
| day | 取得日柱对象 | | Pillar |
| hour | 取得时柱对象 | | Pillar |
| gods | 取得各柱所有神煞 | | {year: C8God[], month: C8God[], day: C8God[], hour: C8God[]} |
| list | 四柱列表 | [Pillar, Pillar, Pillar, Pillar] |
| embryo() | 胎元, 返回一个天干地支对象 | SB |
| ownSign() | 命宫, 返回一个天干地支对象 | SB |
| bodySign() | 身宫, 返回一个天干地支对象 | SB |
| toString() | 返回八字的基本信息描述| SB |

## Pillar 四柱类

四柱类是SB类的增强版,主要补充了十神和神煞等属性

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| gods | 返回该柱所算出的所有神煞 | | C8God[] |
| stem | 该柱天干  | | Stem |
| branch | 该柱地支  | | Branch |
| value | 该天干地支组合的索引值, 范围`[0, 59]` | number |
| name | 该天干地支组合的字符串, 如 `甲子` | string |
| takeSound | 取得五行纳音描述 | | string |
| takeSoundE5 | 取得五行纳音的五行对象 | | Element5 |
| stemTenGod | 取得天干十神 | | TenGod |
| branchTenGod | 取得地支十神, 因为是按地支藏干算的, 所以返回提一个列表 | | TenGod[] |
| missing | 返回旬空地支 | | [Branch, Branch] |
| toString() | 该天干地支组合的字符串, 等同于name属性 | | string |

## C8God 四柱神煞类

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| luckLevel | 吉凶等级, 1为吉, -1凶, 0不定 | | number |
| key | 该神煞的key(以繁体中文神煞名作为key)  | | string |
| name | 该神煞名  | | string |
| toString() | 该天干地支组合的字符串, 等同于name属性 | | string |

## TenGod 十神类

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| key | 该十神的key(以繁体中文神煞名作为key)  | | string |
| name | 该十神名称   | | string |
| toString() | 该天干地支组合的字符串, 等同于name属性 | | string |
