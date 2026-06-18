"use client";

/** Tlačítko play na obalu releasu — otevře spodní Spotify přehrávač. */
export function PlayButton({
  artistId,
  label,
}: {
  artistId: string;
  label: string;
}) {
  return (
    <button
      type="button"
      className="rel-play"
      aria-label={`Přehrát ukázku: ${label}`}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("bonghemia:play", { detail: { artistId, label } }),
        );
      }}
    >
      <span className="rel-play-btn" aria-hidden>
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
