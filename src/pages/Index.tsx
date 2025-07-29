import { motion } from "framer-motion"
import { Header } from "@/components/navigation/Header"
import { SpaceNavigator } from "@/components/modules/SpaceNavigator"
import { AstroScope } from "@/components/modules/AstroScope"
import { ChatOps } from "@/components/modules/ChatOps"
import { MissionControl } from "@/components/modules/MissionControl"
import { AIShowcase } from "@/components/modules/AIShowcase"
import spaceBackground from "@/assets/space-background.jpg"

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Header />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              ASTRA-X
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Where Machines Dream Beyond Earth
            </motion.p>
            <motion.div
              className="text-sm text-muted-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Autonomous Intelligence for Trans-Planetary Exploration
            </motion.div>
          </motion.section>

          {/* Mission Modules Grid */}
          <motion.section 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Navigation Module - Spans 2 columns */}
            <div className="lg:col-span-2">
              <SpaceNavigator />
            </div>

            {/* Mission Control */}
            <div>
              <MissionControl />
            </div>

            {/* AstroScope */}
            <div>
              <AstroScope />
            </div>

            {/* ChatOps */}
            <div>
              <ChatOps />
            </div>

            {/* AI Showcase */}
            <div>
              <AIShowcase />
            </div>
          </motion.section>

          {/* Status Bar */}
          <motion.section 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-6 bg-background-secondary/50 backdrop-blur-sm border border-glass-border rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Mission Status: ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">AI Systems: ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">OpenRouter: CONNECTED</span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Index;
