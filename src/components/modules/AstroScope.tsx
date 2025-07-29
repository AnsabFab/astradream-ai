import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { Badge } from "@/components/ui/badge"
import { useOpenRouter } from "@/hooks/useOpenRouter"
import { Telescope, Brain, Zap, FileImage, Download } from "lucide-react"

interface AnalysisResult {
  lifeProb: number
  compounds: string[]
  recommendations: string[]
  summary: string
}

export function AstroScope() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { generateSpaceAnalysis, isLoading } = useOpenRouter()

  const simulateAnalysis = async () => {
    setIsAnalyzing(true)
    
    const prompt = `Analyze this simulated satellite scan of exoplanet Kepler-442b:
    - Surface temperature: 233K average
    - Atmospheric composition: 78% nitrogen, 20% oxygen, 1.8% argon, 0.04% CO2
    - Water vapor signatures detected in spectral analysis
    - Organic carbon compounds identified in soil samples
    - Magnetic field strength: 0.8 Earth units
    - Geological activity: moderate tectonic movement detected
    
    Provide:
    1. Likelihood of life (percentage)
    2. Key compounds of interest 
    3. Recommended exploration priorities
    4. Scientific summary`

    try {
      const analysis = await generateSpaceAnalysis(prompt, "Exoplanet habitability assessment")
      
      // Parse the AI response and structure it
      setAnalysisResult({
        lifeProb: 73, // Would extract from AI response
        compounds: ["H2O (water)", "CH4 (methane)", "O2 (oxygen)", "Organic carbon"],
        recommendations: [
          "Deploy atmospheric probe for detailed gas analysis",
          "Target water-rich regions for landing mission",
          "Investigate organic signatures in polar regions"
        ],
        summary: analysis
      })
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <GlassCard glow variant="blue">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/20 rounded-lg">
            <Telescope className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AstroScope</h3>
            <p className="text-sm text-muted-foreground">Scientific AI Analysis Platform</p>
          </div>
        </div>
        <CosmicButton 
          variant="secondary" 
          size="sm" 
          onClick={simulateAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "New Scan"}
        </CosmicButton>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-glass-border rounded-lg p-6 mb-6 text-center hover:border-secondary/50 transition-colors cursor-pointer">
        <FileImage className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-2">Upload satellite imagery or spectral data</p>
        <CosmicButton variant="outline" size="sm">
          Browse Files
        </CosmicButton>
      </div>

      {analysisResult && (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Life Probability */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {analysisResult.lifeProb}%
              </div>
              <div className="text-xs text-muted-foreground">Life Probability</div>
            </div>
            <div className="bg-background-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {analysisResult.compounds.length}
              </div>
              <div className="text-xs text-muted-foreground">Key Compounds</div>
            </div>
          </div>

          {/* Compounds */}
          <div>
            <div className="flex items-center mb-3">
              <Brain className="w-4 h-4 mr-2 text-secondary" />
              <span className="text-sm font-medium">Detected Compounds</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysisResult.compounds.map((compound, index) => (
                <Badge key={index} variant="outline" className="border-secondary/30 text-secondary">
                  {compound}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center mb-3">
              <Zap className="w-4 h-4 mr-2 text-warning" />
              <span className="text-sm font-medium">AI Recommendations</span>
            </div>
            <div className="space-y-2">
              {analysisResult.recommendations.map((rec, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  {rec}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
            <div className="text-sm font-medium text-secondary mb-2">Scientific Analysis Summary</div>
            <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <CosmicButton variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </CosmicButton>
          </div>
        </motion.div>
      )}

      {isAnalyzing && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">AI analyzing spectral data...</p>
          </div>
        </div>
      )}
    </GlassCard>
  )
}