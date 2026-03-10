import type { Metadata } from "next";

import {
  landingPageContent,
  generatePageMetadata,
} from "@/src/config/metadata";

import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import HomePageContainer from "@/src/components/home/HomePageContainer";

export const metadata: Metadata = generatePageMetadata(landingPageContent);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(locale as Locales)
    ? (locale as Locales)
    : routing.defaultLocale;

  return (
    <main className="w-full min-h-screen sm:max-w-full md:max-w-[1200px] mx-auto">
      <HomePageContainer locale={resolvedLocale} />
    </main>
  );
}
