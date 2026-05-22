import { create } from 'zustand'
import { TarotCard, DrawnCard, Spread, ReadingResult } from '@/types/tarot'
import { allCards } from '@/data/tarotCards'
import { spreads } from '@/data/spreads'

interface TarotState {
  allCards: TarotCard[]
  spreads: Spread[]
  readingResult: ReadingResult | null
  isReading: boolean

  drawCards: (spreadId: string, question: string) => void
  setReadingResult: (result: ReadingResult | null) => void
  resetReading: () => void
}

export const useTarotStore = create<TarotState>((set, get) => ({
  allCards,
  spreads,
  readingResult: null,
  isReading: false,

  drawCards: (spreadId: string, question: string) => {
    const spread = spreads.find(s => s.id === spreadId)!
    const cards = [...allCards]
    const drawnCards: DrawnCard[] = []

    for (const position of spread.positions) {
      const randomIndex = Math.floor(Math.random() * cards.length)
      const card = cards.splice(randomIndex, 1)[0]
      const reversed = Math.random() < 0.3

      drawnCards.push({ card, position, reversed })
    }

    const result: ReadingResult = {
      drawnCards,
      spread,
      question,
      interpretation: '',
    }

    set({ readingResult: result, isReading: false })
  },

  setReadingResult: (result) => set({ readingResult: result }),

  resetReading: () => set({ readingResult: null, isReading: false }),
}))