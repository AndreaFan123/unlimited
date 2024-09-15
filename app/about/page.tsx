import { Github, Linkedin, File } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className=" max-w-full items-center p-4 h-full gap-5 md:flex-row md:justify-between md:max-w-[700px] mx-auto lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1400px]">
      <h1 className="text-2xl inline-block font-extrabold my-7 lg:my-10 xl:my-14 lg:text-5xl xl:text-6xl">
        About
      </h1>
      <div className="border-b-[1px] border-gray-300 w-full"></div>
      <article className="flex leading-loose flex-col justify-center items-center lg:items-start gap-5 py-7 xl:w-[50%]">
        <p className="text-base leading-loose">
          My name is <span className="font-extrabold">Shan Le Fan</span>, feel
          free to call me Andrea. I am a Frontend Developer based in the Taiwan.
        </p>
        <p>
          Self-disciplined, curiosity-driven frontend engineer with a marketing
          background, proficient in Next.js, React, TailwindCSS, JavaScript,
          TypeScript, HTML, and CSS. Highly adept at independent and
          collaborative projects, with strong focus on website development and
          user experience. Passionate about applying technical skills in
          volunteer projects for community impact.
        </p>
      </article>
      <div className="flex gap-3 justify-start">
        <div>
          <Link
            href="https://drive.google.com/file/d/1MQprobHXcITGrbZpCMo31kubvqlWAESy/view?usp=sharing"
            target="_blank"
          >
            <File className="w-6 h-6" />
          </Link>
          {/* Download PDF */}
        </div>
        <div>
          <Link href="https://www.linkedin.com/in/andrea-fan/" target="_blank">
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>
        <div>
          <Link href="https://github.com/AndreaFan123" target="_blank">
            <Github className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
