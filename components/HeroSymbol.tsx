"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Heraldický znak v heru. Je „držený" (fixed) a při scrollu pomalu stéká dolů,
 * rozostřuje se a mizí; kolem něj problikává růžové neonové světlo.
 * JS jen čte scroll a nastavuje CSS proměnnou --p (0 = nahoře, 1 = odscrollováno).
 * Při prefers-reduced-motion se nehýbe (statický, viz globals.css).
 */
export function HeroSymbol() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduce) return; // statický stav řeší CSS

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight || 1;
      // postup přes ~1,1 výšky obrazovky: 0 (nahoře) → 1 (znak odscrolloval)
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
      <span className="hero-symbol-glow" />
      <span className="hero-symbol-inner">
        <Monogram decorative />
      </span>
    </div>
  );
}
