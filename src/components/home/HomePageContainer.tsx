"use client";

import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
import WorkExperience from "@/src/components/work-experience/WorkExperience";
import VolunteerProject from "@/src/components/work-experience/VolunteerProject";
// import { ReactLenis } from "lenis/react";
import { Locales } from "@/src/i18n/request";

export default function HomePageContainer({ locale }: { locale: Locales }) {
  return (
    <>
      {/* <ReactLenis root> */}
      <div className="px-5 flex flex-col gap-28">
        <section className="mt-20 md:mt-28">
          <ProfileContainer />
        </section>
        <section>
          <PostContainer lang={locale} />
        </section>
        <section>
          <WorkExperience />
        </section>
        <section className="mb-[40%] md:mb-[20%]">
          <VolunteerProject />
        </section>
      </div>
      {/* </ReactLenis> */}
    </>
  );
}
