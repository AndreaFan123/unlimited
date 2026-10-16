import { readFileSync, readdirSync } from "node:fs";
import { runInNewContext } from "node:vm";
import * as velite from "velite";
import ts from "typescript";

function load(path, dependencies) {
  const exports = {};
  const { outputText } = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  );
  runInNewContext(outputText, { exports, require: dependencies });
  return exports;
}
const config = load("../../velite.config.ts", (name) =>
  name === "velite" ? velite : { default: () => {} },
).default;
const fields = config.collections.posts.schema.innerType().shape;
const { blogPostingSchema } = load(
  "../../src/lib/structured-data.ts",
  (name) =>
    name === "@/src/config/site"
      ? { SITE_URL: "https://shanlefan.com" }
      : { default: {} },
);
const root = new URL("../../content/blog/", import.meta.url);
const result = readdirSync(root)
  .filter((name) => name.endsWith(".mdx"))
  .sort()
  .map((name) => {
    const source = readFileSync(new URL(name, root), "utf8").split("---")[1];
    const sourceDate = source.match(/^date: (.+)$/m)[1];
    const date = fields.date.parse(sourceDate);
    const updated = fields.updated.parse(source.match(/^updated: (.+)$/m)?.[1]);
    const schema = blogPostingSchema({
      title: name,
      date,
      updated,
      url: "https://shanlefan.com/en/blog/" + name,
      authorName: "Andrea",
      locale: "en",
    });
    return {
      slug: name,
      sourceDate,
      date,
      updated,
      datePublished: schema.datePublished,
      dateModified: schema.dateModified,
    };
  });
process.stdout.write(JSON.stringify(result));
