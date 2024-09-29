import dbConnect from "@/lib/dbConfig"; // Adjust the path to your database connection utility
import User from "@/models/userModel"; // Adjust the path to your User model

export async function GET(req, { params }) {
  const { id } = params; // Extract the ID from the route parameters

  await dbConnect(); // Ensure you're connected to the database

  try {
    // Find the user by ID
    const user = await User.findById(id)
      .populate('role', 'name') // Populate role if necessary
      .exec();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // If user found, return user data
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: 500 });
  }
}