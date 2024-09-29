import dbConnect from "@/lib/dbConfig"; 
import User from "@/models/userModel";
import Role from "@/models/roleModel"; 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function POST(request) {
    await dbConnect();
    
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { firstName, lastName, email, phoneNumber, password, role, username, status ,selectedRestaurants } = reqBody; // Include selectedRestaurants

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !role || !username) {
            return NextResponse.json({ error: "First name, last name, email, password, role, and username are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Ensure role ID is valid
        const foundRole = await Role.findById(role);
        if (!foundRole) {
            return NextResponse.json({ error: "Role not found" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const usertype = 'staff';
        // Create a new user with the found role ID, selectedRestaurants, and createdBy
        const newUser = new User({
            fname: firstName,
            lname: lastName,
            email,
            phone: phoneNumber,
            role,
            username, // Include username here
            password: hashedPassword,
            createdBy: userId,
            usertype,
            status,
            selectedRestaurants,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "Staff created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.error("Staff Creation Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 