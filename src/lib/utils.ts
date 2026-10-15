import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const groups = new Map<string, { label: string; articles: Set<string> }>();
  for (const post of posts) {
    if (!post.published) continue;
    for (const tag of post.tags ?? []) {
      const key = slug(tag);
      if (!key) continue;
      if (!groups.has(key))
        groups.set(key, { label: tag, articles: new Set() });
      groups.get(key)!.articles.add(post.slug);
    }
  }
  // Keep the first display label for each URL; count article identities, not aliases.
  return Object.fromEntries(
    [...groups.values()].map(({ label, articles }) => [label, articles.size]),
  );
}

export function sortTagByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) {
      return false;
    }
    const slugFieldTags = post.tags.map((tag) => slug(tag));
    return slugFieldTags.includes(tag);
  });
}
