import { Ghost, Mail } from "lucide-react";
import { Button } from "../ui/button";
import TechStack from "../tech-stack/tech-stack";

export default function Profile() {
  return (
    <section className="lg:sticky lg:px-4 lg:border-r-[1px] lg:border-gray-400 lg:border-dashed lg:top-0 lg:h-screen flex flex-col gap-5 text-gray-600 w-full lg:w-[30%]">
      <div className="flex items-start gap-2">
        <Ghost width={50} height={50} />
        <div>
          <h5>Shan Le Fan(Andrea)</h5>
          <span>Frontend Developer && Marketer</span>
        </div>
      </div>
      <article className="text-base leading-relaxed font-light flex flex-col gap-3">
        <p>
          Self-disciplined, curiosity-driven frontend engineer with a marketing
          background, proficient in Next.js, React, TailwindCSS, JavaScript,
          TypeScript, HTML, and CSS. Highly adept at independent and
          collaborative projects, with strong focus on website development and
          user experience. Passionate about applying technical skills in
          volunteer projects for community impact.
        </p>
        <Button className="py-5">
          {/* Add Email icon and mailto: */}
          <a
            href="mailto:shanlefan.tw@gmail.com"
            className="flex items-center gap-2"
          >
            <Mail />
            <span>Let&apos;s Connect</span>
          </a>
        </Button>
      </article>
      <TechStack />
    </section>
  );
}
