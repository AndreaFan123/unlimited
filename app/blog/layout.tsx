import { Metadata } from "next";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Blog | Unlimited",
  description:
    "Rambling about web development, management, and other random stuff in my life 🚀",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="w-full mx-auto my-10 px-4 sm:px-0 sm:max-w-full md:max-w-[800px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
