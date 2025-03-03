"use client";

import ROUTES from "@/src/constants/routes";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { Link } from "@/src/i18n/navigation";
import { usePathname } from "next/navigation";
import { Locales } from "@/src/i18n/request";
import LocaleToggle from "../LocaleToggle";

export default function Header({ lang }: { lang: Locales }) {
  const pathName = usePathname().split("/");
  const showLocaleToggle = pathName[2] === undefined;

  return (
    <header className="sticky h-20 top-0 sm:max-w-full md:max-w-[900px] mx-auto z-30 w-full px-4 border-b-[1px] border-gray-400 border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-between items-center h-full">
        <Link
          href={ROUTES.HOME}
          className="font-extrabold relative text-gray-700 dark:text-gray-300 text-2xl"
        >
          <span>Unlimited</span>
          <span className="h-2 bg-yellow-400 absolute top-5 left-0 -z-10 w-full"></span>
        </Link>
        <div className="flex gap-4">
          {showLocaleToggle ? <LocaleToggle lang={lang} /> : null}
          <ThemeToggle lang={lang} />
        </div>
      </nav>
    </header>
  );
}
