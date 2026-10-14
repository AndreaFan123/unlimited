import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import * as velite from "velite";
import ts from "typescript";

function load(path, dependencies, globals = {}) {
  const exports = {};
  const { outputText } = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.React,
        jsxFactory: "jsx",
      },
    },
  );
  runInNewContext(outputText, { exports, require: dependencies, ...globals });
  return exports;
}

// Test the actual collection fields, rather than a copy of their validators.
const config = load("../velite.config.ts", (name) => {
  if (name === "velite") return velite;
  return { default: () => {} };
}).default;

for (const collection of ["posts", "projectPages"]) {
  const updated =
    config.collections[collection].schema.innerType().shape.updated;
  test(`${collection}: updated rejects invalid calendar dates and non-YYYY-MM-DD input without throwing`, () => {
    for (const value of [
      "2026-02-30",
      "2025-02-29",
      "1900-02-29",
      "2026-04-31",
      "2026-13-01",
      "2026-00-10",
      "2026-01-00",
      "1",
      "",
      "2026-1-01",
      "2026-10-14T00:00:00Z",
      " 2026-10-14 ",
    ]) {
      const result = updated.safeParse(value);
      assert.equal(result.success, false, value);
    }
  });
  test(`${collection}: valid updated dates normalize to UTC and omission is supported`, () => {
    for (const value of ["2026-10-14", "2024-02-29", "2000-02-29"]) {
      assert.equal(updated.parse(value), `${value}T00:00:00.000Z`);
    }
    assert.equal(updated.parse(undefined), undefined);
  });
}

test("legacy publication-date parsing remains supported", () => {
  const date = config.collections.posts.schema.innerType().shape.date;
  assert.equal(date.safeParse("2026-9-02").success, true);
});

const site = {
  SITE_URL: "https://example.com",
  locales: ["en", "zh-TW"],
  contentLanguageToLocale: (language) =>
    language === "zh_tw" ? "zh-TW" : "en",
};
const structured = load("../src/lib/structured-data.ts", (name) =>
  name === "@/src/config/site" ? site : { default: {} },
);
const blogSeo = load("../src/lib/blog-seo.ts", () =>
  assert.fail("Unexpected dependency"),
);
function JsonLd() {}

async function renderArticle(post) {
  const dependencies = {
    "next-intl/server": { getTranslations: async () => (key) => key },
    "next/navigation": {
      notFound: () => {
        throw new Error("Unexpected 404");
      },
    },
    "#site/content": { posts: [post], projectPages: [] },
    "@/src/config/site": site,
    "@/src/lib/blog-seo": blogSeo,
    "@/src/lib/structured-data": structured,
    "@/src/components/seo/JsonLd": { JsonLd },
    "@/src/lib/utils": { formatDate: (value) => value },
    "@/src/i18n/request": {
      toContentLanguage: (locale) => (locale === "zh-TW" ? "zh_tw" : "en"),
    },
    "@/src/i18n/routing": {
      routing: { locales: ["en", "zh-TW"], defaultLocale: "en" },
    },
    "@/src/constants/projects": { WORK_PROJECT_KEYS: [] },
    "@/src/constants/routes": { default: { BLOG: "/blog" } },
  };
  const require = (name) => dependencies[name] ?? { default: () => null };
  const page = load("../src/app/[locale]/blog/[...slug]/page.tsx", require, {
    jsx: (type, props, ...children) => ({
      type,
      props: { ...props, children },
    }),
  });
  const tree = await page.default({
    params: Promise.resolve({ locale: "en", slug: [post.slugAsParams] }),
  });
  const articleSchema = tree.props.children.find(
    (child) => child?.type === JsonLd,
  ).props.data;
  const entries = load("../src/app/sitemap.ts", require).default();
  return {
    articleSchema,
    entry: entries.find((entry) =>
      entry.url.endsWith(`/blog/${post.slugAsParams}`),
    ),
  };
}

const article = {
  title: "Guide",
  slugAsParams: "guide",
  language: "en",
  published: true,
  date: "2020-01-01T00:00:00.000Z",
  body: "",
};

test("article page JSON-LD dateModified matches sitemap lastmod when updated is set", async () => {
  const updated = config.collections.posts.schema
    .innerType()
    .shape.updated.parse("2025-06-17");
  const { articleSchema, entry } = await renderArticle({ ...article, updated });
  assert.equal(articleSchema.dateModified, updated);
  assert.equal(entry.lastModified.toISOString(), articleSchema.dateModified);
  assert.equal(articleSchema.datePublished, article.date);
});

test("without updated, article JSON-LD retains its publication-date fallback and sitemap omits lastmod", async () => {
  const { articleSchema, entry } = await renderArticle(article);
  assert.equal(articleSchema.dateModified, article.date);
  assert.equal(articleSchema.datePublished, article.date);
  assert.equal(entry.lastModified, undefined);
});
