export const PROJECT_COLORS = [
  "#659287",
  "#BA5A5A",
  "#A98B76",
  "#576A8F",
  "#89986D",
  "#E97F4A",
  "#604652"
] as const;

export const WORK_PROJECT_KEYS = [
  "dezctop",
  "senryo",
  "findHelp",
  "hubOcean",
  "unlimitedBlog",
  "pyladies",
  "missingSemester",
] as const;

export type WorkProjectKey = (typeof WORK_PROJECT_KEYS)[number];

export type WorkProject = {
  key: WorkProjectKey;
  name: string;
  description: string;
  duration: string;
  link: string;
  type: string;
};

export function getProjectLatestYear(duration: string): number {
  if (/present|現在/i.test(duration)) {
    return new Date().getFullYear() + 1;
  }

  const years = duration.match(/\d{4}/g);
  if (!years?.length) return 0;

  return Math.max(...years.map(Number));
}

export function sortProjectsByDuration<T extends { duration: string }>(
  projects: T[]
): T[] {
  return [...projects].sort(
    (a, b) => getProjectLatestYear(b.duration) - getProjectLatestYear(a.duration)
  );
}
