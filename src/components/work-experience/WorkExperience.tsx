"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const GsapComponent = dynamic(() => import("../animation/Copy"), {
  ssr: false,
});

export default function WorkExperience() {
  const t = useTranslations("workExperience");
  const workExperience = [
    {
      company: t("shalom.company"),
      position: t("shalom.title"),
      duration: t("shalom.duration"),
      description: t("shalom.description"),
      delay: 0.1,
    },
    {
      company: t("ringus.company"),
      position: t("ringus.title"),
      duration: t("ringus.duration"),
      description: t("ringus.description"),
      delay: 0.2,
    },
    {
      company: t("codapayment.company"),
      position: t("codapayment.title"),
      duration: t("codapayment.duration"),
      description: t("codapayment.description"),
      delay: 0.3,
    },
    {
      company: t("elex.company"),
      position: t("elex.title"),
      duration: t("elex.duration"),
      description: t("elex.description"),
      delay: 0.4,
    },
    {
      company: t("wargaming.company"),
      position: t("wargaming.title"),
      duration: t("wargaming.duration"),
      description: t("wargaming.description"),
      delay: 0.5,
    },
  ];
  return (
    <>
      <h2 className="text-2xl w-fit relative mb-[20px] font-bold text-gray-700 dark:text-gray-300">
        {t("workExperience")}
        <span className="h-2 bg-indigo-300 dark:bg-indigo-600 absolute top-5 left-0 -z-10 w-full"></span>
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
                    <GsapComponent delay={experience.delay}>
                      <h3 className="text-lg font-semibold">
                        {experience.company} | {experience.position}
                      </h3>
                    </GsapComponent>
                    <GsapComponent delay={experience.delay}>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {experience.duration}
                      </p>
                    </GsapComponent>
                  </div>
                  <GsapComponent delay={experience.delay}>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {experience.description}
                    </p>
                  </GsapComponent>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
