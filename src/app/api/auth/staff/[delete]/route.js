import dbConnect from "@/lib/dbConfig"; 
import User from "@/models/userModel"; 
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    await dbConnect(); // Ensure the database connection is established
    //console.log(params);
    let id =params.delete; 
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}