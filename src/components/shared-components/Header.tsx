"use client";

import ROUTES from "@/src/constants/routes";
import { ThemeToggle } from "@/src/components/shared-components/ThemeToggle";
import { Link } from "@/src/i18n/navigation";
import { Locales } from "@/src/i18n/request";
import LocaleToggle from "./LocaleToggle";
import type { TagSlugsByLocale } from "@/src/lib/post-locale";

export default function Header({
  lang,
  tagSlugsByLocale,
}: {
  lang: Locales;
  tagSlugsByLocale: TagSlugsByLocale;
}) {
  return (
    <header className="sticky top-0 z-30 mx-auto h-20 w-full border-b-[1px] border-dashed border-gray-400 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-full max-w-[1000px] items-center justify-between px-5">
        <Link
          href={ROUTES.HOME}
          className="relative text-2xl font-extrabold text-gray-700 dark:text-gray-300"
        >
          <span>Unlimited</span>
          <span className="absolute left-0 top-5 -z-10 h-2 w-full bg-yellow-400 dark:bg-orange-600"></span>
        </Link>

        <div className="flex items-center gap-7">
          <LocaleToggle lang={lang} tagSlugsByLocale={tagSlugsByLocale} />
          <ThemeToggle lang={lang} />
        </div>
      </nav>
    </header>
  );
}
