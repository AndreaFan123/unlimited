import * as runtime from "react/jsx-runtime";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function useMdxComponent(code: string) {
  const fn = new Function(code);
  return fn({
    ...runtime,
  }).default;
}

const components = {
  Image: ({ src, alt, width = 300, height = 300, ...props }: ImageProps) => (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      {...props}
      className="object-contain"
    />
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-5 m-0 font-black">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-5 mb-0 font-bold">{children}</h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="mt-4 mb-0 font-bold">{children}</h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-0">{children}</p>
  ),
  figure: ({ children }: { children: React.ReactNode }) => (
    <figure className="my-0 w-full">{children}</figure>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mt-0 w-full">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mt-0 w-full">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-[#5350a6]">{children}</blockquote>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="rounded bg-[#c3c2ed] px-1">{children}</strong>
  ),
};

type MdxProps = {
  code: string;
};

export default function MdxContent({ code }: MdxProps) {
  const Component = useMdxComponent(code);
  return <Component components={components} />;
}
