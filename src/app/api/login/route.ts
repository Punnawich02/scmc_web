import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const loginUrl = new URL(process.env.AUTH_URL!);
  const currentUrl = request.nextUrl.searchParams.get("callbackUrl") || "/" ;

  loginUrl.searchParams.set("client_id", process.env.CLIENT_ID!);
  loginUrl.searchParams.set("redirect_uri", process.env.CALLBACK_URL!);
  loginUrl.searchParams.set("response_type", "code");
  loginUrl.searchParams.set("scope", process.env.SCOPE || "");
  loginUrl.searchParams.set("state", encodeURIComponent(currentUrl)); 

  return NextResponse.redirect(loginUrl.toString());

}
