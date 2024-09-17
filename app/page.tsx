import Profile from "@/components/profile/profile";
import Projects from "@/components/projects/projects";

export default function Home() {
  return (
    <div className="container mx-auto px-5 py-16">
      <main className="h-screen flex  w-full flex-col lg:flex-row items-start  justify-start">
        {/* Profile component*/}
        <Profile />
        <section className="w-full lg:w-[70%]">
          <Projects />
        </section>
      </main>
    </div>
  );
}
