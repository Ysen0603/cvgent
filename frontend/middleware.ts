import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value; // Assuming you store tokens in cookies for middleware access
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register'];

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(pathname);

  if (accessToken || refreshToken) {
    // User is authenticated (or has tokens)
    if (isPublicPath) {
      // If authenticated user tries to access login/register, redirect to dashboard
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow access to other pages
    return NextResponse.next();
  } else {
    // User is not authenticated
    if (!isPublicPath) {
      // If unauthenticated user tries to access a protected page, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Allow access to public pages
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*', '/gemini-key-management/:path*', '/cv-analysis/:path*'],
};