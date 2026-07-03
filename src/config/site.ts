import type { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shanlefan.com"
).replace(/\/$/, "");

export const locales = ["en", "zh-TW"] as const;
export const defaultLocale = "en";

export function contentLanguageToLocale(language: string): string {
  return language === "zh_tw" ? "zh-TW" : "en";
}

export function getAlternates(
  locale: string,
  path = ""
): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  return {
    canonical: `${SITE_URL}/${locale}${p}`,
    languages: {
      en: `${SITE_URL}/en${p}`,
      "zh-TW": `${SITE_URL}/zh-TW${p}`,
      "x-default": `${SITE_URL}/en${p}`,
    },
  };
}
