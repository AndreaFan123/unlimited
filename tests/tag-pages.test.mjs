import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { slug } from "github-slugger";
import ts from "typescript";

function load(path, require, globals = {}) {
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
  runInNewContext(outputText, { exports, require, ...globals });
  return exports;
}
const utils = load("../src/lib/utils.ts", (name) =>
  name === "github-slugger" ? { slug } : {},
);
const site = load(
  "../src/config/site.ts",
  () => assert.fail("Unexpected site import"),
  { process: { env: {} } },
);
const en = {
  slug: "blog/public",
  slugAsParams: "public",
  title: "Public",
  language: "en",
  published: true,
  tags: ["javascript", "system design", "RDBMS"],
};
const zh = {
  ...en,
  slug: "blog/public-zh_tw",
  language: "zh_tw",
  tags: ["javascript", "zh-only"],
};
const draft = {
  ...en,
  slug: "blog/draft",
  title: "Secret draft",
  published: false,
  tags: ["javascript", "draft-only"],
};
function Post() {}
function Tag() {}
const notFound = new Error("NEXT_NOT_FOUND");
const dependencies = {
  "#site/content": { posts: [en, zh, draft] },
  "next/navigation": {
    notFound: () => {
      throw notFound;
    },
  },
  "next-intl/server": { getTranslations: async () => (key) => key },
  "@/src/lib/utils": utils,
  "@/src/config/site": site,
  "@/src/i18n/request": {
    toContentLanguage: (locale) => (locale === "zh-TW" ? "zh_tw" : "en"),
  },
  "@/src/i18n/routing": {
    routing: { locales: ["en", "zh-TW"], defaultLocale: "en" },
  },
  "@/src/components/post-list/Post": { default: Post },
  "@/src/components/tags/tag": { default: Tag },
  "@/src/constants/postLocaleMap.json": {
    default: { public: { en: "public", zh_tw: "public-zh_tw" } },
  },
  "@/src/constants/routes": {
    default: { BLOG: "/blog", TAG_SLUG: "/blog/tags/" },
  },
};
const require = (name) => {
  assert.ok(name in dependencies, `Unexpected dependency ${name}`);
  return dependencies[name];
};
const globals = {
  jsx: (type, props, ...children) => ({ type, props: { ...props, children } }),
};
const detail = load(
  "../src/app/[locale]/blog/tags/[tag]/page.tsx",
  require,
  globals,
);
const index = load("../src/app/[locale]/blog/tags/page.tsx", require, globals);
const params = (tag, locale = "en") => ({
  params: Promise.resolve({ tag, locale }),
});
function elements(tree, type) {
  if (Array.isArray(tree))
    return tree.flatMap((child) => elements(child, type));
  if (!tree?.props) return [];
  return [
    ...(tree.type === type ? [tree] : []),
    ...elements(tree.props.children, type),
  ];
}

test("tag detail excludes drafts and other languages", async () => {
  const tree = await detail.default(params("javascript"));
  assert.deepEqual(
    elements(tree, Post).map((p) => p.props.slug),
    [en.slug],
  );
  assert.equal(elements(tree, Post)[0].props.href, "/blog/public");
});
test("Chinese tag detail contains only published Chinese articles", async () => {
  assert.deepEqual(
    elements(await detail.default(params("javascript", "zh-TW")), Post).map(
      (p) => p.props.slug,
    ),
    [zh.slug],
  );
});
test("tag matching follows the slug used by tag links, including spaces and capitalization", async () => {
  for (const tag of ["system-design", "rdbms", "JAVASCRIPT"]) {
    assert.deepEqual(
      elements(await detail.default(params(tag)), Post).map(
        (p) => p.props.slug,
      ),
      [en.slug],
    );
  }
});
for (const tag of ["missing", "draft-only", "zh-only"]) {
  test(`${tag} returns 404 in both page and metadata when it has no published English article`, async () => {
    await assert.rejects(
      detail.default(params(tag)),
      (error) => error === notFound,
    );
    await assert.rejects(
      detail.generateMetadata(params(tag)),
      (error) => error === notFound,
    );
  });
}
test("hreflang advertises only available published locale variants", async () => {
  const metadata = await detail.generateMetadata(params("zh-only", "zh-TW"));
  assert.equal(
    metadata.alternates.canonical,
    "https://shanlefan.com/zh-TW/blog/tags/zh-only",
  );
  assert.equal(metadata.alternates.languages.en, undefined);
  assert.equal(
    metadata.alternates.languages["zh-TW"],
    metadata.alternates.canonical,
  );
  assert.equal(
    metadata.alternates.languages["x-default"],
    metadata.alternates.canonical,
  );
});
test("shared tags keep reciprocal English/Chinese alternates and a clean lowercase canonical", async () => {
  const enMeta = await detail.generateMetadata(params("JAVASCRIPT"));
  const zhMeta = await detail.generateMetadata(params("javascript", "zh-TW"));
  assert.equal(
    enMeta.alternates.canonical,
    "https://shanlefan.com/en/blog/tags/javascript",
  );
  assert.deepEqual(enMeta.alternates.languages, zhMeta.alternates.languages);
});
test("English index lists only its published tags and locale-specific counts", async () => {
  const tags = elements(await index.default(params("", "en")), Tag).map((t) => [
    t.props.tag,
    t.props.count,
  ]);
  assert.deepEqual(tags, [
    ["javascript", 1],
    ["system design", 1],
    ["RDBMS", 1],
  ]);
});
test("Chinese index does not link to English-only or draft-only tags", async () => {
  const tags = elements(await index.default(params("", "zh-TW")), Tag).map(
    (t) => [t.props.tag, t.props.count],
  );
  assert.deepEqual(tags, [
    ["javascript", 1],
    ["zh-only", 1],
  ]);
});

