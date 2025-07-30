import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useOpenRouter } from '@/hooks/useOpenRouter'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scan, Brain, MapPin, AlertTriangle } from 'lucide-react'

interface TerrainMeshProps {
  position: [number, number, number]
  color: string
  scale?: number
}

const TerrainMesh = ({ position, color, scale = 1 }: TerrainMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
    </mesh>
  )
}

const TerrainScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Simple Terrain Elements */}
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#228B22" roughness={0.7} metalness={0.3} />
      </mesh>
      
      <OrbitControls enablePan={false} maxDistance={10} minDistance={3} />
    </>
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
      {/* 3D Terrain Visualization */}
      <GlassCard className="p-6 h-96">
        <div className="h-full w-full rounded-lg overflow-hidden bg-background">
          <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
            <TerrainScene />
          </Canvas>
        </div>
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