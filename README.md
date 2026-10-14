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
