"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/Monogram";

const LINKS = [
  { href: "/#about", label: "Label" },
  { href: "/#artists", label: "Umělci" },
  { href: "/#releases", label: "Releases" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

      <ul className="nav-links">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
        <li>
          <Link href="/#contact" className="nav-cta">
            Kontakt
          </Link>
        </li>
      </ul>

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

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" className="nav-cta" onClick={() => setOpen(false)}>
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
