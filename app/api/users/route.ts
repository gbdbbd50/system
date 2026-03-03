import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Mock database
const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    role: "user",
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const role = searchParams.get("role");

  let filteredUsers = [...users];

  if (id) {
    filteredUsers = filteredUsers.filter(
      (u) => u.id === parseInt(id, 10)
    );
  }

  if (role) {
    filteredUsers = filteredUsers.filter((u) => u.role === role);
  }

  return NextResponse.json(filteredUsers, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validation
  if (!body.name || !body.email || !body.role) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, role" },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: Math.max(...users.map((u) => u.id), 0) + 1,
    name: body.name,
    email: body.email,
    role: body.role,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const index = users.findIndex((u) => u.id === parseInt(id, 10));

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const deletedUser = users.splice(index, 1);

  return NextResponse.json(
    { message: "User deleted", user: deletedUser[0] },
    { status: 200 }
  );
}
