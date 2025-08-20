'use client'

import { createClient } from '@/lib/supabase/client'

export default function HomePage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Floro
        </h1>
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
