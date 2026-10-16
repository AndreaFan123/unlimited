# Homepage PageSpeed remediation

## Source reports

Report captured on 2026-10-16, resolving the site root to `/en`:

- [Desktop](https://pagespeed.web.dev/analysis/https-shanlefan-com/xvx35zb7hf?form_factor=desktop&hl=en_GB): performance 97, accessibility 96, best practices 100, SEO 100.
- [Mobile](https://pagespeed.web.dev/analysis/https-shanlefan-com/xvx35zb7hf?form_factor=mobile&hl=en_GB): performance 93, accessibility 96, best practices 100, SEO 100.

The actionable failures were low text contrast and invalid `llms.txt`; performance opportunities included render-blocking font CSS, unused CSS/JavaScript, and delayed heading rendering.

## Changes

- Use WCAG relative luminance to choose black or white project-card text. Badge overlays increase contrast rather than washing it out. Active locale links use separate light/dark orange shades.
- Render the homepage and profile on the server, keeping the article collection and compiled article bodies out of the homepage client bundle.
- Show the heading, description, and social links immediately; remove the initial GSAP reveal and stagger from this page. Hover effects remain.
- Use one variable Inter font rather than separate declarations for six weights. Traditional Chinese uses installed PingFang TC, Microsoft JhengHei, or system sans-serif, avoiding CJK font downloads. Glyph appearance can vary by operating system.
- Serve a plain-text Markdown `llms.txt` with an H1, description, and reachable bilingual navigation links.

## Local measurements

Lighthouse 13.5.0, production server on `127.0.0.1:4317`, default mobile throttling or desktop preset, fresh Lighthouse sessions. These are local synthetic measurements, not a new online PageSpeed report or real-user Core Web Vitals result.

| Metric                                   |                         Before |         Final |
| ---------------------------------------- | -----------------------------: | ------------: |
| English mobile performance               |                             74 |            97 |
| English mobile LCP                       |                         5.60 s |        2.61 s |
| English mobile Speed Index               |                         4.10 s |        0.76 s |
| English desktop performance              |                             98 |           100 |
| English desktop LCP                      |                         1.00 s |        0.54 s |
| English accessibility (both devices)     |                             96 |           100 |
| Traditional Chinese mobile performance   | Not measured on original build |            96 |
| Traditional Chinese mobile LCP           | Not measured on original build |        2.77 s |
| Traditional Chinese mobile accessibility | Not measured on original build |           100 |
| Initial stylesheet transfer              |                  241,277 bytes |  13,248 bytes |
| Initial JavaScript transfer              |                  451,023 bytes | 182,766 bytes |

All final runs had zero CLS and best practices 100. Local SEO is 92 solely because the production canonical points to a different origin from localhost; preserve the production canonical. Scores and timings vary between runs, and mobile LCP still requires production measurement after deployment.

### Experiments

| Approach                                         | Observation                                                                        | Decision                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Variable fonts, server rendering, immediate hero | English mobile 94–95, desktop 100; Chinese mobile 63 with large CJK font transfers | Keep server rendering and immediate hero; investigate CJK loading |
| `font-display: optional` with Noto Sans TC       | English mobile 94, Chinese mobile 72; CJK downloads remained large                 | Revert this intermediate strategy                                 |
| Installed Chinese font stack                     | English mobile 97, Chinese mobile 96, desktop 100; no CJK font downloads           | Keep; cross-platform typography may differ                        |

## Verification

- 46 unit/component tests, including all seven card colors, translucent badge composition, both locale links, both themes, and hover states.
- 23 local HTTP tests: bilingual server-rendered content, six published local articles, nine projects, `llms.txt` and its links, CSS/JS budgets, every published tag page, 404s, pagination, and article hreflang.
- ESLint, production build/TypeScript, formatting, and `git diff --check` passed. Existing Velite article-title length warning is unchanged.
- Browser inspection at desktop and 390-pixel mobile widths, including Traditional Chinese and dark mode; no captured console errors or warnings.

Commands (after `npm run build` and starting the server on port 4317):

```sh
node --test tests/homepage-contrast.test.mjs tests/tag-pages.test.mjs tests/blog-seo.test.mjs tests/sitemap.test.mjs tests/content-dates.test.mjs
node --test tests/homepage-http.test.mjs tests/tag-pages-http.test.mjs tests/blog-seo-http.test.mjs
npm exec --yes --package=lighthouse -- lighthouse http://127.0.0.1:4317/en --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/homepage-mobile.json --quiet
```

For desktop, add `--preset=desktop`. For Chinese, use `/zh-TW`. The HTTP asset guard uses gzip byte budgets of 64 KiB CSS and 220 KiB JavaScript to prevent the observed regressions, not as a production bandwidth prediction.

Next.js shared runtime/polyfills can still appear under unused or legacy JavaScript diagnostics. Removing framework polyfills or dropping browser support is outside this fix. The source reports' security-header and source-map recommendations are unscored manual checks, not failed best-practice scores; no speculative security-policy changes were made.

## Publication-date follow-up

Review found 22 existing non-padded publication dates whose ISO output differed
by eight hours between UTC and Asia/Taipei builds. Those frontmatter values now
use `YYYY-MM-DD`, preserving the intended calendar days. Both publication and
optional update dates use strict calendar validation and explicit UTC-midnight
normalization. Invalid dates, timestamps, and non-padded inputs are rejected.

The date regression suite checks all 68 article sources in separate timezone
processes. The HTTP date suite checks the 64 published articles, including their
visible calendar days and JSON-LD `datePublished`/`dateModified`. Unknown sitemap
`lastmod` values remain omitted; `updated` remains the only modification-date
source. Full UTC and Asia/Taipei production builds are compared using generated
article/project data, sitemap, robots, and published article date/JSON-LD output.

Both full builds passed. Their 68 article records, project data, 64 published
article date/JSON-LD snapshots, sitemap, and robots were identical. The combined
suite passed 48 unit/component tests and 25 HTTP tests (73 total), plus lint,
formatting, and diff checks. Each of the 22 article edits changes only the date
line; the intended publication days are unchanged.

```sh
node --test tests/content-dates.test.mjs
node --test tests/publication-dates-http.test.mjs
TZ=UTC npm run build
TZ=Asia/Taipei npm run build
```
