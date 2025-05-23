import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "../../lib/session";

export const runtime = "nodejs"; // ป้องกัน Edge runtime ปัญหา cookies()

export async function GET() {
  // 1. รอ cookies() ให้เสร็จ
  const cookieStore = await cookies();

  // 2. อ่าน token จาก cookieStore
  const token = getToken(cookieStore);

  if (!token) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 401 }
    );
  }

  // 3. ใช้ token.access_token ไปร้องขอข้อมูล
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
