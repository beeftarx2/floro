'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    // Suppress "Auth session missing!" errors globally
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args[0]?.message || args[0] || ''
      if (message === 'Auth session missing!') {
        // Suppress this specific error - it's completely normal
        console.log('Suppressed "Auth session missing!" error (this is normal)')
        return
      }
      // Call original console.error for all other errors
      originalConsoleError.apply(console, args)
    }

    // Check if Supabase client is available
    if (!supabase) {
      setError('Supabase client not available')
      setLoading(false)
      return
    }

    // Check for error in URL params
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get('error')
    if (errorParam) {
      setError(errorParam)
      // Clear the error from URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Check for existing session
    const checkUser = async () => {
      try {
        // Wait a bit for the client to be fully initialized
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('Checking for existing user session...')
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) {
          // "Auth session missing!" is completely normal - not an error
          if (error.message === 'Auth session missing!') {
            console.log('No active session - user needs to login (this is normal)')
          } else {
            console.error('Actual error getting user:', error)
            setError(error.message)
          }
        } else {
          console.log('User found:', user?.email)
          setUser(user)
        }
      } catch (err) {
        // "Auth session missing!" is completely normal - not an error
        if (err instanceof Error && err.message === 'Auth session missing!') {
          console.log('No active session - user needs to login (this is normal)')
        } else {
          console.error('Unexpected error checking user:', err)
          setError('Failed to check authentication status')
        }
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    let subscription: any = null
    try {
      console.log('Setting up auth state change listener...')
      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
        if (event === 'SIGNED_OUT') {
          setError(null) // Clear any existing errors on logout
        }
      })
      subscription = sub
      console.log('Auth state change listener set up successfully')
    } catch (err) {
      console.error('Error setting up auth listener:', err)
      setLoading(false)
    }

    return () => {
      // Restore original console.error
      console.error = originalConsoleError
      
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [supabase])

  const handleGoogleLogin = useCallback(async () => {
    if (!supabase) {
      setError('Supabase client not available')
      return
    }

    setError(null)
    setLoading(true)
    
    try {
      console.log('Initiating Google OAuth login...')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('Error logging in:', error)
        setError(error.message)
        setLoading(false)
      }
      // Don't set loading false here as the redirect will happen
    } catch (err) {
      console.error('Unexpected error during login:', err)
      setError('Failed to initiate login')
      setLoading(false)
    }
  }, [supabase])

  const handleLogout = useCallback(async () => {
    if (!supabase) {
      setError('Supabase client not available')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      console.log('Logging out...')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error logging out:', error)
        setError(error.message)
      } else {
        console.log('Logout successful')
        setUser(null)
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err)
      setError('Failed to logout')
    } finally {
      setLoading(false)
    }
  }, [supabase])



  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Welcome to Floro!
          </h1>
          
          <div className="bg-gray-800 p-6 rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Login Successful! 🎉</h2>
            
            <div className="space-y-3 text-left">
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">Name:</span> {user.user_metadata?.full_name || 'Not provided'}
              </div>
              <div>
                <span className="font-medium">User ID:</span> {user.id}
              </div>
            </div>
          </div>

                           <button
                   onClick={handleLogout}
                   type="button"
                   className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                 >
                   Logout
                 </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Floro
        </h1>
        <p className="text-xl text-gray-300">Sign in to get started</p>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md max-w-md text-center">
            <strong>Authentication Error:</strong> {error}
          </div>
        )}
        
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login with Google
        </button>
      </div>
    </main>
  )
}
