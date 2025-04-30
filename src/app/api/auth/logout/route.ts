import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Remove the token from cookies
  (await cookies()).delete("oauth-token");

  // Redirect to the OAuth provider's logout page
  return NextResponse.redirect(process.env.LOGOUT_URL!);
}
