export default function TechTag({ tech }: { tech: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {tech.map((item) => (
        <span
          key={item}
          className="bg-[#5350a6] text-white text-xs px-3 py-1 w-fit rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
