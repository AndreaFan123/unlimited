import { useTranslations } from "next-intl";
import ROUTES from "@/src/constants/routes";
import Link from "next/link";

export default function VolunteerProject() {
  const t = useTranslations("projects");
  const vulunteerProjects = [
    {
      name: t("mdn"),
      description: t("mdnDescription"),
      link: ROUTES.MDN,
    },
    {
      name: t("pyladies"),
      description: t("pyladiesDescription"),
      link: ROUTES.PYLADIES,
    },
    {
      name: t("coseeing"),
      description: t("coseeingDescription"),
      link: ROUTES.COSEEING,
    },
  ];
  return (
    <div className="mt-[20px] mb-8 px-4 sm:px-0">
      <h2 className="text-2xl relative w-fit mb-[20px] font-bold text-gray-700 dark:text-gray-300">
        {t("volunteer")}
        <span className="h-2 bg-indigo-300 absolute top-5 left-0 -z-10 w-full"></span>
      </h2>
      <div className="flex flex-col gap-9 ">
        {vulunteerProjects.map((project) => (
          <Link
            key={project.name}
            href={project.link}
            className="flex flex-col gap-1 border-b border-gray-400 border-dashed pb-3"
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-600 dark:text-white block">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
