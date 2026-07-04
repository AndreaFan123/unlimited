"use client";

import { Link, usePathname } from "@/src/i18n/navigation";
import { Locales } from "@/src/i18n/request";
import { cn } from "@/src/lib/utils";

const linkClass =
  "transition-all hover:scale-110 duration-300";

export default function LocaleToggle({ lang }: { lang: Locales }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-3 items-center">
      <Link
        href={pathname}
        locale="en"
        className={cn(
          linkClass,
          lang === "en" && "font-bold text-orange-500 hover:text-orange-500"
        )}
      >
        EN
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        href={pathname}
        locale="zh-TW"
        className={cn(
          linkClass,
          lang === "zh-TW" && "font-bold text-orange-500 hover:text-orange-500"
        )}
      >
        ZH-TW
      </Link>
    </div>
  );
}
