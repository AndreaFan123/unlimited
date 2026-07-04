import { cn } from "@/src/lib/utils";

export type TimelineRole = {
  duration: string;
  title: string;
  type: string;
};

export type TimelineGroup = {
  organization: string;
  roles: TimelineRole[];
};

type ExperienceTimelineProps = {
  title: string;
  groups: TimelineGroup[];
};

function formatDuration(duration: string): string {
  const parts = duration.split(" ~ ");
  if (parts.length !== 2) return duration;

  const formatDate = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === "Present" || trimmed === "現在") return trimmed;

    const date = new Date(trimmed);
    if (Number.isNaN(date.getTime())) return trimmed;

    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${month}/${date.getFullYear()}`;
  };

  return `${formatDate(parts[0])} – ${formatDate(parts[1])}`;
}

function TimelineEntry({
  role,
  isLast,
}: {
  role: TimelineRole;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative flex w-3 shrink-0 flex-col items-center">
        <div
          aria-hidden
          className="z-10 mt-1.5 size-2.5 shrink-0 rounded-full border border-gray-500 bg-background dark:border-gray-400"
        />
        {!isLast ? (
          <div
            aria-hidden
            className="absolute top-3 bottom-0 w-px bg-gray-500 dark:bg-gray-400"
          />
        ) : null}
      </div>

      <div className={cn("min-w-0 flex-1", !isLast && "pb-8")}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {formatDuration(role.duration)}
        </p>
        <p className="font-semibold text-gray-700 dark:text-gray-100 mb-2">
          {role.title}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceTimeline({
  title,
  groups,
}: ExperienceTimelineProps) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] sm:gap-10">
      <h2 className="text-lg font-bold text-gray-700 dark:text-gray-100">
        {title}
      </h2>

      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.organization}>
            <h3 className="mb-4 font-bold text-gray-700 dark:text-gray-100">
              {group.organization}
            </h3>
            <div>
              {group.roles.map((role, index) => (
                <TimelineEntry
                  key={`${role.title}-${role.duration}`}
                  role={role}
                  isLast={index === group.roles.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
