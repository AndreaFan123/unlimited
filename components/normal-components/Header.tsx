import Link from "next/link";
import ROUTES from "@/constants/routes";
import { ModeToggle } from "../theme-toggle";

export default function Header() {
  return (
    <header className="sticky h-20 top-0 sm:max-w-full md:max-w-[800px] mx-auto z-50 w-full px-4 border-b-[1px] border-gray-400 border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-between items-center h-full">
        <Link
          href={ROUTES.HOME}
          className="font-extrabold text-gray-700 dark:text-gray-300 text-2xl"
        >
          Unlimited
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
