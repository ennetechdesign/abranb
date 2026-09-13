"use client";

import { faCircleHalfStroke, faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  setColorSchemeCookie,
  setFontFamilyCookie,
  setTextSizeCookie,
} from "@/lib/a11y-cookie";
import {
  type ColorScheme,
  type FontFamily,
  type TextSize,
  colorSchemes,
  fontFamilies,
  textSizes,
} from "@/lib/a11y-preferences";
import { supportedLocales, type AppLocale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/locale-cookie";

type AccessibilityMenuProps = {
  initialColorScheme: ColorScheme;
  initialFontFamily: FontFamily;
  initialTextSize: TextSize;
  className?: string;
};

function segmentClass(selected: boolean) {
  return [
    "relative flex flex-1 cursor-pointer items-center justify-center gap-1 px-2 py-3 transition-colors",
    "focus-within:z-10",
    selected
      ? "bg-nav-dropdown-selected-bg text-nav-dropdown-selected-fg"
      : "bg-transparent text-nav-dropdown-fg hover:text-nav-dropdown-hover",
  ].join(" ");
}

const fontFamilyLabelKey: Record<FontFamily, string> = {
  sans: "a11y_font_sans",
  serif: "a11y_font_serif",
  mono: "a11y_font_mono",
};

const localeLabelKey: Record<AppLocale, string> = {
  "pt-BR": "locale_pt_BR",
  en: "locale_en",
};

function LanguageMenu({
  value,
  onChange,
  labelledBy,
}: {
  value: AppLocale;
  onChange: (locale: AppLocale) => void;
  labelledBy: string;
}) {
  const { t } = useTranslation("common");

  return (
    <div
      className="overflow-hidden rounded-xl border border-nav-dropdown-border"
      role="radiogroup"
      aria-labelledby={labelledBy}
    >
      {supportedLocales.map((code, index) => (
        <label
          key={code}
          className={[
            "flex cursor-pointer items-center whitespace-nowrap px-4 py-3 text-body transition-colors",
            index > 0 ? "border-t border-nav-dropdown-border" : "",
            value === code
              ? "bg-nav-dropdown-selected-bg text-nav-dropdown-selected-fg"
              : "bg-transparent text-nav-dropdown-fg hover:text-nav-dropdown-hover",
          ].join(" ")}
        >
          <input
            type="radio"
            name="a11y-language"
            value={code}
            checked={value === code}
            onChange={() => onChange(code)}
            className="sr-only"
          />
          {t(localeLabelKey[code])}
        </label>
      ))}
    </div>
  );
}

export function AccessibilityMenu({
  initialColorScheme,
  initialFontFamily,
  initialTextSize,
  className,
}: AccessibilityMenuProps) {
  const router = useRouter();
  const {t, i18n} = useTranslation("common");

  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const [fontFamily, setFontFamily] = useState(initialFontFamily);
  const [textSize, setTextSize] = useState(initialTextSize);

  useEffect(() => {
    setColorScheme(initialColorScheme);
  }, [initialColorScheme]);

  useEffect(() => {
    setFontFamily(initialFontFamily);
  }, [initialFontFamily]);

  useEffect(() => {
    setTextSize(initialTextSize);
  }, [initialTextSize]);

  const refresh = () => {
    void router.refresh();
  };

  const onColorChange = (value: ColorScheme) => {
    setColorScheme(value);
    setColorSchemeCookie(value);
    refresh();
  };

  const onFontChange = (value: FontFamily) => {
    setFontFamily(value);
    setFontFamilyCookie(value);
    refresh();
  };

  const onTextSizeChange = (value: TextSize) => {
    setTextSize(value);
    setTextSizeCookie(value);
    refresh();
  };

  const onLocaleChange = (next: AppLocale) => {
    void i18n.changeLanguage(next);
    setLocaleCookie(next);
    refresh();
  };

  const resolvedLocale = (i18n.resolvedLanguage ?? i18n.language) as string;
  const currentLocale: AppLocale =
    resolvedLocale === "en" ? "en" : "pt-BR";

  const colorIcons: Record<ColorScheme, ReactNode> = {
    day: (
      <FontAwesomeIcon
        icon={faSun}
        className="size-[22px] shrink-0"
        aria-hidden
      />
    ),
    night: (
      <FontAwesomeIcon
        icon={faMoon}
        className="size-[22px] shrink-0"
        aria-hidden
      />
    ),
    "high-contrast": (
      <FontAwesomeIcon
        icon={faCircleHalfStroke}
        className="size-[22px] shrink-0"
        aria-hidden
      />
    ),
  };

  return (
      <div
          className={[
            "box-border w-full min-w-50 rounded-3xl border border-nav-dropdown-border bg-nav-dropdown-bg p-6 text-nav-dropdown-fg shadow-lg sm:p-8",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          role="region"
          aria-label={t("a11y_menu_region_label")}
      >
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2">
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="text-body mb-3 font-semibold">
            {t("a11y_color_theme")}
          </legend>
          <div
            className="flex overflow-hidden rounded-full border border-nav-dropdown-border"
            role="radiogroup"
            aria-label={t("a11y_color_theme")}
          >
            {colorSchemes.map((value, index) => (
              <label
                key={value}
                className={segmentClass(colorScheme === value)}
              >
                {index > 0 ? (
                  <span
                    className="pointer-events-none absolute top-2 bottom-2 left-0 w-px bg-nav-dropdown-border"
                    aria-hidden
                  />
                ) : null}
                <input
                  type="radio"
                  name="a11y-color-scheme"
                  value={value}
                  checked={colorScheme === value}
                  onChange={() => {
                    onColorChange(value);
                  }}
                  className="sr-only"
                />
                <span className="flex flex-col items-center gap-1">
                  <span aria-hidden>{colorIcons[value]}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="text-body mb-3 font-semibold">
            {t("a11y_text_size")}
          </legend>
          <div
            className="flex overflow-hidden rounded-full border border-nav-dropdown-border"
            role="radiogroup"
            aria-label={t("a11y_text_size")}
          >
            {textSizes.map((value, index) => (
              <label
                key={value}
                className={segmentClass(textSize === value)}
              >
                {index > 0 ? (
                  <span
                    className="pointer-events-none absolute top-2 bottom-2 left-0 w-px bg-nav-dropdown-border"
                    aria-hidden
                  />
                ) : null}
                <input
                  type="radio"
                  name="a11y-text-size"
                  value={value}
                  checked={textSize === value}
                  onChange={() => {
                    onTextSizeChange(value);
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={
                    value === "normal"
                      ? "font-sans text-sm leading-none font-semibold"
                      : "font-sans text-xl leading-none font-semibold"
                  }
                >
                  A
                </span>
                <span className="sr-only">
                  {value === "normal"
                    ? t("a11y_text_size_normal")
                    : t("a11y_text_size_large")}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="text-body mb-3 font-semibold">
            {t("a11y_font_family")}
          </legend>
          <div
            className="overflow-hidden rounded-xl border border-nav-dropdown-border"
            role="radiogroup"
            aria-label={t("a11y_font_family")}
          >
            {fontFamilies.map((value, index) => (
              <label
                key={value}
                className={[
                  "flex cursor-pointer items-center px-4 py-3 transition-colors",
                  index > 0 ? "border-t border-nav-dropdown-border" : "",
                  fontFamily === value
                    ? "bg-nav-dropdown-selected-bg text-nav-dropdown-selected-fg"
                    : "bg-transparent text-nav-dropdown-fg hover:text-nav-dropdown-hover",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="a11y-font-family"
                  value={value}
                  checked={fontFamily === value}
                  onChange={() => {
                    onFontChange(value);
                  }}
                  className="sr-only"
                />
                <span
                  className={
                    value === "sans"
                      ? "font-sans text-body"
                      : value === "serif"
                        ? "font-serif text-body"
                        : "font-mono text-body"
                  }
                >
                  {t(fontFamilyLabelKey[value])}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="min-w-0">
          <p className="text-body mb-3 font-semibold" id="a11y-lang-label">
            {t("a11y_language")}
          </p>
          <LanguageMenu
            value={currentLocale}
            onChange={onLocaleChange}
            labelledBy="a11y-lang-label"
          />
        </div>
      </div>
    </div>
  );
}
