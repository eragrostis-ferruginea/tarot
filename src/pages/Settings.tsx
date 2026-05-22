import { useState } from 'react'
import { useApiConfigStore } from '@/stores/apiConfigStore'
import { CheckCircle, AlertCircle, Save, Trash2 } from 'lucide-react'

export default function Settings() {
  const { config, setConfig, clearConfig } = useApiConfigStore()
  const [form, setForm] = useState({ ...config })
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [testMessage, setTestMessage] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setConfig(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    clearConfig()
    setForm({ endpoint: '', apiKey: '', model: '' })
  }

  const handleTest = async () => {
    setTestStatus('testing')
    setTestMessage('')
    try {
      const response = await fetch(form.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${form.apiKey}`,
        },
        body: JSON.stringify({
          model: form.model,
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 10,
        }),
      })

      if (response.ok) {
        setTestStatus('success')
        setTestMessage('连接成功！API 正常工作。')
      } else {
        const err = await response.text()
        setTestStatus('error')
        setTestMessage(`连接失败 (${response.status}): ${err}`)
      }
    } catch (err) {
      setTestStatus('error')
      setTestMessage(`网络错误: ${err instanceof Error ? err.message : '无法连接到服务器'}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-cinzel text-4xl text-gold-400 text-center mb-4">设置</h1>
      <p className="text-center text-mystic-300 font-cormorant text-lg mb-10">
        配置 AI API 以获得智能解析服务
      </p>

      <div className="glass-card p-8 space-y-6">
        <div>
          <label className="block font-cinzel text-sm text-gold-300 mb-2">API Endpoint</label>
          <input
            type="url"
            value={form.endpoint}
            onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
            placeholder="https://api.deepseek.com/v1/chat/completions"
            className="w-full bg-mystic-800/50 border border-mystic-700/30 rounded-xl p-4 text-mystic-200 font-cormorant placeholder:text-mystic-600 focus:outline-none focus:border-gold-500/40 transition-colors"
          />
        </div>

        <div>
          <label className="block font-cinzel text-sm text-gold-300 mb-2">API Key</label>
          <input
            type="password"
            value={form.apiKey}
            onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-mystic-800/50 border border-mystic-700/30 rounded-xl p-4 text-mystic-200 font-cormorant placeholder:text-mystic-600 focus:outline-none focus:border-gold-500/40 transition-colors"
          />
        </div>

        <div>
          <label className="block font-cinzel text-sm text-gold-300 mb-2">Model</label>
          <input
            type="text"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="deepseek-v4-flash"
            className="w-full bg-mystic-800/50 border border-mystic-700/30 rounded-xl p-4 text-mystic-200 font-cormorant placeholder:text-mystic-600 focus:outline-none focus:border-gold-500/40 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={handleSave} className="btn-gold flex items-center gap-2">
            <Save size={16} />
            {saved ? '已保存' : '保存配置'}
          </button>
          <button onClick={handleClear} className="btn-ghost flex items-center gap-2">
            <Trash2 size={16} />
            清除
          </button>
          <button
            onClick={handleTest}
            disabled={testStatus === 'testing' || !form.endpoint || !form.apiKey}
            className="px-6 py-3 border border-mystic-600/50 text-mystic-300 font-cinzel rounded-lg hover:bg-mystic-800/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {testStatus === 'testing' ? '测试中...' : '测试连接'}
          </button>
        </div>

        {testStatus === 'success' && (
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-sm">{testMessage}</p>
          </div>
        )}

        {testStatus === 'error' && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{testMessage}</p>
          </div>
        )}
      </div>

      <div className="glass-card p-6 mt-6">
        <h3 className="font-cinzel text-sm text-gold-400 mb-3">支持的 API 格式</h3>
        <p className="text-mystic-400 text-sm leading-relaxed">
          本应用兼容 OpenAI API 格式的接口。输入完整的 API Endpoint 地址即可使用。
        </p>
        <div className="mt-3 space-y-1.5 text-xs text-mystic-500 font-cormorant">
          <p className="text-mystic-400">• <span className="text-gold-500/80">DeepSeek V4</span>: <code className="text-mystic-300 bg-mystic-800/60 px-1.5 py-0.5 rounded">https://api.deepseek.com/v1/chat/completions</code> / deepseek-v4-flash / deepseek-v4-pro</p>
          <p className="text-mystic-400">• <span className="text-gold-500/80">OpenAI</span>: <code className="text-mystic-300 bg-mystic-800/60 px-1.5 py-0.5 rounded">https://api.openai.com/v1/chat/completions</code> / gpt-4o</p>
          <p className="text-mystic-400">• <span className="text-gold-500/80">通义千问</span>: <code className="text-mystic-300 bg-mystic-800/60 px-1.5 py-0.5 rounded">https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions</code> / qwen-plus</p>
        </div>
      </div>
    </div>
  )
}