import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoServerError } from "mongodb";

// Db connection
import dbConnection from "@/lib/dbConnection/mongodb";

// Lib
import { tokenCreater } from "@/lib/auth";

// Schema
import User from "@/schemas/register";

export const POST = async (req: NextRequest) => {
    await dbConnection();
    const { name, email, password } = await req.json();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ name, email, password: hashedPassword });

        const token = await tokenCreater(createdUser._id, createdUser.email);

        return NextResponse.json({ message: "Successfully registered!", token }, { status: 201 });
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return NextResponse.json({ message: "Email already used!" }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
