import TechStack from "@/components/tech-stack/TechStack";
import SOCIALS from "@/constants/socials";
import Header from "@/components/normal-components/Header";
import ExternalLink from "@/components/profile/ExternalLink";
import PersonInfo from "@/components/profile/PersonInfo";
import PostContainer from "@/components/profile/PostContainer";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";

export default function ProfileContainer() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const latestPosts = sortedPosts.slice(0, 2);
  return (
    <section className="lg:sticky lg:px-4 lg:top-0 lg:min-h-screen flex flex-col gap-5 text-gray-700 dark:text-gray-300 w-full lg:w-[30%]">
      <Header />
      <div className="mt-7 px-4 sm:px-0">
        <PersonInfo
          name="Shan Le Fan(Andrea)"
          title="Frontend Developer && Marketer"
          content_1="Self-disciplined, curiosity-driven frontend engineer with a marketing background, and a passion for Next.js, React, TailwindCSS, JavaScript, TypeScript, HTML, and CSS."
          content_2="Highly adept at independent and collaborative projects, with strong focus on website development and user experience. Passionate about applying technical skills in volunteer projects for community impact."
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
          Latest Posts
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
