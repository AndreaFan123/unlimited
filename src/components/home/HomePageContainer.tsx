"use client";

import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
import WorkExperience from "@/src/components/work-experience/WorkExperience";
import VolunteerProject from "@/src/components/work-experience/VolunteerProject";
import { Locales } from "@/src/i18n/request";
import ProjectContainer from "../projects/ProjectContainer";

export default function HomePageContainer({ locale }: { locale: Locales }) {
  return (
    <section>
      <section className="pb-20 lg:py-32 w-full max-w-[1000px] mx-auto px-5 py-10 flex flex-col gap-28">
        <ProfileContainer />
      </section>
      <section className="project-section-surface">
        <ProjectContainer />
      </section>

    </section>
  );
}
