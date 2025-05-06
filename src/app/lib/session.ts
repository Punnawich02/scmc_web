import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redirect } from "next/navigation";

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

  (await cookieStore).set("oauth-token", JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(
      Date.now() + (token.expires_in ? token.expires_in : 90 * 60) * 1000
    ), // Set expiration time to 90 minutes or the token's expires_in value
  });
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
    const cookieValue = JSON.parse(tokenCookie.value) as TokenData;
    // Check if the token is expired
    if (cookieValue.expires_in) {
      const tokenExpiryTime = Date.now() + (cookieValue.expires_in || 0) * 1000;
      const currentTime = Date.now();

      // Check if the token is expired
      if (currentTime >= tokenExpiryTime) {
        console.warn("Token has expired");
        cookieStore.delete("oauth-token"); // Delete expired token
        redirect("/login"); // Redirect to login page
      }
    }

    return cookieValue;
  } catch (e) {
    console.error("Failed to parse token from cookie", e);
    return null;
  }
}
