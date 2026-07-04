import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getAlternates } from "@/src/config/site";
import ResumePageContainer from "@/src/components/resume/ResumePageContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.resume" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates(locale, "/resume"),
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <main className="w-full min-h-[calc(100dvh-5rem)]">
      <ResumePageContainer />
    </main>
  );
}
