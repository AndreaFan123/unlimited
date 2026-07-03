import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export type Locales = "en" | "zh-TW";

/** Blog MDX frontmatter still uses the legacy `zh_tw` language tag. */
export function toContentLanguage(locale: Locales): string {
  return locale === "zh-TW" ? "zh_tw" : locale;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locales)) {
    locale = routing.defaultLocale;
  }

  const messagesLocale = locale === "zh-TW" ? "zh_tw" : locale;

  return {
    locale,
    messages: (await import(`../../messages/${messagesLocale}.json`)).default,
  };
});
