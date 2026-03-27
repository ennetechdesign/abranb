"use client";

import { useTranslation } from "react-i18next";

import { supportedLocales, type AppLocale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/locale-cookie";

export function LocaleSwitcher() {
  const { i18n, t } = useTranslation("common");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as AppLocale;
    void i18n.changeLanguage(next);
    setLocaleCookie(next);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
      <span>{t("locale_switch_label")}</span>
      <select
        className="rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={handleChange}
        aria-label={t("locale_switch_label")}
      >
        {supportedLocales.map((code) => (
          <option key={code} value={code}>
            {code === "pt-BR" ? t("locale_pt_BR") : t("locale_en")}
          </option>
        ))}
      </select>
    </label>
  );
}
