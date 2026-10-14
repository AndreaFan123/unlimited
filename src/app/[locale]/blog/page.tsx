import Post from "@/src/components/post-list/Post";
import QueryPagination from "@/src/components/pagination/QueryPagination";
import { Metadata } from "next";
import { SITE_URL } from "@/src/config/site";
import { getBlogAlternates, getBlogPage } from "@/src/lib/blog-seo";
import { notFound } from "next/navigation";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { getTranslations } from "next-intl/server";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";

type BlogPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { currentPage } = getBlogPageData(locale, (await searchParams).page);
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getBlogAlternates(SITE_URL, locale, currentPage),
  };
}

const postsPerPage = 5;

function getBlogPageData(locale: string, page: string | string[] | undefined) {
  const sortedPosts = sortPosts(
    posts.filter(
      (post) =>
        post.published &&
        post.language === toContentLanguage(locale as Locales),
    ),
  );
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPage = getBlogPage(page, totalPages);
  if (currentPage === null) notFound();
  return { sortedPosts, totalPages, currentPage };
}

export default async function BlogPage({
  searchParams,
  params,
}: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;
  const t = await getTranslations("blog");

  const { sortedPosts, totalPages, currentPage } = getBlogPageData(
    locale,
    resolvedSearchParams.page,
  );
  const displayPosts = sortedPosts.slice(
    postsPerPage * (currentPage - 1),
    postsPerPage * currentPage,
  );

  return (
    <section className="mx-auto w-full max-w-[1000px] px-5">
      <div className="flex flex-col gap-4 py-10">
        <h1 className="relative w-fit text-4xl font-extrabold text-gray-700 dark:text-gray-300">
          {t("blog")}
          <span className="absolute left-0 top-8 -z-10 h-2 w-full bg-yellow-400 dark:bg-orange-500"></span>
        </h1>
        <p className="font-mono text-gray-700 dark:text-gray-300">
          {t("description")} 🚀
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {displayPosts?.length > 0 ? (
          <ul className="flex flex-col gap-20">
            {displayPosts.map((post) => (
              <Post key={post.slug} {...post} />
            ))}
          </ul>
        ) : (
          <p>{t("workingOnIt")} 🚧</p>
        )}
      </div>
      <div className="py-7">
        <QueryPagination totalPages={totalPages} />
      </div>
    </section>
  );
}
