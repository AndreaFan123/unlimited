import { useTranslations } from "next-intl";

export default function WorkExperience() {
  const t = useTranslations("workExperience");
  const workExperience = [
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
    <div className="mt-[20px] md:pl-7 mb-8 px-4 sm:px-0">
      <h2 className="text-2xl mb-[20px] font-bold text-gray-700 dark:text-gray-300">
        {t("workExperience")}
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
              className="mb-4 flex flex-col sm:flex-row sm:justify-between w-full"
            >
              <div className="flex sm:w-[70%]">
                <div className="w-[30px] mt-[7px] h-[30px] bg-gray-800 dark:bg-gray-300 flex items-center justify-center">
                  <span className="text-white dark:text-gray-700 text-sm font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="mb-2 relative">
                    <h3 className="text-lg font-semibold ">
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
