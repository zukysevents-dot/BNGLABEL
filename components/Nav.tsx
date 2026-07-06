"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { LangSwitch } from "@/components/LangSwitch";
import { Monogram } from "@/components/Monogram";
import { getDict, type Dict, type Locale } from "@/lib/dictionaries";

export function Nav({
  locale = "cs",
  nav,
}: {
  locale?: Locale;
  nav?: Dict["nav"];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Fallback, kdyby prop nedorazil (např. při HMR / neúplném renderu) — Nav nikdy nespadne.
  const t = nav ?? getDict(locale).nav;

  const links = [
    { href: "/#about", id: "about", label: t.label },
    { href: "/#artists", id: "artists", label: t.artists },
    { href: "/#releases", id: "releases", label: t.releases },
    { href: "/#live", id: "live", label: t.live },
  ];

  useEffect(() => {
    // scroll-spy: aktivní je poslední sekce, jejíž horní hrana prošla třetinou
    // viewportu. Na stránkách bez sekcí (detail umělce) se nic nezvýrazňuje.
    const sections = ["about", "artists", "releases", "live"]
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => s !== null);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const marker = window.innerHeight * 0.34;
      let current = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= marker) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav id="nav" className={scrolled || open ? "scrolled" : ""}>
      <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
        <span className="nav-logo-mark">
          <Monogram />
        </span>
        Bonghemia
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={active === l.id ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="nav-cta">
              {t.contact}
            </Link>
          </li>
        </ul>

        <LangSwitch locale={locale} />

        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span>
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" className="nav-cta" onClick={() => setOpen(false)}>
          {t.contact}
        </Link>
      </div>
    </nav>
  );
}
