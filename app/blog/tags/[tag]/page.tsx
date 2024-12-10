import { posts } from "#site/content";
import Post from "@/components/post-list/Post";

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag.toLowerCase();
  const filteredPosts = posts.filter((post) => post?.tags?.includes(tag));

  return (
    <section className="flex flex-col gap-4 my-4">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        ✨{params.tag.toUpperCase()}✨ related posts
      </h2>
      {filteredPosts?.length > 0 ? (
        <ul className="flex flex-col gap-10">
          {filteredPosts.map((post) => (
            <Post key={post.slug} {...post} href={`/${post.slug}`} />
          ))}
        </ul>
      ) : (
        <p>I am working on it 🚧</p>
      )}
    </section>
  );
}
