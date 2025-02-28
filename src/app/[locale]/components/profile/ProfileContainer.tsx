import TechStack from "@/src/app/[locale]/components/tech-stack/TechStack";
import Header from "@/src/app/[locale]/components/normal-components/Header";
import ExternalLink from "@/src/app/[locale]/components/profile/ExternalLink";
import PersonInfo from "@/src/app/[locale]/components/profile/PersonInfo";
import PostContainer from "@/src/app/[locale]/components/profile/PostContainer";

import { Github, Linkedin, Download, Rss } from "lucide-react";
import { posts } from "#site/content";
import { sortPosts } from "@/src/lib/utils";
import { useTranslations } from "next-intl";
import { Locales } from "@/src/i18n/request";
import ROUTES from "@/src/constants/routes";

export default function ProfileContainer({ lang }: { lang: Locales }) {
  const tSocials = useTranslations("socials");
  const tProfile = useTranslations("profile");

  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.language === lang)
  );
  console.log("sortedPosts", sortedPosts);
  const latestPosts = sortedPosts.slice(0, 2);

  const SOCIALS = [
    {
      name: "Linkedin",
      icon: <Linkedin size={30} />,
      url: ROUTES.LINKEDIN,
      target: "_blank",
      ariaLabel: tSocials("linkedin"),
    },
    {
      name: "Github",
      icon: <Github size={30} />,
      url: ROUTES.GITHUB,
      target: "_blank",
      ariaLabel: tSocials("github"),
    },
    {
      name: "Resume",
      icon: <Download size={30} />,
      url: ROUTES.RESUME,
      target: "_blank",
      ariaLabel: tSocials("resume"),
    },
    {
      name: "Blog",
      icon: <Rss size={30} />,
      url: ROUTES.BLOG,
      target: "",
      ariaLabel: tSocials("blog"),
    },
  ];
  return (
    <section className="lg:sticky lg:px-4 lg:top-0 lg:min-h-screen flex flex-col gap-5 text-gray-700 dark:text-gray-300 w-full lg:w-[30%]">
      <Header />
      <div className="mt-7 px-4 sm:px-0">
        <PersonInfo
          name={tProfile("name")}
          title={tProfile("title")}
          content_1={tProfile("content1")}
          content_2={tProfile("content2")}
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
          {tProfile("latestPosts")}
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
