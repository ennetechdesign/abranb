import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  COLOR_SCHEME_COOKIE,
  COLOR_SCHEME_HEADER,
  FONT_FAMILY_COOKIE,
  FONT_FAMILY_HEADER,
  TEXT_SIZE_COOKIE,
  TEXT_SIZE_HEADER,
  normalizeColorScheme,
  normalizeFontFamily,
  normalizeTextSize,
} from "@/lib/a11y-preferences";
import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  defaultLocale,
  isSupportedLocale,
} from "@/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function middleware(request: NextRequest) {
  const localeExisting = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isSupportedLocale(localeExisting) ? localeExisting : defaultLocale;

  const colorExisting = request.cookies.get(COLOR_SCHEME_COOKIE)?.value;
  const colorScheme = normalizeColorScheme(colorExisting);

  const fontExisting = request.cookies.get(FONT_FAMILY_COOKIE)?.value;
  const fontFamily = normalizeFontFamily(fontExisting);

  const textSizeExisting = request.cookies.get(TEXT_SIZE_COOKIE)?.value;
  const textSize = normalizeTextSize(textSizeExisting);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(COLOR_SCHEME_HEADER, colorScheme);
  requestHeaders.set(FONT_FAMILY_HEADER, fontFamily);
  requestHeaders.set(TEXT_SIZE_HEADER, textSize);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const cookieOpts = {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax" as const,
  };

  if (localeExisting !== locale) {
    response.cookies.set({
      name: LOCALE_COOKIE,
      value: locale,
      ...cookieOpts,
    });
  }

  if (colorExisting !== colorScheme) {
    response.cookies.set({
      name: COLOR_SCHEME_COOKIE,
      value: colorScheme,
      ...cookieOpts,
    });
  }

  if (fontExisting !== fontFamily) {
    response.cookies.set({
      name: FONT_FAMILY_COOKIE,
      value: fontFamily,
      ...cookieOpts,
    });
  }

  if (textSizeExisting !== textSize) {
    response.cookies.set({
      name: TEXT_SIZE_COOKIE,
      value: textSize,
      ...cookieOpts,
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
