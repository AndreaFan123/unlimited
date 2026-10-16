import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const jsx = (type, props, ...children) => ({
  type,
  props: { ...props, children },
});
function load(path, imports) {
  const source = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
        esModuleInterop: true,
      },
    },
  ).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    require: (name) => imports[name],
    React: { createElement: jsx },
  });
  return exports;
}
const cn = (...parts) => parts.filter(Boolean).join(" ");
const { PROJECT_COLORS } = load("../src/constants/projects.ts", {});
const { default: ProjectBar } = load(
  "../src/components/projects/ProjectBar.tsx",
  {
    "lucide-react": { Binoculars: "icon" },
    "@/src/lib/utils": { cn },
  },
);
function luminance(rgb) {
  return rgb
    .map((c) => c / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
const rgb = (hex) => hex.match(/\w\w/g).map((x) => parseInt(x, 16));
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
function descendants(node) {
  if (!node || typeof node !== "object") return [];
  return [
    node,
    ...(node.props.children ?? []).flat(Infinity).flatMap(descendants),
  ];
}
const colors = {
  "text-black": "000000",
  "text-white": "ffffff",
  "text-gray-900": "111827",
  "text-orange-500": "f97316",
  "text-orange-700": "c2410c",
  "text-orange-400": "fb923c",
};
for (const color of PROJECT_COLORS) {
  test(`project card ${color} meets 4.5:1 contrast for body text and translucent badges`, () => {
    const card = ProjectBar({
      project: {
        name: "Project",
        description: "Description",
        duration: "2026",
        type: "Work",
        link: "https://example.com",
      },
      color,
      visitLabel: "Visit",
    });
    for (const node of descendants(card).filter((node) =>
      ["h4", "p", "span"].includes(node.type),
    )) {
      const classes = node.props.className.split(" ");
      const foreground = rgb(colors[classes.find((c) => colors[c])]);
      let background = rgb(color.slice(1));
      const badge = classes.find((c) => /^bg-(white|gray-900)\//.test(c));
      if (badge) {
        const [name, alpha] = badge.split("/");
        const overlay = rgb(name === "bg-white" ? "ffffff" : "111827");
        background = background.map(
          (c, i) =>
            c * (1 - Number(alpha) / 100) + (overlay[i] * Number(alpha)) / 100,
        );
      }
      assert(
        contrast(foreground, background) >= 4.5,
        `${color} ${classes.join(" ")}: ${contrast(foreground, background)}`,
      );
    }
  });
}
const { default: LocaleToggle } = load(
  "../src/components/shared-components/LocaleToggle.tsx",
  {
    "@/src/i18n/navigation": { Link: "link", usePathname: () => "/" },
    "@/src/lib/post-locale": { getLocalizedPathname: () => "/" },
    "@/src/lib/utils": { cn },
  },
);
for (const lang of ["en", "zh-TW"]) {
  for (const dark of [false, true]) {
    test(`${lang} active language contrast meets 4.5:1 in ${dark ? "dark" : "light"} mode including hover`, () => {
      const tree = LocaleToggle({
        lang,
        tagSlugsByLocale: { en: [], "zh-TW": [] },
      });
      const link = descendants(tree).find(
        (node) => node.type === "link" && node.props.locale === lang,
      );
      const classes = link.props.className.split(" ");
      for (const hover of [false, true]) {
        let selected;
        for (const prefix of [
          "",
          ...(hover ? ["hover:"] : []),
          ...(dark ? ["dark:", ...(hover ? ["dark:hover:"] : [])] : []),
        ]) {
          const token = classes.find(
            (c) => c.startsWith(prefix) && colors[c.slice(prefix.length)],
          );
          if (token) selected = colors[token.slice(prefix.length)];
        }
        assert(selected);
        assert(contrast(rgb(selected), rgb(dark ? "1a1a1a" : "ffffff")) >= 4.5);
      }
    });
  }
}
