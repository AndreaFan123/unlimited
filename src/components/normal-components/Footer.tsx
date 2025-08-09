import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="w-full bottom-0 fixed py-2 mx-auto z-30 px-4 border-t-[1px] border-dashed border-gray-400 bg-white dark:bg-[#171717]">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-extrabold">Unlimited</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Unlimited. {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
