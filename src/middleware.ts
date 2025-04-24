import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Your original function remains for checking just the locale
function isValidLocale(locale: string): locale is (typeof routing)['locales'][number] {
  return (routing.locales as readonly string[]).includes(locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // Case: / -> will redirect to defualt /th/home 
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}/th/home`;
    return NextResponse.redirect(url);
  }

  // Case: /th or /en → redirect to /th/home or /en/home
  if (isValidLocale(firstSegment) && segments.length === 2) {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment}/home`;
    return NextResponse.redirect(url);
  }

  // Case: valid locale prefix → allow next-intl to handle
  if (isValidLocale(firstSegment)) {
    return intlMiddleware(request);
  }

  // Case: invalid locale (e.g., /de/service) → redirect to defaultLocale(/th) + original path
  const url = request.nextUrl.clone();
  url.pathname = `/${routing.defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
