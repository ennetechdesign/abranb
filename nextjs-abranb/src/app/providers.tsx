"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { LOCALE_COOKIE, defaultLocale } from "@/i18n/config";
import { resources } from "@/i18n/resources";

type I18nProviderProps = {
  children: React.ReactNode;
  /** Locale from server (cookie / middleware), kept in sync with `<html lang>`. */
  locale: string;
};

function createI18nInstance(initialLocale: string) {
  const instance = i18n.createInstance();
  instance.use(initReactI18next);
  if (typeof window !== "undefined") {
    instance.use(LanguageDetector);
  }
  instance.init({
    lng: initialLocale,
    fallbackLng: defaultLocale,
    supportedLngs: ["pt-BR", "en"],
    resources,
    ns: ["common"],
    defaultNS: "common",
    detection:
      typeof window !== "undefined"
        ? {
            order: ["cookie"],
            caches: ["cookie"],
            lookupCookie: LOCALE_COOKIE,
          }
        : undefined,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
  return instance;
}

/**
 * One i18next instance per provider mount avoids cross-request singleton leaks on the server.
 */
export function I18nProvider({ children, locale }: I18nProviderProps) {
  const [i18nInstance] = useState(() => createI18nInstance(locale));

  useEffect(() => {
    if (i18nInstance.language !== locale) {
      void i18nInstance.changeLanguage(locale);
    }
  }, [locale, i18nInstance]);

  return (
    <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
  );
}
