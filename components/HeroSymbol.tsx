"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/** Heraldický znak v heru — parallax při scrollu + jemné plování. */
export function HeroSymbol() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(calc(-50% + ${y * 0.18}px))`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="hero-symbol" ref={ref}>
      <div className="hero-symbol-inner">
        <Monogram decorative />
      </div>
    </div>
  );
}
