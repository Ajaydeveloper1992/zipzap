import dbConnect from "@/lib/dbConfig";  
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { identifier, password } = reqBody;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create a session token
        const sessionData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        if (!process.env.NEXTAUTH_SECRET) {
            return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
        }

        const token = jwt.sign(sessionData, process.env.NEXTAUTH_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            redirectUrl: '/admin'
        });

        // Set the token as a cookie
        response.cookies.set("next-auth.session-token", token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
            secure: process.env.NODE_ENV === 'production',
        });

        return response;

    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}