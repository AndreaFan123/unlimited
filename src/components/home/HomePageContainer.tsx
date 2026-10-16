import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
import { Locales } from "@/src/i18n/request";
import ProjectContainer from "../projects/ProjectContainer";

export default function HomePageContainer({ locale }: { locale: Locales }) {
  return (
    <section>
      <div>
        <ProfileContainer />
      </div>
      <div className="dark:border-b-[1px] dark:border-dashed dark:border-gray-400" />
      <div className="project-section-surface">
        <ProjectContainer />
      </div>
      <div className="dark:border-b-[1px] dark:border-dashed dark:border-gray-400" />
      <div>
        <PostContainer lang={locale} />
      </div>
    </section>
  );
}
