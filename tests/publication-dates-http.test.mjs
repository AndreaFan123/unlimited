import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const base = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:4317";
const posts = JSON.parse(
  readFileSync(new URL("../.velite/posts.json", import.meta.url), "utf8"),
);
const get = async (path) => {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(15000),
    redirect: "manual",
  });
  assert.equal(response.status, 200, path);
  return response.text();
};

for (const [locale, language] of [
  ["en", "en"],
  ["zh-TW", "zh_tw"],
]) {
  test(`${locale}: every published article has UTC publication dates, matching JSON-LD, visible calendar day and correct sitemap lastmod`, async () => {
    const xml = await get("/sitemap.xml");
    const entries = new Map(
      [...xml.matchAll(/<url>([^]*?)<\/url>/g)].map(([, entry]) => [
        entry.match(/<loc>([^<]+)<\/loc>/)[1],
        entry,
      ]),
    );
    const published = posts.filter(
      (post) => post.published && post.language === language,
    );
    assert(published.length > 0);
    for (const post of published) {
      const path = `/${locale}/blog/${post.slugAsParams}`;
      const source = readFileSync(
        new URL(`../content/${post.slug}.mdx`, import.meta.url),
        "utf8",
      ).split("---")[1];
      const sourceDate = source.match(/^date: (\d{4}-\d{2}-\d{2})$/m)?.[1];
      assert(sourceDate, path);
      const expected = `${sourceDate}T00:00:00.000Z`;
      assert.equal(post.date, expected, path);
      const html = await get(path);
      const schemas = [
        ...html.matchAll(
          /<script\b[^>]*type="application\/ld\+json"[^>]*>([^]*?)<\/script>/g,
        ),
      ].map(([, json]) => JSON.parse(json));
      const article = schemas.find(
        (schema) => schema["@type"] === "BlogPosting",
      );
      assert(article, path);
      assert.equal(article.datePublished, expected, path);
      assert.equal(article.dateModified, post.updated ?? expected, path);
      const dateLabel = new Date(expected).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
      const markup = html.replace(/<script\b[^>]*>[^]*?<\/script>/gi, "");
      assert(markup.includes(dateLabel), `${path}: ${dateLabel}`);
      const entry = entries.get(`https://shanlefan.com${path}`);
      assert(entry, path);
      const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      assert.equal(lastmod, post.updated, path);
    }
  });
}
