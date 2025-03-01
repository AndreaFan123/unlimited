"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Locales } from "../i18n/request";
import Link from "next/link";

export default function LocaleToggle({ lang }: { lang: Locales }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="px-9">
        <Button variant="outline" size="icon">
          <span>{lang === "zh_tw" ? "中文" : "ZH_TW"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col items-center">
        <Link href="/en/blog">{lang === "en" ? "EN" : "英文"}</Link>
        <Link href="/zh_tw/blog">{lang === "zh_tw" ? "中文" : "ZH_TW"}</Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
