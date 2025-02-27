import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

export const tokenCreater = (userId: string, email: string) => {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    const token = jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}

export const cookieSettings = {
    name: 'token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
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