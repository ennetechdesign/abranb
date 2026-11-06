export const COLOR_SCHEME_COOKIE = "NEXT_COLOR_SCHEME";
export const COLOR_SCHEME_HEADER = "x-next-color-scheme";

export const defaultColorScheme = "day";
export const colorSchemes = ["day", "night", "high-contrast"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

export function isColorScheme(value: string | undefined): value is ColorScheme {
  return (
    value !== undefined &&
    (colorSchemes as readonly string[]).includes(value)
  );
}

export function normalizeColorScheme(value: string | undefined): ColorScheme {
  return isColorScheme(value) ? value : defaultColorScheme;
}

/**
 * Runs before first paint when the visitor has no stored colour scheme yet: if the browser
 * prefers dark, switch to "night" and remember it in the cookie so the server renders it
 * from the next request on. (The server cannot know the preference on a first visit.)
 */
export const COLOR_SCHEME_INIT_SCRIPT = `try{if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-color-scheme","night");document.cookie="${COLOR_SCHEME_COOKIE}=night; Path=/; Max-Age=31536000; SameSite=Lax"}}catch(e){}`;

export const FONT_FAMILY_COOKIE = "NEXT_FONT_FAMILY";
export const FONT_FAMILY_HEADER = "x-next-font-family";

export const defaultFontFamily = "sans";
export const fontFamilies = ["sans", "serif", "mono"] as const;
export type FontFamily = (typeof fontFamilies)[number];

export function isFontFamily(value: string | undefined): value is FontFamily {
  return (
    value !== undefined && (fontFamilies as readonly string[]).includes(value)
  );
}

export function normalizeFontFamily(value: string | undefined): FontFamily {
  return isFontFamily(value) ? value : defaultFontFamily;
}

export const TEXT_SIZE_COOKIE = "NEXT_TEXT_SIZE";
export const TEXT_SIZE_HEADER = "x-next-text-size";

export const defaultTextSize = "large";
export const textSizes = ["normal", "large"] as const;
export type TextSize = (typeof textSizes)[number];

export function isTextSize(value: string | undefined): value is TextSize {
  return value !== undefined && (textSizes as readonly string[]).includes(value);
}

export function normalizeTextSize(value: string | undefined): TextSize {
  return isTextSize(value) ? value : defaultTextSize;
}
