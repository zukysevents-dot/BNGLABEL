"use client";

import type { ElementType, ReactNode } from "react";

import { useInView } from "@/lib/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 1–3 → odpovídá .fi-d1/.fi-d2/.fi-d3 (stupňované zpoždění). */
  delay?: 0 | 1 | 2 | 3;
  as?: ElementType;
}

/** Scroll-reveal wrapper — používá .fi/.vis třídy z globals (jako předloha). */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true });
  const delayClass = delay ? `fi-d${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`fi ${delayClass} ${inView ? "vis" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
