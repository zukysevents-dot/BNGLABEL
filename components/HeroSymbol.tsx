"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Heraldický znak v heru. Tmavé logo + lehoučký růžový obrys. Nahoře jsou
 * mírně oddělené; při scrollu se obrys přiblíží a SPLYNE s logem (--c) — v tu
 * chvíli krátký růžový „wow" záblesk (.merged). Pak znak stéká dolů a mizí (--p).
 */
export function HeroSymbol() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduce) {
      el.style.setProperty("--c", "1");
      return;
    }

    let raf = 0;
    let merged = false;
    const update = () => {
      const vh = window.innerHeight || 1;
      const p = Math.min(Math.max(window.scrollY / (vh * 1.1), 0), 1);
      const c = Math.min(Math.max(window.scrollY / (vh * 0.24), 0), 1);
      el.style.setProperty("--p", p.toFixed(3));
      el.style.setProperty("--c", c.toFixed(3));
      if (c >= 1 && !merged) {
        merged = true;
        el.classList.add("merged");
      } else if (c < 0.96 && merged) {
        merged = false;
        el.classList.remove("merged");
      }
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
      <span className="hero-symbol-burst" />
      <span className="hero-symbol-glow">
        <Monogram decorative outline />
      </span>
      <span className="hero-symbol-inner">
        <Monogram decorative />
      </span>
    </div>
  );
}
