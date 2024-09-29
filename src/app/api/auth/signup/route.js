import dbConnect from "@/lib/dbConfig"; 
import User from "@/models/userModel";
import Role from "@/models/roleModel"; 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    await dbConnect();

    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const { username, email, fname, lname, phone, image, password, createdBy} = reqBody;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Username, email, password, and createdBy are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Find the role by name
        const role = await Role.findOne({ name: 'superadmin' });
        if (!role) {
            return NextResponse.json({ error: "Role not found or you do not have permission to create this role" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const usertype = 'restaurant_owner';
        const status = 'active';
        const accessrestaurant = '';
        // Create a new user with the found role ID and createdBy
        const newUser = new User({
            username,
            email,
            fname,
            lname,
            phone,
            image,
            role: role._id,  // Assign the role ID here
            password: hashedPassword,
            createdBy, // This should be the ID of the user creating this new user
            usertype,
            status,
            accessrestaurant,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
