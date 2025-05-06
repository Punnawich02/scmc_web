import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Get URL to check if this was a direct navigation
  
  // Clear the token cookie
  const cookieStore = cookies();
  (await cookieStore).delete("oauth-token");
  
  // Redirect to the OAuth provider's logout page
  return NextResponse.redirect(process.env.LOGOUT_URL!);
}