import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allCards } from '@/data/tarotCards'

type Filter = 'all' | 'major' | 'minor'

const suitLabels: Record<string, string> = {
  wands: '权杖',
  cups: '圣杯',
  swords: '宝剑',
  pentacles: '星币',
}

export default function CardLibrary() {
  const [filter, setFilter] = useState<Filter>('all')
  const navigate = useNavigate()

  const filteredCards = filter === 'all'
    ? allCards
    : allCards.filter(c => c.arcana === filter)

  const filterLabels = [
    { key: 'all' as Filter, label: '全部', count: allCards.length },
    { key: 'major' as Filter, label: '大阿卡纳', count: allCards.filter(c => c.arcana === 'major').length },
    { key: 'minor' as Filter, label: '小阿卡纳', count: allCards.filter(c => c.arcana === 'minor').length },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-cinzel text-4xl text-gold-400 text-center mb-4">塔罗牌库</h1>
      <p className="text-center text-mystic-300 font-cormorant text-lg mb-10">
        探索 78 张塔罗牌的奥秘
      </p>

      <div className="flex justify-center gap-2 mb-10">
        {filterLabels.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-6 py-2 rounded-lg font-cinzel text-sm transition-all duration-300 ${
              filter === f.key
                ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                : 'text-mystic-300 hover:text-gold-300 border border-transparent'
            }`}
          >
            {f.label}
            <span className="ml-2 text-xs opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <button
            key={card.id}
            onClick={() => navigate(`/cards/${card.id}`)}
            className="glass-card p-5 text-center group hover:border-gold-500/40 transition-all duration-500 hover:translate-y-[-4px]"
          >
            <div className="card-back w-full aspect-[3/4] mb-4" />
            <span className="text-xs text-gold-500/60 font-cinzel">
              {card.arcana === 'major' ? '大阿卡纳' : suitLabels[card.suit || '']}
              {' '}· {card.arcana === 'major' ? (card.number === 0 ? '0' : card.number) : card.number}
            </span>
            <h3 className="font-cinzel text-base text-gold-300 mt-1">{card.name}</h3>
            <p className="text-xs text-mystic-400 mt-0.5">{card.nameEn}</p>
          </button>
        ))}
      </div>
    </div>
  )
}