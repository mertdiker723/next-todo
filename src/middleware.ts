import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerifyToken } from './lib/auth';

export const middleware = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;
    const loginPath = '/login';
    const registerPath = '/register';
    const homePath = '/';

    if (!token && req.nextUrl.pathname === homePath) {
        return NextResponse.redirect(new URL(loginPath, req.url));
    }
    if (token) {
        try {
            const { payload } = await jwtVerifyToken(token);
            if (payload) {
                if ([loginPath, registerPath].includes(req.nextUrl.pathname)) {
                    return NextResponse.redirect(new URL(homePath, req.url));
                }
            }
        } catch {
            const response = NextResponse.redirect(new URL(loginPath, req.url));
            response.cookies.delete("token");
            return response;
        }

    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}