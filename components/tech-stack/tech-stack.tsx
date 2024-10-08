import {
  RiReactjsFill,
  RiNextjsFill,
  RiTailwindCssFill,
  RiVuejsFill,
  RiCss3Fill,
  RiHtml5Fill,
} from "react-icons/ri";
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoFlask,
  BiLogoPython,
  BiLogoDjango,
} from "react-icons/bi";

const techStack = [
  { name: "Next.js", logo: RiNextjsFill },
  { name: "React.js", logo: RiReactjsFill },
  { name: "CSS", logo: RiCss3Fill },
  { name: "HTML", logo: RiHtml5Fill },
  { name: "JavaScript", logo: BiLogoJavascript },
  { name: "TypeScript", logo: BiLogoTypescript },
  { name: "TailwindCSS", logo: RiTailwindCssFill },
  { name: "Vue", logo: RiVuejsFill },
  { name: "Python", logo: BiLogoPython },
  { name: "Flask", logo: BiLogoFlask },
  { name: "Django", logo: BiLogoDjango },
];

export default function TechStack() {
  return (
    <div className="py-16 overflow-hidden">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold mb-8  text-gray-800">I Use...</h2>
        <div className="flex overflow-x-hidden">
          <div className="flex animate-scroll ">
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="flex flex-col items-center mx-4">
                <tech.logo className="w-16 h-16 mb-2" color="#374151" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
