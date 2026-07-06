import Link from "next/link";

import { Cover } from "@/components/Cover";
import type { Artist } from "@/data/artists";
import type { Locale } from "@/lib/dictionaries";

/**
 * Řádek umělce ve stylu Spotify — pořadí, kruhový avatar, jméno + žánr,
 * strip miniatur posledních obalů (vyplní prostor) a odkazy. Celý řádek
 * je proklik na detail (overlay odkaz), odkazy Spotify/IG jsou nad ním.
 */
export function ArtistRow({
  artist,
  index,
  locale,
}: {
  artist: Artist;
  index: number;
  locale: Locale;
}) {
  const covers = artist.discography.slice(0, 3);
  const genre =
    locale === "en" ? artist.genreEn ?? artist.genre : artist.genre;

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
        <span className="ar-genre">{genre}</span>
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
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  );
}
