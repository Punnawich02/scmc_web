// src/app/lib/session.ts
import { NextResponse } from "next/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Types for token data
export interface TokenData {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  expires_at?: number;
  [key: string]: unknown;
}

/**
 * เซ็ตคุกกี้ oauth-token ลงใน NextResponse ที่ส่งกลับ
 */
export function setTokenCookie(res: NextResponse, token: TokenData) {
  const expiresInSec = token.expires_in ?? 90 * 60;
  const expiresAt = Date.now() + expiresInSec * 1000;

  const payload = {
    ...token,
    expires_at: expiresAt,
  };

  res.cookies.set("oauth-token", JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    expires: new Date(expiresAt),
  });
}

/**
 * อ่าน token จาก cookies (ต้อง await cookies() ก่อนเรียก)
 */
export function getToken(
  cookieStore: ReadonlyRequestCookies
): TokenData | null {
  const raw = cookieStore.get("oauth-token")?.value;
  if (!raw) return null;

  try {
    const token = JSON.parse(raw) as TokenData;
    if (token.expires_at && Date.now() >= token.expires_at) {
      console.warn("Token expired");
      return null;
    }
    return token;
  } catch (e) {
    console.error("Failed to parse token from cookie", e);
    return null;
  }
}
