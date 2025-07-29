import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-cosmic hover:shadow-glow-purple",
        cosmic: "bg-gradient-cosmic text-white border border-primary/30 hover:border-primary/60 shadow-cosmic hover:shadow-glow-purple",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-glow-blue hover:shadow-glow-blue",
        ghost: "hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-primary/30",
        outline: "border border-primary/30 bg-transparent hover:bg-primary/10 hover:border-primary/60",
        space: "bg-background-secondary border border-glass-border hover:bg-primary/20 hover:border-primary/50 backdrop-blur-sm",
        danger: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_hsl(var(--accent-glow))]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  glow?: boolean
}

const CosmicButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, glow = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CosmicButton.displayName = "CosmicButton"

export { CosmicButton, buttonVariants }