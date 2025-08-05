import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Unlimited",
  description:
    "Rambling about web development, management, and other random stuff in my life 🚀",
};

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full mx-auto mt-10 mb-28 px-4 sm:max-w-full md:max-w-[900px]">
      {children}
    </main>
  );
}
