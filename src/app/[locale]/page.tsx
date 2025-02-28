import type { Metadata } from "next";
import ProfileContainer from "@/src/app/[locale]/components/profile/ProfileContainer";
import ProjectContainer from "@/src/app/[locale]/components/projects/ProjectContainer";
import WorkExperience from "@/src/app/[locale]/components/work-experience/WorkExperience";
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
    <main className="container mx-auto ">
      <div className="h-screen flex w-full flex-col lg:flex-row items-start  justify-start">
        <ProfileContainer lang={locale} />
        <div className="w-full xl:min-h-screen lg:border-l-[1px] lg:border-gray-400 lg:border-dashed">
          <section className="w-full lg:h-[90%] lg:ml-8">
            <ProjectContainer />
          </section>
          <section>
            <WorkExperience />
          </section>
        </div>
      </div>
    </main>
  );
}
