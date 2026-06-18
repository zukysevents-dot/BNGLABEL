"use client";

import { useEffect, useState } from "react";

interface PlayerState {
  artistId: string;
  label: string;
}

/**
 * Spodní lišta s vloženým Spotify přehrávačem. Otevře se po kliknutí na
 * „play" u releasu (event `bonghemia:play`). Lišta naskočí okamžitě se
 * skeletonem; iframe se načítá eager a po `onLoad` skeleton zmizí.
 */
export function PlayerBar() {
  const [state, setState] = useState<PlayerState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PlayerState>).detail;
      if (detail?.artistId) {
        setLoaded(false);
        setState(detail);
      }
    };
    window.addEventListener("bonghemia:play", handler);
    return () => window.removeEventListener("bonghemia:play", handler);
  }, []);

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
          <div className="player-frame">
            <iframe
              key={state.artistId}
              title={`Spotify přehrávač — ${state.label}`}
              src={`https://open.spotify.com/embed/artist/${state.artistId}?utm_source=generator&theme=0`}
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              onLoad={() => setLoaded(true)}
            />
            {!loaded && (
              <div className="player-loading" aria-hidden>
                <span className="player-loading-dot" />
                Načítám ukázku ze Spotify…
              </div>
            )}
          </div>
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
