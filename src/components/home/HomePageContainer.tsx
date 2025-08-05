"use client";

import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
import WorkExperience from "@/src/components/work-experience/WorkExperience";
import VolunteerProject from "@/src/components/work-experience/VolunteerProject";
import { ReactLenis } from "lenis/react";
import { Locales } from "@/src/i18n/request";

export default function HomePageContainer({ locale }: { locale: Locales }) {
  return (
    <>
      <ReactLenis root>
        <div className="px-5 flex flex-col gap-32">
          <section className="mt-32">
            <ProfileContainer />
          </section>
          <section>
            <PostContainer lang={locale} />
          </section>
          <section>
            <WorkExperience />
          </section>
          <section className="mb-[13%]">
            <VolunteerProject />
          </section>
        </div>
      </ReactLenis>
    </>
  );
}
