import postLocaleMap from "@/src/constants/postLocaleMap.json";
import type { Locales } from "@/src/i18n/request";
import { toContentLanguage } from "@/src/i18n/request";
import ROUTES from "@/src/constants/routes";

function baseFromSlug(slug: string): string {
  return slug.replace(/-(zh_tw|en)$/, "");
}

/**
 * When switching locales on a blog post, map to the sibling article's slug.
 * Non-blog paths keep the same pathname (only the locale prefix changes).
 */
export function getLocalizedPathname(
  pathname: string,
  targetLocale: Locales,
): string {
  if (!pathname.startsWith("/blog/")) {
    return pathname;
  }

  // Keep tag pages as-is: /blog/tags, /blog/tags/javascript
  const rest = pathname.slice("/blog/".length);
  if (!rest || rest === "tags" || rest.startsWith("tags/")) {
    return pathname;
  }

  const base = baseFromSlug(rest);
  const entry = postLocaleMap[base as keyof typeof postLocaleMap];
  if (!entry) {
    return ROUTES.BLOG;
  }

  const language = toContentLanguage(targetLocale) as "en" | "zh_tw";
  const targetSlug = entry[language];

  if (!targetSlug) {
    return ROUTES.BLOG;
  }

  return `/blog/${targetSlug}`;
}
