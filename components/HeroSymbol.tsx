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
    if (reduce) {
      // bez animací necháme dolní znak rovnou rozsvícený (statika)
      document.querySelector(".about-symbol")?.classList.add("lit");
      return;
    }

    const target = document.querySelector<SVGElement>(".about-symbol svg");
    const targetWrap = target?.closest(".about-symbol") as HTMLElement | null;
    let raf = 0;
    let merged = false;

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight || 1;
      const w = el.offsetWidth || 1;
      const sy = window.scrollY;

      if (!target) {
        const p = Math.min(sy / (vh * 1.1), 1);
        el.style.transform = `translate(0px, calc(-50% + ${p * 170}px))`;
        el.style.opacity = `${1 - p}`;
        return;
      }

      const homeX = vw - vw * 0.04 - w / 2; // domácí střed (right: 4%)
      const r = target.getBoundingClientRect();
      // dokumentová pozice dolního znaku → kolik se musí naskrollovat, aby byl
      // ve středu obrazovky = bod spojení. Postup se počítá od scrollY = 0,
      // takže znak letí PLYNULE už od první chvíle scrollu (ne skokem).
      const docCenterY = r.top + sy + r.height / 2;
      const mergeScrollY = Math.max(docCenterY - vh * 0.5, 1);
      const t = Math.min(Math.max(sy / mergeScrollY, 0), 1);
      const e = t * t * (3 - 2 * t); // smoothstep — pomalý start i dojezd

      const targetX = r.left + r.width / 2; // vodorovný střed dolního znaku
      const tx = (targetX - homeX) * e;
      const scale = 1 + (r.width / w - 1) * e; // zmenší se přesně na dolní znak
      el.style.transform = `translate(${tx.toFixed(1)}px, -50%) scale(${scale.toFixed(3)})`;

      // po spojení se horní znak vytratí (zůstane dolní zářící)
      const fade = Math.min(Math.max((t - 0.9) / 0.1, 0), 1);
      el.style.opacity = (1 - fade).toFixed(3);

      // „wow“ záblesk ve chvíli spojení (na dolním znaku)
      if (t >= 0.94 && !merged) {
        merged = true;
        targetWrap?.classList.add("lit");
      } else if (t < 0.85 && merged) {
        merged = false;
        targetWrap?.classList.remove("lit");
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
