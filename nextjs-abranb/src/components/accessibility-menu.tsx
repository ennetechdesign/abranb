"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

function IconSun({ className }: { className?: string }) {
  return (
      <svg className={className} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.92778 -0.315627C5.15903 -0.412502 5.42153 -0.384377 5.6309 -0.246877L8.37465 1.57187L11.1184 -0.246877C11.3278 -0.384377 11.5903 -0.409377 11.8215 -0.315627C12.0528 -0.221877 12.2153 -0.0156266 12.2653 0.228123L12.9184 3.45312L16.1434 4.10625C16.3871 4.15625 16.5934 4.325 16.6872 4.55312C16.7809 4.78125 16.7559 5.04687 16.6184 5.25625L14.7997 8L16.6184 10.7437C16.7559 10.9531 16.7809 11.2156 16.6872 11.4469C16.5934 11.6781 16.3871 11.8469 16.1434 11.8937L12.9153 12.5437L12.2653 15.7719C12.2153 16.0156 12.0465 16.2219 11.8184 16.3156C11.5903 16.4094 11.3247 16.3844 11.1153 16.2469L8.37152 14.4281L5.62778 16.2469C5.4184 16.3844 5.1559 16.4094 4.92465 16.3156C4.6934 16.2219 4.52465 16.0156 4.47778 15.7719L3.82778 12.5437L0.59965 11.8906C0.3559 11.8406 0.14965 11.6719 0.0559004 11.4437C-0.0378496 11.2156 -0.0128496 10.95 0.12465 10.7406L1.9434 8L0.12465 5.25625C-0.0128496 5.04687 -0.0378496 4.78437 0.0559004 4.55312C0.14965 4.32187 0.3559 4.15312 0.59965 4.10625L3.82778 3.45625L4.4809 0.228123C4.5309 -0.0156266 4.69965 -0.221877 4.92778 -0.315627ZM5.84653 8C5.84653 7.33364 6.11123 6.69458 6.58242 6.22339C7.05361 5.75221 7.69267 5.4875 8.35903 5.4875C9.02538 5.4875 9.66445 5.75221 10.1356 6.22339C10.6068 6.69458 10.8715 7.33364 10.8715 8C10.8715 8.66635 10.6068 9.30542 10.1356 9.7766C9.66445 10.2478 9.02538 10.5125 8.35903 10.5125C7.69267 10.5125 7.05361 10.2478 6.58242 9.7766C6.11123 9.30542 5.84653 8.66635 5.84653 8ZM12.3715 8C12.3715 6.93582 11.9488 5.91522 11.1963 5.16273C10.4438 4.41024 9.42321 3.9875 8.35903 3.9875C7.29484 3.9875 6.27425 4.41024 5.52176 5.16273C4.76927 5.91522 4.34653 6.93582 4.34653 8C4.34653 9.06418 4.76927 10.0848 5.52176 10.8373C6.27425 11.5898 7.29484 12.0125 8.35903 12.0125C9.42321 12.0125 10.4438 11.5898 11.1963 10.8373C11.9488 10.0848 12.3715 9.06418 12.3715 8Z"
            fill="#FFFEFB"/>
      </svg>

  );
}

function IconMoon({className}: { className?: string }) {
  return (
      <svg
          className={className}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
  );
}

function IconContrast({className}: { className?: string }) {
  return (
      <svg
          className={className}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor"/>
      </svg>
  );
}

function segmentClass(selected: boolean) {
  return [
    "relative flex flex-1 cursor-pointer items-center justify-center gap-1 px-2 py-3 transition-colors",
    "focus-within:z-10",
    selected ? "bg-purple text-white" : "bg-transparent text-ink",
  ].join(" ");
}

const colorSchemeLabelKey: Record<ColorScheme, string> = {
  day: "a11y_color_day",
  night: "a11y_color_night",
  "high-contrast": "a11y_color_high_contrast",
};

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

  const colorIcons: Record<ColorScheme, React.ReactNode> = {
    day: <IconSun className="shrink-0"/>,
    night: <IconMoon className="shrink-0"/>,
    "high-contrast": <IconContrast className="shrink-0"/>,
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
