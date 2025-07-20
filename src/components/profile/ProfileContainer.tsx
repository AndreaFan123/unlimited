import PersonInfo from "@/src/components/profile/PersonInfo";
import { useTranslations } from "next-intl";

export default function ProfileContainer() {
  const tProfile = useTranslations("profile");

  // const sortedPosts = sortPosts(
  //   posts.filter((post) => post.published && post.language === lang)
  // );

  // const latestPosts = sortedPosts.slice(0, 6);

  return (
    <div className="flex flex-col gap-5 text-gray-700 dark:text-gray-300 w-full">
      <PersonInfo
        name={tProfile("name")}
        title={tProfile("title")}
        content_1={tProfile("content1")}
        content_2={tProfile("content2")}
      />
    </div>
  );
}
