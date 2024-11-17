import meetToday from "@/public/meet-today.png";
import senryo from "@/public/senryo.png";
import unlimited from "@/public/unlimited.png";
import ROUTES from "@/constants/routes";

const projectList = [
  {
    name: "meet.today",
    description: "Digital Business Card platform",
    link: ROUTES.MEETUTODAY,
    src: meetToday,
    status: true,
    tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
  },
  {
    name: "senryo",
    description: "Food Delivery Platform",
    link: ROUTES.SENRYO,
    src: senryo,
    status: true,
    tech: ["Next.js", "TailwindCSS", "TypeScript", "i18n"],
  },
  {
    name: "Unlimited",
    description: "Personal Portfolio and Blog",
    link: "",
    src: unlimited,
    status: true,
    tech: ["Next.js", "TailwindCSS", "TypeScript", "MDX", "Shadcn/UI"],
  },
];

export default projectList;
