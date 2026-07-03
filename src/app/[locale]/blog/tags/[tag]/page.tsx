import Post from "@/src/components/post-list/Post";

import { posts } from "#site/content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import { getAlternates } from "@/src/config/site";

type TagPageProps = {
  params: Promise<{
    tag: string;
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.tag" });
  return {
    title: t("title", { tag: tag.toUpperCase() }),
    description: t("description", { tag: tag.toUpperCase() }),
    alternates: getAlternates(locale, `/blog/tags/${tag.toLowerCase()}`),
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;
  const t = await getTranslations("tag");
  const tag = resolvedParams.tag.toLowerCase();
  const filteredPosts = posts.filter(
    (post) =>
      post?.tags?.includes(tag) &&
      post.language === toContentLanguage(locale)
  );

  return (
    <section className="flex flex-col gap-4 my-4">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        ✨{resolvedParams.tag.toUpperCase()}✨ {t("relatedPosts")}
      </h2>
      {filteredPosts?.length > 0 ? (
        <ul className="flex flex-col gap-10">
          {filteredPosts.map((post) => (
            <Post key={post.slug} {...post} href={`/${post.slug}`} />
          ))}
        </ul>
      ) : (
        <p>{t("workingOnIt")} 🚧</p>
      )}
    </section>
  );
}
