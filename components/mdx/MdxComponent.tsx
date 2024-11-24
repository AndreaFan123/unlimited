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
    <h2 className="mt-5 m-0 font-black text-gray-700 dark:text-gray-300">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-5 mb-0 font-bold text-gray-700 dark:text-gray-300">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="mt-4 mb-0 font-bold text-gray-700 dark:text-gray-300">
      {children}
    </h4>
  ),
  h5: ({ children }: { children: React.ReactNode }) => (
    <h5 className="mt-4 mb-0 font-bold text-gray-700 dark:text-gray-300">
      {children}
    </h5>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-0 text-gray-700 dark:text-gray-300">{children}</p>
  ),
  figure: ({ children }: { children: React.ReactNode }) => (
    <figure className="my-0 w-full text-gray-700 dark:text-gray-300">
      {children}
    </figure>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mt-0 w-full text-gray-700 dark:text-gray-300">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mt-0 w-full text-gray-700 dark:text-gray-300">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-[#5350a6] text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="rounded bg-[#c3c2ed] px-1">{children}</strong>
  ),
  a: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} className="text-gray-700 dark:text-gray-300">
      {children}
    </a>
  ),
};

type MdxProps = {
  code: string;
};

export default function MdxContent({ code }: MdxProps) {
  const Component = useMdxComponent(code);
  return <Component components={components} />;
}
