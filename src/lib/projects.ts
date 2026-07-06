import { projectPages } from "#site/content";
import type { Project } from "#site/content";
import type { WorkProjectKey } from "@/src/constants/projects";
import type { Locales } from "@/src/i18n/request";
import { toContentLanguage } from "@/src/i18n/request";

export function getProjectPage(key: WorkProjectKey, locale: Locales) {
  const language = toContentLanguage(locale);

  return projectPages.find(
    (page: Project) =>
      page.projectKey === key &&
      page.language === language &&
      page.published,
  );
}
