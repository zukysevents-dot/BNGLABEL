"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook na IntersectionObserveru.
 * `repeat: true` → `inView` se přepíná při každém vstupu i opuštění viewportu
 * (animace se přehraje i při scrollu nahoru). `repeat: false` → jednorázově.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  { repeat = false }: { repeat?: boolean } = {},
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat, options]);

  return { ref, inView };
}
