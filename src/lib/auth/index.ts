import { jwtVerify, SignJWT } from 'jose';
import { cookies } from "next/headers";

export const tokenCreater = async (userId: string, email: string) => {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ userId, email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

    return token;
};

export const jwtVerifyToken = async (token: string) => {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    const secret = new TextEncoder().encode(JWT_SECRET);
    const data = await jwtVerify(token, secret);
    return data;
}

export const cookieSettings = {
    name: 'token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    path: '/',
    sameSite: 'lax' as const,
}


export const createCookie = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set({
        ...cookieSettings,
        value: token
    });
}