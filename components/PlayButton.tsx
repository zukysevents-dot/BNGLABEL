"use client";

/** Spustí spodní Spotify přehrávač. variant: "card" (overlay na obalu) | "track" (kolečko v seznamu). */
export function PlayButton({
  artistId,
  label,
  variant = "card",
}: {
  artistId: string;
  label: string;
  variant?: "card" | "track";
}) {
  const onClick = () => {
    window.dispatchEvent(
      new CustomEvent("bonghemia:play", { detail: { artistId, label } }),
    );
  };

  if (variant === "track") {
    return (
      <button
        type="button"
        className="track-play"
        aria-label={`Přehrát ukázku: ${label}`}
        onClick={onClick}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="rel-play"
      aria-label={`Přehrát ukázku: ${label}`}
      onClick={onClick}
    >
      <span className="rel-play-btn" aria-hidden>
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
