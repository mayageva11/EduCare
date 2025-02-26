// File: middleware.ts (place in the root of your project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signUp',
  '/api/auth/register',
  // Add other public paths as needed
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }
  
  // Check for auth token in cookies (more secure than localStorage)
  const token = request.cookies.get('auth_token')?.value;
  
  // If no token and trying to access protected route
  if (!token) {
    // Redirect to login
    const url = new URL('/', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  try {
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    
    // For API routes, add user info to headers
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
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
export const config = {
  matcher: [
    // Protected routes
    '/aboutUs',
    '/api/:path*',
  ],
};