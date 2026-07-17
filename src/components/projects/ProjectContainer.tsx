"use client";

import { useTranslations } from "next-intl";
import {
  WORK_PROJECT_KEYS,
  PROJECT_COLORS,
  type WorkProject,
  sortProjectsByDuration,
} from "@/src/constants/projects";
import ProjectBar from "@/src/components/projects/ProjectBar";

export function useWorkProjects(): WorkProject[] {
  const tProject = useTranslations("projects");

  return sortProjectsByDuration(
    WORK_PROJECT_KEYS.map((key) => ({
      key,
      name: tProject(`${key}.name`),
      description: tProject(`${key}.description`),
      duration: tProject(`${key}.duration`),
      link: tProject(`${key}.link`),
      type: tProject(`${key}.type`),
    }))
  );
}

export default function ProjectContainer() {
  const tProject = useTranslations("projects");
  const projects = useWorkProjects();

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-[1000px] px-5">
        <article className="flex w-full flex-col items-start gap-6 lg:flex-row lg:justify-between">
          <h3 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            {tProject("title")}
          </h3>
          <p className="font-mono text-gray-600 dark:text-gray-300 lg:w-1/2 lg:text-right">
            {tProject("description")}
          </p>
        </article>
      </div>

      <div
        className="no-scrollbar mt-12 w-full overflow-x-auto overscroll-x-contain scroll-smooth pb-4"
        style={{
          scrollPaddingLeft: "var(--content-inset)",
          scrollPaddingRight: "var(--content-inset)",
        }}
      >
        <ul className="flex w-max snap-x snap-mandatory gap-4 h-[350px] pl-[var(--content-inset)] pr-[var(--content-inset)]">
          {projects.map((project, index) => (
            <li
              key={project.key}
              className="w-[240px] shrink-0 snap-start sm:w-[280px] h-full"
            >
              <ProjectBar
                project={project}
                color={PROJECT_COLORS[index % PROJECT_COLORS.length]}
                visitLabel={tProject("actions.visitWebsite")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
