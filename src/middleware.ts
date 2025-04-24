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
  const firstSegment = segments[1] || '';
  
  // Get current locale from cookie or header, defaulting to the routing default
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const headerLocale = request.headers.get('x-next-locale');
  const currentLocale = 
    (cookieLocale && isValidLocale(cookieLocale)) ? cookieLocale :
    (headerLocale && isValidLocale(headerLocale)) ? headerLocale :
    routing.defaultLocale;

  // Case: / -> will redirect to current locale /[locale]/home 
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/home`;
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

  // Case: paths without locale (e.g. /service/transport) → redirect to /[currentLocale]/service/transport
  const url = request.nextUrl.clone();
  
  // This ensures we don't double the initial slash
  if (pathname.startsWith('/')) {
    url.pathname = `/${currentLocale}${pathname}`;
  } else {
    url.pathname = `/${currentLocale}/${pathname}`;
  }
  
  console.log(`Redirecting from ${pathname} to ${url.pathname}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};