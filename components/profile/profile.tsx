import Link from "next/link";
import { Ghost, Mail, Github, Linkedin } from "lucide-react";
import TechStack from "../tech-stack/tech-stack";
import Header from "../header/header";

export default function Profile() {
  return (
    <section className="lg:sticky  lg:px-4 lg:top-0 lg:h-screen flex flex-col gap-5 text-gray-600 w-full lg:w-[30%]">
      <Header />
      <div className="pt-7">
        <div className="flex items-start gap-2">
          <Ghost width={50} height={50} />
          <div className="text-gray-800 font-semibold">
            <h5>Shan Le Fan(Andrea)</h5>
            <span>Frontend Developer && Marketer</span>
          </div>
        </div>
        <article className="text-base py-9 leading-relaxed font-light flex flex-col gap-3">
          <p>
            Self-disciplined, curiosity-driven frontend engineer with a
            marketing background, proficient in Next.js, React, TailwindCSS,
            JavaScript, TypeScript, HTML, and CSS.
          </p>
          <p>
            Highly adept at independent and collaborative projects, with strong
            focus on website development and user experience. Passionate about
            applying technical skills in volunteer projects for community
            impact.
          </p>
        </article>
        <div className="flex gap-6">
          {/* Add Email icon and mailto: */}
          <a href="mailto:shanlefan.tw@gmail.com">
            <Mail size={30} />
          </a>
          <Link href="https://github.com/shanlefan" target="_blank">
            <Github size={30} />
          </Link>
          <Link href="https://www.linkedin.com/in/shanlefan/" target="_blank">
            <Linkedin size={30} />
          </Link>
        </div>
      </div>
      <TechStack />
    </section>
  );
}
