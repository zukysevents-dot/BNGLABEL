"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "@/lib/useInView";

/**
 * Počítadlo — odpočítá od 0 k cílové hodnotě, když se dostane do viewportu.
 * Zachová případnou příponu (např. "420K" → 420 + "K").
 */
export function CountUp({
  value,
  duration = 1400,
}: {
  value: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || target <= 0) return;
    started.current = true;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(raf);
    }

    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // pozn.: `match` NEpatří do závislostí (nový objekt každý render → zamrzlá animace)
  }, [inView, target, duration]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
