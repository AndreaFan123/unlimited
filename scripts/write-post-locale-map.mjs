import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

/**
 * Builds a tiny slug map for locale switching without shipping MDX bodies
 * to the client bundle.
 *
 * Filenames under content/blog:
 *   foo.mdx           → en: "foo"
 *   foo-en.mdx        → en: "foo-en"
 *   foo-zh_tw.mdx     → zh_tw: "foo-zh_tw"
 */
const blogDir = join(process.cwd(), "content/blog");
const outDir = join(process.cwd(), "src/constants");
const outFile = join(outDir, "postLocaleMap.json");

function baseFromFilename(name) {
  return name.replace(/-(zh_tw|en)$/, "");
}

const map = {};

for (const file of readdirSync(blogDir)) {
  if (!file.endsWith(".mdx")) continue;

  const slug = basename(file, ".mdx");
  const base = baseFromFilename(slug);

  if (!map[base]) map[base] = {};

  if (slug.endsWith("-zh_tw")) {
    map[base].zh_tw = slug;
  } else {
    map[base].en = slug;
  }
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

writeFileSync(outFile, `${JSON.stringify(map, null, 2)}\n`);
console.log(
  `[post-locale-map] wrote ${Object.keys(map).length} entries → ${outFile}`,
);
