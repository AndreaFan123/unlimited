"use client";

import { Link } from "@/src/i18n/navigation";
import { cn } from "@/src/lib/utils";

type ExternalLinkProps = {
  icon: JSX.Element;
  url: string;
  target: string;
  ariaLabel: string;
  bgClassName: string;
};

export default function ExternalLink({
  icon,
  url,
  target,
  ariaLabel,
  bgClassName,
}: ExternalLinkProps) {
  return (
    <Link
      href={url}
      target={target}
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center rounded-full p-2.5 text-white transition-all duration-300 hover:scale-110",
        bgClassName
      )}
    >
      {icon}
    </Link>
  );
}
