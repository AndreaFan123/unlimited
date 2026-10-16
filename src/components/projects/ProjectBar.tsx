"use client";

import { Binoculars } from "lucide-react";
import type { WorkProject } from "@/src/constants/projects";
import { cn } from "@/src/lib/utils";

type ProjectCardProps = {
  project: WorkProject;
  color: string;
  visitLabel: string;
};

function isLightColor(hex: string): boolean {
  const luminance = (value: string) => {
    const channels = [1, 3, 5].map((offset) => {
      const channel =
        Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const background = luminance(hex);
  // Pick the stronger WCAG contrast, rather than a perceived-brightness cutoff.
  return (background + 0.05) / 0.05 >= 1.05 / (background + 0.05);
}

export default function ProjectBar({
  project,
  color,
  visitLabel,
}: ProjectCardProps) {
  const lightBackground = isLightColor(color);
  const textColor = lightBackground ? "text-black" : "text-white";
  const badgeClass = lightBackground
    ? "bg-white/20 text-black"
    : "bg-gray-900/10 text-white";

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${visitLabel}: ${project.name}`}
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

          <span aria-hidden className={cn("rounded-full p-2", badgeClass)}>
            <Binoculars className="size-4" />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className={cn("text-xl font-bold leading-snug", textColor)}>
            {project.name}
          </h4>
          <p className={cn("font-mono text-base leading-snug", textColor)}>
            {project.description}
          </p>
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
    </a>
  );
}
