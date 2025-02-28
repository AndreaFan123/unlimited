import Image from "next/image";
import meetToday from "@/public/meet-today.png";
import senryo from "@/public/senryo.png";
import unlimited from "@/public/unlimited.png";
import TechTag from "./TechTag";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/[locale]/components/ui/card";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import ROUTES from "@/src/constants/routes";

export default function ProjectContainer() {
  const t = useTranslations("projects");

  const projectList = [
    {
      name: "meet.today",
      description: t("digitalCard"),
      link: ROUTES.MEETUTODAY,
      src: meetToday,
      status: true,
      tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
    },
    {
      name: "senryo",
      description: t("senryo"),
      link: ROUTES.SENRYO,
      src: senryo,
      status: true,
      tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
    },
    {
      name: "Unlimited",
      description: t("unlimitedBlog"),
      link: "",
      src: unlimited,
      status: true,
      tech: ["Next.js", "TailwindCSS", "TypeScript", "MDX", "Shadcn/UI"],
    },
  ];
  return (
    <div className="w-full mt-8 px-4 sm:px-0">
      <h2 className="text-3xl font-bold mb-8 text-gray-700 dark:text-gray-300">
        {t("title")}
      </h2>
      <div className="border-b-[1px] pt-4 border-gray-400 dark:border-white border-dashed pb-10 w-full max-w-full lg:max-w-screen-lg overflow-x-auto">
        <div className="flex overflow-x-auto lg:w-fit gap-4">
          {projectList.map((project, index) => (
            <Card
              key={`${project.name}-${index}`}
              className="focus:outline-none focus:ring focus:ring-[#7772ff] m-5"
            >
              <Link
                href={project.link}
                target="_blank"
                className={`inline-block h-full w-[250px] ${
                  project.status ? "cursor-pointer" : "cursor-not-allowed"
                } `}
              >
                <CardHeader>
                  <Image
                    src={project.src}
                    alt={project.name}
                    width={0}
                    height={0}
                    className="w-full h-auto object-contain self-center"
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <CardTitle>{project.name}</CardTitle>
                    <span
                      className={`text-gray-700 text-xs ${
                        project.status
                          ? "bg-green-200 px-3 py-1 rounded-full"
                          : "bg-orange-200 px-3 py-1 rounded-full"
                      }`}
                    >
                      {project.status ? "Done" : "WIP"}
                    </span>
                  </div>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    {project.description}
                  </CardDescription>
                  <TechTag tech={project.tech} />
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
