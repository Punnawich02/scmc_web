import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const callbackParam = new URL(request.url).searchParams.get("callbackUrl");

  const BASE_URL = "http://localhost:3000";
  const DEFAULT_REDIRECT = "http://localhost:3000/th/home";

  const callbackUrl = callbackParam
    ? new URL(callbackParam, BASE_URL).toString()
    : DEFAULT_REDIRECT;

  const logoutUrl = new URL("https://login.microsoftonline.com/cf81f1df-de59-4c29-91da-a2dfd04aa751/oauth2/v2.0/logout");
  logoutUrl.searchParams.set("post_logout_redirect_uri", callbackUrl);

  const response = NextResponse.redirect(logoutUrl);

  response.cookies.set("oauth-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}

