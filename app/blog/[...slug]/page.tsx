import { Metadata } from "next";
import { singleBlogPageContent } from "@/config/metadata";
import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import MdxContent from "@/components/mdx/MdxComponent";

import "@/styles/mdx.css";
import { generatePageMetadata } from "@/config/metadata";

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  return generatePageMetadata(
    singleBlogPageContent,
    post?.title,
    post?.description
  );
}

const getPostFromParams = async (params: PostPageProps["params"]) => {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
};

export const generateStaticParams = async (): Promise<
  PostPageProps["params"][]
> => {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = formatDate(post.date);
  return (
    <article className="flex w-full flex-col gap-4 items-start prose">
      <div className="pb-5">
        <h1>{post.title}</h1>
        {post.description && <p>{post.description}</p>}
        <span className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" color="#4b5563" />
          {formattedDate}
        </span>
      </div>
      <Separator />
      <MdxContent code={post.body} />
      <Link
        className="hover:text-orange-500 transition-all duration-300"
        href={ROUTES.BLOG}
      >
        <div className="flex mt-9 items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Blog 🏃🏽‍♀️</span>
        </div>
      </Link>
    </article>
  );
}
