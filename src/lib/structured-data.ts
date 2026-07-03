import { SITE_URL } from "@/src/config/site";
import ROUTES from "@/src/constants/routes";

/** schema.org Person — used on the home page. */
export function personSchema(opts: {
  name: string;
  jobTitle: string;
  description: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    url: `${SITE_URL}/${opts.locale}`,
    jobTitle: opts.jobTitle,
    description: opts.description,
    sameAs: [ROUTES.GITHUB, ROUTES.LINKEDIN],
  };
}

/** schema.org BlogPosting — used on single blog post pages. */
export function blogPostingSchema(opts: {
  title: string;
  description?: string;
  date: string;
  url: string;
  authorName: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    ...(opts.description ? { description: opts.description } : {}),
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: opts.locale,
    url: opts.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    author: {
      "@type": "Person",
      name: opts.authorName,
      url: `${SITE_URL}/${opts.locale}`,
    },
  };
}
