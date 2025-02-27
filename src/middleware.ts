import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;
    const loginPath = '/login';
    const registerPath = '/register';
    const homePath = '/';

    if (!token && req.nextUrl.pathname === homePath) {
        return NextResponse.redirect(new URL(loginPath, req.url));
    }

    if (token && (req.nextUrl.pathname === loginPath || req.nextUrl.pathname === registerPath)) {
        return NextResponse.redirect(new URL(homePath, req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}