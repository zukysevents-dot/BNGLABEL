"use client";

import { useEffect, useState } from "react";

interface PlayerState {
  artistId: string;
  label: string;
}

/**
 * Spodní lišta s vloženým Spotify přehrávačem. Otevře se po kliknutí na
 * „play" u releasu (event `bonghemia:play`) a hraje ukázky přímo na webu.
 */
export function PlayerBar() {
  const [state, setState] = useState<PlayerState | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PlayerState>).detail;
      if (detail?.artistId) setState(detail);
    };
    window.addEventListener("bonghemia:play", handler);
    return () => window.removeEventListener("bonghemia:play", handler);
  }, []);

  // Esc zavře přehrávač
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  return (
    <div className={`player-bar ${state ? "open" : ""}`} aria-hidden={!state}>
      {state && (
        <>
          <iframe
            key={state.artistId}
            title={`Spotify přehrávač — ${state.label}`}
            src={`https://open.spotify.com/embed/artist/${state.artistId}?utm_source=generator&theme=0`}
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
          <button
            type="button"
            className="player-close"
            onClick={() => setState(null)}
            aria-label="Zavřít přehrávač"
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
}
