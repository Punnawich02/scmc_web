import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  function isValidLocale(locale: string): locale is (typeof routing)['locales'][number] {
    return (routing.locales as readonly string[]).includes(locale);
  }

  if (
    pathname === '/' ||
    (isValidLocale(firstSegment) && pathname === `/${firstSegment}`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}/home`;
    return NextResponse.redirect(url);
  }
  
  // ถ้า first segment ไม่ใช่ locale ที่รองรับ
  if (firstSegment && !isValidLocale(firstSegment)) {
    const newPathname = pathname.replace(/^\/[^\/]+/, ''); // ลบ /de
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${newPathname}`;
    return Response.redirect(url);
  }
  
  // หาก locale ถูกต้อง → ใช้ next-intl middleware ตามปกติ
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
