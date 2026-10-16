import { Eye, Github, Linkedin, NotebookText } from "lucide-react";
import ExternalLink from "@/src/components/profile/ExternalLink";
import ROUTES from "@/src/constants/routes";
import { useTranslations } from "next-intl";

type PersonInfoProps = {
  name: string;
  title: string;
  description: string;
};

export default function PersonInfo({ name, description }: PersonInfoProps) {
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
    <div className="mb-20 flex flex-col items-start gap-20">
      <h1 className="block text-balance text-left text-4xl font-semibold md:text-5xl lg:leading-snug">
        {name}
      </h1>
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
        <h2 className="block font-mono text-xl lg:w-[70%]">{description}</h2>
        <div className="flex gap-7">
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
        </div>
      </div>
    </div>
  );
}
