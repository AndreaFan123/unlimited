import { slug } from "github-slugger";
import ROUTES from "@/src/constants/routes";
import { badgeVariants } from "../ui/badge";
import { Link } from "@/src/i18n/navigation";

type TagProps = {
  tag: string;
  current?: boolean;
  count?: number;
};

export default function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`${ROUTES.TAG_SLUG}${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
