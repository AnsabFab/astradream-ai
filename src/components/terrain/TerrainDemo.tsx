import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useOpenRouter } from '@/hooks/useOpenRouter'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scan, Brain, MapPin, AlertTriangle } from 'lucide-react'

const TerrainVisualization = () => {
  const [currentView, setCurrentView] = useState(0)
  
  const terrainViews = [
    '/lovable-uploads/1755cb5a-09e8-4f36-b7be-3d0cdf6989a6.png',
    '/lovable-uploads/11ddff10-bf79-4166-898a-d88f58e9b974.png',
    '/lovable-uploads/128d50da-164f-404c-8b80-d3043c167a2c.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % terrainViews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden group">
      <motion.img
        key={currentView}
        src={terrainViews[currentView]}
        alt="Terrain Analysis View"
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold">Terrain Sector {currentView + 1}</div>
          <div className="flex gap-1">
            {terrainViews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentView ? 'bg-primary' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const TerrainDemo = () => {
  const { generateSpaceAnalysis, isLoading } = useOpenRouter()
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanData, setScanData] = useState({
    elevation: 2847,
    composition: 'Iron-rich regolith',
    hazards: ['Sharp rocks', 'Steep gradient'],
    recommendation: 'Suitable for rover deployment'
  })

  useEffect(() => {
    // Simulate initial scan
    startTerrainAnalysis()
  }, [])

  const startTerrainAnalysis = async () => {
    setIsScanning(true)
    
    // Simulate scanning process
    setTimeout(() => {
      setScanData({
        elevation: Math.floor(Math.random() * 5000) + 1000,
        composition: ['Iron-rich regolith', 'Silicate minerals', 'Basaltic rock', 'Frozen water deposits'][Math.floor(Math.random() * 4)],
        hazards: [
          ['Sharp rocks', 'Steep gradient'],
          ['Dust storms', 'Temperature extremes'],
          ['Radiation exposure', 'Unstable ground'],
          ['Limited visibility', 'Equipment interference']
        ][Math.floor(Math.random() * 4)],
        recommendation: ['Suitable for rover deployment', 'Proceed with caution', 'Alternative route recommended', 'Ideal for sample collection'][Math.floor(Math.random() * 4)]
      })
    }, 2000)

    try {
      const context = `Terrain elevation: ${scanData.elevation}m, Composition: ${scanData.composition}, Detected hazards: ${scanData.hazards.join(', ')}`
      const result = await generateSpaceAnalysis(
        'Analyze this planetary terrain for landing site suitability and provide recommendations for exploration strategy.',
        context,
        'moonshotai/kimi-k2:free'
      )
      setAnalysisResult(result)
    } catch (error) {
      console.error('Analysis failed:', error)
      setAnalysisResult('Analysis temporarily unavailable. Manual assessment protocols engaged.')
    }
    
    setIsScanning(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Terrain Visualization */}
      <GlassCard className="p-6 h-96">
        <TerrainVisualization />
      </GlassCard>

      {/* Analysis Panel */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Terrain Analysis
          </h3>
          <Button 
            onClick={startTerrainAnalysis}
            disabled={isScanning || isLoading}
            size="sm"
            variant="outline"
          >
            <Scan className="h-4 w-4 mr-2" />
            {isScanning ? 'Scanning...' : 'New Scan'}
          </Button>
        </div>

        {/* Real-time Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Elevation</span>
            <div className="text-lg font-mono">{scanData.elevation}m</div>
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Composition</span>
            <Badge variant="secondary">{scanData.composition}</Badge>
          </div>
        </div>

        {/* Hazards */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Detected Hazards
          </span>
          <div className="flex flex-wrap gap-1">
            {scanData.hazards.map((hazard, i) => (
              <Badge key={i} variant="destructive" className="text-xs">
                {hazard}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Brain className="h-4 w-4" />
            AI Recommendation
          </span>
          <Badge variant="default">{scanData.recommendation}</Badge>
        </div>

        {/* Detailed Analysis */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-background/50 rounded-lg border border-border/50"
          >
            <h4 className="font-medium mb-2">Detailed Analysis</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysisResult}
            </p>
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            AI analysis in progress...
          </div>
        )}
      </GlassCard>
    </div>
  )
}