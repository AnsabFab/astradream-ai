import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  variant?: "default" | "purple" | "blue" | "red" | "green"
}

const glowVariants = {
  default: "shadow-cosmic",
  purple: "shadow-glow-purple",
  blue: "shadow-glow-blue", 
  red: "shadow-[0_0_40px_hsl(var(--accent-glow))]",
  green: "shadow-[0_0_40px_hsl(var(--success-glow))]"
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  glow = false,
  variant = "default" 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-md bg-card border border-card-border rounded-lg p-6",
        "transition-all duration-300 ease-out",
        hover && "hover:scale-[1.02] hover:shadow-cosmic",
        glow && glowVariants[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-glass/50 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}