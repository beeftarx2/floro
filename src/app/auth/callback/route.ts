import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log('OAuth callback received:', { code: !!code, url: requestUrl.toString() })

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables in callback route')
    return NextResponse.redirect(`${requestUrl.origin}?error=env_missing`)
  }

  if (code) {
    try {
      const cookieStore = await cookies()
      
      console.log('Creating Supabase server client...')
      let supabase
      try {
        // Try the SSR approach first
        supabase = createServerClient(
          supabaseUrl,
          supabaseAnonKey,
          {
            cookies: {
              get(name: string) {
                return cookieStore.get(name)?.value
              },
              set(name: string, value: string, options: any) {
                cookieStore.set({ name, value, ...options })
              },
              remove(name: string, options: any) {
                cookieStore.set({ name, value: '', ...options })
              },
            },
          }
        )
      } catch (clientError) {
        console.error('Error creating Supabase SSR client:', clientError)
        // Fallback to regular client if SSR fails
        try {
          const { createClient } = await import('@supabase/supabase-js')
          supabase = createClient(supabaseUrl, supabaseAnonKey)
        } catch (fallbackError) {
          console.error('Error creating fallback Supabase client:', fallbackError)
          return NextResponse.redirect(`${requestUrl.origin}?error=client_creation_failed`)
        }
      }
      
      if (!supabase) {
        console.error('Supabase client is null')
        return NextResponse.redirect(`${requestUrl.origin}?error=client_null`)
      }
      
      console.log('Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${requestUrl.origin}?error=auth_failed`)
      }
      
      console.log('Session created successfully for user:', data.user?.email)
      
    } catch (error) {
      console.error('Unexpected error in callback:', error)
      return NextResponse.redirect(`${requestUrl.origin}?error=callback_failed`)
    }
  } else {
    console.log('No code received in callback')
    return NextResponse.redirect(`${requestUrl.origin}?error=no_code`)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
