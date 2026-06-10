import { NextResponse } from 'next/server';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Define pages that anyone can see without being logged in
    const isPublicPage = pathname.includes('/login') || 
                         pathname.includes('/register') || 
                         pathname.includes('/createOwner') || 
                         pathname.includes('/password');

    // 2. Extract the token from cookies (Instead of localStorage)
    const token = request.cookies.get('token')?.value;

    // Case A: No token found, and trying to access a protected dashboard route
    if (!token && !isPublicPage && pathname.startsWith('/pages')) {
        return NextResponse.redirect(new URL('/pages/login', request.url));
    }

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
                response.cookies.delete('token'); // Clear the stale token cookie
                return response;
            }
          
        } catch (err) {
            console.error('Middleware database check failed:', err);
         }
    }

    return NextResponse.next();
}

// 3. Configure which routes trigger this middleware file
export const config = {
    matcher: ['/pages/:path*']
};