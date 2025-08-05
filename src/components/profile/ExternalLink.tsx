"use client";

import { Link } from "@/src/i18n/navigation";
import dynamic from "next/dynamic";

const GsapComponent = dynamic(() => import("../animation/Copy"), {
  ssr: false,
});

type ExternalLinkProps = {
  icon: JSX.Element;
  url: string;
  target: string;
  ariaLabel: string;
};

export default function ExternalLink({
  icon,
  url,
  target,
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <GsapComponent>
      <Link
        href={url}
        target={target}
        aria-label={ariaLabel}
        className="hoverEffect"
      >
        {icon}
      </Link>
    </GsapComponent>
  );
}
