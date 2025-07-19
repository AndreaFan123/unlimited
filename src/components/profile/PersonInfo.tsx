import { Eye, Ghost, Github, Linkedin, Rss } from "lucide-react";
import ExternalLink from "@/src/components/profile/ExternalLink";
import ROUTES from "@/src/constants/routes";
import { useTranslations } from "next-intl";
type PersonInfoProps = {
  name: string;
  title: string;
  content_1: string;
  content_2?: string;
};

export default function PersonInfo({
  name,
  title,
  content_1,
  content_2,
}: PersonInfoProps) {
  const tSocials = useTranslations("socials");
  const SOCIALS = [
    {
      name: "Linkedin",
      icon: <Linkedin size={30} />,
      url: ROUTES.LINKEDIN,
      target: "_blank",
      ariaLabel: tSocials("linkedin"),
    },
    {
      name: "Github",
      icon: <Github size={30} />,
      url: ROUTES.GITHUB,
      target: "_blank",
      ariaLabel: tSocials("github"),
    },
    {
      name: "Resume",
      icon: <Eye size={30} />,
      url: ROUTES.RESUME,
      target: "_blank",
      ariaLabel: tSocials("resume"),
    },
    {
      name: "Blog",
      icon: <Rss size={30} />,
      url: "/blog",
      target: "",
      ariaLabel: tSocials("blog"),
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-start gap-7 mb-11">
        <div className="text-gray-700 flex gap-2 ites-center dark:text-gray-300 font-semibold">
          <Ghost
            width={50}
            height={50}
            className="text-gray-700 dark:text-gray-300"
          />
          <div>
            <h5>{name}</h5>
            <span>{title}</span>
          </div>
        </div>
        <div className="flex gap-6">
          {SOCIALS.map((socialItem) => (
            <ExternalLink
              key={socialItem.name}
              icon={socialItem.icon}
              url={socialItem.url}
              target={socialItem.target}
              ariaLabel={socialItem.ariaLabel}
            />
          ))}
        </div>
      </div>
      <article className="text-base leading-relaxed font-light flex flex-col gap-3">
        <p>{content_1}</p>
        <p>{content_2}</p>
      </article>
    </div>
  );
}
