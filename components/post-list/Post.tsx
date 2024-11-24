import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";

type PostListProps = {
  slug: string;
  title: string;
  description?: string;
  date: string;
};

export default function Post({
  slug,
  title,
  description,
  date,
}: PostListProps) {
  const formatTime = formatDate(date);
  return (
    <li className="flex justify-between gap-2 w-full font-mono py-3">
      <div className="flex flex-col w-full md:w-[70%]">
        <Link
          href={slug}
          className="text-xl font-semibold pb-2 text-[#5350a6] dark:text-[#a19efc] hover:text-orange-500 transition-all duration-300"
        >
          {title}
        </Link>
        <div className="block md:hidden pb-5">
          <time
            dateTime={date}
            className="flex text-sm items-center gap-2 text-gray-600 dark:text-gray-300"
          >
            <Calendar className="w-4 h-4" color="#4b5563" />
            {formatTime}
          </time>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <Link
          href={slug}
          className="flex items-center bg-[#5350a6] text-white w-fit px-2 py-1 gap-2 mt-4 hover:text-orange-300 transition-all duration-300"
        >
          Read more
          <ArrowRight className="w-4 h-4 hover:animate-bounce " />
        </Link>
      </div>
      <div className="hidden md:block">
        <time
          dateTime={date}
          className="flex text-sm items-center gap-2 text-gray-600 dark:text-gray-300"
        >
          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          {formatTime}
        </time>
      </div>
    </li>
  );
}
