// /api/logout/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const callbackParam = new URL(request.url).searchParams.get("callbackUrl");
  const callbackUrl = callbackParam
    ? new URL(callbackParam, process.env.BASE_URL).toString()
    : process.env.POST_LOGOUT_REDIRECT_URI!;

  const logoutUrl = new URL(process.env.LOGOUT_URL!);
  logoutUrl.searchParams.set("post_logout_redirect_uri", callbackUrl);

  const response = NextResponse.redirect(logoutUrl);

  response.cookies.set("oauth-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
