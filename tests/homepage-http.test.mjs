import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { gzipSync } from "node:zlib";

const base = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:4317";
const posts = JSON.parse(
  readFileSync(new URL("../.velite/posts.json", import.meta.url), "utf8"),
);
const get = (path) =>
  fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });

test("llms.txt is a directly accessible Markdown resource with valid bilingual links", async () => {
  const response = await get("/llms.txt");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/plain/);
  const text = await response.text();
  assert.match(text, /^# .+/m);
  assert(!text.includes("<html"));
  const links = [
    ...text.matchAll(/\[[^\]]+\]\((https:\/\/shanlefan\.com\/[^)]+)\)/g),
  ].map((match) => match[1]);
  for (const locale of ["en", "zh-TW"]) {
    for (const path of ["", "/blog", "/blog/tags", "/resume"]) {
      assert(links.includes(`https://shanlefan.com/${locale}${path}`));
    }
  }
  for (const link of links) {
    assert.equal((await get(new URL(link).pathname)).status, 200, link);
  }
});

for (const locale of ["en", "zh-TW"]) {
  test(`${locale} initial assets avoid duplicated font weights and oversized client content`, async () => {
    const html = await (await get(`/${locale}`)).text();
    const stylesheets = [
      ...new Set(
        [...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g)].map(
          (match) => match[1],
        ),
      ),
    ];
    const scripts = [
      ...new Set(
        [...html.matchAll(/<script\b[^>]*src="([^"]+\.js)"[^>]*>/g)].map(
          (match) => match[1],
        ),
      ),
    ];
    let cssBytes = 0;
    for (const path of stylesheets) {
      const css = await (await get(path)).text();
      cssBytes += gzipSync(css).length;
      for (const [face] of css.matchAll(/@font-face\{[^}]*src:url[^}]*\}/g)) {
        assert.match(face, /font-display:swap/);
        assert.match(face, /font-weight:\d+ \d+/);
      }
    }
    assert(stylesheets.length > 0);
    assert(cssBytes < 64 * 1024, `Initial CSS gzip budget: ${cssBytes} bytes`);
    let scriptBytes = 0;
    for (const path of scripts)
      scriptBytes += gzipSync(await (await get(path)).text()).length;
    assert(scripts.length > 0);
    assert(
      scriptBytes < 220 * 1024,
      `Initial JavaScript gzip budget: ${scriptBytes} bytes`,
    );
  });
  test(`${locale} home renders its heading, project links and six published local articles on the server`, async () => {
    const response = await get(`/${locale}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const markup = html.replace(/<script\b[^>]*>[^]*?<\/script>/gi, "");
    assert.match(markup, /<h1[^>]*>[^<]+<\/h1>/);
    assert(!markup.includes("data-line-reveal-wrapper"));
    const links = [...markup.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(
      (match) => match[1],
    );
    const actual = links.filter(
      (href) => href.startsWith(`/${locale}/blog/`) && !href.includes("/tags"),
    );
    const published = posts.filter(
      (post) =>
        post.published && post.language === (locale === "en" ? "en" : "zh_tw"),
    );
    published.sort((a, b) => new Date(b.date) - new Date(a.date));
    assert.deepEqual(
      actual,
      published
        .slice(0, 6)
        .map((post) => `/${locale}/blog/${post.slugAsParams}`),
    );
    assert.equal(
      (markup.match(/<link\b[^>]*rel="canonical"[^>]*>/g) ?? []).length,
      1,
    );
    assert(markup.includes(`href="https://shanlefan.com/${locale}"`));
    const messages = JSON.parse(
      readFileSync(
        new URL(
          `../messages/${locale === "en" ? "en" : "zh_tw"}.json`,
          import.meta.url,
        ),
        "utf8",
      ),
    );
    const visitLabel = messages.projects.actions.visitWebsite;
    assert.equal(
      (markup.match(/<a\b[^>]*>/g) ?? []).filter((anchor) =>
        anchor.includes(`aria-label="${visitLabel}:`),
      ).length,
      9,
    );
  });
}
