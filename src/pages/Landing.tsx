import { motion } from 'framer-motion'
import { HeroSection } from '@/components/landing/HeroSection'
import { FoundersSection } from '@/components/founders/FoundersSection'
import { TerrainDemo } from '@/components/terrain/TerrainDemo'
import { OrbitalDemo } from '@/components/orbital/OrbitalDemo'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Rocket, 
  Globe, 
  Zap, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface LandingProps {
  onGetStarted: () => void
}

export const Landing = ({ onGetStarted }: LandingProps) => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Analysis',
      description: 'Real-time terrain analysis and mission planning powered by cutting-edge AI models'
    },
    {
      icon: Rocket,
      title: 'Orbital Mechanics',
      description: 'Precise trajectory calculations and launch window optimization for any mission'
    },
    {
      icon: Globe,
      title: 'Planetary Mapping',
      description: 'Comprehensive geological surveys and resource identification across worlds'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant data analysis and decision making for critical mission moments'
    },
    {
      icon: Shield,
      title: 'Mission Safety',
      description: 'Advanced hazard detection and risk assessment for crew and equipment protection'
    },
    {
      icon: Sparkles,
      title: 'Predictive Insights',
      description: 'Machine learning algorithms that anticipate challenges before they occur'
    }
  ]

  const benefits = [
    'Reduce mission planning time by 75%',
    'Increase exploration accuracy by 99.9%',
    'Real-time hazard detection and avoidance',
    'Autonomous decision making in critical situations',
    'Multi-planetary mission coordination',
    'Advanced resource optimization algorithms'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <HeroSection onGetStarted={onGetStarted} />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Advanced Capabilities
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Powered by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Next-Gen AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience unprecedented automation and intelligence in space exploration with our advanced AI systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full hover:scale-[1.02] transition-all duration-300">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="py-16 px-4 bg-background/50">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Terrain Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered <span className="text-primary">Terrain Analysis</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Watch our AI analyze planetary terrain in real-time, identifying hazards and opportunities
              </p>
            </div>
            <TerrainDemo />
          </motion.div>

          {/* Orbital Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Precision <span className="text-primary">Orbital Mechanics</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience advanced orbital trajectory calculations and launch optimization
              </p>
            </div>
            <OrbitalDemo />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Mission Advantages
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="text-primary">ASTRA-X</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our advanced AI systems provide unparalleled advantages for space exploration missions, 
                ensuring safety, efficiency, and success in the most challenging environments.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 text-center">
                <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Ready to Launch?</h3>
                <p className="text-muted-foreground mb-6">
                  Join the future of space exploration with ASTRA-X. Experience the power of autonomous 
                  intelligence in your next mission.
                </p>
                <Button size="lg" onClick={onGetStarted} className="w-full">
                  Start Your Mission
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <FoundersSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold">
              Ready to Explore the <span className="text-primary">Cosmos</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of space agencies and exploration teams using ASTRA-X for their missions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted} className="px-8">
                <Rocket className="h-5 w-5 mr-2" />
                Launch Your Mission
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}