import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import { getAlternates } from "@/src/config/site";
import { personSchema } from "@/src/lib/structured-data";
import { JsonLd } from "@/src/components/seo/JsonLd";
import HomePageContainer from "@/src/components/home/HomePageContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates(locale, ""),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(locale as Locales)
    ? (locale as Locales)
    : routing.defaultLocale;

  const t = await getTranslations({ locale: resolvedLocale, namespace: "profile" });
  const person = personSchema({
    name: t("name"),
    jobTitle: t("title"),
    description: t("description"),
    locale: resolvedLocale,
  });

  return (
    <main className="w-full min-h-screen">
      <JsonLd data={person} />
      <HomePageContainer locale={resolvedLocale} />
    </main>
  );
}
