import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Db connection
import dbConnection from "@/lib/dbConnection/mongodb";

// Token
import { cookieSettings, tokenCreater } from "@/lib/auth";

// Schemas
import User from "@/schemas/register";

export const POST = async (req: NextRequest) => {
    await dbConnection();
    const { email, password } = await req.json();

    try {
        const findedUser = await User.findOne({ email });
        if (!findedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(password, findedUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Password wrong!' }, { status: 401 });
        }
        const token = tokenCreater(findedUser._id, findedUser.email, findedUser.password);

        const response = NextResponse.json({ message: 'User successfully', token }, { status: 201 });

        response.cookies.set({
            ...cookieSettings,
            value: token,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Error happened', error }, { status: 500 });
    }
}