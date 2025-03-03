import meetToday from "@/public/meet-today.png";
import senryo from "@/public/senryo.png";
import unlimited from "@/public/unlimited.png";
import TechTag from "./TechTag";

import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import ROUTES from "@/src/constants/routes";

export default function ProjectContainer() {
  const t = useTranslations("projects");

  const projectList = [
    {
      name: "meet.today",
      description: t("digitalCard"),
      link: ROUTES.MEETUTODAY,
      src: meetToday,
      status: true,
      tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
    },
    {
      name: "senryo",
      description: t("senryo"),
      link: ROUTES.SENRYO,
      src: senryo,
      status: true,
      tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
    },
    {
      name: "Unlimited",
      description: t("unlimitedBlog"),
      link: "",
      src: unlimited,
      status: true,
      tech: [
        "Next.js",
        "TailwindCSS",
        "TypeScript",
        "MDX",
        "Shadcn/UI",
        "i18n",
      ],
    },
  ];
  return (
    <div className="w-full mt-5 px-4 sm:px-0">
      <h2 className="text-3xl w-fit relative font-bold mb-2 text-gray-700 dark:text-gray-300">
        {t("title")}
        <span className="h-2 bg-indigo-300 absolute top-6 left-0 -z-10 w-full"></span>
      </h2>
      <div className="pt-2 border-gray-400 dark:border-white border-dashed pb-5 w-full max-w-full">
        <div className="flex flex-col gap-5">
          {projectList.map((project) => (
            <Link
              href={project.link}
              key={project.name}
              className="border-gray-300 dark:border rounded-md relative flex flex-col gap-2 p-5 shadow-lg dark:bg-foreground hover:transform hover:scale-105 transition-transform"
            >
              <h3 className="block font-bold text-gray-700 dark:text-white text-[1.6rem]">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-white block">
                {project.description}
              </p>
              <TechTag tech={project.tech} />
              <span
                className={`text-gray-700 text-xs absolute top-4 right-4 ${
                  project.status
                    ? "bg-green-300 px-3 py-1 rounded-full"
                    : "bg-orange-300 px-3 py-1 rounded-full"
                }`}
              >
                {project.status ? "Done" : "WIP"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
