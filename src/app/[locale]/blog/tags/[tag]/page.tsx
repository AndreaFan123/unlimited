import Post from "@/src/components/post-list/Post";

import { posts } from "#site/content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import { getAlternates, SITE_URL } from "@/src/config/site";
import { getPostByTagSlug } from "@/src/lib/utils";
import { notFound } from "next/navigation";

type TagPageProps = {
  params: Promise<{
    tag: string;
    locale: string;
  }>;
};

function resolveLocale(locale: string): Locales {
  return routing.locales.includes(locale as Locales)
    ? (locale as Locales)
    : routing.defaultLocale;
}

function getPublishedTagPosts(locale: Locales, tag: string) {
  return getPostByTagSlug(
    posts.filter(
      (post) => post.published && post.language === toContentLanguage(locale),
    ),
    tag.toLowerCase(),
  );
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { locale: rawLocale, tag } = await params;
  const locale = resolveLocale(rawLocale);
  if (getPublishedTagPosts(locale, tag).length === 0) notFound();
  const path = `/blog/tags/${tag.toLowerCase()}`;
  const languages: Record<string, string> = {};
  for (const alternate of routing.locales) {
    if (getPublishedTagPosts(alternate, tag).length > 0) {
      languages[alternate] = `${SITE_URL}/${alternate}${path}`;
    }
  }
  languages["x-default"] = languages.en ?? languages[locale];
  const t = await getTranslations({ locale, namespace: "metadata.tag" });
  return {
    title: t("title", { tag: tag.toUpperCase() }),
    description: t("description", { tag: tag.toUpperCase() }),
    alternates: { ...getAlternates(locale, path), languages },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const locale = resolveLocale(resolvedParams.locale);
  const filteredPosts = getPublishedTagPosts(locale, resolvedParams.tag);
  if (filteredPosts.length === 0) notFound();
  const t = await getTranslations("tag");

  return (
    <section className="mx-auto my-4 flex w-full max-w-[1000px] flex-col gap-4 px-5 py-10">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        ✨{resolvedParams.tag.toUpperCase()}✨ {t("relatedPosts")}
      </h2>
      <ul className="flex flex-col gap-10">
        {filteredPosts.map((post) => (
          <Post key={post.slug} {...post} href={`/${post.slug}`} />
        ))}
      </ul>
    </section>
  );
}
