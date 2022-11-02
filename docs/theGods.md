# TheGods 神煞宜忌

## 1 简介

`TheGods`作为`lunisolar`的一个插件，其内容基于中国古代典籍 **《协纪纪辨方书》** 。

本库中的所有**宜忌词条**，除特别说明的外，皆出于《协纪纪辨方书 * 卷十一》。

宜忌的推导，需要先查出当日的所有神煞（卷九），每个神煞都有各自的宜忌（卷十），然后通过宜忌等第表、铺注条例（卷十）对宜忌进行整理，最后跟据（卷十一）用事表格进行排序和筛选。

正因为神煞和宜忌的数据复杂烦琐，为了方便维护和以免影响lunisolar的打包体积，故TheGods作为一个lunisolar的插件开发。

## 2 快速上手

```typescript

// ---  安装
// 引入lunisolar
import lunisolar from 'lunisolar'
// 引入 theGods 插件
import theGods from 'lunisolar/plugins/theGods'
// 加载插件
lunisolar.extend(theGods)

// ---  使用
const lsr = lunisolar('2018-10-04')
// 取神煞
lsr.theGods.getGods('M') // 取得当日的月神
lsr.theGods.getGods('D') // 取得当日的日神
lsr.theGods.getGods('MD') // 取得当日的月神和日神
lsr.theGods.getDuty12God() // 取得当日建除十二神（建、除、满....）
lsr.theGods.getLife12God('day') // 取得当日长生十二神 (长生、沐浴、冠帶...)
lsr.theGods.getBy12God('day') // 取得当日串宫十二神（青龍、明堂、天刑...）

// 取宜忌
lsr.theGods.getActs(0) // 取得当日宜忌 {good: string[], bad: string[]}
lsr.theGods.query('this day gods') // 取得当日神煞 （用于取宜忌的神煞）
lsr.theGods.query('good act 1') // 取得当日所宜（通书六十事）
lsr.theGods.query('bad act 1') // 取得当日所忌（通书六十事）
lsr.theGods.query('good act 2') // 取得当日所宜（御用六十七事）
lsr.theGods.query('good act 2') // 取得当日所忌（御用六十七事）
lsr.theGods.query('good act 3') // 取得当日所宜（民三十七事）
lsr.theGods.query('good act 3') // 取得当日所忌（民用三十七事）
lsr.theGods.query('good act') // 取得当日所宜（卷十一的所有词条）
lsr.theGods.query('bad act') // 取得当日所忌（卷十一的所有词条）

// 更详细用法请继续往下阅读
```

## 3 建除十二神

**建除十二神**，又称**十二值神**。即 “`建、除、满、平、定、执、破、危、成、收、开、闭`”共十二位神，每日轮值，周而复始，观所值以定吉凶。

> 《历书》曰：“历家以建、除、满、平、定、执、破、危、成、收、开、闭，凡十二日，周而复始，观所值以定吉凶。每月交节则叠两值日。其法从月建上起，建与斗杓所指相应，如正月建寅则寅日起建，顺行十二辰也。”

* 方法

```typescript
theGods.getDuty12God()
```

## 4 长生十二神

**建除十二神** 分别为：长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝、胎、养

|    | 甲 | 乙 | 丙 | 丁 | 戊 | 己 | 庚 | 辛 | 壬 | 癸 |
|----|---|---|---|---|---|---|---|---|---|---|
| 長生 | 亥 | 午 | 寅 | 酉 | 寅 | 酉 | 巳 | 子 | 申 | 卯 |
| 沐浴 | 子 | 巳 | 卯 | 申 | 卯 | 申 | 午 | 亥 | 酉 | 寅 |
| 冠帶 | 丑 | 辰 | 辰 | 未 | 辰 | 未 | 未 | 戌 | 戌 | 丑 |
| 臨官 | 寅 | 卯 | 巳 | 午 | 巳 | 午 | 申 | 酉 | 亥 | 子 |
| 帝旺 | 卯 | 寅 | 午 | 巳 | 午 | 巳 | 酉 | 申 | 子 | 亥 |
| 衰  | 辰 | 丑 | 未 | 辰 | 未 | 辰 | 戌 | 未 | 丑 | 戌 |
| 病  | 巳 | 子 | 申 | 卯 | 申 | 卯 | 亥 | 午 | 寅 | 酉 |
| 死  | 午 | 亥 | 酉 | 寅 | 酉 | 寅 | 子 | 巳 | 卯 | 申 |
| 墓  | 未 | 戌 | 戌 | 丑 | 戌 | 丑 | 丑 | 辰 | 辰 | 未 |
| 絕  | 申 | 酉 | 亥 | 子 | 亥 | 子 | 寅 | 卯 | 巳 | 午 |
| 胎  | 酉 | 申 | 子 | 亥 | 子 | 亥 | 卯 | 寅 | 午 | 巳 |
| 養  | 戌 | 未 | 丑 | 戌 | 丑 | 戌 | 辰 | 丑 | 未 | 辰 |

方法:

