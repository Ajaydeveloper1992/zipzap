// Import necessary modules and connect to the database
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request) {
    try {
        // Extract the token property from the JSON body of the incoming request
        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        // Update user properties and save the changes
        user.usVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email Verified successfully",
            success: true
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