test("tags with the same slug merge into one entry and count each article once", async () => {
  const previous = en.tags;
  en.tags = ["JavaScript", "javascript", "JavaScript"];
  const extra = {
    ...en,
    slug: "blog/second",
    tags: ["javascript", "JAVASCRIPT", "system design"],
  };
  dependencies["#site/content"].posts.push(extra);
  try {
    const tags = elements(await index.default(params("", "en")), Tag).map(
      (t) => [t.props.tag, t.props.count],
    );
    assert.deepEqual(tags, [
      ["JavaScript", 2],
      ["system design", 1],
    ]);
    assert.equal(
      elements(await detail.default(params("javascript")), Post).length,
      2,
    );
  } finally {
    en.tags = previous;
    dependencies["#site/content"].posts.pop();
  }
});

const navigation = load("../src/lib/post-locale.ts", require);
test("single-locale tag switches fall back to the requested locale's tag index", () => {
  assert.equal(
    navigation.getLocalizedPathname("/blog/tags/zh-only", "en", ["javascript"]),
    "/blog/tags",
  );
  assert.equal(
    navigation.getLocalizedPathname("/blog/tags/zh-only", "zh-TW", [
      "javascript",
      "zh-only",
    ]),
    "/blog/tags/zh-only",
  );
});
test("shared tags keep their normalized route when switching languages", () => {
  assert.equal(
    navigation.getLocalizedPathname("/blog/tags/JAVASCRIPT", "en", [
      "javascript",
    ]),
    "/blog/tags/javascript",
  );
  assert.equal(
    navigation.getLocalizedPathname("/blog/tags/javascript", "zh-TW", [
      "javascript",
    ]),
    "/blog/tags/javascript",
  );
});
test("encoded tag slugs are matched against available target-language tags", () => {
  assert.equal(
    navigation.getLocalizedPathname(
      "/blog/tags/%E8%B3%87%E6%96%99%E5%BA%AB",
      "zh-TW",
      ["資料庫"],
    ),
    "/blog/tags/資料庫",
  );
  assert.equal(
    navigation.getLocalizedPathname(
      "/blog/tags/%E8%B3%87%E6%96%99%E5%BA%AB",
      "en",
      ["database"],
    ),
    "/blog/tags",
  );
});
test("tag-index and existing article language switching remain unchanged", () => {
  assert.equal(
    navigation.getLocalizedPathname("/blog/tags", "en", []),
    "/blog/tags",
  );
  assert.equal(
    navigation.getLocalizedPathname("/blog/public", "zh-TW", []),
    "/blog/public-zh_tw",
  );
  assert.equal(navigation.getLocalizedPathname("/resume", "en", []), "/resume");
});
test("LocaleToggle supplies target-language tag availability to the navigation helper", () => {
  function Link() {}
  const toggle = load(
    "../src/components/shared-components/LocaleToggle.tsx",
    (name) => {
      if (name === "@/src/i18n/navigation")
        return { Link, usePathname: () => "/blog/tags/zh-only" };
      if (name === "@/src/lib/post-locale") return navigation;
      if (name === "@/src/lib/utils") return { cn: () => "" };
      assert.fail(`Unexpected toggle dependency: ${name}`);
    },
    globals,
  );
  const tree = toggle.default({
    lang: "zh-TW",
    tagSlugsByLocale: {
      en: ["javascript"],
      "zh-TW": ["javascript", "zh-only"],
    },
  });
  const links = elements(tree, Link);
  assert.equal(
    links.find((link) => link.props.locale === "en").props.href,
    "/blog/tags",
  );
  assert.equal(
    links.find((link) => link.props.locale === "zh-TW").props.href,
    "/blog/tags/zh-only",
  );
});

test("root layout passes only published, normalized tag slugs to the header", async () => {
  function Header() {}
  const layout = load(
    "../src/app/[locale]/layout.tsx",
    (name) => {
      if (name === "next/font/google")
        return {
          Inter: () => ({ className: "inter" }),
          Noto_Sans_TC: () => ({ className: "noto" }),
        };
      if (name === "next-intl") return { NextIntlClientProvider: () => null };
      if (name === "next-intl/server") return { getMessages: async () => ({}) };
      if (name === "@/src/components/shared-components/theme-provider")
        return { ThemeProvider: () => null };
      if (name === "@/src/components/shared-components/Header")
        return { default: Header };
      if (name === "@/src/components/shared-components/Footer")
        return { default: () => null };
      if (name === "github-slugger") return { slug };
      if (name === "./globals.css") return {};
      return require(name);
    },
    { ...globals, URL },
  );
  const tree = await layout.default({
    params: Promise.resolve({ locale: "zh-TW" }),
    children: null,
  });
  const header = elements(tree, Header)[0];
  assert.equal(header.props.lang, "zh-TW");
  assert.deepEqual(JSON.parse(JSON.stringify(header.props.tagSlugsByLocale)), {
    en: ["javascript", "system-design", "rdbms"],
    "zh-TW": ["javascript", "zh-only"],
  });
});
