import type { Metadata } from "next";
import ProfileContainer from "@/components/profile/ProfileContainer";
import ProjectContainer from "@/components/projects/ProjectContainer";
import WorkExperience from "@/components/work-experience/WorkExperience";
import { landingPageContent, generatePageMetadata } from "@/config/metadata";

export const metadata: Metadata = generatePageMetadata(landingPageContent);

export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="h-screen flex w-full flex-col lg:flex-row items-start  justify-start">
        <ProfileContainer />
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
