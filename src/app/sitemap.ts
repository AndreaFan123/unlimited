import type { MetadataRoute } from "next";
import { posts, projectPages } from "#site/content";
import { SITE_URL, contentLanguageToLocale, locales } from "@/src/config/site";
import { WORK_PROJECT_KEYS } from "@/src/constants/projects";
import { getPostAlternates } from "@/src/lib/blog-seo";

/** Pages that exist in both locales — emitted with hreflang alternates. */
const SHARED_PATHS = ["", "/blog", "/blog/tags", "/resume"];

export default function sitemap(): MetadataRoute.Sitemap {
  const shared: MetadataRoute.Sitemap = SHARED_PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          "zh-TW": `${SITE_URL}/zh-TW${path}`,
        },
      },
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = WORK_PROJECT_KEYS.flatMap(
    (key) =>
      locales.map((locale) => {
        const page = projectPages.find(
          (page) =>
            page.projectKey === key &&
            page.language === (locale === "zh-TW" ? "zh_tw" : "en") &&
            page.published,
        );
        return {
          url: `${SITE_URL}/${locale}/projects/${key}`,
          ...(page?.updated ? { lastModified: new Date(page.updated) } : {}),
          alternates: {
            languages: {
              en: `${SITE_URL}/en/projects/${key}`,
              "zh-TW": `${SITE_URL}/zh-TW/projects/${key}`,
            },
          },
        };
      }),
  );

  // Blog posts are language-specific: one URL per published post in its own locale.
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${SITE_URL}/${contentLanguageToLocale(post.language)}/blog/${post.slugAsParams}`,
      // Publication dates and build times are not evidence of the latest update.
      ...(post.updated ? { lastModified: new Date(post.updated) } : {}),
      alternates: {
        languages: getPostAlternates(SITE_URL, post, posts).languages,
      },
    }));

  return [...shared, ...projectEntries, ...postEntries];
}
