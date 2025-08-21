'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, use } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// A simple function to format the school ID back into a readable name
const formatSchoolName = (schoolId: string) => {
  if (!schoolId) return ''
  if (schoolId === 'usc') return 'University of Southern California'
  const parts = schoolId.split('-')
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}

export default function LoginPage({ params }: { params: Promise<{ school: string }> }) {
  const [supabase] = useState(() => createClient())
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { school } = use(params)
  const schoolName = formatSchoolName(school)

  useEffect(() => {
    if (!supabase) return
    
    const error = searchParams.get('error')
    if (error === 'invalid_email_domain') {
      setErrorMessage('Login failed. Please use a valid university email address.')
      setIsLoading(false) // Ensure button is clickable again
      
      // Force complete OAuth state cleanup
      const cleanup = async () => {
        try {
          // Clear Supabase auth state
          await supabase.auth.signOut()
          
          // Clear all OAuth-related cookies
          document.cookie = 'selected_school=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          document.cookie = 'supabase.auth.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          document.cookie = 'sb-; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          
          // Clear all storage
          localStorage.clear()
          sessionStorage.clear()
          
          console.log('✅ Complete OAuth state cleanup completed')
          
        } catch (err) {
          console.log('Cleanup error (this is normal):', err)
        }
      }
      cleanup()
    }
  }, [searchParams, supabase])

  const handleGoogleLogin = async () => {
    if (!supabase) {
      setErrorMessage('Supabase client not available')
      return
    }
    
    console.log('=== Starting Google OAuth Flow ===')
    console.log('School:', school)
    console.log('Current URL:', location.href)
    
    setIsLoading(true)
    setErrorMessage(null)

    // Force a complete OAuth state reset
    try {
      // Clear any existing auth state
      await supabase.auth.signOut()
      console.log('✅ Cleared existing auth state')
      
      // Clear all OAuth-related cookies
      document.cookie = 'selected_school=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'supabase.auth.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'sb-; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      
      // Clear localStorage and sessionStorage
      localStorage.clear()
      sessionStorage.clear()
      
      console.log('✅ Cleared all OAuth-related storage')
      
      // Small delay to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (err) {
      console.log('Auth cleanup error (this is normal):', err)
    }

    // Store the selected school in a cookie so the callback knows where to redirect back to
    document.cookie = `selected_school=${school}; path=/; max-age=300` // Expires in 5 minutes
    console.log('✅ Stored school cookie:', school)

    // Force a fresh OAuth attempt with explicit state clearing
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          // Force fresh OAuth state
          prompt: 'select_account'
        }
      },
    })

    if (error) {
      console.error('OAuth initiation error:', error.message)
      setErrorMessage('Could not start the login process. Please try again.')
      setIsLoading(false)
    } else {
      console.log('✅ OAuth initiated successfully, waiting for redirect...')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-6 text-center p-4">
        <h1 className="text-4xl font-bold tracking-tight">
          {schoolName}
        </h1>
        <p className="text-lg text-gray-300">Use your university Google account to continue.</p>
        
        <div className="bg-blue-900 border border-blue-700 text-blue-100 px-4 py-3 rounded-md max-w-md text-center text-sm">
          <strong>Access Restricted:</strong> Only UC school and USC email addresses are allowed.
          <br />
          <span className="text-xs text-blue-200">
            Supported: UC Davis, UCLA, UCI, UCSD, UCSC, UCMerced, Berkeley, UCR, UCSB, USC
          </span>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Redirecting...' : 'Login with Google'}
        </button>
        
        {errorMessage && (
          <div className="mt-4 p-3 text-sm text-red-200 bg-red-800 bg-opacity-50 rounded-md border border-red-700">
            {errorMessage}
          </div>
        )}
        
        <a
          href="/"
          className="text-gray-400 hover:text-white text-sm underline"
        >
          ← Back to School Selection
        </a>
      </div>
    </main>
  )
}
