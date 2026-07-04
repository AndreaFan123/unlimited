import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/src/components/shared-components/theme-provider";
import "./globals.css";
import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import { SITE_URL } from "@/src/config/site";
import Header from "@/src/components/shared-components/Header";
import Footer from "@/src/components/shared-components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  return (
    <html lang={resolvedLocale} suppressHydrationWarning>
      <body
        className={`${
          resolvedLocale === "en" ? inter.className : notoSansTC.className
        }`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Header lang={resolvedLocale} />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
