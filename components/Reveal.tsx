"use client";

import { useState, type ElementType, type ReactNode } from "react";

import { useInView } from "@/lib/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 1–3 → odpovídá .fi-d1/.fi-d2/.fi-d3 (stupňované zpoždění). */
  delay?: 0 | 1 | 2 | 3;
  as?: ElementType;
}

/**
 * Scroll-reveal wrapper — používá .fi/.vis třídy z globals (jako předloha).
 * `.vis` je JEDNORÁZOVÉ (obsah po odhalení už nemizí — žádné opakované
 * blikání při scrollu nahoru). Živý stav `.in` se přepíná dál a slouží CSS
 * k pauzování nekonečných animací mimo viewport (viz globals).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ repeat: true });
  const [seen, setSeen] = useState(false);
  const delayClass = delay ? `fi-d${delay}` : "";

  // „zámek" prvního zobrazení — úprava stavu přímo při renderu (doporučený
  // React pattern pro odvozený stav, bez efektu navíc)
  if (inView && !seen) setSeen(true);

  return (
    <Tag
      ref={ref}
      className={`fi ${delayClass} ${seen ? "vis" : ""} ${
        inView ? "in" : ""
      } ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
