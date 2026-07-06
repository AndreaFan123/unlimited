import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getAlternates } from "@/src/config/site";
import { Link } from "@/src/i18n/navigation";
import { Locales } from "@/src/i18n/request";
import { routing } from "@/src/i18n/routing";
import {
  isWorkProjectKey,
  WORK_PROJECT_KEYS,
  type WorkProjectKey,
} from "@/src/constants/projects";
import ROUTES from "@/src/constants/routes";
import { getProjectPage } from "@/src/lib/projects";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import MdxContent from "@/src/components/mdx/MdxComponent";
import "@/src/styles/mdx.css";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;

  if (!isWorkProjectKey(resolvedParams.slug)) {
    const t = await getTranslations({
      locale,
      namespace: "metadata.project",
    });
    return {
      title: t("title"),
      description: t("description"),
    };
  }

  const key = resolvedParams.slug;
  const tProject = await getTranslations({ locale, namespace: "projects" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.project" });
  const page = getProjectPage(key, locale);
  const name = tProject(`${key}.name`);

  return {
    title: `${name}｜${tMeta("title")}`,
    description: page?.description ?? tProject(`${key}.description`),
    alternates: getAlternates(locale, `/projects/${key}`),
  };
}

export async function generateStaticParams(): Promise<
  { slug: string; locale: string }[]
> {
  return WORK_PROJECT_KEYS.flatMap((key) =>
    routing.locales.map((locale) => ({
      slug: key,
      locale,
    })),
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const locale = routing.locales.includes(resolvedParams.locale as Locales)
    ? (resolvedParams.locale as Locales)
    : routing.defaultLocale;

  if (!isWorkProjectKey(resolvedParams.slug)) {
    notFound();
  }

  const key = resolvedParams.slug as WorkProjectKey;
  const tProject = await getTranslations({ locale, namespace: "projects" });
  const page = getProjectPage(key, locale);
  const name = tProject(`${key}.name`);
  const description = tProject(`${key}.description`);
  const duration = tProject(`${key}.duration`);
  const type = tProject(`${key}.type`);
  const link = tProject(`${key}.link`);
  const repo = tProject.has(`${key}.repo`) ? tProject(`${key}.repo`) : undefined;

  return (
    <article className="mx-auto w-full max-w-[1000px] px-5 py-10">
      <div className="flex flex-col gap-3 pb-5">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-700 dark:text-gray-300">
          {page?.title ?? name}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {page?.description ?? description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{duration}</Badge>
          <Badge variant="secondary">{type}</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#7772ff] px-4 py-2 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
          >
            {tProject("actions.visitWebsite")}
            <ExternalLink className="h-4 w-4" />
          </a>
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 no-underline transition-colors hover:border-orange-500 hover:text-orange-500 dark:border-gray-600 dark:text-gray-300"
            >
              {tProject("actions.visitRepo")}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <Separator className="mb-5" />

      {page ? (
        <div className="prose mx-auto w-full max-w-[1000px]">
          <MdxContent code={page.body} />
        </div>
      ) : (
        <p className="font-mono text-gray-600 dark:text-gray-300">
          {tProject("workingOnIt")} 🚧
        </p>
      )}

      <Link
        href={ROUTES.HOME}
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm font-semibold text-gray-700 no-underline transition-colors hover:text-orange-500 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#7772ff] focus-visible:ring-offset-2 dark:text-gray-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{tProject("backToHome")}</span>
      </Link>
    </article>
  );
}
