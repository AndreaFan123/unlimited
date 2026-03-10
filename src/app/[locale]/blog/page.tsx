import Post from "@/src/components/post-list/Post";
import QueryPagination from "@/src/components/pagination/QueryPagination";
import { Metadata } from "next";
import { blogPageContent, generatePageMetadata } from "@/src/config/metadata";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { getTranslations } from "next-intl/server";
import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
};

export const metadata: Metadata = generatePageMetadata(blogPageContent);

export default async function BlogPage({ searchParams, params }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;
  const t = await getTranslations("blog");

  const postsPerPage = 5;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.language === locale)
  );
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const displayPosts = sortedPosts.slice(
    postsPerPage * (currentPage - 1),
    postsPerPage * currentPage
  );

  return (
    <>
      <section className="flex flex-col gap-4 pb-10">
        <h1 className="text-4xl relative w-fit font-extrabold text-gray-700 dark:text-gray-300">
          {t("blog")}
          <span className="h-2 bg-yellow-400 dark:bg-orange-500 absolute top-8 left-0 -z-10 w-full"></span>
        </h1>
        <p>{t("description")} 🚀</p>
      </section>
      <section className="flex flex-col gap-4 my-4">
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
