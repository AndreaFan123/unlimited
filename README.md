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

Article `date` and optional `updated` frontmatter must use a valid `YYYY-MM-DD`
calendar date. Both normalize explicitly to UTC midnight; non-padded dates and
timestamps are rejected. Publication dates do not create sitemap `lastmod` values.
The date suite also parses all article sources in separate `UTC` and
`Asia/Taipei` processes to guard against timezone-dependent publication dates.
With the production server running, run
`node --test tests/publication-dates-http.test.mjs` to check every published
article's displayed day, JSON-LD dates, and sitemap modification date behavior.

## Tag page checks

Tag lists and counts include only published articles in the current locale.
Tag detail URLs use the same slug normalization as tag links; unknown tags,
draft-only tags, and tags without published articles in the requested locale
return 404. Tag detail hreflang only advertises available published locales.
Tags with the same slug share one list entry, retain the first display label, and
count distinct articles once even if an article repeats aliases of that tag.
The server sends published tag slugs for each locale to the language toggle.
Switching to a locale without that tag goes to its tag index; available tags keep
their detail page.

Run `node --test tests/tag-pages.test.mjs` for route and metadata regression tests.
With the production server running as described above, run
`node --test tests/tag-pages-http.test.mjs` to check actual responses, draft-only
404s, tag counts, and every published tag page's article links and hreflang.

## Homepage PageSpeed checks

Run `node --test tests/homepage-contrast.test.mjs` to verify project-card text,
translucent badges, and active locale links meet 4.5:1 contrast in both themes.
With a production server running on port 4317, run
`node --test tests/homepage-http.test.mjs` to verify the bilingual server-rendered
homepage, six published local articles, project links, and the public `llms.txt`.
The same suite caps initial gzip CSS at 64 KiB and JavaScript at 220 KiB to guard
against duplicated font declarations and article content entering client bundles.

Measure Lighthouse against a production build, using the same device preset and
throttling for before/after comparisons. Localhost scores are not production
PageSpeed results; the production canonical URL causes the localhost canonical
audit to fail even when the canonical is correct for deployment.
