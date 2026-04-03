import {
  COLOR_SCHEME_COOKIE,
  FONT_FAMILY_COOKIE,
  TEXT_SIZE_COOKIE,
} from "@/lib/a11y-preferences";
import type { ColorScheme, FontFamily, TextSize } from "@/lib/a11y-preferences";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

export function setColorSchemeCookie(scheme: ColorScheme): void {
  writeCookie(COLOR_SCHEME_COOKIE, scheme);
}

export function setFontFamilyCookie(family: FontFamily): void {
  writeCookie(FONT_FAMILY_COOKIE, family);
}

export function setTextSizeCookie(size: TextSize): void {
  writeCookie(TEXT_SIZE_COOKIE, size);
}
