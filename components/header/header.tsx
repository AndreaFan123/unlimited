import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white h-[70px]">
      <div className="flex  justify-between px-4 max-w-full items-center h-full gap-5  md:justify-between md:max-w-[700px] mx-auto lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1400px]">
        <Link href="/" className="font-extrabold text-xl">
          Unlimited
        </Link>
        <nav className="flex gap-5 text-base items-center">
          <Link href="/posts">Posts</Link>
          <Link href="/about">About</Link>
          <Link href="/contact" className="bg-white text-black p-1 rounded-sm">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
