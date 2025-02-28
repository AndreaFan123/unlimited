import Post from "@/src/app/[locale]/components/post-list/Post";
import QueryPagination from "@/src/app/[locale]/components/pagination/QueryPagination";
import { Metadata } from "next";
import { blogPageContent, generatePageMetadata } from "@/src/config/metadata";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { useTranslations } from "next-intl";

type BlogPageProps = {
  searchParams: {
    page?: string;
  };
};

export const metadata: Metadata = generatePageMetadata(blogPageContent);

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const t = useTranslations("blog");
  const postsPerPage = 3;
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const displayPosts = sortedPosts.slice(
    postsPerPage * (currentPage - 1),
    postsPerPage * currentPage
  );
  return (
    <>
      <section className="flex flex-col gap-4 pb-10">
        <h1 className="text-4xl font-extrabold text-gray-700 dark:text-gray-300">
          {t("blog")}
        </h1>
        <p>{t("description")} 🚀</p>
      </section>
      <section className="flex flex-col gap-4 my-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          {t("feature")}
        </h2>
        {displayPosts?.length > 0 ? (
          <ul className="flex flex-col gap-10">
            {displayPosts.map((post) => (
              <Post key={post.slug} {...post} />
            ))}
          </ul>
        ) : (
          <p>{t("workingOnIt")} 🚧</p>
        )}
      </section>
      <QueryPagination totalPages={totalPages} />
    </>
  );
}
