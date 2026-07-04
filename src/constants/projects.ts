export const PROJECT_COLORS = [
  "#292f57",
  "#414669",
  "#70748f",
  "#a0a3b4",
  "#cfd1da",
] as const;

export const WORK_PROJECT_KEYS = [
  "dezctop",
  "senryo",
  "findHelp",
  "hubOcean",
  "unlimitedBlog",
] as const;

export type WorkProjectKey = (typeof WORK_PROJECT_KEYS)[number];

export type WorkProject = {
  key: WorkProjectKey;
  name: string;
  description: string;
  duration: string;
  link: string;
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
