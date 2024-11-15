import Profile from "@/components/profile/profile";
import Projects from "@/components/projects/projects";
import WorkExperience from "@/components/work-experience/work-experience";

export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="h-screen flex w-full flex-col lg:flex-row items-start  justify-start">
        <Profile />
        <div className="w-full xl:min-h-screen lg:border-l-[1px] lg:border-gray-400 lg:border-dashed">
          <section className="w-full lg:h-[90%] lg:ml-8">
            <Projects />
          </section>
          <section>
            <WorkExperience />
          </section>
        </div>
      </div>
    </main>
  );
}
