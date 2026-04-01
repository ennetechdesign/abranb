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
    <label className="text-body text-muted-foreground flex items-center gap-2">
      <span>{t("locale_switch_label")}</span>
      <select
        className="border-border bg-surface-elevated text-foreground rounded border px-2 py-1"
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
