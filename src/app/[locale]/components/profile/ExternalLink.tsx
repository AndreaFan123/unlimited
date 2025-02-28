import Link from "next/link";

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
    <Link
      href={url}
      target={target}
      aria-label={ariaLabel}
      className="hoverEffect"
    >
      {icon}
    </Link>
  );
}
