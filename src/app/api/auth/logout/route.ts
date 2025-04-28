import { NextResponse } from "next/server";
import { removeToken } from "../../../lib/session";

export async function GET() {
  // Clear the session
  removeToken();

  // Redirect to the OAuth provider's logout page
  return NextResponse.redirect(process.env.LOGOUT_URL!);
}
