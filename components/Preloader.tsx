"use client";

import { useEffect, useRef, useState } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Úvodní načítací obrazovka — logo Bonghemia se ukáže, pak DOLETÍ na pozici
 * navigačního loga vlevo nahoře (zmenší se přesně na něj), pozadí se rozplyne
 * a odkryje web a ve chvíli spojení se navigační logo „zažehne" růžovým
 * záblleskem (předá štafetu). Drží scroll zamčený, dokud nezmizí.
 * Reduced-motion → jen rychlé odkrytí bez přeletu.
 */
export function Preloader() {
  const [stage, setStage] = useState<"show" | "fly" | "gone">("show");
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    document.body.style.overflow = "hidden";

    const showMs = reduce ? 200 : 900;
    const flyMs = reduce ? 320 : 850; // doba od startu přeletu do zmizení
    const igniteDelay = 600; // kdy logo „dosedne" a navigační se rozsvítí

    const navMark = document.querySelector<HTMLElement>(".nav-logo-mark");
    let ignTimer: ReturnType<typeof setTimeout> | undefined;
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;

    const t1 = setTimeout(() => {
      const mark = markRef.current;
      // změř obě loga a přesuň/zmenš preloaderový znak přesně na navigační
      if (mark && navMark && !reduce) {
        const m = mark.getBoundingClientRect();
        const n = navMark.getBoundingClientRect();
        const dx = n.left + n.width / 2 - (m.left + m.width / 2);
        const dy = n.top + n.height / 2 - (m.top + m.height / 2);
        const scale = n.width / (m.width || 1);
        mark.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(
          1,
        )}px) scale(${scale.toFixed(3)})`;
      }
      // pozadí se začíná rozplývat → teprve TEĎ pusť hero nadpis (viz .pre-done
      // v globals.css) — jinak celá jeho animace proběhne schovaná pod oponou
      document.documentElement.classList.add("pre-done");
      setStage("fly");
      if (!reduce) {
        ignTimer = setTimeout(
          () => navMark?.classList.add("ignite"),
          igniteDelay,
        );
      }
    }, showMs);

    const t2 = setTimeout(() => {
      setStage("gone");
      document.body.style.overflow = "";
      cleanupTimer = setTimeout(
        () => navMark?.classList.remove("ignite"),
        300,
      );
    }, showMs + flyMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (ignTimer) clearTimeout(ignTimer);
      if (cleanupTimer) clearTimeout(cleanupTimer);
      document.body.style.overflow = "";
      // pojistka: hero nadpis čeká na .pre-done — nesmí zůstat zamčený,
      // ani kdyby se preloader odpojil dřív (HMR, rychlá navigace)
      document.documentElement.classList.add("pre-done");
    };
  }, []);

  if (stage === "gone") return null;

  return (
    <div className={`preloader ${stage === "fly" ? "fly" : ""}`} aria-hidden>
      <div className="preloader-bg" />
      <div className="preloader-inner">
        <span className="preloader-mark" ref={markRef}>
          <Monogram decorative />
        </span>
        <span className="preloader-word">Bonghemia</span>
      </div>
    </div>
  );
}
