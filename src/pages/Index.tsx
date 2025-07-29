import { useAuth } from '@/hooks/useAuth'
import { AuthPage } from '@/components/auth/AuthPage'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { Landing } from '@/pages/Landing'
import { useState } from 'react'

const Index = () => {
  const { user, loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <Dashboard />
  }

  // If user wants to sign in/up, show auth page
  if (showAuth) {
    return <AuthPage />
  }

  // Otherwise, show landing page
  return <Landing onGetStarted={() => setShowAuth(true)} />
}

export default Index
