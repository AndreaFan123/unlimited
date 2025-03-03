import { useTranslations } from "next-intl";

export default function WorkExperience() {
  const t = useTranslations("workExperience");
  const workExperience = [
    {
      company: t("freelancer.company"),
      position: t("freelancer.title"),
      duration: t("freelancer.duration"),
      description: t("freelancer.description"),
    },
    {
      company: t("ringus.company"),
      position: t("ringus.title"),
      duration: t("ringus.duration"),
      description: t("ringus.description"),
    },
    {
      company: t("codapayment.company"),
      position: t("codapayment.title"),
      duration: t("codapayment.duration"),
      description: t("codapayment.description"),
    },
    {
      company: t("elex.company"),
      position: t("elex.title"),
      duration: t("elex.duration"),
      description: t("elex.description"),
    },
    {
      company: t("wargaming.company"),
      position: t("wargaming.title"),
      duration: t("wargaming.duration"),
      description: t("wargaming.description"),
    },
  ];
  return (
    <div className="mt-[20px] mb-8 px-4 sm:px-0">
      <h2 className="text-2xl w-fit relative mb-[20px] font-bold text-gray-700 dark:text-gray-300">
        {t("workExperience")}
        <span className="h-2 bg-indigo-300 absolute top-5 left-0 -z-10 w-full"></span>
      </h2>
      <div>
        {workExperience
          .sort(
            (a, b) =>
              new Date(b.duration.split(" ~ ")[0]).getTime() -
              new Date(a.duration.split(" ~ ")[0]).getTime()
          )
          .map((experience, index) => (
            <div
              key={index}
              className="mb-4 border-b border-gray-400 border-dashed pb-3 flex flex-col sm:flex-row sm:justify-between w-full"
            >
              <div className="flex flex-col md:flex-row">
                <div>
                  <div className="mb-3 relative">
                    <h3 className="text-lg font-semibold">
                      {experience.company} | {experience.position}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {experience.duration}
                    </p>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
