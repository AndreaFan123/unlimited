"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/src/lib/utils";

type ZoomableImageProps = ImageProps & {
  className?: string;
};

export default function ZoomableImage({
  className,
  alt,
  src,
  width,
  height,
  ...props
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in border-0 bg-transparent p-0"
        aria-label={`Open image: ${alt || "article image"}`}
        aria-haspopup="dialog"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          {...props}
          className={cn("object-contain", className)}
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Expanded article image"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 z-10 rounded bg-black/70 px-3 py-1 text-sm text-white hover:bg-black"
              aria-label="Close expanded image"
            >
              Close
            </button>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              {...props}
              className={cn("h-auto max-h-[90vh] w-full object-contain", className)}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
