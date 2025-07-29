import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useOpenRouter } from "@/hooks/useOpenRouter"
import { Compass, Navigation, Zap, AlertTriangle } from "lucide-react"

interface NavigationData {
  coordinates: { lat: number; lon: number }
  heading: number
  speed: number
  altitude: number
  obstacles: string[]
  recommendation: string
}

export function SpaceNavigator() {
  const [isScanning, setIsScanning] = useState(false)
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null)
  const [thoughtProcess, setThoughtProcess] = useState<string[]>([])
  const { generateSpaceAnalysis, isLoading } = useOpenRouter()

  const simulateNavigation = async () => {
    setIsScanning(true)
    setThoughtProcess([])
    
    // Simulate real-time thought process
    const thoughts = [
      "Scanning terrain topology...",
      "Analyzing atmospheric conditions...", 
      "Detecting potential obstacles...",
      "Calculating optimal trajectory...",
      "Cross-referencing mission parameters...",
      "Generating navigation recommendation..."
    ]

    for (let i = 0; i < thoughts.length; i++) {
      setTimeout(() => {
        setThoughtProcess(prev => [...prev, thoughts[i]])
      }, i * 800)
    }

    // Generate AI analysis
    const prompt = `You are navigating a Mars rover. Current coordinates: 14.5234°S, 175.4567°W. 
    Detected obstacles: large boulder field, dust storm approaching from northeast, steep crater edge 200m ahead.
    Mission objective: Reach geological sampling site at coordinates 14.5180°S, 175.4520°W.
    Provide navigation analysis and recommendation.`

    try {
      const analysis = await generateSpaceAnalysis(prompt, "Mars surface navigation mission")
      
      setTimeout(() => {
        setNavigationData({
          coordinates: { lat: -14.5234, lon: -175.4567 },
          heading: 285,
          speed: 0.8,
          altitude: 1247,
          obstacles: ["Boulder field (50m)", "Dust storm (2.3km)", "Crater edge (200m)"],
          recommendation: analysis
        })
        setIsScanning(false)
      }, 5000)
    } catch (error) {
      setIsScanning(false)
      console.error('Navigation analysis failed:', error)
    }
  }

  useEffect(() => {
    // Auto-start navigation on mount
    simulateNavigation()
  }, [])

  return (
    <GlassCard className="col-span-2" glow variant="purple">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Navigation className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Space Navigator</h3>
            <p className="text-sm text-muted-foreground">Autonomous planetary surface navigation</p>
          </div>
        </div>
        <CosmicButton 
          variant="cosmic" 
          size="sm" 
          onClick={simulateNavigation}
          disabled={isScanning}
        >
          {isScanning ? "Analyzing..." : "New Scan"}
        </CosmicButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Navigation Status */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-secondary/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Coordinates</div>
              <div className="font-mono text-sm">
                {navigationData ? 
                  `${navigationData.coordinates.lat.toFixed(4)}°, ${navigationData.coordinates.lon.toFixed(4)}°` :
                  "Calculating..."
                }
              </div>
            </div>
            <div className="bg-background-secondary/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Heading</div>
              <div className="font-mono text-sm flex items-center">
                <Compass className="w-4 h-4 mr-1" />
                {navigationData ? `${navigationData.heading}°` : "---"}
              </div>
            </div>
            <div className="bg-background-secondary/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Speed (m/s)</div>
              <div className="font-mono text-sm">
                {navigationData ? navigationData.speed : "0.0"}
              </div>
            </div>
            <div className="bg-background-secondary/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Altitude (m)</div>
              <div className="font-mono text-sm">
                {navigationData ? navigationData.altitude : "---"}
              </div>
            </div>
          </div>

          {/* Obstacles */}
          {navigationData && (
            <div>
              <div className="text-sm font-medium mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                Detected Obstacles
              </div>
              <div className="space-y-2">
                {navigationData.obstacles.map((obstacle, index) => (
                  <Badge key={index} variant="outline" className="mr-2 border-warning/30 text-warning">
                    {obstacle}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Thoughts Panel */}
        <div className="bg-background-secondary/30 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Zap className="w-4 h-4 mr-2 text-secondary" />
            <span className="text-sm font-medium">AI Reasoning Process</span>
          </div>
          
          <div className="space-y-2 h-40 overflow-y-auto">
            <AnimatePresence>
              {thoughtProcess.map((thought, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono text-muted-foreground flex items-center"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse" />
                  {thought}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isScanning && (
              <motion.div className="mt-4">
                <Progress value={((thoughtProcess.length / 6) * 100)} className="h-2" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      {navigationData && (
        <motion.div 
          className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm font-medium text-primary mb-2">AI Navigation Recommendation</div>
          <p className="text-sm text-muted-foreground">{navigationData.recommendation}</p>
        </motion.div>
      )}
    </GlassCard>
  )
}