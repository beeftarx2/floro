import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    const { data: profile } = await supabase.from('profiles').select('onboarding_complete').eq('id', session.user.id).single();

    const isWelcomePage = req.nextUrl.pathname.startsWith('/welcome');

    if (profile && !profile.onboarding_complete && !isWelcomePage) {
      return NextResponse.redirect(new URL('/welcome', req.url));
    }
    if (profile && profile.onboarding_complete && isWelcomePage) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (authentication callback)
     */
    '/((?!_next/static|_next/image|favicon.ico|login|auth/callback|api/).*)',
  ],
};