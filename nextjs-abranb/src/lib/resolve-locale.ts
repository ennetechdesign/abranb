import {
  defaultLocale,
  isSupportedLocale,
  type AppLocale,
} from "@/i18n/config";

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
