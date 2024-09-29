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
    <div className="border-b-[1px] pt-[16px] border-gray-400 border-dashed pb-16 ">
      <h2 className="text-3xl font-bold md:pl-9 mb-8 text-gray-800">
        Projects
      </h2>
      <div className="flex overflow-hidden  lg:w-fit  gap-7 md:pl-9">
        {projects.map((project, index) => (
          <Card
            className="w-full lg:w-[300px] h-auto"
            key={`${project.name}-${index}`}
          >
            <Link href={project.link} target="_blank">
              <CardHeader>
                <Image
                  src={project.src}
                  alt={project.name}
                  width={300}
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
  );
}
