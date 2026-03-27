import { LOCALE_COOKIE } from "@/i18n/config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Persists the active locale for middleware + server-rendered `<html lang>`.
 * Call after `i18n.changeLanguage` in the browser.
 */
export function setLocaleCookie(locale: string): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}
