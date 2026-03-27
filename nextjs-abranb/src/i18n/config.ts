export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Internal header set by middleware so RSC can read the resolved locale on the same request. */
export const LOCALE_HEADER = "x-next-locale";

/** Primary locale for this project (Brazilian Portuguese). */
export const defaultLocale = "pt-BR";

export const supportedLocales = ["pt-BR", "en"] as const;

export type AppLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(
  locale: string | undefined,
): locale is AppLocale {
  return (
    locale !== undefined &&
    (supportedLocales as readonly string[]).includes(locale)
  );
}
