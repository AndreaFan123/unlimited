import * as runtime from "react/jsx-runtime";
import ZoomableImage from "@/src/components/mdx/ZoomableImage";
import { cn } from "@/src/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
};

function useMdxComponent(code: string) {
  const fn = new Function(code);
  return fn({
    ...runtime,
  }).default;
}

const components = {
  Image: ({
    src,
    alt,
    width = 300,
    height = 300,
    priority,
    loading,
    ...props
  }: ImageProps) => (
    <ZoomableImage
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      priority={priority}
      loading={loading}
      {...props}
    />
  ),
  // Forward `id` from rehype-slug so hash links + TOC scrollspy work.
  // scroll-mt-20 offsets the sticky header (h-20) when jumping to a heading.
  h2: ({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "mt-7 mb-2 scroll-mt-20 font-black text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "mt-7 mb-2 scroll-mt-20 font-bold text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={cn(
        "mt-7 mb-2 scroll-mt-20 font-bold text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h5">) => (
    <h5
      className={cn(
        "mt-7 mb-2 scroll-mt-20 font-bold text-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-2 text-gray-700 dark:text-gray-300">{children}</p>
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
    <strong className="rounded bg-[#c3c2ed] px-1 ">{children}</strong>
  ),
  a: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} className="text-orange-600 hoverEffect">
      {children}
    </a>
  ),
  code: ({ children }: { children: React.ReactNode; href: string }) => (
    <code className="text-pink-800 dark:text-orange-600 before:content-[''] after:content-['']">
      {children}
    </code>
  ),
  th: ({ children }: { children: React.ReactNode; href: string }) => (
    <th className="text-gray-700 dark:text-gray-300">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode; href: string }) => (
    <td className="text-gray-700 dark:text-gray-300">{children}</td>
  ),
};

type MdxProps = {
  code: string;
};

export default function MdxContent({ code }: MdxProps) {
  // Velite compiles MDX into a runtime function; the component type is
  // produced per `code` string, which is the intended MDX pattern.
  /* eslint-disable react-hooks/static-components -- MDX runtime component */
  const Component = useMdxComponent(code);
  return <Component components={components} />;
}
