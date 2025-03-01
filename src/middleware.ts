import { NextResponse, NextRequest } from 'next/server';
import { jwtVerifyToken } from './lib/auth';
import { routeUrls, apiPath } from './lib/routes';

export const middleware = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;
    const { loginPath, registerPath, homePath } = routeUrls;
    const { loginPathApi, registerPathApi } = apiPath

    const PUBLIC_PATHS = [loginPath, registerPath, registerPathApi, loginPathApi];

    if (!token && !PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
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
    if (!PUBLIC_PATHS.includes(req.nextUrl.pathname)) {
        if (req.nextUrl.pathname.startsWith('/api/')) {
            if (token) {
                const requestHeaders = new Headers(req.headers);
                requestHeaders.set('Authorization', `Bearer ${token}`);
                return NextResponse.next({
                    request: {
                        headers: requestHeaders
                    }
                });
            }
        }
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}