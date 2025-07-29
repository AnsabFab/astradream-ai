import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Satellite, Battery, Wifi, Thermometer, Fuel, Shield } from "lucide-react"

interface SystemStatus {
  power: number
  communication: number
  temperature: number
  fuel: number
  shields: number
  overall: 'optimal' | 'warning' | 'critical'
}

export function MissionControl() {
  const [systemStatus] = useState<SystemStatus>({
    power: 87,
    communication: 95,
    temperature: 78,
    fuel: 65,
    shields: 92,
    overall: 'optimal'
  })

  const [missionPhase] = useState("Orbital Survey")
  const [nextMilestone] = useState("Surface Landing Prep")
  const [timeToMilestone] = useState("14h 23m")

  const statusColor = {
    optimal: 'text-success',
    warning: 'text-warning', 
    critical: 'text-accent'
  }

  const getStatusValue = (value: number) => {
    if (value >= 80) return 'optimal'
    if (value >= 50) return 'warning'
    return 'critical'
  }

  const systemMetrics = [
    { name: 'Power Systems', icon: Battery, value: systemStatus.power, unit: '%' },
    { name: 'Communications', icon: Wifi, value: systemStatus.communication, unit: '%' },
    { name: 'Temperature', icon: Thermometer, value: systemStatus.temperature, unit: '°C' },
    { name: 'Fuel Reserves', icon: Fuel, value: systemStatus.fuel, unit: '%' },
    { name: 'Shield Integrity', icon: Shield, value: systemStatus.shields, unit: '%' }
  ]

  return (
    <GlassCard glow variant="green">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/20 rounded-lg">
            <Satellite className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Mission Control</h3>
            <p className="text-sm text-muted-foreground">System Status & Operations</p>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className={`border-success/30 ${statusColor[systemStatus.overall]}`}
        >
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
          System {systemStatus.overall.toUpperCase()}
        </Badge>
      </div>

      {/* Mission Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-background-secondary/50 rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Current Phase</div>
          <div className="text-lg font-semibold text-success">{missionPhase}</div>
        </div>
        <div className="bg-background-secondary/50 rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Next Milestone</div>
          <div className="text-sm font-medium">{nextMilestone}</div>
          <div className="text-xs text-muted-foreground">in {timeToMilestone}</div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium">System Metrics</h4>
        
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{metric.name}</span>
              </div>
              <span className={`text-sm font-mono ${statusColor[getStatusValue(metric.value)]}`}>
                {metric.value}{metric.unit}
              </span>
            </div>
            <Progress 
              value={metric.value} 
              className={`h-2 ${
                getStatusValue(metric.value) === 'optimal' ? 'bg-success/20' :
                getStatusValue(metric.value) === 'warning' ? 'bg-warning/20' :
                'bg-accent/20'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <CosmicButton variant="outline" size="sm">
            System Diagnostics
          </CosmicButton>
          <CosmicButton variant="outline" size="sm">
            Emergency Protocol
          </CosmicButton>
          <CosmicButton variant="outline" size="sm">
            Data Backup
          </CosmicButton>
          <CosmicButton variant="outline" size="sm">
            Course Correction
          </CosmicButton>
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
        <div className="text-sm font-medium text-success mb-2">Upcoming Events</div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Solar panel adjustment</span>
            <span>2h 15m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Communication window</span>
            <span>6h 42m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Asteroid field navigation</span>
            <span>12h 18m</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}