import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signUp',
  '/api/auth/register',
  '/api/auth/login',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public - exact matches only
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Check for auth token in cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If no token and trying to access protected route
  if (!token) {
    // Redirect to login
    const url = new URL('/', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  try {
    // Verify token (now an async operation)
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    
    // For API routes, add user info to headers
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId || decoded.sub);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role || 'user');
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    
    // Continue to protected page
    return NextResponse.next();
  } catch (error) {
    // Token invalid, redirect to login
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
}

// Configure which paths the middleware runs on
// This ensures middleware only runs on routes that aren't explicitly public
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - root (/)
     * - login page (/login)
     * - signup page (/signUp)
     * - auth API endpoints (/api/auth/login and /api/auth/register)
     * - static files (/_next/, /favicon.ico, etc.)
     */
    '/((?!api/auth/login|api/auth/register|login|signUp|_next/|favicon\\.ico).*)',
  ],
};