```typescript
theGods.getDuty12God(ymdh: 'year' | 'month' | 'day' | 'hour'): God
```

参数:
  
```typescript
ymdh: 'year' | 'month' | 'day' | 'hour'
```

指定year，或返回八字年柱的长生十二神，同理 'month'、'day'、'hour'其它各柱亦如是。

## 5 串宫十二神 (黄道黑道十二神)

青龙、明堂、天刑、朱雀、金匮、天德、白虎、玉堂、天牢、玄武、司命、勾陈

顺序口诀
> 青龙明堂与天刑，朱雀金匮天德神，
> 白虎玉堂天牢黑，玄武司命共勾陈。

黄黑道口诀 （有走之底的字为黄道，其它为黑道）
> 道远几时通达，路遥何日还乡。

方法:

```typescript
theGods.getBy12God(dh: 'day' | 'hour'): God
```

方法名 getBy12God，b指black黑道，y指yellow黄道，故取此方法名。

参数:
  
按《辨方书》黄道黑道十二神分到日神和时神中，故以参数指定是日还是时

```typescript
dh: 'day' | 'hour'
```

## 6 其它神煞（年神，月神，日神，时神）

按《辨方书·卷九》把各类神煞划分为年神、月神、日神、时神

### 6.1 getGods方法

取得指定年、月、日、时的神煞

```typescript
theGods.getGods(ymdh: 'Y' | 'M' | 'D' | 'H' | string): God[]
```

参数：

```typescript
ymdh?: 'Y' | 'M' | 'D' | 'H' | string
// 默认值为 "MD"
```

参数ymdh可以指定`'Y' | 'M' | 'D' | 'H'`其中一个，分别以取当时的年、月、日、时神。

此外可通过组合同时取得组合后的神煞, 例如:

```typescript
lunisolar().theGods.getGods('YMD') // 同时取得年、月、日神
lunisolar().theGods.getGods('MD') // 同时取得月、日神
```

### 6.2 getGoodGods方法

取得指定指定年、月、日、时的吉神

```typescript
theGods.getGoodGods(ymdh: 'Y' | 'M' | 'D' | 'H' | string): God[]
```

参数:

参数与`getGods`方法一致, 默认值为 "MD"

### 6.3 getGoodGods方法

取得指定指定年、月、日、时的凶神

```typescript
theGods.getBadGods(ymdh: 'Y' | 'M' | 'D' | 'H' | string): God[]
```

参数:

参数与`getGods`方法一致, 默认值为 "MD"

## 7 宜忌

本库中的所有**宜忌词条**，除特别说明的外，皆出于《协纪纪辨方书 * 卷十一》。

按《协纪纪辨方书 * 卷十一》宜忌分为 通書六十事、御用六十七事、 民用三十七事。

### getActs() 方法

```typescript
theGods.getActs(actType?: 0 | 1 | 2 | 3, returnKey?: boolean, replacer?: {}): {good: string[], bad: string[]}
```

参数说明:

```typescript
actType: 0 | 1 | 2 | 3
/**
 宜忌类型
 defalut: 0
 0：不按通书、御用、民事里的词条进行筛选
 1：按`通书六十事`的词条进行筛选，不在此60个词条内者，不会出现
 2：按`御用六十七事`的词条进行筛选
 3: 按`民用三十七事`的词条进行筛选
*/

returnKey：boolean
/**
 是否返回宜忌key
 defalut: false
 false: 词条将按国际化翻译后返回
 true: 返回宜忌key，（本库宜忌以繁体中文作为key）
*/

replacer?:  { [key: string]: string }
/**
 宜忌词条替换 
 default: undefined
 例如要把“剃頭”替換成"理髮" 可設定為 {剃頭: "理髮"}
*/
```

### getGoodActs() 方法

取得本日所宜

```typescript
theGods.getGoodActs(actType?: 0 | 1 | 2 | 3, returnKey?: boolean, replacer?: {}): string[]

// 參數與getActs相同
// 此方法等同于:
theGods.getActs(actType, returnKey, replacer).good
```

### getBadActs() 方法

取得本日所忌

```typescript
theGods.getBadActs(actType?: 0 | 1 | 2 | 3, returnKey?: boolean, replacer?: {}): string[]

// 參數與getActs相同
// 此方法等同于:
theGods.getActs(actType, returnKey, replacer).bad
```

### getAllDayHourGods() 方法

取得整日各时辰的神煞

```typescript
theGods.getAllDayHourGods(): God[][]

// 返回结果为二维数组：
[
  [God, God, ...], // 子时
  [God, God, God, ...], // 丑时
  [God, God, God, ...], // 寅时
  [God, God, ...], // 卯时
  [God, ...], // 辰时
  [God, ...], // 巳时
  ...
  ...
  [God, ...], //亥时
]
```

### getLuckHours() 方法

取得整日各时辰的吉凶

```typescript
theGods.getLuckHours(luckType: 0 | 1 = 1): number[]
// 返回数组表示各时辰，数组元素指示吉凶，大于0为吉，小于0为凶
[1, 1, -1, 1, -1, -1, -1, -1, 1, 1, -1, -1]
```

