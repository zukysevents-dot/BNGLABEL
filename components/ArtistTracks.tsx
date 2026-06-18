import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import type { Release } from "@/data/artists";

const TYPE_LABEL: Record<Release["type"], string> = {
  Album: "Album",
  Single: "Single",
  EP: "EP",
};

/**
 * On-brand seznam releasů umělce (styl jako cypersound) — ▶ kolečko otevře
 * spodní Spotify přehrávač, název odkazuje na Spotify.
 */
export function ArtistTracks({ releases }: { releases: Release[] }) {
  return (
    <ul className="track-list">
      {releases.map((r, i) => (
        <li className="track-row" key={`${r.title}-${i}`}>
          <PlayButton
            artistId={r.artistSpotifyId}
            label={`${r.title} — ${r.artistName}`}
            variant="track"
          />
          <span className="track-cover">
            <Cover src={r.cover} alt={`Obal: ${r.title}`} fallback={TYPE_LABEL[r.type]} sizes="56px" />
          </span>
          <span className="track-info">
            <a
              href={r.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="track-title"
            >
              {r.title}
            </a>
            <span className="track-meta">
              {TYPE_LABEL[r.type]} · {r.year}
            </span>
          </span>
          <span className="track-index" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
        </li>
      ))}
    </ul>
  );
}
