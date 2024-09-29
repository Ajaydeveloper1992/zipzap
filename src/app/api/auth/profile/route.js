import dbConnect from "@/lib/dbConfig"; 
import User from "@/models/userModel";
import UserMeta from "@/models/userMetaModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function PUT(request) {
  await dbConnect();

  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { username, email, fname, lname, phone, image, password, bio, urls } = reqBody;

    if (!username || !email || !fname || !lname) {
      return NextResponse.json({ error: "Username, email, first name, and last name are required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields
    user.username = username;
    user.email = email;
    user.fname = fname;
    user.lname = lname;
    user.phone = phone;
    user.image = image;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Update metadata
    const metaUpdates = [
      { meta_key: 'bio', meta_value: bio },
      ...urls.map(url => ({ meta_key: 'url', meta_value: url })),
    ];

    // Remove existing metadata for this user
    await UserMeta.deleteMany({ userId });

    // Insert new metadata
    await UserMeta.insertMany(metaUpdates.map(meta => ({ userId, ...meta })));

    return NextResponse.json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}