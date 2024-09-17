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
    link: "https://example.com",
    src: meetToday,
  },
  {
    name: "senryo",
    description: "Food Delivery Platform",
    link: "https://order.sen-ryo.com.hk/tc",
    src: senryo,
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
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 *  <div className="py-16 overflow-hidden">
      <div className="container mx-auto ">
 */
