import dbConnect from "@/lib/dbConfig"; // Adjust the path as needed
import Role from "@/models/roleModel"; // Adjust the path as needed

// Handle PATCH request
export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const { permissions } = await req.json();

    // Validate permissions structure
    const updatedPermissions = {};

    // Ensure permissions is an object
    if (typeof permissions === 'object' && permissions !== null) {
      for (const key in permissions) {
        updatedPermissions[key] = {
          add: permissions[key].add ?? false,
          view: permissions[key].view ?? false,
          update: permissions[key].update ?? false,
          delete: permissions[key].delete ?? false,
        };
      }
    } else {
      return new Response(JSON.stringify({ message: "Invalid permissions structure" }), { status: 400 });
    }

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { permissions: updatedPermissions },
      { new: true } // return the updated document
    );

    if (!updatedRole) {
      return new Response(JSON.stringify({ message: "Role not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedRole), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}

// Handle GET request
export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const role = await Role.findById(id);
    
    if (!role) {
      return new Response(JSON.stringify({ message: "Role not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(role), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}