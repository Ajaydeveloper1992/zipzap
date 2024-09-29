import dbConnect from "@/lib/dbConfig"; 
import User from "@/models/userModel"; 
import { NextResponse } from "next/server";
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function GET(request) {
    await dbConnect();

    try {
        const userId = await getDataFromToken(request); // Get the ID of the user from the token

        // Fetch all staff members created by the user
        const staffMembers = await User.find({ createdBy: userId }).populate('role'); // Adjust as necessary to populate role data

        return NextResponse.json(staffMembers, { status: 200 });
    } catch (error) {
        console.error("Error fetching staff data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
 