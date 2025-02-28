import TechStack from "@/src/app/[locale]/components/tech-stack/TechStack";
import SOCIALS from "@/src/constants/socials";
import Header from "@/src/app/[locale]/components/normal-components/Header";
import ExternalLink from "@/src/app/[locale]/components/profile/ExternalLink";
import PersonInfo from "@/src/app/[locale]/components/profile/PersonInfo";
import PostContainer from "@/src/app/[locale]/components/profile/PostContainer";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { useTranslations } from "next-intl";

export default function ProfileContainer() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const latestPosts = sortedPosts.slice(0, 2);

  const t = useTranslations("profile");
  return (
    <section className="lg:sticky lg:px-4 lg:top-0 lg:min-h-screen flex flex-col gap-5 text-gray-700 dark:text-gray-300 w-full lg:w-[30%]">
      <Header />
      <div className="mt-7 px-4 sm:px-0">
        <PersonInfo
          name={t("name")}
          title={t("title")}
          content_1={t("content1")}
          content_2={t("content2")}
        />
        <div className="flex gap-6">
          {SOCIALS.map((socialItem) => (
            <ExternalLink
              key={socialItem.name}
              icon={socialItem.icon}
              url={socialItem.url}
              target={socialItem.target}
              ariaLabel={socialItem.ariaLabel}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-7 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
          {t("latestPosts")}
        </h2>
        <ul className="py-4 flex flex-col gap-3">
          {latestPosts.map((post) => (
            <PostContainer key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      <TechStack />
    </section>
  );
}
