import Link from "next/link";
import Image from "next/image";
import projectList from "@/constants/project-list";
import TechTag from "./TechTag";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectContainer() {
  return (
    <div className="w-full mt-8 px-4 sm:px-0">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Projects</h2>
      <div className="border-b-[1px] pt-4 border-gray-400 border-dashed pb-10 w-full max-w-full lg:max-w-screen-lg overflow-x-auto">
        <div className="flex overflow-x-auto lg:w-fit gap-4">
          {projectList.map((project, index) => (
            <Card key={`${project.name}-${index}`}>
              <Link
                href={project.link}
                target="_blank"
                className={`inline-block w-[250px] ${
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
                  <CardDescription>{project.description}</CardDescription>
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