参数说明

```typescript
luckeType: 0 | 1
/**
选择吉凶取法
default: 0
0: 按黄黑道十二神（即青龙明堂等）决定吉凶
1：按黄黑道十二神（即青龙明堂等）决定吉凶
*/
```

### query() 方法

通过query方法，转入指定的字符串，可取得对应的神煞或宜忌

```typescript
theGod.query(queryString): God | God[] | string[] | null
```

参数说明

queryString 存入的字符串，对应返回的内容参见下表, 其中zh的中文字条取决于你是否使用zh语言名才能使用该字条。故建议使用key中的字条存入存数。

| key | zh | 说明 | 返回类型 |
|---| ---  | --- | ---- |
| year gods  | 年神 | 取得年神 | God[] |
| month gods  | 月神 | 取得月神 | God[] |
| day gods  | 日神 | 取得日神 | God[] |
| hour gods  | 時神 | 取得時神 | God[] |
| this day gods  | 本日神煞 | 取得本日神煞 | God[] |
| day of yellow-black god  | 本日黃黑十二神 | 取得本日的串宫十二神 | God[] |
| hour of yellow-black god  | 此時黃黑十二神 | 取得此时辰的串宫十二神 | God[] |
| duty god | 建除十二神 | 取得建除 | God |
| year of long-life god | 年長生十二神 | 取得年长生十二神 | God |
| month of long-life god | 月長生十二神 | 取得月长生十二神 | God |
| day of long-life god | 日長生十二神 | 取得日长生十二神 | God |
| hour of long-life god | 時長生十二神 | 取得时辰长生十二神 | God |
| good act | 宜 | 取得本日所宜 | string[] |
| good act 1 | 宜1 | 取得本日通书所宜 | string[] |
| good act 2 | 宜2 | 取得本日御用所宜 | string[] |
| good act 3 | 宜3 | 取得本日民用所宜 | string[] |
| bad act | 忌 | 取得本日所忌 | string[] |
| bad act 1 | 忌1 | 取得本日通书所忌  | string[] |
| bad act 2 | 忌2 | 取得本日御用所忌 | string[] |
| bad act 3 | 忌3 | 取得本日民用所忌 | string[] |

## TheGods 类

当lunisolar加载theGods插件后，可通过`lunisolar().theGods`属性取得TheGos实列

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| lsr | 当前Lunisolar对象实例  | | Lunisolar |
| getGods(ymdh) | 取得神煞 | 参数默认为"MD", 可以是 "Y","M": "D": "H"的任一个或多个字符的组合，返回其对应的年神、月神、日神、时神或其组合 | [God[]](#god-类) |
| getGoodGods(ymdh) | 取得吉神 | 参数默认为"MD", 参数同上 | [God[]](#god-类) |
| getBadGods(ymdh) | 取得凶神 | 参数默认为"MD", 参数同上 | [God[]](#god-类) |
| getDuty12God() | 取得当日建除十二神（建、除、满...) | | [God](#god-类) |
| getLife12God(ymdh) | 取得长生十二神(长生、沐浴、冠帶...) | 参数可以是 "year"、"month"、"day"、 "hour"的其中一个 | [God](#god-类) |
| getActs(actType, returnKey, replacer) | 取得当日宜忌 | **actType**: 0 \| 1 \| 2 \| 3 <br> 指返回宜忌的分类<br> **returnKey**: boolean<br> 是否返回宜忌的key，默认为false, 即返回国际化翻译后的宜忌<br> **replacer**: { [key: string]: string } <br> 用于替换宜忌词条的字典对象| {good: string[], bad: string[]} |
| getGoodActs(actType, returnKey, replacer) | 取得当日所宜 | 参数与 getActs 方法一致 | string[] |
| getBadActs(actType, returnKey, replacer) | 取得当日所忌 | 参数与 getActs 方法一致 | string[] |
| getAllDayHourGods() | 取得整日各时辰的神煞 |  | God[][] |
| getLuckHours(luckType) | 取得整日各时辰的吉凶 | luckeType: 0 | 1 <br> 0: 按黄黑道十二神（即青龙明堂等）决定吉凶<br>
1：根据时辰的吉神凶神个数决定吉凶 | number[] |
| query(queryString) | 通过输入查询语句进行通用查询 | query: string | God \| God[] \| string[] \| null |

## God 类

通过theGods对象所取得的神煞，都是一个God对象，其包含以下属性：

| 属性或方法  | 描述 | 参数  | 返回类型 |
| --- | ---  | --- | --- |
| key | 取得神煞key，一般為其繁体中文名称 | | string |
| name | 取得神煞国际化翻译后的名称， | string |
| good | 神煞所宜 | | string[] |
| bad | 神煞所忌 | | string[] |
| cate | 神煞分类 | | 'year' \| 'month' \| 'day' \| 'hour' \| null |
| luckLevel | 神煞吉凶, 大于0为吉，小于0为凶 | | number |
