import { Github, Linkedin, Download, Rss } from "lucide-react";
import ROUTES from "./routes";

const SOCIALS = [
  {
    name: "Linkedin",
    icon: <Linkedin size={30} />,
    url: ROUTES.LINKEDIN,
    target: "_blank",
    ariaLabel: "Visit Linkedin",
  },
  {
    name: "Github",
    icon: <Github size={30} />,
    url: ROUTES.GITHUB,
    target: "_blank",
    ariaLabel: "Visit Github",
  },
  {
    name: "Resume",
    icon: <Download size={30} />,
    url: ROUTES.RESUME,
    target: "_blank",
    ariaLabel: "Download Resume",
  },
  {
    name: "Blog",
    icon: <Rss size={30} />,
    url: ROUTES.BLOG,
    target: "",
    ariaLabel: "Visit Blog",
  },
];

export default SOCIALS;
