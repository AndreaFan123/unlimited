import assert from "node:assert/strict";
import { test } from "node:test";

// Run against a freshly built, running Next.js server (see README).
const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:4317";

async function getPage(path) {
  const response = await fetch(new URL(path, baseUrl), {
    headers: { "User-Agent": "Googlebot" },
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  const html = await response.text();
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) =>
    Object.fromEntries(
      [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [
        key.toLowerCase(),
        value.replaceAll("&amp;", "&"),
      ]),
    ),
  );
  return {
    response,
    links,
    languages: Object.fromEntries(
      links
        .filter((link) => link.rel === "alternate" && link.hreflang)
        .map((link) => [link.hreflang, link.href]),
    ),
  };
}

function assertMetadataOwnsHreflang(page) {
  assert.doesNotMatch(
    page.response.headers.get("link") ?? "",
    /hreflang\s*=/i,
    "HTTP Link must not advertise conflicting middleware hreflang",
  );
}

function getCanonical(page, pathname, search = "") {
  const canonicals = page.links.filter((link) => link.rel === "canonical");
  assert.equal(canonicals.length, 1);
  const canonical = new URL(canonicals[0].href);
  assert.equal(canonical.pathname, pathname);
  assert.equal(canonical.search, search);
  return canonical;
}

for (const locale of ["en", "zh-TW"]) {
  for (const query of ["", "?page=1"]) {
    test(`${locale} blog first page${query}: one consistent, reachable x-default`, async () => {
      const page = await getPage(`/${locale}/blog${query}`);
      assert.equal(page.response.status, 200);
      assertMetadataOwnsHreflang(page);
      const { origin } = getCanonical(page, `/${locale}/blog`);
      assert.deepEqual(page.languages, {
        en: `${origin}/en/blog`,
        "zh-TW": `${origin}/zh-TW/blog`,
        "x-default": `${origin}/en/blog`,
      });
      // Check the actual target route using the local server, not the public site.
      const target = await getPage(
        new URL(page.languages["x-default"]).pathname,
      );
      assert.equal(target.response.status, 200);
      getCanonical(target, "/en/blog");
    });
  }

  test(`${locale} page two retains its canonical without cross-language alternates`, async () => {
    const page = await getPage(`/${locale}/blog?page=2`);
    assert.equal(page.response.status, 200);
    assertMetadataOwnsHreflang(page);
    getCanonical(page, `/${locale}/blog`, "?page=2");
    assert.deepEqual(page.languages, {});
  });

  test(`${locale} invalid pagination remains a 404 without a canonical`, async () => {
    const page = await getPage(`/${locale}/blog?page=99999`);
    assert.equal(page.response.status, 404);
    assertMetadataOwnsHreflang(page);
    assert.equal(
      page.links.some((link) => link.rel === "canonical"),
      false,
    );
  });

  test(`${locale} tag index keeps its existing language routing`, async () => {
    const page = await getPage(`/${locale}/blog/tags`);
    assert.equal(page.response.status, 200);
    getCanonical(page, `/${locale}/blog/tags`);
    assert.match(page.response.headers.get("link") ?? "", /hreflang=/i);
  });
}

test("translated articles still use reciprocal slugs without middleware alternates", async () => {
  const english = await getPage("/en/blog/relational-db-design-3");
  const chinese = await getPage("/zh-TW/blog/relational-db-design-3-zh_tw");
  for (const page of [english, chinese]) {
    assert.equal(page.response.status, 200);
    assertMetadataOwnsHreflang(page);
  }
  const { origin } = getCanonical(english, "/en/blog/relational-db-design-3");
  getCanonical(chinese, "/zh-TW/blog/relational-db-design-3-zh_tw");
  assert.deepEqual(english.languages, {
    en: `${origin}/en/blog/relational-db-design-3`,
    "zh-TW": `${origin}/zh-TW/blog/relational-db-design-3-zh_tw`,
  });
  assert.deepEqual(chinese.languages, english.languages);
});

test("legacy Chinese blog URLs still redirect to zh-TW", async () => {
  const page = await getPage("/zh_tw/blog?page=2");
  assert.equal(page.response.status, 307);
  const location = new URL(page.response.headers.get("location"), baseUrl);
  assert.equal(location.pathname, "/zh-TW/blog");
  assert.equal(location.search, "?page=2");
});
