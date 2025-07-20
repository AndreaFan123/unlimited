import ROUTES from "@/src/constants/routes";
import { Link } from "@/src/i18n/navigation";

type PostContainerProps = {
  slug: string;
  title: string;
  date: string;
  published: boolean;
  body: string;
  description?: string | undefined;
} & {
  slugAsParams: string;
};

export default function Post({ post }: { post: PostContainerProps }) {
  return (
    <li>
      <Link
        className="hover:text-orange-500 flex items-baseline gap-3 transition-all duration-300"
        href={ROUTES.BLOG_SLUG.replace("[slug]", post.slugAsParams)}
      >
        📓 <span className="text-md">{post.title}</span>
      </Link>
    </li>
  );
}
