import { posts } from "#site/content";
// import { Separator } from "@/components/ui/separator";
import Post from "@/components/post-list/Post";
export default async function BlogPage() {
  const displayPosts = await posts;
  const sortedPostsAscending = displayPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return (
    <>
      <section className="flex flex-col gap-4 pb-10">
        <h1 className="text-4xl font-extrabold text-gray-700">Blog</h1>
        <p>
          Rambling about web development, management, and other random stuff in
          my life 🚀
        </p>
      </section>
      {/* <Separator /> */}
      <section className="flex flex-col gap-4 mt-4">
        <h2 className="text-2xl font-bold text-gray-700">Featured</h2>
        {displayPosts?.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {sortedPostsAscending.map((post) => (
              <Post key={post.slug} {...post} />
            ))}
          </ul>
        ) : (
          <p>I am working on it 🚧</p>
        )}
      </section>
    </>
  );
}
