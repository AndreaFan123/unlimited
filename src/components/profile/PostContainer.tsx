import { useTranslations } from "next-intl";
import Post from "@/src/components/profile/Post";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { Locales, toContentLanguage } from "@/src/i18n/request";

export default function PostContainer({ lang }: { lang: Locales }) {
  const tProfile = useTranslations("profile");

  const sortedPosts = sortPosts(
    posts.filter(
      (post) => post.published && post.language === toContentLanguage(lang)
    )
  );

  const latestPosts = sortedPosts.slice(0, 6);
  return (
    <div className="sm:px-0 pb-20 py-16  lg:py-32 w-full max-w-[1000px] mx-auto px-5 flex flex-col gap-12">
      <h2 className="text-3xl relative w-fit font-bold text-gray-700 dark:text-gray-300">
        {tProfile("latestPosts")}
      </h2>
      <ul className="py-4 grid lg:grid-cols-2 gap-5">
        {latestPosts.map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
