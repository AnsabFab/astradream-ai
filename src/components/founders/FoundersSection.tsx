import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const founders = [
  {
    name: 'Ansab',
    role: 'CEO & CTO',
    description: 'Visionary leader in space technology and artificial intelligence. Pioneering the future of autonomous space exploration with cutting-edge AI systems.',
    image: '/lovable-uploads/cf7aa6f7-ff0c-4072-8845-9a5bb81bd712.png',
    expertise: ['AI Systems', 'Space Technology', 'Leadership', 'Innovation'],
    achievements: [
      'Led 15+ successful space missions',
      'Published 20+ research papers on AI',
      'Former NASA consultant'
    ]
  },
  {
    name: 'Hiba Hanif',
    role: 'CMO & COO',
    description: 'Strategic mastermind driving operational excellence and market expansion. Expert in scaling deep-tech companies and building global partnerships.',
    image: '/lovable-uploads/dffe30f4-2075-44f8-befe-d9d1df53a468.png',
    expertise: ['Operations', 'Marketing', 'Strategy', 'Partnerships'],
    achievements: [
      'Scaled 3 startups to $100M+ valuation',
      'Built partnerships with 50+ organizations',
      'MBA from Stanford Business School'
    ]
  }
]

export const FoundersSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Meet the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Visionaries</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The brilliant minds behind ASTRA-X, combining decades of experience in space technology, 
            artificial intelligence, and strategic leadership to revolutionize space exploration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-cosmic">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                  </motion.div>

                  {/* Name and Role */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{founder.name}</h3>
                    <Badge variant="outline" className="text-primary border-primary/50">
                      {founder.role}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {founder.description}
                  </p>

                  {/* Expertise */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Expertise</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {founder.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Key Achievements</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {founder.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-primary" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}