"use client";

import Image from "next/image";
import { useState } from "react";

interface CoverProps {
  src: string | null;
  alt: string;
  /** Text za obrázkem (zobrazí se, když obal chybí / nenačte se). */
  fallback: string;
  sizes?: string;
}

/**
 * Obal releasu — next/image s grafickým fallbackem.
 * Když `src` chybí nebo se nenačte, ukáže se `fallback` (číslo/iniciály)
 * na barevném podkladu `.rel-img`.
 */
export function Cover({
  src,
  alt,
  fallback,
  sizes = "(max-width: 900px) 50vw, 25vw",
}: CoverProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className="rel-img-num">{fallback}</span>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
