import { NextRequest, NextResponse } from "next/server";
import { saveToken } from "../../../lib/session";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  // Check for error response from OAuth provider
  const errorParam = searchParams.get("error");
  if (errorParam) {
    const errorDescription =
      searchParams.get("error_description") || "Unknown error";
    console.error(`OAuth error: ${errorParam} - ${errorDescription}`);
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(errorDescription)}`, request.url)
    );
  }

  // If don't have a code, redirect to login
  if (!code) {
    redirect("/api/login");
  }

  try {
    const state = searchParams.get("state");
    const returnUrl = state ? decodeURIComponent(state) :"/";
    
    // Exchange code for access token
    const tokenResponse = await fetch(process.env.TOKEN_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json", // Explicitly request JSON response
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        redirect_uri: process.env.CALLBACK_URL!,
        scope: process.env.SCOPE || "", // Use empty string as fallback
        code: code,
      }),
    });

    // Handle non-OK responses
    if (!tokenResponse.ok) {
      const responseText = await tokenResponse.text();
      let errorMessage = `Token response error (${tokenResponse.status}): `;

      try {
        // Try to parse response as JSON to extract error details
        const errorJson = JSON.parse(responseText);
        errorMessage +=
          errorJson.error_description || errorJson.error || responseText;
      } catch {
        // If not JSON, use text
        errorMessage += responseText;
      }

      throw new Error(errorMessage);
    }

    // Parse the token response
    let tokenData;
    const contentType = tokenResponse.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      tokenData = await tokenResponse.json();
    } else {
      // Some OAuth providers might return form-encoded responses
      const text = await tokenResponse.text();
      try {
        tokenData = JSON.parse(text);
      } catch {
        // Handle form-encoded responses
        const params = new URLSearchParams(text);
        tokenData = Object.fromEntries(params.entries());
      }
    }

    if (!tokenData.access_token) {
      throw new Error("No access_token in response");
    }

    // Save the token to cookies
    await saveToken(tokenData);

    // Redirect to profile page
    return NextResponse.redirect(new URL(returnUrl, request.url));
  } catch (error) {
    console.error("Token exchange error:", error);
    // Redirect to home with error message
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to exchange code for token";
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
