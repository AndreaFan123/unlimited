type SeoAlternates = {
  canonical: string;
  languages?: Record<string, string>;
};

type SeoPost = {
  slugAsParams: string;
  language: string;
  published: boolean;
};

export function getBlogPage(
  value: string | string[] | undefined,
  totalPages: number,
): number | null {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) &&
    page >= 1 &&
    page <= Math.max(1, totalPages)
    ? page
    : null;
}

export function getBlogAlternates(
  siteUrl: string,
  locale: string,
  page: number,
): SeoAlternates {
  const path = `/blog${page > 1 ? `?page=${page}` : ""}`;
  return {
    canonical: `${siteUrl}/${locale}${path}`,
    // Paginated lists can contain different articles in each language.
    ...(page === 1
      ? {
          languages: {
            en: `${siteUrl}/en/blog`,
            "zh-TW": `${siteUrl}/zh-TW/blog`,
            "x-default": `${siteUrl}/en/blog`,
          },
        }
      : {}),
  };
}

export function getPostAlternates(
  siteUrl: string,
  post: SeoPost,
  posts: readonly SeoPost[],
): SeoAlternates {
  // Match the filename convention used by write-post-locale-map.mjs.
  const base = post.slugAsParams.replace(/-(zh_tw|en)$/, "");
  const translations = posts.filter(
    (candidate) =>
      candidate.published &&
      candidate.slugAsParams.replace(/-(zh_tw|en)$/, "") === base,
  );
  const en = translations.find((candidate) => candidate.language === "en");
  const zh = translations.find((candidate) => candidate.language === "zh_tw");
  const locale = post.language === "zh_tw" ? "zh-TW" : "en";

  return {
    canonical: `${siteUrl}/${locale}/blog/${post.slugAsParams}`,
    ...(en && zh
      ? {
          languages: {
            en: `${siteUrl}/en/blog/${en.slugAsParams}`,
            "zh-TW": `${siteUrl}/zh-TW/blog/${zh.slugAsParams}`,
          },
        }
      : {}),
  };
}
