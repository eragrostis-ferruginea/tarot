import { useState, useRef, useEffect } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useTarotStore } from '@/stores/tarotStore'
import { useApiConfigStore } from '@/stores/apiConfigStore'
import { streamAIReading } from '@/services/aiService'
import { spreads } from '@/data/spreads'

const suitLabels: Record<string, string> = {
  wands: '权杖',
  cups: '圣杯',
  swords: '宝剑',
  pentacles: '星币',
}

function cleanMarkdown(text: string): string {
  let cleaned = text
  
  cleaned = cleaned.replace(/\*\*\*+/g, '**')
  
  cleaned = cleaned.replace(/(\*\*){2,}/g, '**')
  
  cleaned = cleaned.replace(/^\s*\*\s*/gm, '\n- ')
  
  cleaned = cleaned.replace(/^\s*\d+\.\s*/gm, (match) => {
    const numMatch = match.match(/(\d+)/)
    if (numMatch) {
      return `\n${numMatch[1]}. `
    }
    return match
  })
  
  cleaned = cleaned.replace(/——/g, '——')
  
  return cleaned.trim()
}

export default function Reading() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialSpreadId = searchParams.get('spread') || 'single'

  const {
    spreads: storeSpreads,
    readingResult,
    isReading,
    drawCards,
    setReadingResult,
    resetReading,
  } = useTarotStore()
  const { config, isConfigured } = useApiConfigStore()

  const [selectedSpreadId, setSelectedSpreadId] = useState(initialSpreadId)
  const [question, setQuestion] = useState('')
  const [stage, setStage] = useState<'select' | 'reveal' | 'complete'>('select')
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [interpretation, setInterpretation] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamError, setStreamError] = useState('')
  const abortRef = useRef(false)

  useEffect(() => {
    resetReading()
  }, [])

  const selectedSpread = spreads.find(s => s.id === selectedSpreadId) || spreads[0]

  const handleDraw = () => {
    if (!question.trim()) return
    drawCards(selectedSpreadId, question)
    setStage('reveal')
    setFlipped(selectedSpread.positions.map(() => false))
    setInterpretation('')
    setStreamError('')

    setTimeout(() => {
      setFlipped(selectedSpread.positions.map(() => true))
    }, 300)
  }

  const handleAIReading = async () => {
    if (!readingResult) return
    if (!isConfigured) {
      navigate('/settings')
      return
    }

    setIsStreaming(true)
    setStreamError('')
    setStage('complete')
    abortRef.current = false

    const cardsDesc = readingResult.drawnCards
      .map(
        (dc, i) =>
          `${readingResult.spread.positions[i].name}（${readingResult.spread.positions[i].description}）：${dc.card.name}（${dc.reversed ? '逆位' : '正位'}）— ${dc.card.keywords.join('、')}`
      )
      .join('\n')

    let accumulated = ''
    await streamAIReading(
      config,
      readingResult.question,
      cardsDesc,
      (chunk) => {
        if (abortRef.current) return
        accumulated += chunk
        setInterpretation(accumulated)
      },
      (error) => {
        setStreamError(error)
        setIsStreaming(false)
      }
    )
    setIsStreaming(false)
  }

  const handleReset = () => {
    resetReading()
    setStage('select')
    setFlipped([])
    setInterpretation('')
    setIsStreaming(false)
    setStreamError('')
  }

  if (!readingResult) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-cinzel text-4xl text-gold-400 text-center mb-8">占卜</h1>

        <div className="glass-card p-8 mb-8">
          <h2 className="font-cinzel text-xl text-gold-300 mb-4">选择牌阵</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {storeSpreads.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSpreadId(s.id)}
                className={`glass-card p-4 text-center transition-all duration-300 ${
                  selectedSpreadId === s.id
                    ? 'border-gold-500/50 bg-gold-500/5'
                    : 'hover:border-gold-500/30'
                }`}
              >
                <h3 className="font-cinzel text-sm text-gold-300">{s.name}</h3>
                <p className="text-xs text-mystic-400 mt-1">{s.positions.length} 张牌</p>
              </button>
            ))}
          </div>

          <h3 className="font-cinzel text-lg text-gold-300 mb-3">
            {selectedSpread.name} - {selectedSpread.positions.map(p => p.name).join(' · ')}
          </h3>
          <p className="text-mystic-400 text-sm mb-6">{selectedSpread.description}</p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入你想要占卜的问题..."
            className="w-full bg-mystic-800/50 border border-mystic-700/30 rounded-xl p-4 text-mystic-200 font-cormorant text-lg placeholder:text-mystic-600 focus:outline-none focus:border-gold-500/40 transition-colors resize-none h-32"
          />

          <button
            onClick={handleDraw}
            disabled={!question.trim()}
            className="btn-gold w-full mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="inline-block mr-2" size={18} />
            开始抽牌
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-cinzel text-3xl text-gold-400 text-center mb-6">{readingResult.spread.name}</h1>

      <div className="flex justify-center gap-4 md:gap-8 mb-10">
        {readingResult.drawnCards.map((dc, index) => (
          <div key={index} className="flex flex-col items-center" style={{ perspective: 1000 }}>
            <motion.div
              className="w-28 md:w-36 relative"
              animate={{ rotateY: flipped[index] ? 180 : 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="card-back aspect-[3/4] rounded-xl" 
                style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
              />
              <div
                className="glass-card p-3 aspect-[3/4] flex flex-col items-center justify-center text-center border-gold-500/20"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className="text-2xl font-cinzel text-gold-400 mb-1">{dc.card.name}</span>
                <span className="text-xs text-mystic-400 mb-2">{dc.card.nameEn}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  dc.reversed ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                }`}>
                  {dc.reversed ? '逆位' : '正位'}
                </span>
                <p className="text-xs text-mystic-300 mt-2">{readingResult.spread.positions[index].name}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {stage === 'reveal' && !isStreaming && !interpretation && (
        <div className="text-center">
          <button onClick={handleAIReading} className="btn-gold text-lg px-12 py-4">
            <Sparkles className="inline-block mr-2" size={20} />
            AI 解析
          </button>
          <button onClick={handleReset} className="btn-ghost ml-4">
            重新抽牌
          </button>
        </div>
      )}

      {(isStreaming || interpretation || streamError) && (
        <div className="glass-card p-8 mt-6">
          <h3 className="font-cinzel text-xl text-gold-400 mb-4">占卜解析</h3>
          <p className="text-mystic-400 text-sm mb-4">
            提问：{readingResult.question}
          </p>

          {streamError && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-cinzel text-sm mb-1">解析出错</p>
                <p className="text-red-400/80 text-sm">{streamError}</p>
              </div>
            </div>
          )}

          <div className="text-mystic-200 font-cormorant text-lg leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="font-cinzel text-2xl text-gold-400 mt-6 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="font-cinzel text-xl text-gold-400 mt-5 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="font-cinzel text-lg text-gold-400 mt-4 mb-2">{children}</h3>,
                h4: ({ children }) => <h4 className="font-cinzel text-base text-gold-400 mt-3 mb-2">{children}</h4>,
                p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="text-gold-300 font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic text-mystic-300">{children}</em>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-mystic-200">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-gold-500/50 pl-4 my-4 text-mystic-300 italic">{children}</blockquote>,
                code: ({ children }) => <code className="bg-mystic-800/60 text-gold-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                pre: ({ children }) => <pre className="bg-mystic-800/60 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">{children}</pre>,
                a: ({ href, children }) => <a href={href} className="text-mystic-400 hover:text-gold-300 underline transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>,
                hr: () => <hr className="border-mystic-700/50 my-6" />,
              }}
            >
              {cleanMarkdown(interpretation)}
            </ReactMarkdown>
            {isStreaming && <span className="inline-block w-0.5 h-5 bg-gold-400 animate-pulse ml-1" />}
          </div>

          {!isStreaming && interpretation && (
            <div className="mt-6 text-center">
              <button onClick={handleReset} className="btn-ghost">
                重新占卜
              </button>
            </div>
          )}
        </div>
      )}

      {!isConfigured && (
        <div className="flex items-start gap-3 p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl mt-6">
          <AlertCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-gold-300 font-cinzel text-sm mb-1">未配置 AI API</p>
            <p className="text-gold-400/60 text-sm">
              请在
              <button onClick={() => navigate('/settings')} className="text-gold-300 underline mx-1">设置页面</button>
              中配置 API 信息以使用 AI 解析功能
            </p>
          </div>
        </div>
      )}
    </div>
  )
}