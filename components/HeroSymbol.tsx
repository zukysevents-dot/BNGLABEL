"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Heraldický znak v heru. „Držený" (fixed), při scrollu stéká dolů, rozostřuje
 * se a mizí (--p). Logo zůstává tmavé; navíc má lehoučký RŮŽOVÝ OBRYS, který
 * jemně bliká (CSS). Při prefers-reduced-motion statické (viz CSS).
 */
export function HeroSymbol() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight || 1;
      const p = Math.min(Math.max(window.scrollY / (vh * 1.1), 0), 1);
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hero-symbol" ref={ref} aria-hidden>
      <span className="hero-symbol-glow">
        <Monogram decorative outline />
      </span>
      <span className="hero-symbol-inner">
        <Monogram decorative />
      </span>
    </div>
  );
}
