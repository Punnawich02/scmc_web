// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { setTokenCookie, TokenData } from "../../../lib/session";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");
  const state = searchParams.get("state") || "/";
  const returnUrl = decodeURIComponent(state);

  // ถ้ามี error จาก OAuth
  if (errorParam) {
    const desc = searchParams.get("error_description") || "Unknown error";
    // redirect ต้องใช้ new URL(path, base)
    return NextResponse.redirect(new URL(`${returnUrl}?error=${encodeURIComponent(desc)}`, request.url));
  }

  // ถ้าไม่มี code เลย กลับไป login
  if (!code) {
    return NextResponse.redirect(new URL("/api/login", request.url));
  }

  try {
    const tokenRes = await fetch(process.env.TOKEN_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        redirect_uri: process.env.CALLBACK_URL!,
        scope: process.env.SCOPE!,
        code,
      }).toString(),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      throw new Error(text);
    }

    const tokenData = (await tokenRes.json()) as TokenData;
    if (!tokenData.access_token) throw new Error("No access_token in response");

    // สร้าง response พร้อม redirect แบบ absolute
    const res = NextResponse.redirect(new URL(returnUrl, request.url));
    setTokenCookie(res, tokenData);
    return res;
  } catch (err: any) {
    console.error("OAuth callback error:", err);
    // ส่งกลับหน้าเดิมพร้อม error query
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, request.url));
  }
}
