// import TechStack from "@/src/components/tech-stack/TechStack";
// import Header from "@/src/components/normal-components/Header";

import PersonInfo from "@/src/components/profile/PersonInfo";
import PostContainer from "@/src/components/profile/PostContainer";

import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { useTranslations } from "next-intl";
import { Locales } from "@/src/i18n/request";

export default function ProfileContainer({ lang }: { lang: Locales }) {
  const tProfile = useTranslations("profile");

  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.language === lang)
  );

  const latestPosts = sortedPosts.slice(0, 2);

  return (
    <aside className="px-4 lg:px-0 flex flex-col gap-5 text-gray-700 dark:text-gray-300 w-full lg:w-[30%] lg:mr-7">
      <div className="flex flex-col gap-11">
        <div className="">
          <PersonInfo
            name={tProfile("name")}
            title={tProfile("title")}
            content_1={tProfile("content1")}
            content_2={tProfile("content2")}
          />
        </div>
        <div className="flex flex-col sm:px-0">
          <h2 className="text-3xl relative w-fit font-bold text-gray-700 dark:text-gray-300">
            {tProfile("latestPosts")}
            <span className="h-2 bg-yellow-400 dark:bg-orange-600 absolute top-6 left-0 -z-10 w-full"></span>
          </h2>
          <ul className="py-4 flex flex-col gap-3">
            {latestPosts.map((post) => (
              <PostContainer key={post.slug} post={post} />
            ))}
          </ul>
        </div>
        {/* <TechStack /> */}
      </div>
    </aside>
  );
}
