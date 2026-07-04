import { getAllTags, sortTagByCount } from "@/src/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/src/config/site";
import { posts } from "#site/content";
import Tag from "@/src/components/tags/tag";

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

export default function TagsPage() {
  const tags = getAllTags(posts);
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
