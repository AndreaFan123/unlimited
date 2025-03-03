import { Metadata } from "next";
import Footer from "@/src/components/normal-components/Footer";
import Header from "@/src/components/normal-components/Header";
import { Locales } from "@/src/i18n/request";

export const metadata: Metadata = {
  title: "Blog | Unlimited",
  description:
    "Rambling about web development, management, and other random stuff in my life 🚀",
};

export default async function BlogLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locales };
}>) {
  const { locale } = await params;
  return (
    <>
      <Header lang={locale} />
      <main className="w-full mx-auto my-10 px-4 sm:max-w-full md:max-w-[900px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
