import Link from "next/link";
import Image from "next/image";
import meetToday from "@/public/meet.today.png";
import senryo from "@/public/senryo02.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    name: "meet.today",
    description: "Digital Business Card platform",
    link: "/",
    src: meetToday,
    status: "WIP",
  },
  {
    name: "senryo",
    description: "Food Delivery Platform",
    link: "https://order.sen-ryo.com.hk/tc",
    src: senryo,
    status: "Done",
  },
];

export default function Projects() {
  return (
    <div className="w-full mt-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Projects</h2>
      <div className="border-b-[1px] pt-4 border-gray-400 border-dashed pb-16 w-full max-w-full lg:max-w-screen-lg overflow-x-auto">
        <div className="flex overflow-x-auto lg:w-fit gap-7">
          {projects.map((project, index) => (
            <Card key={`${project.name}-${index}`}>
              <Link
                href={project.link}
                target="_blank"
                className={`inline-block w-[300px] ${
                  project.status === "Done"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                <CardHeader>
                  <Image
                    src={project.src}
                    alt={project.name}
                    width={0}
                    height={0}
                    className="w-full h-auto"
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <CardTitle>{project.name}</CardTitle>
                    <span
                      className={`text-gray-700 text-xs ${
                        project.status === "Done"
                          ? "bg-green-200 px-3 py-1 rounded-full"
                          : "bg-orange-200 px-3 py-1 rounded-full"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
