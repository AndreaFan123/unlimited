"use client";

import { useTranslations } from "next-intl";
import ExperienceTimeline, {
  type TimelineGroup,
} from "@/src/components/work-experience/ExperienceTimeline";

export default function WorkExperience() {
  const t = useTranslations("workExperience");

  const workExperience: TimelineGroup[] = [
    {
      organization: t("freelance.company"),
      roles: [
        {
          duration: t("freelance.duration"),
          title: t("freelance.title"),
          type: t("employmentTypes.freelance"),
        },
      ],
    },
    {
      organization: t("shalom.company"),
      roles: [
        {
          duration: t("shalom.duration"),
          title: t("shalom.title"),
          type: t("employmentTypes.fullTime"),
        },
      ],
    },
    {
      organization: t("ringus.company"),
      roles: [
        {
          duration: t("ringus.duration"),
          title: t("ringus.title"),
          type: t("employmentTypes.fullTime"),
        },
      ],
    },
    {
      organization: t("codapayment.company"),
      roles: [
        {
          duration: t("codapayment.duration"),
          title: t("codapayment.title"),
          type: t("employmentTypes.fullTime"),
        },
      ],
    },
    {
      organization: t("elex.company"),
      roles: [
        {
          duration: t("elex.duration"),
          title: t("elex.title"),
          type: t("employmentTypes.fullTime"),
        },
      ],
    },
    {
      organization: t("wargaming.company"),
      roles: [
        {
          duration: t("wargaming.duration"),
          title: t("wargaming.title"),
          type: t("employmentTypes.fullTime"),
        },
      ],
    },
  ];

  const sortedGroups = [...workExperience].sort(
    (a, b) =>
      new Date(b.roles[0].duration.split(" ~ ")[0]).getTime() -
      new Date(a.roles[0].duration.split(" ~ ")[0]).getTime()
  );

  return (
    <ExperienceTimeline title={t("workExperience")} groups={sortedGroups} />
  );
}
