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
import Link from "next/link";

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

  return (
    <section className="mx-auto flex w-full max-w-[1000px] flex-col px-5 py-10 lg:h-[calc(100dvh-5rem)] lg:flex-row lg:gap-20 lg:overflow-hidden">
      <aside className="flex shrink-0 flex-col items-center gap-6 lg:sticky lg:top-20 lg:w-[240px] lg:self-start xl:w-[280px]">
        <Image
          src={me}
          width={120}
          height={120}
          alt="Andrea's pic"
          className="rounded-full"
        />
        <div>
          <a
            href="mailto:shanlefan.tw@gmail.com"
            className="text-gray-700 transition-all duration-300 hover:text-orange-500 dark:text-gray-300"
          >
            shanlefan.tw@gmail.com
          </a>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          {SOCIALS.map((social) => (
            <ExternalLink key={social.name} {...social} />
          ))}
          <Link
            href={ROUTES.GOOGLE_RESUME}
            target="_blank"
            className="flex text-gray-700 transition-all duration-300 hover:scale-110 hover:text-orange-500 dark:text-gray-300"
          >
            <ArrowDownToLine size={24} />
          </Link>
        </div>
      </aside>

      <div
        ref={contentRef}
        className="mt-10 flex min-h-0 flex-1 flex-col gap-16 pb-10 lg:mt-0 lg:max-h-[calc(100dvh-5rem)] lg:overflow-y-auto"
      >
        <WorkExperience />
        <div className="border-b-[1px] border-dashed border-gray-400" />
        <VolunteerProject />
      </div>
    </section>
  );
}
