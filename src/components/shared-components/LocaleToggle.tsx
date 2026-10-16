"use client";

import { Link, usePathname } from "@/src/i18n/navigation";
import { Locales } from "@/src/i18n/request";
import {
  getLocalizedPathname,
  type TagSlugsByLocale,
} from "@/src/lib/post-locale";
import { cn } from "@/src/lib/utils";

const linkClass = "transition-all hover:scale-110 duration-300";

export default function LocaleToggle({
  lang,
  tagSlugsByLocale,
}: {
  lang: Locales;
  tagSlugsByLocale: TagSlugsByLocale;
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      <Link
        href={getLocalizedPathname(pathname, "en", tagSlugsByLocale.en)}
        locale="en"
        className={cn(
          linkClass,
          lang === "en" &&
            "font-bold text-orange-700 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-400",
        )}
      >
        EN
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        href={getLocalizedPathname(
          pathname,
          "zh-TW",
          tagSlugsByLocale["zh-TW"],
        )}
        locale="zh-TW"
        className={cn(
          linkClass,
          lang === "zh-TW" &&
            "font-bold text-orange-700 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-400",
        )}
      >
        ZH-TW
      </Link>
    </div>
  );
}
