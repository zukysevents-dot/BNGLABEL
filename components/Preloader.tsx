"use client";

import { useEffect, useState } from "react";

import { Monogram } from "@/components/Monogram";

/**
 * Úvodní načítací obrazovka — logo Bonghemia se ukáže a panel pak swipne
 * nahoru a odkryje web. Drží scroll zamčený, dokud nezmizí.
 */
export function Preloader() {
  const [stage, setStage] = useState<"show" | "swipe" | "gone">("show");

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    document.body.style.overflow = "hidden";
    const swipeAt = reduce ? 250 : 1100;
    const goneAt = reduce ? 600 : 1950;
    const t1 = setTimeout(() => setStage("swipe"), swipeAt);
    const t2 = setTimeout(() => {
      setStage("gone");
      document.body.style.overflow = "";
    }, goneAt);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (stage === "gone") return null;

  return (
    <div
      className={`preloader ${stage === "swipe" ? "swipe" : ""}`}
      aria-hidden
    >
      <div className="preloader-inner">
        <Monogram className="preloader-mark" decorative />
        <span className="preloader-word">Bonghemia</span>
      </div>
    </div>
  );
}
