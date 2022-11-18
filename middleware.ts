import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import localStorage from './utils/localStorage';

const storedJwt = localStorage('get', 'jwt');
const hasJwt = storedJwt.length >= 3;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    if(!hasJwt && url.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
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
