import Link from "next/link";

type SocialLinkProps = {
  icon: JSX.Element;
  url: string;
  target: string;
};

export default function SocialLink({ icon, url, target }: SocialLinkProps) {
  return (
    <Link href={url} target={target} className="hoverEffect">
      {icon}
    </Link>
  );
}
