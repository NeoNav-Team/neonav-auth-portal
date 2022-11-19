import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const hasToken = request.cookies.has('accessToken');
    const url = request.nextUrl.clone();
    if(!hasToken && url.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    } else if (hasToken && (url.pathname === '/login' || url.pathname === '/')) {
      return NextResponse.redirect(new URL('/logout', request.url))
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|favicon.ico|neonav.svg).*)',
    ],
  }
