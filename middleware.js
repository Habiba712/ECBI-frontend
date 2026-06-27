import { NextResponse } from 'next/server';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Define public access paths (add the exact landing page root if needed, but here it's protected)
    const isPublicPage = pathname.includes('/login') || 
                         pathname.includes('/register') || 
                         pathname.includes('/createOwner') || 
                         pathname.includes('/password') ||
                         pathname.includes('/pages/pointOfSale/user/');

    // 2. Extract session validation token
    const token = request.cookies.get('token')?.value;

    // Case A: Unauthenticated access to protected boundaries (including root '/')
    if (!token && !isPublicPage) {
        return NextResponse.redirect(new URL('/pages/login', request.url));
    }

    // Case B: Authenticated validation handshake
    if (token && !isPublicPage) {
        try {
            const verifyRes = await fetch(`https://ecbi-backend.onrender.com/api/auth/verify-session`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!verifyRes.ok) {
                const response = NextResponse.redirect(new URL('/pages/login', request.url));
                response.cookies.delete('token'); 
                return response;
            }
          
        } catch (err) {
            console.error('Middleware token verification exception:', err);
            // Optional: Choose whether to let users pass or block them if your render.com backend goes down
        }
    }

    return NextResponse.next();
}

// 3. Updated Matcher: Triggers on root '/' AND all internal paths, skipping assets
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};