export const locales = ["en", "ko", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ko: "한국어",
  vi: "VI",
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  vi: "Tiếng Việt",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
