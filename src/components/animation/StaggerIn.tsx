"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type StaggerInProps = {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
};

export default function StaggerIn({
  children,
  delay = 0,
  stagger = 0.15,
  className,
}: StaggerInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = containerRef.current?.children;
      if (!items?.length) {
        return;
      }

      gsap.set(items, { opacity: 0, x: -20 });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [delay, stagger] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
