import { useTranslations } from "next-intl";
import { Globe, Github } from "lucide-react";
import Link from "next/link";

export default function VolunteerProject() {
  const t = useTranslations("projects");
  const volunteerProjects = [
    {
      name: t("pyladies"),
      description: t("pyladiesDescription"),
      link: t("pyladiesLink"),
      target: "_blank",
      ariaLabel: t("pyladies"),
    },
    {
      name: t("missingSemester"),
      description: t("missingSemesterDescription"),
      link: t("missingSemesterLink"),
      repo: t("missingSemesterRepo"),
      target: "_blank",
      ariaLabel: t("missingSemesterRepo"),
    },
  ];
  return (
    <>
      <h2 className="text-2xl relative w-fit mb-[20px] font-bold text-gray-700 dark:text-gray-300">
        {t("volunteer")}
        <span className="h-2 bg-indigo-300 dark:bg-indigo-600 absolute top-5 left-0 -z-10 w-full"></span>
      </h2>
      <div className="flex flex-col gap-9 ">
        {volunteerProjects.map((project) => (
          <div
            key={project.name}
            className="flex flex-col gap-1 border-b border-gray-400 border-dashed pb-3"
          >
            <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-600 dark:text-white block">
                {project.description}
              </p>
              <div className="flex flex-col mt-2">
                {project.link && (
                  <div className="w-fit">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="flex items-center gap-2 underline hover:text-orange-500 transition-all duration-300"
                    >
                      <Globe size={18} />
                      {t("visitWebsite")}
                    </Link>
                  </div>
                )}
                {project.repo && (
                  <div className="w-fit">
                    <Link
                      href={project.repo}
                      target="_blank"
                      className=" flex items-center gap-2 underline hover:text-orange-500 transition-all duration-300"
                    >
                      <Github size={18} />
                      {t("visitRepo")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
