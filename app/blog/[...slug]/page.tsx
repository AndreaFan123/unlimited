import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import MdxContent from "@/components/mdx/MdxComponent";

import "@/styles/mdx.css";

type PostPageProps = {
  params: {
    slug: string[];
  };
};

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
  return (
    <article className="flex w-full flex-col gap-4 items-start prose">
      <div className="pb-5">
        <h1>{post.title}</h1>
        {post.description && <p>{post.description}</p>}
      </div>
      <Separator />
      <MdxContent code={post.body} />
      <Link
        className="hover:text-orange-500 transition-all duration-300"
        href={ROUTES.BLOG}
      >
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Blog</span>
        </div>
      </Link>
    </article>
  );
}
