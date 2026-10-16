import { getAllTags, sortTagByCount } from "@/src/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/src/config/site";
import { posts } from "#site/content";
import Tag from "@/src/components/tags/tag";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.tags" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates(locale, "/blog/tags"),
  };
}

export default async function TagsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locales)
    ? (rawLocale as Locales)
    : routing.defaultLocale;
  const tags = getAllTags(
    posts.filter((post) => post.language === toContentLanguage(locale)),
  );
  const sortedTags = sortTagByCount(tags);
  return (
    <div className="container max-w-4xl">
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  );
}
