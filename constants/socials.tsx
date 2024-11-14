import { Github, Linkedin, Download, Rss } from "lucide-react";
import ROUTES from "./routes";

const SOCIALS = [
  {
    name: "Github",
    icon: <Github size={30} />,
    url: ROUTES.GITHUB,
    target: "_blank",
  },
  {
    name: "Linkedin",
    icon: <Linkedin size={30} />,
    url: ROUTES.LINKEDIN,
    target: "_blank",
  },
  {
    name: "Resume",
    icon: <Download size={30} />,
    url: ROUTES.RESUME,
    target: "_blank",
  },
  {
    name: "Blog",
    icon: <Rss size={30} />,
    url: ROUTES.BLOG,
    target: "",
  },
];

export default SOCIALS;
