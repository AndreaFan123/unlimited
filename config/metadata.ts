import { Metadata } from "next";

export type MetadataType = {
  title?: string;
  description: string;
  keywords: string[];
};

const commonKeywordsEn = [
  "Andrea Fan",
  "Portfolio",
  "Frontend Developer",
  "Marketing",
  "Taiwan",
];

export const landingPageContent: MetadataType = {
  title: "Unlimited | Andrea Fan's Portfolio",
  description:
    "My name is Andrea Fan, born and raised in Taiwan. I'm a Frontend Developer with marketing background.",
  keywords: commonKeywordsEn,
};

export const projectsPageContent: MetadataType = {
  title: "Projects | Andrea Fan's Portfolio",
  description:
    "I've worked on a variety of projects, from personal to business.",
  keywords: commonKeywordsEn,
};

export const blogPageContent: MetadataType = {
  title: "Blog | Andrea Fan's Portfolio",
  description:
    "Blog posts about my journey and thoughts about web development, marketing, and life.",
  keywords: commonKeywordsEn,
};

export const singleBlogPageContent: MetadataType = {
  title: "Andrea Fan's Portfolio",
  description:
    "Blog posts about my journey and thoughts about web development, marketing, and life.",
  keywords: commonKeywordsEn,
};

export function generatePageMetadata(
  content: MetadataType,
  blogTitle?: string
): Metadata {
  return {
    title: blogTitle ? `${blogTitle} | ${content.title}` : content.title,
    description: content.description,
    keywords: content.keywords,
  };
}
