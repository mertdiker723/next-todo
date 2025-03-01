import { NextRequest, NextResponse } from "next/server";

// Schema
import Todo from "@/schemas/todo";

// Lib
import dbConnection from "@/lib/dbConnection/mongodb";
import { jwtVerifyToken } from "@/lib/auth";


export const GET = async (req: NextRequest) => { 
    await dbConnection();
    const token = req.headers.get("Authentication");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerifyToken(token);
        const userId = payload.userId;
        const todos = await Todo.find({ userId });

        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error happened when fetching todos", error }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    await dbConnection();
    const { title, description } = await req.json();
    const token = req.headers.get("Authentication");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerifyToken(token);
        const userId = payload.userId;
        const todo = await Todo.create({ title, description, userId });

        return NextResponse.json({ message: "Todo Created successfully", todo }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error happened when creating todo", error }, { status: 500 });
    }
}