"use client";

import { ArrowDownToLine, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import ExternalLink from "@/src/components/profile/ExternalLink";
import WorkExperience from "@/src/components/work-experience/WorkExperience";
import VolunteerProject from "@/src/components/work-experience/VolunteerProject";
import ROUTES from "@/src/constants/routes";

import me from "@/public/me.webp";
import Image from "next/image";

export default function ResumePageContainer() {
  const tSocials = useTranslations("socials");
  const contentRef = useRef<HTMLDivElement>(null);

  const SOCIALS = [
    {
      name: "Linkedin",
      icon: <Linkedin size={24} />,
      url: ROUTES.LINKEDIN,
      target: "_blank",
      ariaLabel: tSocials("linkedin"),
      bgClassName: "text-gray-700 hover:text-orange-600 dark:text-gray-300",
    },
    {
      name: "Github",
      icon: <Github size={24} />,
      url: ROUTES.GITHUB,
      target: "_blank",
      ariaLabel: tSocials("github"),
      bgClassName: "text-gray-700 hover:text-orange-600 dark:text-gray-300",
    },
  ];

  const scrollToResume = () => {
    const panel = contentRef.current;
    if (!panel) return;

    if (window.matchMedia("(min-width: 1024px)").matches) {
      panel.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="w-full max-w-[1000px] mx-auto px-5 py-10 flex flex-col lg:flex-row lg:gap-20 lg:h-[calc(100dvh-5rem)] lg:overflow-hidden">
      <aside className="flex flex-col items-center gap-6 lg:w-[240px] xl:w-[280px] shrink-0 lg:sticky lg:top-20 lg:self-start">
          <Image
            src={me}
            width={120}
            height={120}
            alt="Andrea's pic"
            className="rounded-full"
          />
        <div>
          <a href="mailto:shanlefan.tw@gmail.com" className="text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-orange-500">shanlefan.tw@gmail.com</a>
        </div>
        <div className="flex w-full gap-4 justify-center items-center">
          {SOCIALS.map((social) => (
            <ExternalLink key={social.name} {...social} />
          ))}
          <button
            type="button"
            onClick={scrollToResume}
            className="flex transition-all hover:scale-110 duration-300 text-gray-700 dark:text-gray-300 hover:text-orange-500"
          >
            <ArrowDownToLine size={24} />
          </button>
        </div>
      </aside>

      <div
        ref={contentRef}
        className="flex-1 min-h-0 flex flex-col gap-16 mt-10 lg:mt-0 lg:overflow-y-auto lg:max-h-[calc(100dvh-5rem)] pb-10"
      >
        <WorkExperience />
        <div className="border-b-[1px] border-gray-400 border-dashed" />
        <VolunteerProject />
      </div>
    </section>
  );
}
