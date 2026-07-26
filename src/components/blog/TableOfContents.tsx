"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/src/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Sticky header height (h-20). Used for scrollspy band + sticky top. */
const HEADER_OFFSET_PX = 80;
/** Hide TOC when the article has fewer headings than this. */
const MIN_HEADINGS = 2;

type TableOfContentsProps = {
  /** CSS selector for the MDX content root that contains headings */
  contentSelector?: string;
};

function collectTocItems(selector: string): TocItem[] {
  const root = document.querySelector(selector);
  if (!root) return [];

  const nextItems: TocItem[] = [];
  root.querySelectorAll<HTMLHeadingElement>("h2, h3").forEach((heading) => {
    if (!heading.id) return;
    const level = heading.tagName === "H2" ? 2 : 3;
    const text = heading.textContent?.trim() ?? "";
    if (!text) return;
    nextItems.push({ id: heading.id, text, level });
  });

  return nextItems;
}

/**
 * Client TOC: reads h2/h3 from the article DOM after mount,
 * highlights the section in view via IntersectionObserver (scrollspy).
 */
export default function TableOfContents({
  contentSelector = "[data-mdx-content]",
}: TableOfContentsProps) {
  const t = useTranslations("blog");
  const [items, setItems] = useState<TocItem[]>([]);
  // Empty string = "not scrolled yet" → fall back to the first heading in render.
  const [activeId, setActiveId] = useState("");
  const currentActiveId = activeId || items[0]?.id || "";

  // Collect headings after paint. setState runs in the rAF callback (external
  // timing), not synchronously in the effect body — avoids cascading renders.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setItems(collectTocItems(contentSelector));
    });
    return () => cancelAnimationFrame(frame);
  }, [contentSelector]);

  // Scrollspy: which heading is currently near the top of the viewport?
  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // A band near the top of the viewport (below the sticky header).
    // Headings intersecting this band are treated as "current".
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
          return;
        }

        // If nothing is in the band (e.g. between sections), pick the
        // last heading that has scrolled above the band.
        const above = elements.filter(
          (el) => el.getBoundingClientRect().top < HEADER_OFFSET_PX + 8,
        );
        if (above.length > 0) {
          setActiveId(above[above.length - 1].id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -65% 0px`,
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < MIN_HEADINGS) {
    return null;
  }

  return (
    <nav
      aria-label={t("tableOfContents")}
      className="pointer-events-none absolute bottom-0 left-[calc(100%+1.5rem)] top-20 hidden w-56 2xl:block"
    >
      <div className="pointer-events-auto sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto">
        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
          {t("tableOfContents")}
        </p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {items.map((item) => {
            const isActive = item.id === currentActiveId;
            return (
              <li
                key={item.id}
                className={cn("m-0 p-0", item.level === 3 && "pl-3")}
              >
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "block text-sm leading-snug no-underline transition-colors",
                    isActive
                      ? "font-medium text-[#5350a6] dark:text-[#7772ff]"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  )}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
