import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Use the existing TypeScript compiler; no additional test dependency is needed.
const source = readFileSync(
  new URL("../src/lib/blog-seo.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const { getBlogPage, getBlogAlternates, getPostAlternates } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const site = "https://example.com";

test("pagination has self canonicals, with page one consolidated to the blog URL", () => {
  assert.equal(getBlogAlternates(site, "en", 1).canonical, `${site}/en/blog`);
  assert.equal(
    getBlogAlternates(site, "zh-TW", 2).canonical,
    `${site}/zh-TW/blog?page=2`,
  );
  // Lists in different languages can have different page counts and article order.
  assert.equal(getBlogAlternates(site, "en", 2).languages, undefined);
});

test("invalid and out-of-range page numbers do not create crawlable empty pages", () => {
  assert.equal(getBlogPage(undefined, 3), 1);
  assert.equal(getBlogPage("2", 3), 2);
  for (const value of ["0", "-1", "1.5", "abc", "Infinity", "4", ["1", "2"]]) {
    assert.equal(getBlogPage(value, 3), null);
  }
  assert.equal(getBlogPage(undefined, 0), 1);
});

const en = { slugAsParams: "guide-en", language: "en", published: true };
const zh = { slugAsParams: "guide-zh_tw", language: "zh_tw", published: true };

test("translated articles advertise reciprocal hreflang and self canonicals", () => {
  const english = getPostAlternates(site, en, [en, zh]);
  const chinese = getPostAlternates(site, zh, [en, zh]);
  assert.deepEqual(english.languages, {
    en: `${site}/en/blog/guide-en`,
    "zh-TW": `${site}/zh-TW/blog/guide-zh_tw`,
  });
  assert.deepEqual(chinese.languages, english.languages);
  assert.equal(english.canonical, `${site}/en/blog/guide-en`);
  assert.equal(chinese.canonical, `${site}/zh-TW/blog/guide-zh_tw`);
});

test("unsuffixed English slugs pair with Chinese translations", () => {
  const unsuffixed = { ...en, slugAsParams: "guide" };
  assert.equal(
    getPostAlternates(site, zh, [unsuffixed, zh]).languages.en,
    `${site}/en/blog/guide`,
  );
});

test("missing or draft translations are not advertised as alternates", () => {
  for (const collection of [[en], [en, { ...zh, published: false }]]) {
    assert.equal(getPostAlternates(site, en, collection).languages, undefined);
  }
  for (const collection of [[zh], [zh, { ...en, published: false }]]) {
    assert.equal(getPostAlternates(site, zh, collection).languages, undefined);
  }
});
