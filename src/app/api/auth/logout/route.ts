import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Get URL to check if this was a direct navigation
  const url = new URL(request.url);
  console.log("Logout route called, URL:", url.toString());
  
  // Clear the token cookie
  const cookieStore = cookies();
  (await cookieStore).delete("oauth-token");
  
  console.log("User logged out, cookie deleted");
  
  // Redirect to the OAuth provider's logout page
  return NextResponse.redirect(process.env.LOGOUT_URL!);
}