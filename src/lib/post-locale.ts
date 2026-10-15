import postLocaleMap from "@/src/constants/postLocaleMap.json";
import type { Locales } from "@/src/i18n/request";
import { toContentLanguage } from "@/src/i18n/request";
import ROUTES from "@/src/constants/routes";

export type TagSlugsByLocale = Record<Locales, string[]>;

function baseFromSlug(slug: string): string {
  return slug.replace(/-(zh_tw|en)$/, "");
}

/**
 * When switching locales on a blog post, map to the sibling article's slug.
 * Tag detail pages fall back to the tag index if the target locale is unavailable.
 * Non-blog paths keep the same pathname (only the locale prefix changes).
 */
export function getLocalizedPathname(
  pathname: string,
  targetLocale: Locales,
  availableTagSlugs: readonly string[] = [],
): string {
  if (!pathname.startsWith("/blog/")) {
    return pathname;
  }

  // The tag index exists in both languages; detail pages depend on published content.
  const rest = pathname.slice("/blog/".length);
  if (!rest || rest === "tags") {
    return pathname;
  }
  if (rest.startsWith("tags/")) {
    const index = ROUTES.TAG_SLUG.replace(/\/$/, "");
    let tag: string;
    try {
      tag = decodeURIComponent(rest.slice("tags/".length))
        .replace(/\/$/, "")
        .toLowerCase();
    } catch {
      return index;
    }
    return availableTagSlugs.includes(tag) ? `${index}/${tag}` : index;
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
