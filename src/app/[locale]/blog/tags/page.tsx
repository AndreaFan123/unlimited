import { getAllTags, sortTagByCount } from "@/src/lib/utils";
import { Metadata } from "next";
import { posts } from "#site/content";
import Tag from "@/src/components/tag-component/tag";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagByCount(tags);
  return (
    <div className="container max-w-4xl">
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
    </div>
  );
}
