"use client";

import type { WorkProject } from "@/src/constants/projects";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

type ProjectBarProps = {
  project: WorkProject;
  color: string;
  visitLabel: string;
  isActive: boolean;
};

function isLightColor(hex: string): boolean {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.55;
}

export default function ProjectBar({
  project,
  color,
  visitLabel,
  isActive,
}: ProjectBarProps) {
  const hoverTextLight = isLightColor(color);

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${visitLabel}: ${project.name}`}
      className={cn(
        "relative block w-full -skew-x-12 border",
        "cursor-pointer transition-colors duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7772ff] focus-visible:ring-offset-2 dark:focus-visible:ring-[#7772ff]",
        isActive
          ? "border-[var(--project-color)] bg-[var(--project-color)]"
          : "border-gray-700 dark:bg-[#1a1a1a]  dark:border-gray-300"
      )}
      style={{ "--project-color": color } as React.CSSProperties}
    >
      <div className="skew-x-12 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex justify-between gap-5">
          <h4
            className={cn(
              "text-base font-semibold transition-colors duration-300",
              isActive
                ? hoverTextLight
                  ? "text-gray-900"
                  : "text-white"
                : "text-gray-800 dark:text-gray-300"
            )}
          >
            {project.name}
          </h4>

          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-1 text-xs font-mono transition-colors duration-300",
              isActive
                ? hoverTextLight
                  ? "border-gray-900/30 bg-gray-900/10 text-gray-900"
                  : "border-white/40 bg-white/15 text-white"
                : "border-gray-700 text-gray-600 project-section-surface dark:border-gray-300 dark:text-gray-300"
            )}
          >
            {project.duration}
          </span>
        </div>

        {project.description ? (
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed transition-colors duration-300",
              isActive
                ? hoverTextLight
                  ? "text-gray-800"
                  : "text-white/90"
                : "text-gray-600 dark:text-gray-300"
            )}
          >
            {project.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
