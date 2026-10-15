import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function compile(path) {
  return ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
}

const helper = { exports: {} };
runInNewContext(compile("../src/lib/blog-seo.ts"), { exports: helper.exports });
const sitemapCode = compile("../src/app/sitemap.ts");
const site = "https://example.com";
const english = {
  slugAsParams: "guide",
  language: "en",
  published: true,
  date: "2020-01-01",
};
const chinese = { ...english, slugAsParams: "guide-zh_tw", language: "zh_tw" };

function sitemap({
  posts = [english, chinese],
  projectPages = [],
  now = "2030-01-01",
} = {}) {
  const sitemapModule = { exports: {} };
  const modules = {
    "#site/content": { posts, projectPages },
    "@/src/config/site": {
      SITE_URL: site,
      locales: ["en", "zh-TW"],
      contentLanguageToLocale: (language) =>
        language === "zh_tw" ? "zh-TW" : "en",
    },
    "@/src/constants/projects": { WORK_PROJECT_KEYS: ["findHelp"] },
    "@/src/lib/blog-seo": helper.exports,
  };
  class Clock extends Date {
    constructor(...args) {
      super(...(args.length ? args : [now]));
    }
  }
  runInNewContext(sitemapCode, {
    exports: sitemapModule.exports,
    Date: Clock,
    require: (name) => {
      assert.ok(name in modules, `Unexpected sitemap dependency: ${name}`);
      return modules[name];
    },
  });
  return JSON.parse(JSON.stringify(sitemapModule.exports.default()));
}

test("every shared page has both locale URLs with reciprocal self-inclusive alternates", () => {
  const entries = sitemap();
  for (const path of ["", "/blog", "/blog/tags", "/resume"]) {
    const expected = {
      en: `${site}/en${path}`,
      "zh-TW": `${site}/zh-TW${path}`,
    };
    for (const locale of ["en", "zh-TW"]) {
      const entry = entries.find((entry) => entry.url === expected[locale]);
      assert.ok(entry, `Missing ${expected[locale]}`);
      assert.deepEqual(entry.alternates.languages, expected);
    }
  }
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
});

test("unknown modification dates are omitted, including articles with only a publication date", () => {
  for (const entry of sitemap())
    assert.equal(entry.lastModified, undefined, entry.url);
});

test("sitemap does not change merely because it is generated on another day", () => {
  assert.deepEqual(
    sitemap({ now: "2030-01-01" }),
    sitemap({ now: "2031-05-12" }),
  );
});

test("articles use their explicit updated date without borrowing the translation's date", () => {
  const entries = sitemap({
    posts: [{ ...english, updated: "2025-06-17" }, chinese],
  });
  assert.equal(
    entries.find((entry) => entry.url === `${site}/en/blog/guide`).lastModified,
    "2025-06-17T00:00:00.000Z",
  );
  assert.equal(
    entries.find((entry) => entry.url.endsWith("guide-zh_tw")).lastModified,
    undefined,
  );
});

test("project dates come only from the published content for that locale", () => {
  const entries = sitemap({
    projectPages: [
      {
        projectKey: "findHelp",
        language: "en",
        published: true,
        updated: "2025-08-19",
      },
      {
        projectKey: "findHelp",
        language: "zh_tw",
        published: false,
        updated: "2025-09-20",
      },
    ],
  });
  assert.equal(
    entries.find((entry) => entry.url === `${site}/en/projects/findHelp`)
      .lastModified,
    "2025-08-19T00:00:00.000Z",
  );
  assert.equal(
    entries.find((entry) => entry.url === `${site}/zh-TW/projects/findHelp`)
      .lastModified,
    undefined,
  );
});

test("published article hreflang remains reciprocal and drafts remain excluded", () => {
  const entries = sitemap({
    posts: [
      english,
      chinese,
      { ...english, slugAsParams: "draft", published: false },
    ],
  });
  const en = entries.find((entry) => entry.url === `${site}/en/blog/guide`);
  const zh = entries.find(
    (entry) => entry.url === `${site}/zh-TW/blog/guide-zh_tw`,
  );
  assert.deepEqual(en.alternates.languages, zh.alternates.languages);
  assert.equal(en.alternates.languages.en, en.url);
  assert.equal(zh.alternates.languages["zh-TW"], zh.url);
  assert.ok(!entries.some((entry) => entry.url.endsWith("/draft")));
});
