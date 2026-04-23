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
    selected ? "bg-purple text-white" : "bg-transparent text-ink",
  ].join(" ");
}

const fontFamilyLabelKey: Record<FontFamily, string> = {
  sans: "a11y_font_sans",
  serif: "a11y_font_serif",
  mono: "a11y_font_mono",
};

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

  const onLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as AppLocale;
    void i18n.changeLanguage(next);
    setLocaleCookie(next);
    refresh();
  };

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
            "border-charcoal/15 bg-gold text-ink box-border w-full min-w-50 rounded-3xl border p-6 shadow-sm sm:p-8",
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
            className="border-charcoal/25 divide-charcoal/25 flex overflow-hidden rounded-full border"
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
                    className="bg-charcoal/25 pointer-events-none absolute top-2 bottom-2 left-0 w-px"
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
            className="border-charcoal/25 divide-charcoal/25 flex overflow-hidden rounded-full border"
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
                    className="bg-charcoal/25 pointer-events-none absolute top-2 bottom-2 left-0 w-px"
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
            className="border-purple divide-charcoal/25 overflow-hidden rounded-xl border-2"
            role="radiogroup"
            aria-label={t("a11y_font_family")}
          >
            {fontFamilies.map((value, index) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center px-4 py-3 ${
                  index > 0 ? "border-charcoal/25 border-t" : ""
                } ${fontFamily === value ? "bg-purple text-white" : "bg-gold text-ink"}`}
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
          <div className="relative">
            <select
              className="border-purple bg-purple text-body w-full cursor-pointer appearance-none rounded-full border-2 border-transparent py-3 pr-10 pl-4 text-white"
              value={i18n.resolvedLanguage ?? i18n.language}
              onChange={onLocaleChange}
              aria-labelledby="a11y-lang-label"
            >
              {supportedLocales.map((code) => (
                <option key={code} value={code} className="text-ink bg-paper">
                  {code === "pt-BR" ? t("locale_pt_BR") : t("locale_en")}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
