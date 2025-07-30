import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface AIResponse {
  response: string
  model: string
  tokens: number
}

interface UseAIChatReturn {
  generateResponse: (message: string, context?: string) => Promise<string>
  isLoading: boolean
  lastTokens: number | null
  error: string | null
}

export const useAIChat = (): UseAIChatReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [lastTokens, setLastTokens] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateResponse = async (message: string, context?: string): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: functionError } = await supabase.functions.invoke('chat-ai', {
        body: { message, context }
      })

      if (functionError) {
        throw new Error(functionError.message)
      }

      if (data.error) {
        throw new Error(data.error)
      }

      const aiResponse: AIResponse = data
      setLastTokens(aiResponse.tokens)
      return aiResponse.response

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate AI response'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateResponse,
    isLoading,
    lastTokens,
    error
  }
}