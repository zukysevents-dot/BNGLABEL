import Link from "next/link";

import { Cover } from "@/components/Cover";
import type { Artist } from "@/data/artists";

/**
 * Řádek umělce ve stylu Spotify — pořadí, kruhový avatar, jméno + žánr,
 * strip miniatur posledních obalů (vyplní prostor) a odkazy. Celý řádek
 * je proklik na detail (overlay odkaz), odkazy Spotify/IG jsou nad ním.
 */
export function ArtistRow({ artist, index }: { artist: Artist; index: number }) {
  const covers = artist.discography.slice(0, 3);

  return (
    <div className="artist-row">
      <Link
        href={`/artists/${artist.slug}`}
        className="artist-row-link"
        aria-label={`Detail umělce ${artist.name}`}
      />

      <span className="ar-num">{String(index + 1).padStart(2, "0")}</span>

      <span className="ar-avatar" aria-hidden>
        {artist.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={artist.image} alt="" />
        ) : (
          artist.initials
        )}
      </span>

      <span className="ar-id">
        <span className="ar-name">{artist.name}</span>
        <span className="ar-genre">{artist.genre}</span>
      </span>

      <span className="ar-covers" aria-hidden>
        {covers.map((c, i) => (
          <span className="ar-cover" key={`${artist.slug}-c${i}`}>
            <Cover src={c.cover} alt="" fallback="♪" sizes="56px" />
          </span>
        ))}
      </span>

      <span className="ar-links">
        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ar-link"
        >
          Spotify
        </a>
        {artist.instagramUrl && (
          <a
            href={artist.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ar-link"
          >
            IG
          </a>
        )}
      </span>

      <span className="ar-arrow" aria-hidden>
        →
      </span>
    </div>
  );
}
