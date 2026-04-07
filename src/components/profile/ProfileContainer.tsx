import PersonInfo from "@/src/components/profile/PersonInfo";
import { useTranslations } from "next-intl";
import { Mail, Scissors } from "lucide-react";

export default function ProfileContainer() {
  const tProfile = useTranslations("profile");

  return (
    <div className="w-full text-gray-700 dark:text-gray-300">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
        <PersonInfo
          name={tProfile("name")}
          title={tProfile("title")}
          content_1={tProfile("content1")}
          // content_2={tProfile("content2")}
        />

        <aside className="w-full lg:max-w-[320px]">
          <div className="relative overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50/80 p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800/30 md:p-7">
            <div
              className="pointer-events-none absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white dark:bg-gray-900"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white dark:bg-gray-900"
              aria-hidden
            />
            <div
              className="pointer-events-none mb-5 flex items-center gap-2 text-gray-400 dark:text-gray-500"
              aria-hidden
            >
              <Scissors size={14} />
              <div className="h-px flex-1 border-t border-dashed border-current" />
            </div>

            <p className="text-base leading-relaxed md:text-lg">
              {tProfile("contactText")}
            </p>

            <div className="mt-6 border-t border-dashed border-gray-300 pt-5 dark:border-gray-600" />

            <div className="flex items-center gap-2 text-sm font-medium md:text-base">
              <Mail size={18} aria-hidden />
              <a
                href="mailto:shanlefan.tw@gmail.com"
                className="break-all hover:text-orange-500 w-fit flex items-baseline gap-3 transition-all duration-300"
                aria-label={tProfile("contactEmailLabel")}
              >
                shanlefan.tw@gmail.com
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
