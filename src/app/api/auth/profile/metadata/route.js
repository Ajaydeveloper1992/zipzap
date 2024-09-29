import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel";
import UserMeta from "@/models/userMetaModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { getUserMeta } from "@/helper/getUserMeta";
export async function GET(request) {
  await dbConnect();
  const userId = await getDataFromToken(request); // Extract user ID from token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const metaData = await getUserMeta(userId); // Fetch user meta data
    return NextResponse.json({ user, metaData });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}