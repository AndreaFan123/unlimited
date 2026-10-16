import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { slug } from "github-slugger";

const base = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:4317";
const posts = JSON.parse(
  readFileSync(new URL("../.velite/posts.json", import.meta.url), "utf8"),
);
const localeFor = (post) => (post.language === "zh_tw" ? "zh-TW" : "en");
const published = posts.filter((post) => post.published);
const decode = (value) => value.replaceAll("&amp;", "&");
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key.toLowerCase(),
      decode(value),
    ]),
  );
async function get(path) {
  const response = await fetch(new URL(path, base), {
    headers: { "User-Agent": "Googlebot" },
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  const html = await response.text();
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    attributes(tag),
  );
  const anchors = [...html.matchAll(/<a\b([^>]*?)>([^]*?)<\/a>/gi)].map(
    ([, tag, body]) => ({
      ...attributes(tag),
      text: body
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    }),
  );
  return { response, html, links, anchors };
}

for (const locale of ["en", "zh-TW"]) {
  const localPosts = published.filter((post) => localeFor(post) === locale);
  const tagSlugs = new Set(
    localPosts.flatMap((post) => (post.tags ?? []).map((tag) => slug(tag))),
  );
  test(`${locale}: unknown and draft-only tag routes return noindex 404 without canonical or hreflang`, async () => {
    const draftOnly = new Set(
      posts
        .filter((post) => !post.published && localeFor(post) === locale)
        .flatMap((post) => (post.tags ?? []).map((tag) => slug(tag)))
        .filter((tag) => !tagSlugs.has(tag)),
    );
    for (const tag of ["__missing-tag-regression__", ...draftOnly]) {
      const page = await get(`/${locale}/blog/tags/${encodeURIComponent(tag)}`);
      assert.equal(page.response.status, 404, tag);
      assert.match(page.html, /name="robots" content="noindex"/i);
      assert.equal(
        page.links.some((link) => link.rel === "canonical"),
        false,
      );
      assert.equal(
        page.links.some((link) => link.hreflang),
        false,
      );
      assert.doesNotMatch(
        page.response.headers.get("link") ?? "",
        /hreflang=/i,
      );
    }
  });
  test(`${locale}: every tag index link has a published local article and the correct count`, async () => {
    const page = await get(`/${locale}/blog/tags`);
    assert.equal(page.response.status, 200);
    const anchors = page.anchors.filter((a) =>
      a.href?.startsWith(`/${locale}/blog/tags/`),
    );
    assert.equal(anchors.length, tagSlugs.size);
    for (const key of tagSlugs) {
      const matching = localPosts.filter((post) =>
        (post.tags ?? []).some((tag) => slug(tag) === key),
      );
      const count = new Set(matching.map((post) => post.slug)).size;
      const label = matching
        .flatMap((post) => post.tags ?? [])
        .find((tag) => slug(tag) === key);
      const path = `/${locale}/blog/tags/${key}`;
      const anchor = anchors.find((a) => decodeURIComponent(a.href) === path);
      assert.ok(anchor, path);
      assert.equal(anchor.text, `${label} (${count})`);
    }
  });
  test(`${locale}: all published tag pages contain exactly the published local article links and valid language alternates`, async () => {
    for (const tag of tagSlugs) {
      const path = `/${locale}/blog/tags/${encodeURIComponent(tag)}`;
      const page = await get(path);
      assert.equal(page.response.status, 200, path);
      const canonicals = page.links.filter((link) => link.rel === "canonical");
      assert.equal(canonicals.length, 1);
      const canonical = new URL(canonicals[0].href);
      assert.equal(
        decodeURIComponent(canonical.pathname),
        decodeURIComponent(path),
      );
      const expected = localPosts
        .filter((post) =>
          (post.tags ?? []).map((tag) => slug(tag)).includes(tag),
        )
        .map((post) => `/${locale}/${post.slug}`)
        .sort();
      const actual = [
        ...new Set(
          page.anchors
            .filter(
              (a) =>
                a.href?.startsWith(`/${locale}/blog/`) &&
                !a.href.startsWith(`/${locale}/blog/tags`),
            )
            .map((a) => decodeURIComponent(a.href)),
        ),
      ].sort();
      assert.deepEqual(actual, expected, path);
      const languages = Object.fromEntries(
        page.links
          .filter((link) => link.hreflang)
          .map((link) => [link.hreflang, link.href]),
      );
      const available = ["en", "zh-TW"].filter((lang) =>
        published.some(
          (post) =>
            localeFor(post) === lang &&
            (post.tags ?? []).map((tag) => slug(tag)).includes(tag),
        ),
      );
      const expectedLanguages = Object.fromEntries(
        available.map((lang) => [
          lang,
          `${canonical.origin}/${lang}/blog/tags/${tag}`,
        ]),
      );
      expectedLanguages["x-default"] =
        expectedLanguages.en ?? expectedLanguages[locale];
      assert.deepEqual(languages, expectedLanguages, path);
      for (const [target, label] of [
        ["en", "EN"],
        ["zh-TW", "ZH-TW"],
      ]) {
        const targetPath = available.includes(target)
          ? `/${target}/blog/tags/${tag}`
          : `/${target}/blog/tags`;
        assert.equal(
          decodeURIComponent(
            page.anchors.find((a) => a.text === label)?.href ?? "",
          ),
          targetPath,
        );
      }
      assert.doesNotMatch(
        page.response.headers.get("link") ?? "",
        /hreflang=/i,
      );
    }
  });
}
