"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { LOCALE_COOKIE, type Locale } from "@/lib/dictionaries";

/** Vlaječka ČR. */
function CzFlag() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden focusable="false">
      <rect width="60" height="20" fill="#fff" />
      <rect y="20" width="60" height="20" fill="#d7141a" />
      <path d="M0 0 30 20 0 40 Z" fill="#11457e" />
    </svg>
  );
}

/** Vlaječka UK (Union Jack). */
function GbFlag() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden focusable="false">
      <clipPath id="gb-s">
        <rect width="60" height="40" />
      </clipPath>
      <clipPath id="gb-t">
        <path d="M30,20 H60 V40 Z V40 H0 Z H0 V0 Z V0 H60 Z" />
      </clipPath>
      <g clipPath="url(#gb-s)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        <path
          d="M0,0 L60,40 M60,0 L0,40"
          clipPath="url(#gb-t)"
          stroke="#C8102E"
          strokeWidth="5"
        />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  );
}

/**
 * Přepínač jazyka — dvě vlaječky na překlik. Uloží jazyk do cookie a
 * soft-refreshne stránku (serverové komponenty se přerenderují v novém jazyce).
 */
export function LangSwitch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label="Jazyk / Language"
      data-pending={pending || undefined}
    >
      <button
        type="button"
        aria-pressed={locale === "cs"}
        aria-label="Čeština"
        title="Čeština"
        onClick={() => choose("cs")}
      >
        <CzFlag />
      </button>
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        title="English"
        onClick={() => choose("en")}
      >
        <GbFlag />
      </button>
    </div>
  );
}
