import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    console.log(token);

    const loginPath = '/login';
    const homePath = '/';

    if (!token && req.nextUrl.pathname !== loginPath) {
        return NextResponse.redirect(new URL(loginPath, req.url));
    }

    // Eğer token varsa ve kullanıcı login sayfasındaysa ana sayfaya yönlendir
    if (token && req.nextUrl.pathname === loginPath) {
        return NextResponse.redirect(new URL(homePath, req.url));
    }

    return NextResponse.next();
}

// Middleware'in hangi yollar için geçerli olacağını belirle
export const config = {
    matcher: ['/', '/login'],
};
