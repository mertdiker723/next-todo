import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Db connection
import dbConnection from "@/lib/dbConnection/mongodb";

// Schema
import User from "@/schemas/register";


export const POST = async (req: NextRequest) => {
    await dbConnection();
    const { name, email, password } = await req.json();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}