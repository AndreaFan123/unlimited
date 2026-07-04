"use client";

import { useTranslations } from "next-intl";
import ExperienceTimeline, {
  type TimelineGroup,
} from "@/src/components/work-experience/ExperienceTimeline";

export default function VolunteerProject() {
  const t = useTranslations("projects");

  const volunteerProjects: TimelineGroup[] = [
    {
      organization: t("pyladies.name"),
      roles: [
        {
          duration: t("pyladies.duration"),
          title: t("pyladies.description"),
          type: t("volunteerType"),
        },
      ],
    },
    {
      organization: t("missingSemester.name"),
      roles: [
        {
          duration: t("missingSemester.duration"),
          title: t("missingSemester.description"),
          type: t("volunteerType"),
        },
      ],
    },
  ];

  return (
    <ExperienceTimeline title={t("volunteer")} groups={volunteerProjects} />
  );
}
