import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useOpenRouter } from '@/hooks/useOpenRouter'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rocket, Orbit, Fuel, Gauge } from 'lucide-react'

const OrbitalVisualization = () => {
  const [orbitPhase, setOrbitPhase] = useState(0)
  const [transferProgress, setTransferProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitPhase((prev) => (prev + 2) % 360)
      setTransferProgress((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      {/* Space background */}
      <img
        src="/lovable-uploads/3e75f04b-4b99-4d8f-9d94-85e0f7dd0de1.png"
        alt="Hohmann Transfer Visualization"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Orbital simulation overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Central Earth */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/50">
            <div className="absolute inset-1 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-80" />
          </div>
          
          {/* Target Moon */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gray-400/50"
            animate={{
              x: Math.cos(orbitPhase * Math.PI / 180) * 100,
              y: Math.sin(orbitPhase * Math.PI / 180) * 100,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          
          {/* Spacecraft */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-sm transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-yellow-300/70"
            animate={{
              x: Math.cos((orbitPhase + transferProgress * 3.6) * Math.PI / 180) * (60 + transferProgress * 0.4),
              y: Math.sin((orbitPhase + transferProgress * 3.6) * Math.PI / 180) * (60 + transferProgress * 0.4),
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          
          {/* Earth orbit */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-blue-300/40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Moon orbit */}
          <div className="absolute top-1/2 left-1/2 w-52 h-52 border border-gray-300/40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Transfer ellipse */}
          <div className="absolute top-1/2 left-1/2 w-40 h-28 border border-yellow-300/50 border-dashed rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-white font-semibold drop-shadow-lg">Hohmann Transfer Trajectory</div>
        <div className="text-white/80 text-sm drop-shadow-lg">Transfer Progress: {transferProgress}%</div>
      </div>
    </div>
  )
}

export const OrbitalDemo = () => {
  const { generateSpaceAnalysis, isLoading } = useOpenRouter()
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [launchData, setLaunchData] = useState({
    velocity: 11.2,
    altitude: 408,
    fuel: 85,
    trajectory: 'Nominal',
    nextWindow: '14:32 UTC'
  })

  useEffect(() => {
    // Start initial calculation
    calculateTrajectory()
  }, [])

  const calculateTrajectory = async () => {
    setIsCalculating(true)
    
    // Simulate calculation process
    setTimeout(() => {
      setLaunchData({
        velocity: +(Math.random() * 5 + 9).toFixed(1),
        altitude: Math.floor(Math.random() * 200) + 300,
        fuel: Math.floor(Math.random() * 20) + 80,
        trajectory: ['Nominal', 'Adjusted', 'Optimal', 'Critical'][Math.floor(Math.random() * 4)],
        nextWindow: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} UTC`
      })
    }, 1500)

    try {
      const context = `Launch velocity: ${launchData.velocity} km/s, Target altitude: ${launchData.altitude} km, Fuel level: ${launchData.fuel}%`
      const result = await generateSpaceAnalysis(
        'Calculate optimal orbital insertion parameters and provide launch window recommendations for this mission profile.',
        context,
        'moonshotai/kimi-k2:free'
      )
      setAnalysisResult(result)
    } catch (error) {
      console.error('Trajectory calculation failed:', error)
      setAnalysisResult('Trajectory calculations offline. Using backup navigation systems.')
    }
    
    setIsCalculating(false)
  }

  const getTrajectoryColor = (trajectory: string) => {
    switch (trajectory) {
      case 'Optimal': return 'default'
      case 'Nominal': return 'secondary'
      case 'Adjusted': return 'outline'
      case 'Critical': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Orbital Visualization */}
      <GlassCard className="p-6 h-96">
        <OrbitalVisualization />
      </GlassCard>

      {/* Launch Control Panel */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Launch Control
          </h3>
          <Button 
            onClick={calculateTrajectory}
            disabled={isCalculating || isLoading}
            size="sm"
            variant="outline"
          >
            <Orbit className="h-4 w-4 mr-2" />
            {isCalculating ? 'Calculating...' : 'Recalculate'}
          </Button>
        </div>

        {/* Mission Parameters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Escape Velocity</span>
            <div className="text-lg font-mono">{launchData.velocity} km/s</div>
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Target Altitude</span>
            <div className="text-lg font-mono">{launchData.altitude} km</div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            Fuel Level
          </span>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${launchData.fuel}%` }}
              />
            </div>
            <span className="text-sm font-mono">{launchData.fuel}%</span>
          </div>
        </div>

        {/* Trajectory Status */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            Trajectory Status
          </span>
          <Badge variant={getTrajectoryColor(launchData.trajectory)}>
            {launchData.trajectory}
          </Badge>
        </div>

        {/* Next Launch Window */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Next Launch Window</span>
          <div className="text-lg font-mono text-primary">{launchData.nextWindow}</div>
        </div>

        {/* AI Analysis */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-background/50 rounded-lg border border-border/50"
          >
            <h4 className="font-medium mb-2">Mission Analysis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysisResult}
            </p>
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            AI trajectory analysis in progress...
          </div>
        )}
      </GlassCard>
    </div>
  )
}