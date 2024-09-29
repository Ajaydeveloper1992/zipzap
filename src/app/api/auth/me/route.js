import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConfig";  // Adjust this import based on your actual database connection file
import User from "@/models/userModel";// Adjust this import based on your actual User model
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function GET(request) {
    await dbConnect();
    try {
        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);

        // Find the user in the database based on the user ID
        const user = await User.findOne({ _id: userId }).select('-password');
        
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
 