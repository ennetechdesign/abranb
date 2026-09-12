import { cookies, headers } from "next/headers";

import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  type AppLocale,
} from "@/i18n/config";

export async function getServerLocale(): Promise<AppLocale> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  return normalizeLocale(
    headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value,
  );
}

export function normalizeLocale(value: string | undefined): AppLocale {
  if (!value) {
    return defaultLocale;
  }
  const v = value.trim();
  if (v.toLowerCase() === "pt" || v.toLowerCase().startsWith("pt-")) {
    return "pt-BR";
  }
  if (v.toLowerCase() === "en" || v.toLowerCase().startsWith("en-")) {
    return "en";
  }
  if (isSupportedLocale(v)) {
    return v;
  }
  return defaultLocale;
}
