import { redirect } from "@/src/i18n/navigation";
import ROUTES from "@/src/constants/routes";
import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locales)
    ? (rawLocale as Locales)
    : routing.defaultLocale;

  redirect({ href: ROUTES.HOME, locale });
}
