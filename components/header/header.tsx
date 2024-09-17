import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky pt-[16px] top-0 z-50 w-full container mx-auto border-b-[1px]  border-gray-400 border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-between items-center pb-4">
        <Link href="/" className="font-extrabold text-gray-800 text-2xl">
          Unlimited
        </Link>
      </nav>
    </header>
  );
}
