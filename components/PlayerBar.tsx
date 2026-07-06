"use client";

import { useEffect, useState } from "react";

interface PlayerState {
  /** URL konkrétního releasu (album/track). Pokud chybí, hraje se profil umělce. */
  url?: string;
  artistId: string;
  label: string;
}

/**
 * Z URL Spotify entity (`…/album/ID`, `…/track/ID`, `…/artist/ID`) udělá embed.
 * Reálná data releasu → album/track embed (přehraje přesně ten release).
 * Mock data / nečitelná URL → fallback na profil umělce (jako dřív).
 */
function toEmbedSrc(s: PlayerState): string {
  const m = s.url?.match(
    /open\.spotify\.com\/(artist|album|track|playlist|episode|show)\/([A-Za-z0-9]+)/,
  );
  const target = m
    ? `${m[1]}/${m[2]}`
    : `artist/${s.artistId}`;
  return `https://open.spotify.com/embed/${target}?utm_source=generator&theme=0`;
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
      if (detail?.url || detail?.artistId) {
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

  // otevřená lišta nesmí trvale překrývat spodek stránky (patičku) —
  // obsah dostane odpovídající spodní odsazení (viz body.player-open)
  useEffect(() => {
    document.body.classList.toggle("player-open", Boolean(state));
    return () => document.body.classList.remove("player-open");
  }, [state]);

  return (
    <div className={`player-bar ${state ? "open" : ""}`} aria-hidden={!state}>
      {state && (
        <>
          <div className="player-frame">
            <iframe
              key={toEmbedSrc(state)}
              title={`Spotify přehrávač — ${state.label}`}
              src={toEmbedSrc(state)}
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
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
