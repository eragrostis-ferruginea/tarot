import { useNavigate } from 'react-router-dom'
import { Stars, LayoutGrid, Cross } from 'lucide-react'
import { spreads } from '@/data/spreads'

const spreadIcons = [Stars, LayoutGrid, Cross]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <div className="animate-fade-in">
          <h1 className="font-cinzel text-6xl md:text-8xl font-bold text-gold-400 text-glow mb-6">
            命运之轮
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-mystic-200 italic mb-8">
            倾听内心的声音，揭开命运的面纱
          </p>
          <div className="text-gold-500/60 text-2xl mb-12 tracking-[1em]">
            ✦ ✦ ✦
          </div>
          <button
            onClick={() => navigate('/reading')}
            className="btn-gold text-lg px-12 py-4"
          >
            开始占卜
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="font-cinzel text-3xl text-center text-gold-300 mb-4">
          选择牌阵
        </h2>
        <p className="text-center text-mystic-300 font-cormorant text-lg mb-12">
          不同的牌阵揭示不同层面的答案
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {spreads.map((spread, index) => {
            const IconComponent = spreadIcons[index]
            return (
              <div
                key={spread.id}
                className="glass-card p-8 flex flex-col items-center text-center group hover:border-gold-500/40 transition-all duration-500 hover:translate-y-[-4px]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="font-cinzel text-xl text-gold-300 mb-3">{spread.name}</h3>
                <p className="text-mystic-300 font-cormorant text-lg mb-6">{spread.description}</p>
                <button
                  onClick={() => navigate(`/reading?spread=${spread.id}`)}
                  className="btn-ghost text-sm"
                >
                  选择此牌阵
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}