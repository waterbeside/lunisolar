export const TEN_GOD_LIST = [
  '正官',
  '七殺',
  '正財',
  '偏財',
  '食神',
  '傷官',
  '比肩',
  '劫財',
  '正印',
  '梟神'
] as const

export type TenGodKeys = (typeof TEN_GOD_LIST)[number]

export const TEN_GOD_RELATIONS = {
  // 我生者
  generating: ['食神', '傷官'],
  // 生我者
  weakening: ['梟神', '正印'],
  // 同我者
  sibling: ['比肩', '劫財'],
  // 我克者
  overcoming: ['偏財', '正財'],
  // 克我者
  counteracting: ['七殺', '正官']
} as const
