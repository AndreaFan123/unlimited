import type { Metadata } from "next";

import {
  landingPageContent,
  generatePageMetadata,
} from "@/src/config/metadata";

import { Locales } from "@/src/i18n/request";
import HomePageContainer from "@/src/components/home/HomePageContainer";

export const metadata: Metadata = generatePageMetadata(landingPageContent);

export default async function Home({
  params,
}: {
  params: { locale: Locales };
}) {
  const { locale } = await params;

  return (
    <main className="w-full min-h-screen sm:max-w-full md:max-w-[1200px] mx-auto">
      <HomePageContainer locale={locale} />
    </main>
  );
}
