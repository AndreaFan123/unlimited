"use client";

import { Eye, Github, Linkedin, NotebookText } from "lucide-react";
import ExternalLink from "@/src/components/profile/ExternalLink";
import ROUTES from "@/src/constants/routes";
import { useTranslations } from "next-intl";
import LineReveal from "../animation/LineReveal";
import StaggerIn from "../animation/StaggerIn";

type PersonInfoProps = {
  name: string;
  title: string;
  description: string;
};

export default function PersonInfo({
  name,
  description,
}: PersonInfoProps) {
  const tSocials = useTranslations("socials");
  const SOCIALS = [
    {
      name: "Linkedin",
      icon: <Linkedin size={30} />,
      url: ROUTES.LINKEDIN,
      target: "_blank",
      ariaLabel: tSocials("linkedin"),
      bgClassName: "bg-[#0A66C2] hover:bg-[#084d94]",
    },
    {
      name: "Github",
      icon: <Github size={30} />,
      url: ROUTES.GITHUB,
      target: "_blank",
      ariaLabel: tSocials("github"),
      bgClassName: "bg-[#24292f] hover:bg-[#171515]",
    },
    {
      name: "Resume",
      icon: <Eye size={30} />,
      url: ROUTES.RESUME,
      target: "_blank",
      ariaLabel: tSocials("resume"),
      bgClassName: "bg-[#5350a6] hover:bg-[#4340a0]",
    },
    {
      name: "Blog",
      icon: <NotebookText size={30} />,
      url: "/blog",
      target: "",
      ariaLabel: tSocials("blog"),
      bgClassName: "bg-[#f97316] hover:bg-[#ea580c]",
    },
  ];
  return (
    <div className="flex flex-col items-start gap-20 mb-20">
      <LineReveal animateOnScroll={false} delay={1}>
        <h1 className="text-4xl md:text-5xl font-semibold lg:leading-snug text-balance block text-left">
          {name}
        </h1>
      </LineReveal>
      <div className="flex gap-10 items-start flex-col lg:flex-row lg:justify-between">
        <LineReveal animateOnScroll={false} delay={1.5}>
          <h2 className="text-xl block font-mono lg:w-[70%]">{description}</h2>
        </LineReveal>
        <StaggerIn delay={2} stagger={0.15} className="flex gap-7">
          {SOCIALS.map((socialItem) => (
            <ExternalLink
              key={socialItem.name}
              icon={socialItem.icon}
              url={socialItem.url}
              target={socialItem.target}
              ariaLabel={socialItem.ariaLabel}
              bgClassName={socialItem.bgClassName}
            />
          ))}
        </StaggerIn>
      </div>
    </div>
  );
}
