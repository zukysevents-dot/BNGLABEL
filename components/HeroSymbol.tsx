"use client";

import { useEffect, useRef } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Horní heraldický znak (tmavé logo + růžový neonový obrys). Při scrollu LETÍ
 * dolů a spojí se se zářícím znakem v sekci About — sleduje jeho živou pozici,
 * doletí přesně na něj a ve chvíli spojení spustí růžový „wow" záblesk na
 * dolním znaku, pak se nahoře vytratí (předá štafetu). Reduced-motion → statika.
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

    const target = document.querySelector<SVGElement>(".about-symbol svg");
    const targetWrap = target?.closest(".about-symbol") as HTMLElement | null;
    let raf = 0;
    let merged = false;

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight || 1;
      const w = el.offsetWidth || 1;

      if (!target) {
        // fallback bez cílového znaku: jen drift dolů + fade
        const p = Math.min(window.scrollY / (vh * 1.1), 1);
        el.style.transform = `translate(0px, calc(-50% + ${p * 170}px))`;
        el.style.opacity = `${1 - p}`;
        return;
      }

      const homeX = vw - vw * 0.04 - w / 2; // domácí střed (right: 4%)
      const homeY = vh / 2; // top: 50% + translateY(-50%)

      const r = target.getBoundingClientRect();
      const ax = r.left + r.width / 2;
      const ay = r.top + r.height / 2;

      // postup letu: 0 = dolní znak u spodního okraje, 1 = ve středu obrazovky
      const t = Math.min(Math.max((vh - ay) / (vh * 0.5), 0), 1);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic

      const tx = (ax - homeX) * e;
      const ty = (ay - homeY) * e;
      const scale = 1 + (r.width / w - 1) * e;
      el.style.transform = `translate(${tx.toFixed(1)}px, calc(-50% + ${ty.toFixed(1)}px)) scale(${scale.toFixed(3)})`;

      // po spojení se horní znak vytratí (zůstane dolní zářící)
      const fade = Math.min(Math.max((t - 0.9) / 0.1, 0), 1);
      el.style.opacity = (1 - fade).toFixed(3);
      el.style.filter = `blur(${(t * 1.4).toFixed(2)}px)`;

      // „wow" záblesk ve chvíli spojení (na dolním znaku)
      if (t >= 0.92 && !merged) {
        merged = true;
        targetWrap?.classList.add("flash");
      } else if (t < 0.85 && merged) {
        merged = false;
        targetWrap?.classList.remove("flash");
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
      <span className="hero-symbol-glow">
        <Monogram decorative outline />
      </span>
      <span className="hero-symbol-inner">
        <Monogram decorative />
      </span>
    </div>
  );
}
