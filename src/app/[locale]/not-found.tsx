import { Link } from "@/src/i18n/navigation";
import ROUTES from "@/src/constants/routes";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="bg-background w-full mb-[15rem] max-w-full flex flex-col justify-center items-center">
      <h2 className="text-[9rem] md:text-[25rem] relative">
        404
        <div className="text-[9rem] md:text-[25rem] absolute -top-1 left-2 md:-top-1 md:left-5 text-yellow-400 -z-10">
          404
        </div>
      </h2>
      <p>{t("notFoundDescription")}</p>
      <Link href={ROUTES.HOME} className="font-bold underline">
        {t("returnHome")}
      </Link>
    </main>
  );
}
