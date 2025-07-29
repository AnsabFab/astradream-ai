import { useState, useCallback } from 'react'

const OPENROUTER_API_KEY = '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'
const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1'

export interface OpenRouterModel {
  id: string
  name: string
  description: string
  context_length: number
  pricing: {
    prompt: string
    completion: string
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  model: string
}

export const useOpenRouter = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUsage, setLastUsage] = useState<{ tokens: number; model: string } | null>(null)

  const sendMessage = useCallback(async (
    messages: ChatMessage[],
    model: string = 'moonshotai/kimi-k2:free'
  ): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Astra-X Space Exploration AI'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data: OpenRouterResponse = await response.json()
      
      if (data.usage) {
        setLastUsage({
          tokens: data.usage.total_tokens,
          model: data.model
        })
      }

      const content = data.choices[0]?.message?.content
      return content || 'No response received'
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateSpaceAnalysis = useCallback(async (
    prompt: string,
    context: string = '',
    model: string = 'moonshotai/kimi-k2:free'
  ) => {
    const systemPrompt = `You are ASTRA-X, an advanced AI system designed for trans-planetary exploration and space mission analysis. You have deep knowledge of:
    - Planetary geology and atmospheric science
    - Space navigation and orbital mechanics
    - Astrobiology and life detection
    - Resource extraction and utilization
    - Mission planning and risk assessment
    
    Respond as an intelligent, precise space exploration AI with technical expertise. Keep responses concise but informative. Use scientific terminology when appropriate.`

    const messages: ChatMessage[] = [
      { role: 'system' as const, content: systemPrompt },
      ...(context ? [{ role: 'user' as const, content: `Context: ${context}` }] : []),
      { role: 'user' as const, content: prompt }
    ]

    return sendMessage(messages, model)
  }, [sendMessage])

  return {
    sendMessage,
    generateSpaceAnalysis,
    isLoading,
    error,
    lastUsage
  }
}

export const AVAILABLE_MODELS = [
  {
    id: 'moonshotai/kimi-k2:free',
    name: 'Kimi K2',
    description: 'Advanced AI for space exploration analysis',
    context_length: 32000,
    pricing: { prompt: '0', completion: '0' }
  },
  {
    id: 'meta-llama/llama-3.1-8b-instruct:free',
    name: 'LLaMA 3.1 8B',
    description: 'Fast and efficient for general tasks',
    context_length: 128000,
    pricing: { prompt: '0', completion: '0' }
  }
] as const