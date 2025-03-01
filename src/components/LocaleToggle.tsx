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
          {lang === "zh_tw" ? "中文" : "EN"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="flex flex-col items-center"
      >
        {lang === "zh_tw" ? (
          <Link href="/en">EN</Link>
        ) : (
          <Link href="/zh_tw">中文</Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
