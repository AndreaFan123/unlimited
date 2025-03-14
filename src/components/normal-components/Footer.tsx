import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="w-full md:max-w-[800px] mx-auto py-4 border-t-[1px] border-gray-400 dark:border-white border-dashed bottom-0 ">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-extrabold">Unlimited</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Unlimited. {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
