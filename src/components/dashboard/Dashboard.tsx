import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  LogOut, 
  User, 
  Rocket, 
  Brain, 
  Globe, 
  Satellite,
  Activity,
  Zap,
  Settings
} from 'lucide-react'
import { TerrainDemo } from '@/components/terrain/TerrainDemo'
import { OrbitalDemo } from '@/components/orbital/OrbitalDemo'
import { SpaceNavigator } from '@/components/modules/SpaceNavigator'
import { AIShowcase } from '@/components/modules/AIShowcase'
import { AstroScope } from '@/components/modules/AstroScope'
import { MissionControl } from '@/components/modules/MissionControl'
import { ChatOps } from '@/components/modules/ChatOps'
import spaceRoverImage from '@/assets/space-rover.jpg'
import nebulaSapceImage from '@/assets/nebula-space.jpg'

export const Dashboard = () => {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = async () => {
    await signOut()
  }

  const stats = [
    { icon: Rocket, label: 'Active Missions', value: '12', change: '+2' },
    { icon: Globe, label: 'Planets Scanned', value: '847', change: '+23' },
    { icon: Satellite, label: 'Satellites Online', value: '156', change: '+5' },
    { icon: Brain, label: 'AI Models', value: '8', change: '+1' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/43d9bc64-4efa-4219-9c70-1a205eece978.png" 
              alt="ASTRA-X" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold">Mission Control</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || 'Explorer'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400/50">
              <Activity className="h-3 w-3 mr-1" />
              Systems Online
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs text-green-400">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-1">
              <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="terrain" className="flex items-center gap-2 py-3">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Terrain</span>
              </TabsTrigger>
              <TabsTrigger value="orbital" className="flex items-center gap-2 py-3">
                <Rocket className="h-4 w-4" />
                <span className="hidden sm:inline">Orbital</span>
              </TabsTrigger>
              <TabsTrigger value="navigation" className="flex items-center gap-2 py-3">
                <Satellite className="h-4 w-4" />
                <span className="hidden sm:inline">Navigation</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2 py-3">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">AI</span>
              </TabsTrigger>
              <TabsTrigger value="astroscope" className="flex items-center gap-2 py-3">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">AstroScope</span>
              </TabsTrigger>
              <TabsTrigger value="chatops" className="flex items-center gap-2 py-3">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">ChatOps</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Mission Status</h3>
                  <div 
                    className="h-48 bg-cover bg-center rounded-lg mb-4"
                    style={{ backgroundImage: `url(${spaceRoverImage})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-background/80 to-transparent rounded-lg flex items-end p-4">
                      <div>
                        <Badge variant="default" className="mb-2">Active Mission</Badge>
                        <h4 className="font-semibold">Mars Reconnaissance</h4>
                        <p className="text-sm text-muted-foreground">Rover deployment in progress</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Deep Space Observations</h3>
                  <div 
                    className="h-48 bg-cover bg-center rounded-lg mb-4"
                    style={{ backgroundImage: `url(${nebulaSapceImage})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-background/80 to-transparent rounded-lg flex items-end p-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">Monitoring</Badge>
                        <h4 className="font-semibold">Orion Nebula</h4>
                        <p className="text-sm text-muted-foreground">Spectral analysis ongoing</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              <MissionControl />
            </TabsContent>

            <TabsContent value="terrain">
              <TerrainDemo />
            </TabsContent>

            <TabsContent value="orbital">
              <OrbitalDemo />
            </TabsContent>

            <TabsContent value="navigation">
              <SpaceNavigator />
            </TabsContent>

            <TabsContent value="ai">
              <AIShowcase />
            </TabsContent>

            <TabsContent value="astroscope">
              <AstroScope />
            </TabsContent>

            <TabsContent value="chatops">
              <ChatOps />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}