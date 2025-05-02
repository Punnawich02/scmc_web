import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Types for token data
export interface TokenData {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  [key: string]: unknown;
}

// Save token to cookies (encrypted)
export async function saveToken(token: TokenData): Promise<void> {
  const cookieStore = cookies();

  // In a production app, you'd want to encrypt this data
  (
    await // In a production app, you'd want to encrypt this data
    cookieStore
  ).set("oauth-token", JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: token.expires_in ? token.expires_in : 60*60, // default to 60 sec * 60 min = 1 hour
    path: "/",
  });
  console.log("Saved!");
}

// Get token from cookies
export function getToken(
  cookieStore: ReadonlyRequestCookies
): TokenData | null {
  const tokenCookie = cookieStore.get("oauth-token");

  if (!tokenCookie) {
    return null;
  }

  try {
    console.log("Getted!");
    return JSON.parse(tokenCookie.value) as TokenData;
  } catch (e) {
    console.error("Failed to parse token from cookie", e);
    return null;
  }
}
