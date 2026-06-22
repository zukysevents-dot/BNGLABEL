import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtistTracks } from "@/components/ArtistTracks";
import { Cover } from "@/components/Cover";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PlayButton } from "@/components/PlayButton";
import { Reveal } from "@/components/Reveal";
import { artists, getArtist } from "@/data/artists";
import { getArtistLatestReleases } from "@/lib/spotify";

// ISR: detail se přegeneruje max. jednou za hodinu → nová alba/tracky umělce
// ze Spotify se objeví automaticky, vždy seřazené od nejnovějšího.
export const revalidate = 3600;

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return { title: "Umělec nenalezen" };
  return { title: artist.name, description: artist.bio };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const releases = await getArtistLatestReleases(
    artist.spotifyArtistId,
    artist.slug,
  );
  const latest = releases[0];

  return (
    <>
      <Nav />
      <div className="artist-view">
        <div className="artist-page">
          <Link href="/#artists" className="ap-back">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Zpět na roster
          </Link>

          <Reveal className="ap-hero">
            <div className="ap-photo">
              {artist.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={artist.image} alt={artist.name} />
              ) : (
                artist.initials
              )}
            </div>
            <div className="ap-info">
              <div className="ap-genre-tag">{artist.genre}</div>
              <h1 className="ap-name">{artist.name}</h1>
              <p className="ap-bio">{artist.bio}</p>
              <div className="ap-links">
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-link primary"
                >
                  Spotify
                </a>
                {artist.instagramUrl && (
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-link"
                  >
                    Instagram
                  </a>
                )}
                {artist.youtubeUrl && (
                  <a
                    href={artist.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-link"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {latest && (
            <Reveal className="ap-latest">
              <div className="ap-latest-cover">
                <Cover
                  src={latest.cover}
                  alt={`Obal: ${latest.title}`}
                  fallback={latest.type}
                  sizes="(max-width: 900px) 100vw, 360px"
                />
                <PlayButton
                  artistId={latest.artistSpotifyId}
                  spotifyUrl={latest.spotifyUrl}
                  label={`${latest.title} — ${latest.artistName}`}
                />
              </div>
              <div className="ap-latest-info">
                <div className="ap-latest-badge">Poslední release</div>
                <div className="ap-latest-meta">
                  {latest.type} · {latest.year}
                </div>
                <h2 className="ap-latest-title">{latest.title}</h2>
                <a
                  href={latest.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-link primary"
                >
                  Otevřít na Spotify
                </a>
                {/* ODLOŽENO: sem přijde odkaz na nejnovější videoklip, až bude web online */}
              </div>
            </Reveal>
          )}

          <Reveal className="ap-section-title">
            <span>Poslech</span>
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sm"
            >
              Otevřít na Spotify →
            </a>
          </Reveal>

          <Reveal>
            <ArtistTracks releases={releases} />
          </Reveal>
        </div>
      </div>
      <Footer />
    </>
  );
}
