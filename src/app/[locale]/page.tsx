import type { Metadata } from "next";
import ProfileContainer from "../../components/profile/ProfileContainer";
import PostContainer from "@/src/components/profile/PostContainer";
// import ProjectContainer from "../../components/projects/ProjectContainer";
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
    <main className="w-full h-screen sm:max-w-full md:max-w-[1200px] mx-auto">
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
        <section>
          <VolunteerProject />
        </section>
        <section className="mb-36">
          <WorkExperience />
        </section>
      </div>
    </main>
  );
}
