import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { allCards } from '@/data/tarotCards'

const suitLabels: Record<string, string> = {
  wands: '权杖',
  cups: '圣杯',
  swords: '宝剑',
  pentacles: '星币',
}

export default function CardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = allCards.find(c => c.id === Number(id))

  if (!card) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-cinzel text-2xl text-gold-400 mb-4">未找到该牌</h2>
        <button onClick={() => navigate('/cards')} className="btn-ghost">
          返回牌库
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate('/cards')}
        className="flex items-center gap-2 text-mystic-300 hover:text-gold-300 transition-colors mb-8 font-cinzel text-sm"
      >
        <ArrowLeft size={16} />
        返回牌库
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="card-back w-full aspect-[3/4] rounded-2xl">
            <span className="text-4xl text-gold-500/30 font-cinzel">?</span>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <span className="text-xs text-gold-500/60 font-cinzel uppercase tracking-wider">
              {card.arcana === 'major' ? '大阿卡纳' : `${suitLabels[card.suit || '']} · ${card.number}`}
              {' '}· 序号 {card.arcana === 'major' ? (card.number === 0 ? '0' : card.number) : card.number}
            </span>
          </div>
          <h1 className="font-cinzel text-4xl text-gold-400 mb-1">{card.name}</h1>
          <p className="text-mystic-400 font-cormorant text-xl italic mb-6">{card.nameEn}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {card.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 text-xs font-cinzel rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20"
              >
                {kw}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 gold-border">
              <h3 className="font-cinzel text-lg text-gold-400 mb-3">正位含义</h3>
              <p className="text-mystic-200 font-cormorant text-lg leading-relaxed">{card.meaningUpright}</p>
            </div>

            <div className="glass-card p-6 gold-border">
              <h3 className="font-cinzel text-lg text-gold-400 mb-3">逆位含义</h3>
              <p className="text-mystic-200 font-cormorant text-lg leading-relaxed">{card.meaningReversed}</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-cinzel text-lg text-gold-400 mb-3">牌面描述</h3>
              <p className="text-mystic-300 font-cormorant text-lg leading-relaxed">{card.description}</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-cinzel text-lg text-gold-400 mb-3">符号解析</h3>
              <p className="text-mystic-300 font-cormorant text-lg leading-relaxed">{card.symbolAnalysis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}