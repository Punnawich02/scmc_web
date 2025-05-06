import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "../../lib/session";

export async function GET() {
  const cookieStore = cookies();
  const token = getToken(await cookieStore);

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  return NextResponse.json(token);
}
