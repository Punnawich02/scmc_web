import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "../../lib/session";

export async function GET() {
  const cookieStore = cookies();
  const token = getToken(await cookieStore);

  if (!token) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  try {
    const response = await fetch(process.env.BASICINFO_URL!, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
