import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Hello from API route!",
      timestamp: new Date().toISOString(),
      method: request.method,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "POST request received",
      receivedData: body,
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}
