import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "../ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

export default function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/blog/tags/${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
