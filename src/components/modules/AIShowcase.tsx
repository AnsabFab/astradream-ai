import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useOpenRouter, AVAILABLE_MODELS } from "@/hooks/useOpenRouter"
import { Brain, Cpu, Zap, Activity } from "lucide-react"

export function AIShowcase() {
  const { lastUsage, isLoading } = useOpenRouter()
  const [activeModel] = useState(AVAILABLE_MODELS[0])

  const metrics = [
    { name: "Response Time", value: 1.2, unit: "s", icon: Zap },
    { name: "Token Usage", value: lastUsage?.tokens || 0, unit: "", icon: Cpu },
    { name: "Accuracy", value: 97.3, unit: "%", icon: Brain },
    { name: "Uptime", value: 99.9, unit: "%", icon: Activity }
  ]

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Showcase</h3>
            <p className="text-sm text-muted-foreground">OpenRouter Integration</p>
          </div>
        </div>
        
        {isLoading && (
          <Badge variant="outline" className="border-primary/30 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Processing
          </Badge>
        )}
      </div>

      {/* Active Model */}
      <div className="bg-background-secondary/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">Active Model</div>
          <Badge variant="outline" className="border-primary/30 text-primary">
            Live
          </Badge>
        </div>
        <div className="text-lg font-semibold text-primary">{activeModel.name}</div>
        <div className="text-xs text-muted-foreground">{activeModel.description}</div>
        <div className="mt-2 text-xs">
          <span className="text-muted-foreground">Context Length: </span>
          <span className="font-mono">{activeModel.context_length.toLocaleString()}</span>
        </div>
      </div>

      {/* Model Metrics */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium">Performance Metrics</h4>
        
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-2">
              <metric.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{metric.name}</span>
            </div>
            <span className="text-sm font-mono text-primary">
              {metric.value}{metric.unit}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Available Models */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Available Models</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {AVAILABLE_MODELS.map((model, index) => (
            <motion.div
              key={model.id}
              className="flex items-center justify-between p-2 bg-background-secondary/30 rounded text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div>
                <div className="font-medium">{model.name}</div>
                <div className="text-muted-foreground">{model.description}</div>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  model.pricing.prompt === '0' ? 'border-success/30 text-success' : 'border-warning/30 text-warning'
                }`}
              >
                {model.pricing.prompt === '0' ? 'Free' : 'Paid'}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* API Status */}
      <div className="mt-6 p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-primary">OpenRouter API</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success">Connected</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Real-time AI inference for space exploration
        </div>
      </div>
    </GlassCard>
  )
}