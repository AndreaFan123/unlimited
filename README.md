# Unlimited Portfolio

## Description

This is a portfolio website built with Next.js, TailwindCSS, and TypeScript. It is a static website that displays my work experience, projects, and other information.

## Tech Stack

- Next.js
- TailwindCSS
- TypeScript
- React
- Vercel

## Get Started

1. Clone the repository
2. Make sure to use node version 18.17.1 or higher
3. Run `npm install`
4. Run `npm run dev`

## SEO regression checks

Run `node --test tests/blog-seo.test.mjs` to check pagination canonicals, invalid
page numbers, and reciprocal article hreflang. Article alternates include only
published translations and are shared by page metadata and the sitemap.
Automatic middleware hreflang is disabled for articles and all blog list pages
to avoid conflicting URLs.

For HTTP regression checks, run `npm run build`, then start the production server
in a separate terminal:

```sh
npm run start -- --hostname 127.0.0.1 --port 4317
```

With that server running, execute:

```sh
node --test tests/blog-seo-http.test.mjs
```

The HTTP checks cover first-page x-default targets, pagination, translated
articles, tag routing, and the legacy Chinese locale redirect. To use another
local port, set `SEO_TEST_BASE_URL` (default: `http://127.0.0.1:4317`). Stop the
server after testing.

## Sitemap dates and coverage

The sitemap lists both locale URLs for Home, Blog, Tags, and Resume, along with
project detail pages and published articles. Language alternates include each
page's own URL and its available translation.

Blog and project MDX may specify an optional `updated: YYYY-MM-DD` frontmatter
field for the last significant content update. The field requires a valid calendar
date in exactly this format and is normalized to midnight UTC. Only this explicit
date is used for sitemap `lastmod`; publication dates and build times are not substitutes.
Leave `updated` unset when the actual update date is unknown. Shared pages also
omit `lastmod` because they have no authoritative update-date source.

Article JSON-LD uses the same `updated` value for `dateModified`, while
`datePublished` remains the publication date. Without `updated`, JSON-LD retains
its existing publication-date fallback and sitemap `lastmod` remains omitted.

Run `node --test tests/sitemap.test.mjs` to check locale coverage, date handling,
stable output across build dates, and published article alternates.
Run `node --test tests/content-dates.test.mjs` to check strict update-date
validation, leap years, and agreement between article JSON-LD and sitemap dates.
