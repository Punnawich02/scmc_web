import { NextRequest, NextResponse } from 'next/server';
import { saveToken } from '../../../lib/session';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');
  const state = searchParams.get('state');

  if (errorParam) {
    const desc = searchParams.get('error_description') || 'Unknown error';
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(desc)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/api/login', request.url));
  }

  const returnUrl = state ? decodeURIComponent(state) : '/';

  try {
    const tokenResponse = await fetch(process.env.TOKEN_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        redirect_uri: process.env.CALLBACK_URL!,
        scope: process.env.SCOPE || '',
        code: code,
      }),
      credentials: "include" ,
    });

    if (!tokenResponse.ok) {
      const text = await tokenResponse.text();
      throw new Error(`Token fetch failed: ${text}`);
    }

    const contentType = tokenResponse.headers.get('content-type') || '';
    let tokenData: any;

    if (contentType.includes('application/json')) {
      tokenData = await tokenResponse.json();
    } else {
      const raw = await tokenResponse.text();
      const params = new URLSearchParams(raw);
      tokenData = Object.fromEntries(params.entries());
    }

    if (!tokenData.access_token) throw new Error('No token received');

    await saveToken(tokenData);

    return NextResponse.redirect(new URL(returnUrl, request.url));
  } catch (err: any) {
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, request.url));
  }
}
