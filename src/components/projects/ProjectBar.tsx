"use client";

import { Binoculars } from "lucide-react";
import type { WorkProject } from "@/src/constants/projects";
import { getProjectPath } from "@/src/constants/projects";
import { Link } from "@/src/i18n/navigation";
import { cn } from "@/src/lib/utils";

type ProjectCardProps = {
  project: WorkProject;
  color: string;
  viewLabel: string;
};

function isLightColor(hex: string): boolean {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.6;
}

export default function ProjectBar({
  project,
  color,
  viewLabel,
}: ProjectCardProps) {
  const lightBackground = isLightColor(color);
  const textColor = lightBackground ? "text-gray-900" : "text-white";
  const badgeClass = lightBackground
    ? "bg-gray-900/10 text-gray-900"
    : "bg-white/20 text-white";

  return (
    <Link
      href={getProjectPath(project.key)}
      aria-label={`${viewLabel}: ${project.name}`}
      style={{ backgroundColor: color }}
      className={cn(
        "relative flex h-full w-full flex-col justify-between rounded-3xl p-5",
        "cursor-pointer",
        "focus:outline-none focus:ring-0",
        "focus-visible:ring-2 focus-visible:ring-[#7772ff] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-xs",
              badgeClass,
            )}
          >
            {project.duration}
          </span>

          <span
            aria-hidden
            className={cn("rounded-full p-2", badgeClass)}
          >
            <Binoculars className="size-4" />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className={cn("text-xl font-bold leading-snug", textColor)}>
            {project.name}
          </h4>
          <p className={cn("text-base font-mono leading-snug", textColor)}>{project.description}</p>
        </div>
      </div>

      <div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-xs",
              badgeClass,
            )}
          >
            {project.type}
          </span>
        </div>
      </div>
    </Link>
  );
}
