import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a session)
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

  // Get the session token from the cookies
  const token = request.cookies.get('next-auth.session-token')?.value || ''; // Use NextAuth's session token

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Continue with the request if none of the conditions matched
  return NextResponse.next();
}

// It specifies the paths for which this middleware should be executed. 
// In this case, it's applied to '/admin', '/profile', '/login', and '/signup'.
export const config = {
  matcher: [
    '/admin',
    '/admin/live-orders',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
};
