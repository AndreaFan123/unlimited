import Link from "next/link";

type SocialLinkProps = {
  icon: JSX.Element;
  url: string;
  target: string;
  ariaLabel: string;
};

export default function SocialLink({
  icon,
  url,
  target,
  ariaLabel,
}: SocialLinkProps) {
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
