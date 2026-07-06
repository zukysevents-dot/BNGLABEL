import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import type { Track } from "@/data/artists";

/**
 * Top tracky umělce dle poslechovosti na Spotify — stejný vizuální styl jako
 * `ArtistTracks`, ale bez typu/roku (tracky ho nemají).
 */
export function TopTracks({ tracks }: { tracks: Track[] }) {
  return (
    <ul className="track-list">
      {tracks.map((track, i) => (
        <li className="track-row" key={`${track.title}-${i}`}>
          <PlayButton
            artistId={track.artistSpotifyId}
            spotifyUrl={track.spotifyUrl}
            label={`${track.title} — ${track.artistName}`}
            variant="track"
          />
          <span className="track-cover">
            <Cover src={track.cover} alt={`Obal: ${track.title}`} fallback="♪" sizes="56px" />
          </span>
          <span className="track-info">
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="track-title"
            >
              {track.title}
            </a>
          </span>
          <span className="track-index" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
        </li>
      ))}
    </ul>
  );
}
