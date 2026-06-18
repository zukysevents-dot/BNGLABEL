import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtistTracks } from "@/components/ArtistTracks";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { artists, getArtist } from "@/data/artists";
import { getArtistLatestReleases } from "@/lib/spotify";

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
