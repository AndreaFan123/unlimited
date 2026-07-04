"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  WORK_PROJECT_KEYS,
  PROJECT_COLORS,
  type WorkProject,
  sortProjectsByDuration,
} from "@/src/constants/projects";
import ProjectBar from "@/src/components/projects/ProjectBar";
import { cn } from "@/src/lib/utils";

export function useWorkProjects(): WorkProject[] {
  const tProject = useTranslations("projects");

  return sortProjectsByDuration(
    WORK_PROJECT_KEYS.map((key) => ({
      key,
      name: tProject(`${key}.name`),
      description: tProject(`${key}.description`),
      duration: tProject(`${key}.duration`),
      link: tProject(`${key}.link`),
    }))
  );
}

function getBarMotion(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === null) {
    return "scale-100 translate-y-0";
  }

  if (index === hoveredIndex) {
    return "scale-[1.05] translate-y-0";
  }

  if (index < hoveredIndex) {
    return "scale-[0.97] -translate-y-3";
  }

  return "scale-[0.94] translate-y-3";
}

function getBarZIndex(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === index) return 20;

  return index;
}

export default function ProjectContainer() {
  const tProject = useTranslations("projects");
  const projects = useWorkProjects();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[1000px] mx-auto py-20 px-5">
      <article className="flex flex-col gap-6 lg:flex-row w-full lg:justify-between">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{tProject("title")}</h3>
        <p className="font-mono lg:w-1/2 text-gray-600 dark:text-gray-300">{tProject("description")}</p>
      </article>

      <div
        className="mt-12 flex flex-col overflow-visible pb-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {projects.map((project, index) => (
          <div
            key={project.key}
            className={cn(
              "relative origin-center transition-transform duration-300 ease-out will-change-transform ",
              index > 0 && "-mt-5",
              getBarMotion(index, hoveredIndex)
            )}
            style={{ zIndex: getBarZIndex(index, hoveredIndex) }}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <ProjectBar
              project={project}
              color={PROJECT_COLORS[index % PROJECT_COLORS.length]}
              visitLabel={tProject("actions.visitWebsite")}
              isActive={hoveredIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
