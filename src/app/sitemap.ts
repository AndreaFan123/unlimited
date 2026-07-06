import type { MetadataRoute } from "next";
import { posts } from "#site/content";
import { SITE_URL, contentLanguageToLocale } from "@/src/config/site";
import { WORK_PROJECT_KEYS } from "@/src/constants/projects";

/** Pages that exist in both locales — emitted with hreflang alternates. */
const SHARED_PATHS = ["", "/blog", "/blog/tags", "/resume"];

export default function sitemap(): MetadataRoute.Sitemap {
  const shared: MetadataRoute.Sitemap = SHARED_PATHS.map((path) => ({
    url: `${SITE_URL}/en${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${SITE_URL}/en${path}`,
        "zh-TW": `${SITE_URL}/zh-TW${path}`,
      },
    },
  }));

  const projectEntries: MetadataRoute.Sitemap = WORK_PROJECT_KEYS.flatMap(
    (key) =>
      ["en", "zh-TW"].map((locale) => ({
        url: `${SITE_URL}/${locale}/projects/${key}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${SITE_URL}/en/projects/${key}`,
            "zh-TW": `${SITE_URL}/zh-TW/projects/${key}`,
          },
        },
      })),
  );

  // Blog posts are language-specific: one URL per published post in its own locale.
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${SITE_URL}/${contentLanguageToLocale(post.language)}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
    }));

  return [...shared, ...projectEntries, ...postEntries];
}
