import dbConnect from "@/lib/dbConfig";
import Role from "@/models/roleModel";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const roleId = pathSegments[pathSegments.length - 1]; // Extract the last segment of the path

  // If roleId is the route base (like '/api/roles'), return all roles
  if (roleId === 'roles') {
    const roles = await Role.find();
    return new Response(JSON.stringify(roles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If a specific role ID is provided
  const role = await Role.findById(roleId);

  if (!role) {
    return new Response(JSON.stringify({ message: "Role not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(role), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  await dbConnect();
  const { name } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ message: "Role name is required" }), { status: 400 });
  }

  const newRole = await Role.create({ name });
  return new Response(JSON.stringify(newRole), { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();

  const url = new URL(req.url);
  const roleId = url.pathname.split("/").pop(); // Extract the last part of the URL

  if (!roleId) {
    return new Response(JSON.stringify({ message: "Role ID is required" }), { status: 400 });
  }

  const deletedRole = await Role.findByIdAndDelete(roleId);
  
  if (!deletedRole) {
    return new Response(JSON.stringify({ message: "Role not found" }), { status: 404 });
  }

  return new Response(null, { status: 204 });
}