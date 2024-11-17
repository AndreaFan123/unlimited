import { Metadata } from "next";
import { blogPageContent, generatePageMetadata } from "@/config/metadata";
import { posts } from "#site/content";
import Post from "@/components/post-list/Post";
import QueryPagination from "@/components/pagination/QueryPagination";
import { sortPosts } from "@/lib/utils";

type BlogPageProps = {
  searchParams: {
    page?: string;
  };
};

export const metadata: Metadata = generatePageMetadata(blogPageContent);

export default async function BlogPage({ searchParams }: BlogPageProps) {
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
        <h1 className="text-4xl font-extrabold text-gray-700">Blog</h1>
        <p>
          Rambling about web development, management, and other random stuff in
          my life 🚀
        </p>
      </section>
      <section className="flex flex-col gap-4 my-4">
        <h2 className="text-2xl font-bold text-gray-700">Featured</h2>
        {displayPosts?.length > 0 ? (
          <ul className="flex flex-col gap-10">
            {displayPosts.map((post) => (
              <Post key={post.slug} {...post} />
            ))}
          </ul>
        ) : (
          <p>I am working on it 🚧</p>
        )}
      </section>
      <QueryPagination totalPages={totalPages} />
    </>
  );
}
