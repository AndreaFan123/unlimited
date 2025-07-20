import { useTranslations } from "next-intl";
import Post from "@/src/components/profile/Post";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { Locales } from "@/src/i18n/request";

export default function PostContainer({ lang }: { lang: Locales }) {
  const tProfile = useTranslations("profile");

  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.language === lang)
  );

  const latestPosts = sortedPosts.slice(0, 6);
  return (
    <div className="flex flex-col sm:px-0">
      <h2 className="text-3xl relative w-fit font-bold text-gray-700 dark:text-gray-300">
        {tProfile("latestPosts")}
        <span className="h-2 bg-yellow-400 dark:bg-orange-600 absolute top-6 left-0 -z-10 w-full"></span>
      </h2>
      <ul className="py-4 grid lg:grid-cols-2 gap-3">
        {latestPosts.map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
