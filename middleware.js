import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  try {
    const{ data: { user }} = await supabase.auth.getUser();
    //console.log(`Entra al middleware con user ${user}`)
    if (!user && req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    // Handle error appropriately, e.g., redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|/login$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
  
  //matcher: ['/', '/login'],
}