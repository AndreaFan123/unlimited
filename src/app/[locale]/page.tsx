import type { Metadata } from "next";
import ProfileContainer from "../../components/profile/ProfileContainer";
// import ProjectContainer from "../../components/projects/ProjectContainer";
// import WorkExperience from "../../components/work-experience/WorkExperience";
import {
  landingPageContent,
  generatePageMetadata,
} from "@/src/config/metadata";
import { Locales } from "@/src/i18n/request";
// import VolunteerProject from "@/src/components/work-experience/VolunteerProject";

export const metadata: Metadata = generatePageMetadata(landingPageContent);

export default async function Home({
  params,
}: {
  params: { locale: Locales };
}) {
  const { locale } = await params;
  return (
    <main className="container mx-auto">
      <section className="h-screen flex w-full flex-col gap-14 lg:gap-0 lg:flex-row items-start justify-start">
        <ProfileContainer lang={locale} />
      </section>
      {/* <section className="w-full mt-20 lg:mt-0 lg:ml-[36%] lg:w-[57%] xl:ml-[40%] xl:min-h-screen lg:border-l-[1px] lg:border-gray-400 lg:border-dashed">
        <div className="w-full lg:ml-9 flex flex-col lg:flex-row lg:justify-between lg:gap-6 border-b border-dashed border-b-gray-400">
          <ProjectContainer />
        </div>
        <div className="w-full lg:ml-9">
          <WorkExperience />
          <VolunteerProject />
        </div>
      </section> */}
    </main>
  );
}
