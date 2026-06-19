"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Heraldický znak v heru. „Držený" (fixed), při scrollu stéká dolů, rozostřuje
 * se a mizí (--p). Růžový obrys loga (druhá kopie znaku) se při scrollu
 * rozsvěcí a zase ztmavuje — jas (--glow) řídí rychlost scrollu: rychlá reakce
 * nahoru, plynulý návrat dolů. Při prefers-reduced-motion statické (viz CSS).
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

    const BASE = 0.1; // klidový jas obrysu
    let lastY = window.scrollY;
    let target = 0; // cíl daný rychlostí scrollu
    let glow = 0; // vyhlazená hodnota
    let raf = 0;
    let running = false;

    const setDrift = () => {
      const vh = window.innerHeight || 1;
      const p = Math.min(Math.max(window.scrollY / (vh * 1.1), 0), 1);
      el.style.setProperty("--p", p.toFixed(3));
    };

    const tick = () => {
      target *= 0.86; // útlum, když se nescrolluje → ztmavne
      glow += (target - glow) * 0.22; // rychlý, plynulý náběh
      const g = Math.min(Math.max(glow, 0), 1);
      el.style.setProperty("--glow", (BASE + g * 0.75).toFixed(3));
      if (g > 0.004 || target > 0.004) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        el.style.setProperty("--glow", BASE.toFixed(3));
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const v = Math.abs(y - lastY);
      lastY = y;
      target = Math.min(target + v / 45, 1); // rychlost scrollu → jas
      setDrift();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    setDrift();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setDrift, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setDrift);
    };
  }, []);

  return (
    <div className="hero-symbol" ref={ref} aria-hidden>
      <span className="hero-symbol-glow">
        <Monogram decorative />
      </span>
      <span className="hero-symbol-inner">
        <Monogram decorative />
      </span>
    </div>
  );
}
