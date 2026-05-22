import { Spread } from '@/types/tarot'

export const spreads: Spread[] = [
  {
    id: 'single',
    name: '单张占卜',
    description: '快速获取当下的指引与启示',
    positions: [
      { name: '今日指引', description: '当前状况的核心能量' },
    ],
  },
  {
    id: 'three-card',
    name: '三张牌阵',
    description: '探索过去、现在与未来的能量流动',
    positions: [
      { name: '过去', description: '已发生的能量，对当前的影响' },
      { name: '现在', description: '当下的处境与核心问题' },
      { name: '未来', description: '可能的趋向与潜在发展' },
    ],
  },
  {
    id: 'cross',
    name: '十字牌阵',
    description: '全方位深入解析，洞察问题的本质',
    positions: [
      { name: '现状', description: '当前的核心状况' },
      { name: '挑战', description: '面临的困难与阻碍' },
      { name: '根源', description: '问题的深层原因' },
      { name: '建议', description: '行动方向的指引' },
      { name: '结果', description: '最终的可能结果' },
    ],
  },
]