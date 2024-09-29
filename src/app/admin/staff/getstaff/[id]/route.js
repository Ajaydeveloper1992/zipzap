// pages/api/auth/getStaff.js
import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await dbConnect();
    
    const { id } = params; // Get the staff ID from the request parameters

    try {
        const staffMember = await User.findById(id).populate('role'); // Populate role if needed

        if (!staffMember) {
            return NextResponse.json({ error: "Staff member not found." }, { status: 404 });
        }

        return NextResponse.json(staffMember, { status: 200 });
    } catch (error) {
        console.error("Error fetching staff details:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}