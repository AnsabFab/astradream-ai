import { motion } from "framer-motion"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-glass-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-8 h-8 bg-gradient-cosmic rounded-lg flex items-center justify-center font-bold text-white">
            A-X
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              ASTRA-X
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">
              Where Machines Dream Beyond Earth
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {['Navigator', 'AstroScope', 'Mission Control', 'ChatOps'].map((item, index) => (
            <motion.button
              key={item}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.button>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="border-success/30 text-success">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            Mission Active
          </Badge>
          <CosmicButton variant="cosmic" size="sm">
            Emergency Protocol
          </CosmicButton>
        </div>
      </div>
    </motion.header>
  )
}