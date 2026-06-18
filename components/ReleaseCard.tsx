import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import type { Release } from "@/data/artists";

export function ReleaseCard({
  release,
  fallback,
}: {
  release: Release;
  fallback: string;
}) {
  const label = `${release.title} — ${release.artistName}`;

  return (
    <div className="rel">
      <div className="rel-img" style={{ background: release.bg ?? "#141414" }}>
        <div className="rel-img-inner">
          <Cover
            src={release.cover}
            alt={`Obal: ${label}`}
            fallback={fallback}
          />
        </div>
        <PlayButton artistId={release.artistSpotifyId} label={label} />
      </div>
      <div className="rel-type">{release.type}</div>
      <a
        href={release.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rel-title"
      >
        {release.title}
      </a>
      <div className="rel-artist">{release.artistName}</div>
      <div className="rel-year">{release.year}</div>
    </div>
  );
}
