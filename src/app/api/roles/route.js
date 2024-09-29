import dbConnect from "@/lib/dbConfig";
import Role from "@/models/roleModel";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const params = searchParams.get("params")?.split("/") || [];

  if (params.length === 0) {
    const roles = await Role.find();
    return new Response(JSON.stringify(roles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const roleId = params[0];
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
  const { name, createdBy } = await req.json();

  if (!name) {
    return new Response(JSON.stringify({ message: "Role name is required" }), { status: 400 });
  }

  const newRole = await Role.create({ name,createdBy });
  return new Response(JSON.stringify(newRole), { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const params = searchParams.get("params")?.split("/") || [];

  if (params.length === 0) {
    return new Response(JSON.stringify({ message: "Role ID is required" }), { status: 400 });
  }

  const roleId = params[0];
  await Role.findByIdAndDelete(roleId);
  return new Response(null, { status: 204 });
}
