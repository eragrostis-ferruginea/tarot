export interface TarotCard {
  id: number
  name: string
  nameEn: string
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  number: number
  keywords: string[]
  meaningUpright: string
  meaningReversed: string
  description: string
  symbolAnalysis: string
}

export interface SpreadPosition {
  name: string
  description: string
}

export interface Spread {
  id: string
  name: string
  description: string
  positions: SpreadPosition[]
}

export interface DrawnCard {
  card: TarotCard
  position: SpreadPosition
  reversed: boolean
}

export interface ApiConfig {
  endpoint: string
  apiKey: string
  model: string
}

export interface ReadingResult {
  drawnCards: DrawnCard[]
  spread: Spread
  question: string
  interpretation: string
}