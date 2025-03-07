import {
  RiReactjsFill,
  RiNextjsFill,
  RiTailwindCssFill,
  RiCss3Fill,
  RiHtml5Fill,
} from "react-icons/ri";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";
import { useTranslations } from "next-intl";

const techStack = [
  { name: "Next.js", logo: RiNextjsFill },
  { name: "React.js", logo: RiReactjsFill },
  { name: "CSS", logo: RiCss3Fill },
  { name: "HTML", logo: RiHtml5Fill },
  { name: "JavaScript", logo: BiLogoJavascript },
  { name: "TypeScript", logo: BiLogoTypescript },
  { name: "TailwindCSS", logo: RiTailwindCssFill },
];

export default function TechStack() {
  const t = useTranslations("techStack");
  return (
    <div className="overflow-hidden sm:px-0">
      <div className="container mx-auto ">
        <h2 className="text-3xl w-fit relative font-bold text-gray-700 dark:text-gray-300 mb-5">
          {t("title")}
          <span className="h-2 bg-yellow-400 dark:bg-orange-600 absolute top-6 left-0 -z-10 w-full"></span>
        </h2>

        <div className="flex overflow-x-hidden">
          <div className="flex animate-scroll ">
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="flex flex-col items-center mx-4">
                <tech.logo className="w-16 h-16 mb-2 text-gray-700 dark:text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
