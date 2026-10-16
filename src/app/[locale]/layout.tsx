import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/src/components/shared-components/theme-provider";
import "./globals.css";
import { Locales, toContentLanguage } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import { SITE_URL } from "@/src/config/site";
import Header from "@/src/components/shared-components/Header";
import Footer from "@/src/components/shared-components/Footer";
import { posts } from "#site/content";
import { getAllTags } from "@/src/lib/utils";
import { slug } from "github-slugger";
import type { TagSlugsByLocale } from "@/src/lib/post-locale";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(locale as Locales)
    ? (locale as Locales)
    : routing.defaultLocale;
  const messages = await getMessages();
  // Send only published tag slugs to the client, not article content or drafts.
  const tagSlugsByLocale: TagSlugsByLocale = { en: [], "zh-TW": [] };
  for (const language of routing.locales) {
    const tags = getAllTags(
      posts.filter((post) => post.language === toContentLanguage(language)),
    );
    tagSlugsByLocale[language] = Object.keys(tags).map((tag) => slug(tag));
  }
  return (
    <html lang={resolvedLocale} suppressHydrationWarning>
      <body
        className={`${resolvedLocale === "en" ? inter.className : "font-zh"}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Header lang={resolvedLocale} tagSlugsByLocale={tagSlugsByLocale} />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
