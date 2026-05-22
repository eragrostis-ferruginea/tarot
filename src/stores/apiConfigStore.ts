import { create } from 'zustand'
import { ApiConfig } from '@/types/tarot'

interface ApiConfigState {
  config: ApiConfig
  isConfigured: boolean

  setConfig: (config: ApiConfig) => void
  clearConfig: () => void
}

const DEFAULT_CONFIG: ApiConfig = {
  endpoint: 'https://api.deepseek.com/v1/chat/completions',
  apiKey: '',
  model: 'deepseek-v4-flash',
}

function loadConfig(): ApiConfig {
  try {
    const saved = localStorage.getItem('tarot-api-config')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {}
  return DEFAULT_CONFIG
}

export const useApiConfigStore = create<ApiConfigState>((set) => ({
  config: loadConfig(),
  isConfigured: !!loadConfig().apiKey,

  setConfig: (config: ApiConfig) => {
    localStorage.setItem('tarot-api-config', JSON.stringify(config))
    set({ config, isConfigured: !!config.apiKey })
  },

  clearConfig: () => {
    localStorage.removeItem('tarot-api-config')
    set({ config: DEFAULT_CONFIG, isConfigured: false })
  },
}))