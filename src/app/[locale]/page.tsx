import type { Metadata } from "next";
import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
import ProjectContainer from "../../components/projects/ProjectContainer";
import WorkExperience from "../../components/work-experience/WorkExperience";
import VolunteerProject from "@/src/components/work-experience/VolunteerProject";

import {
  landingPageContent,
  generatePageMetadata,
} from "@/src/config/metadata";

import { Locales } from "@/src/i18n/request";

export const metadata: Metadata = generatePageMetadata(landingPageContent);

export default async function Home({
  params,
}: {
  params: { locale: Locales };
}) {
  const { locale } = await params;

  return (
    <main className="w-full px-4 flex flex-col gap-36 h-screen sm:max-w-full md:max-w-[1200px] mx-auto">
      <section className="mt-20">
        <ProfileContainer />
      </section>
      <section>
        <PostContainer lang={locale} />
      </section>
      {/* <div className="border-b-[1px] border-gray-400 border-dashed"></div> */}
      <section>
        <WorkExperience />
        {/* <ProjectContainer /> */}
        {/* <div className="w-full lg:ml-9">
          <WorkExperience />
          <VolunteerProject />
        </div> */}
      </section>
      <section>
        <VolunteerProject />
      </section>
      <section>
        <WorkExperience />
      </section>
    </main>
  );
}
