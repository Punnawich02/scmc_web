import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isValidLocale(locale: string): locale is (typeof routing)['locales'][number] {
  return (routing.locales as readonly string[]).includes(locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  // ✅ Redirect "/" หรือ "/th" → "/th/home"
  if (
    pathname === "/" ||
    (isValidLocale(firstSegment) && pathname === `/${firstSegment}`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment || routing.defaultLocale}/home`;
    return NextResponse.redirect(url);
  }

  // ✅ ถ้า first segment ไม่ใช่ locale ที่รองรับ
  if (firstSegment && !isValidLocale(firstSegment)) {
    const remainingPath = pathname.split("/").slice(1).join("/"); // เก็บ path ทั้งหมด
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}/${remainingPath}`; // แทรก default locale

    return NextResponse.redirect(url);
  }

  // ✅ ใช้งาน next-intl middleware ตามปกติ
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
