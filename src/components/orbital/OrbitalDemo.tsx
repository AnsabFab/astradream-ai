import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Ring } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useOpenRouter } from '@/hooks/useOpenRouter'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rocket, Orbit, Fuel, Gauge } from 'lucide-react'

interface OrbitingObjectProps {
  radius: number
  speed: number
  color: string
  size?: number
}

const OrbitingObject = ({ radius, speed, color, size = 0.2 }: OrbitingObjectProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(time) * radius
      meshRef.current.position.z = Math.sin(time) * radius
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  )
}

const SpaceStation = () => {
  const stationRef = useRef<THREE.Group>(null!)
  
  useFrame(() => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={stationRef}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.7]}>
        <boxGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      <mesh position={[0, 0, -0.7]}>
        <boxGeometry args={[0.2, 0.2, 0.4]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  )
}

const OrbitalScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFA500" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#4169E1" />
      
      {/* Central Star */}
      <Sphere position={[0, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color="#FFA500" emissive="#FFA500" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Orbital Rings */}
      <Ring args={[2, 2.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.3} />
      </Ring>
      <Ring args={[3, 3.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
      </Ring>
      <Ring args={[4, 4.05, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} />
      </Ring>
      
      {/* Orbiting Objects */}
      <OrbitingObject radius={2} speed={1} color="#60A5FA" size={0.15} />
      <OrbitingObject radius={3} speed={0.7} color="#10B981" size={0.2} />
      <OrbitingObject radius={4} speed={0.5} color="#F59E0B" size={0.25} />
      
      {/* Space Station */}
      <group position={[2.5, 0, 0]}>
        <SpaceStation />
      </group>
      
      <Text
        position={[0, 5, 0]}
        fontSize={0.4}
        color="#60A5FA"
        anchorX="center"
        anchorY="middle"
      >
        Orbital Launch Trajectory
      </Text>
      
      <OrbitControls enablePan={false} maxDistance={12} minDistance={6} />
    </>
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
      {/* 3D Orbital Visualization */}
      <GlassCard className="p-6 h-96">
        <div className="h-full w-full rounded-lg overflow-hidden bg-background">
          <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
            <OrbitalScene />
          </Canvas>
        </div>
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