import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const cookieStore = await cookies()
  const selectedSchool = cookieStore.get('selected_school')?.value

  // Check if there's an OAuth error (like database error from email domain validation)
  if (error && errorDescription) {
    console.log('OAuth error detected:', error, errorDescription)
    
    // Check if this is a database error (email domain not allowed)
    if (errorDescription.includes('Database error saving new user')) {
      const redirectUrl = selectedSchool
        ? `${requestUrl.origin}/login/${selectedSchool}?error=invalid_email_domain`
        : `${requestUrl.origin}?error=login_failed`
      
      return NextResponse.redirect(redirectUrl)
    }
    
    // Handle other OAuth errors
    const redirectUrl = selectedSchool
      ? `${requestUrl.origin}/login/${selectedSchool}?error=oauth_failed`
      : `${requestUrl.origin}?error=login_failed`
    
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

      // Attempt to exchange the code for a session
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        throw sessionError
      }
      
      // Success! Clear the cookie and redirect to success page
      if (selectedSchool) {
        cookieStore.delete('selected_school')

        // Redirect directly to welcome page
        return NextResponse.redirect(`${requestUrl.origin}/welcome`)
      }
      
      // Fallback to home if no school context
      return NextResponse.redirect(requestUrl.origin)
      
    } catch (error) {
      console.error('Auth callback error:', error)
      
      // If an error occurs during session exchange, redirect back to login
      const redirectUrl = selectedSchool
        ? `${requestUrl.origin}/login/${selectedSchool}?error=invalid_email_domain`
        : `${requestUrl.origin}?error=login_failed`
      
      return NextResponse.redirect(redirectUrl)
    }
  }

  // No code received, redirect to home with error
  return NextResponse.redirect(`${requestUrl.origin}?error=no_code`)
}
