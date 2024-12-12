import Link from "next/link";
import ROUTES from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="bg-background w-full max-w-full min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-[9rem] md:text-[25rem] relative">
        404
        <div className="text-[9rem] md:text-[25rem] absolute -top-1 left-2 md:-top-1 md:left-5 text-yellow-400 -z-10">
          404
        </div>
      </h2>

      <p>Could not find requested resource</p>
      <Link href={ROUTES.HOME} className="font-bold underline">
        Return Home
      </Link>
    </main>
  );
}
