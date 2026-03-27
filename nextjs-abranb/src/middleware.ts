import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  defaultLocale,
  isSupportedLocale,
} from "@/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(LOCALE_COOKIE)?.value;

  const locale = isSupportedLocale(existing) ? existing : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (existing !== locale) {
    response.cookies.set({
      name: LOCALE_COOKIE,
      value: locale,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
