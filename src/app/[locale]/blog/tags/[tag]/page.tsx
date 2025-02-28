import Post from "@/src/app/[locale]/components/post-list/Post";

import { posts } from "#site/content";
import { generatePageMetadata } from "@/src/config/metadata";
import { tagPageContent } from "@/src/config/metadata";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

type TagPageProps = {
  params: {
    tag: string;
  };
};

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const postTag = await getTagsFromParams(params);
  return generatePageMetadata(tagPageContent, postTag.toUpperCase());
}

const getTagsFromParams = async (params: TagPageProps["params"]) => {
  const tags = params.tag.toLowerCase();
  return tags;
};

export default function TagPage({ params }: TagPageProps) {
  const t = useTranslations("tag");
  const tag = params.tag.toLowerCase();
  const filteredPosts = posts.filter((post) => post?.tags?.includes(tag));

  return (
    <section className="flex flex-col gap-4 my-4">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        ✨{params.tag.toUpperCase()}✨ {t("relatedPosts")}
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
