import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeFromAcceptLanguage,
} from "@/i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/reports") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1] ?? "";
  if (isLocale(segment)) {
    return NextResponse.next();
  }

  const locale = localeFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale || defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|media/|reports/).*)"],
};
