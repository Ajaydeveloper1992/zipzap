import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"; 
import { NextResponse } from "next/server";
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function PUT(request) {
    await dbConnect();
    
    try {
        const userId = await getDataFromToken(request); // Get user ID from token
        const { id, firstName, lastName, username, email, phoneNumber, password, role, status, selectedRestaurants } = await request.json();

        // Validate required fields
        if (!id || !firstName || !lastName || !email || !role) {
            return NextResponse.json({ error: "ID, first name, last name, email, and role are required." }, { status: 400 });
        }

        // Prepare update object
        const updateData = {
            fname: firstName,
            lname: lastName,
            email,
            phone: phoneNumber,
            role,
            selectedRestaurants,
            status,
            createdBy: userId // Store who updated the record
        };

        // Include username and password only if provided
        if (username) updateData.username = username;
        if (password) updateData.password = password; // Assume password is hashed in the model

        // Find the user by ID and update the details
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: "Staff updated successfully.",
            success: true,
            updatedUser,
        });

    } catch (error) {
        console.error("Staff Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}