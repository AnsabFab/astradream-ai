import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useOpenRouter, AVAILABLE_MODELS } from "@/hooks/useOpenRouter"
import { MessageCircle, Send, Bot, User, Settings } from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: string
}

export function ChatOps() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'ASTRA-X operational. I am your autonomous space exploration AI assistant. How can I help with your mission today?',
      timestamp: new Date(),
      model: 'ASTRA-X Core'
    }
  ])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_MODELS[0].id)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { generateSpaceAnalysis, isLoading, lastUsage } = useOpenRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")

    try {
      const response = await generateSpaceAnalysis(input, "", selectedModel)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        model: AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        model: 'Error Handler'
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickCommands = [
    "What's our current oxygen level?",
    "Scan for nearby asteroids",
    "Calculate trajectory to Mars",
    "System status report"
  ]

  return (
    <GlassCard className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Interplanetary ChatOps</h3>
            <p className="text-sm text-muted-foreground">AI Mission Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {lastUsage && (
            <Badge variant="outline" className="text-xs">
              {lastUsage.tokens} tokens
            </Badge>
          )}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-xs bg-background-secondary border border-glass-border rounded px-2 py-1"
          >
            {AVAILABLE_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-secondary/20' 
                  : 'bg-primary/20'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-secondary/20 text-secondary-foreground'
                    : 'bg-background-secondary/50'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.model && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{message.model}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start space-x-3"
          >
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-background-secondary/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                <span className="text-xs text-muted-foreground ml-2">ASTRA-X thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Commands */}
      <div className="mb-3">
        <div className="text-xs text-muted-foreground mb-2">Quick Commands:</div>
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((command, index) => (
            <button
              key={index}
              onClick={() => setInput(command)}
              className="text-xs bg-background-secondary/50 hover:bg-primary/20 border border-glass-border rounded px-2 py-1 transition-colors"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask ASTRA-X anything about your mission..."
          className="flex-1 bg-background-secondary/50 border-glass-border"
          disabled={isLoading}
        />
        <CosmicButton 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          size="icon"
        >
          <Send className="w-4 h-4" />
        </CosmicButton>
      </div>
    </GlassCard>
  )
}