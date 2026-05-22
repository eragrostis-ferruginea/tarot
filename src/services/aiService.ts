import { ApiConfig } from '@/types/tarot'

const SYSTEM_PROMPT = `你是一位精通塔罗牌占卜的资深解读师。你的回答应该：
1. 温暖而富有洞察力
2. 结合正位/逆位的含义进行解读
3. 将牌义与用户的问题联系起来
4. 给予实际的生活建议和指引
5. 保持开放式的解读，不武断下结论
6. 使用中文回答，语言优美但平实

格式要求：
- 先对每张牌进行简要解读
- 然后综合分析所有牌面的关联
- 最后给出总结与建议`

export async function streamAIReading(
  config: ApiConfig,
  question: string,
  cardsDescription: string,
  onChunk: (text: string) => void,
  onError: (error: string) => void,
) {
  const userMessage = `用户的问题：${question}

抽到的牌面：
${cardsDescription}

请根据这些牌面进行分析解读。`

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        stream: true,
        temperature: 0.8,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      onError(`API 请求失败 (${response.status}): ${errorData}`)
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      onError('无法读取响应流')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === 'data: [DONE]') continue

        if (trimmed.startsWith('data: ')) {
          try {
            const json = JSON.parse(trimmed.slice(6))
            const content = json.choices?.[0]?.delta?.content || json.choices?.[0]?.delta?.reasoning_content || json.choices?.[0]?.message?.content || ''
            if (content) {
              onChunk(content)
            }
          } catch {
            // skip parse errors for incomplete chunks
          }
        }
      }
    }
  } catch (err) {
    onError(`网络错误: ${err instanceof Error ? err.message : '未知错误'}`)
  }
}