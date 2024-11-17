import { Ghost } from "lucide-react";

type PersonInfoProps = {
  name: string;
  title: string;
  content_1: string;
  content_2?: string;
};

export default function PersonInfo({
  name,
  title,
  content_1,
  content_2,
}: PersonInfoProps) {
  return (
    <>
      <div className="flex items-start gap-2">
        <Ghost width={50} height={50} />
        <div className="text-gray-800 font-semibold">
          <h5>{name}</h5>
          <span>{title}</span>
        </div>
      </div>
      <article className="text-base py-9 leading-relaxed font-light flex flex-col gap-3">
        <p>{content_1}</p>
        <p>{content_2}</p>
      </article>
    </>
  );
}
