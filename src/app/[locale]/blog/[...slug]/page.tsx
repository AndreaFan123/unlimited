import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, contentLanguageToLocale } from "@/src/config/site";
import { blogPostingSchema } from "@/src/lib/structured-data";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/src/lib/utils";
import { Calendar } from "lucide-react";
import { slug } from "github-slugger";
import { Badge } from "@/src/components/ui/badge";
import ROUTES from "@/src/constants/routes";

import MdxContent from "@/src/components/mdx/MdxComponent";
import "@/src/styles/mdx.css";
import { Link } from "@/src/i18n/navigation";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";

type PostPageProps = {
  params: Promise<{
    slug: string[];
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "metadata.post",
  });
  const fallbackTitle = t("title");
  return {
    title: post?.title ? `${post.title}｜${fallbackTitle}` : fallbackTitle,
    description: post?.description ?? t("description"),
    alternates: {
      canonical: `${SITE_URL}/${resolvedParams.locale}/blog/${resolvedParams.slug.join("/")}`,
    },
  };
}

const getPostFromParams = async (params: Awaited<PostPageProps["params"]>) => {
  const slug = params?.slug?.join("/");
  const locale = routing.locales.includes(params.locale as Locales)
    ? (params.locale as Locales)
    : routing.defaultLocale;
  const language = toContentLanguage(locale);

  return posts.find(
    (post) => post.slugAsParams === slug && post.language === language,
  );
};

export const generateStaticParams = async (): Promise<
  { slug: string[]; locale: string }[]
> => {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
    locale: contentLanguageToLocale(post.language),
  }));
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;
  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = formatDate(post.date);
  const t = await getTranslations({ locale, namespace: "profile" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const articleSchema = blogPostingSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    url: `${SITE_URL}/${locale}/blog/${resolvedParams.slug.join("/")}`,
    authorName: t("name"),
    locale,
  });
  return (
    <article className="w-full max-w-[1000px] mx-auto px-5 py-10">
      <JsonLd data={articleSchema} />
      <div className="flex flex-col gap-3 pb-5">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-700 dark:text-gray-300">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
        )}
        <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          {formattedDate}
        </span>
        <div className="flex gap-2 mt-6">
          {post.tags?.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary">
              <Link
                className="text-gray-600 dark:text-gray-300 no-underline"
                href={`${ROUTES.TAG_SLUG}${slug(tag)}`}
              >
                {" "}
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </div>
      <Separator className="mb-5"/>
      <div className="prose w-full max-w-[1000px] mx-auto">
        <MdxContent code={post.body} />
      </div>
      <Link
        href={ROUTES.BLOG}
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm font-semibold text-gray-700 no-underline transition-colors hover:text-orange-500 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#7772ff] focus-visible:ring-offset-2 dark:text-gray-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{tBlog("backToBlog")} 🏃🏽‍♀️</span>
      </Link>
    </article>
  );
}
