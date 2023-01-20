## 2.0.0 (2023-01-20)

* feat: 八字功能增強(神煞、十神等) ([026bd65](https://github.com/waterbeside/lunisolar/commit/026bd65))
* feat: 补充插件的简体中文翻译 ([a622dca](https://github.com/waterbeside/lunisolar/commit/a622dca))
* feat: 补充旬空 ([ec33ae4](https://github.com/waterbeside/lunisolar/commit/ec33ae4))
* feat: 地支六合、相刑、相害、相破等方法 ([bb580f4](https://github.com/waterbeside/lunisolar/commit/bb580f4))
* feat: 计算地支三合的五行 ([9c85d14](https://github.com/waterbeside/lunisolar/commit/9c85d14))
* feat: 五行、天干、地支等类添加name 属性 ([e754979](https://github.com/waterbeside/lunisolar/commit/e754979))
* feat: defineLocale ([6bdb9c1](https://github.com/waterbeside/lunisolar/commit/6bdb9c1))
* feat: Element5类添加“取得五行关系”相关方法 ([df896ed](https://github.com/waterbeside/lunisolar/commit/df896ed))
* feat: Lunisolar类补充year, month, day, hour 等属性 ([2747027](https://github.com/waterbeside/lunisolar/commit/2747027))
* feat(char8ex): 胎元，命宫，身宫查询 ([c9b426b](https://github.com/waterbeside/lunisolar/commit/c9b426b))
* feat(class SB): 添加`missing` 属性取得旬空地支 ([e407d13](https://github.com/waterbeside/lunisolar/commit/e407d13))


## [1.4.1](https://github.com/waterbeside/lunisolar/compare/v1.4.0...v1.4.1) (2022-11-24)


### Bug Fixes

* 修复“取不到阴历三十日”的问题 [#3](https://github.com/waterbeside/lunisolar/issues/3) ([b9b0945](https://github.com/waterbeside/lunisolar/commit/b9b09454d11e4a3b7422b038afe505c2108ff5e7))



# [1.4.0](https://github.com/waterbeside/lunisolar/compare/v1.3.1...v1.4.0) (2022-11-18)


### Features

* 八卦、天干、地支、五行 等类添加create方法以代替new构造函数 ([379bd99](https://github.com/waterbeside/lunisolar/commit/379bd9920b4795c6f969765e2b11ed5b8e451573))
* 吉神方 ([d16224b](https://github.com/waterbeside/lunisolar/commit/d16224bfe384a3c724833beb48d57422097dbdc8))
* 添加二十四山类 ([8883861](https://github.com/waterbeside/lunisolar/commit/888386127534b215c12d86b9dbd7aaf8cdd247d2))
* 阴历反查 ([4ad839a](https://github.com/waterbeside/lunisolar/commit/4ad839a1236a499309131a7330b2a5cb2fc93e19))



## [1.3.1](https://github.com/waterbeside/lunisolar/compare/v1.3.0...v1.3.1) (2022-11-07)


### Bug Fixes

* 修复“2018.12月取不到在大雪之前的日期（12.01~12.06）的月柱"的问题 [#2](https://github.com/waterbeside/lunisolar/issues/2) ([ccc217d](https://github.com/waterbeside/lunisolar/commit/ccc217dffee86e1d9bf14a132cd7ad55e5c5db6b))



# [1.3.0](https://github.com/waterbeside/lunisolar/compare/v1.2.0...v1.3.0) (2022-11-02)


### Bug Fixes

* 修正简体中文没加载成功的问题 ([e722d77](https://github.com/waterbeside/lunisolar/commit/e722d77c5ff04aadf8fe47adbff0709590eaae07))
* 移除宜忌词条重复出现的字 ([2a0a073](https://github.com/waterbeside/lunisolar/commit/2a0a0735a74d593d52af7fe70b0b32badbaca5b0))


### Features

* 添加神煞简体中文语言包 ([365b93d](https://github.com/waterbeside/lunisolar/commit/365b93dd3b6aab512e0c96b9d522708b89869170))



# [1.2.0](https://github.com/waterbeside/lunisolar/compare/v1.1.0...v1.2.0) (2022-10-28)

### Features

* 取得全日各时辰吉凶神煞，各时辰吉凶 ([2e8f798](https://github.com/waterbeside/lunisolar/commit/2e8f7985c76b332c55b46ea311567acff7461272))
* 神煞类添加别称属性 ([271104d](https://github.com/waterbeside/lunisolar/commit/271104db10bf26395f1a673f4d8f63160e168a93))



# [1.1.0](https://github.com/waterbeside/lunisolar/compare/v1.0.0...v1.1.0) (2022-10-25)


### Bug Fixes

* 修正错误的宜忌key ([540399d](https://github.com/waterbeside/lunisolar/commit/540399de7b2d1dcd29eb11e8cc63b7700e86afdb))


### Features

*  标识吉凶神煞 ([56d1cc0](https://github.com/waterbeside/lunisolar/commit/56d1cc0c49bc3c7a002db7d97ceb7eeb2d474fd6))
* 通过theGods.getGoodGods和theGods.getBadGods方法取得吉神、凶神 ([e863485](https://github.com/waterbeside/lunisolar/commit/e863485052b6da84bbbf2355117307ecc5193ff3))



# [1.0.0](https://github.com/waterbeside/lunisolar/compare/v0.2.0...v1.0.0) (2022-10-22)


### Features

* 神煞宜忌。 ([3d5b10](https://github.com/waterbeside/lunisolar/commit/3d5b10dd979f506ac3f02d047e05bdebb0afa9d9))
* 取得月相 ([de3c175](https://github.com/waterbeside/lunisolar/commit/de3c175fd370800ee09e9c75a2238fce959a2ad4))
* Lunar加入lastDayOfYear，以取得除历年最后一天。 ([4ac0568](https://github.com/waterbeside/lunisolar/commit/4ac0568483d95afafedcb4759213d414c1fffce5))
* Lunisolar.add(value, unit) 方法 ([80847f6](https://github.com/waterbeside/lunisolar/commit/80847f6675f598fe0db964baa60ce1580de6898c))


# [0.2.0](https://github.com/waterbeside/lunisolar/compare/v0.1.0...v0.2.0) (2022-08-26)


### Features

*  建除十二神 ([f19065a](https://github.com/waterbeside/lunisolar/commit/f19065a87c994b2b4e467a6fe80f7c5a3eb898dd))
* 修改Lunisolar.toString()返回内容 ([19704eb](https://github.com/waterbeside/lunisolar/commit/19704eb25c423434d067b6d171a442eb8aa9a0cf))

