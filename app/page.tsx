import Profile from "@/components/profile/profile";
import Projects from "@/components/projects/projects";
import WorkExperience from "@/components/work-experience/work-experience";

export default function Home() {
  return (
    <div className="container mx-auto px-5 py-7">
      <main className="h-screen flex  w-full flex-col lg:flex-row items-start  justify-start">
        <Profile />
        <div className="lg:border-l-[1px] lg:border-gray-400 lg:border-dashed">
          <section className="w-full lg:w-[70%] lg:h-[90%] lg:overflow-scroll">
            <Projects />
          </section>
          <section>
            <WorkExperience />
          </section>
        </div>
      </main>
    </div>
  );
}
