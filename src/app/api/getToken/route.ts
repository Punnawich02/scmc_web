// app/api/getToken/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("oauth-token")?.value;

  if (!raw) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  try {
    const token = JSON.parse(raw) as { expires_at?: number; [key: string]: any };
    if (token.expires_at && Date.now() >= token.expires_at) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
    return NextResponse.json({ valid: true, token });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
