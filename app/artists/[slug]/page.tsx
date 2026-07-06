import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtistTracks } from "@/components/ArtistTracks";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { TopTracks } from "@/components/TopTracks";
import { artists, getArtist } from "@/data/artists";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";
import { getArtistLatestReleases, getArtistTopTracks } from "@/lib/spotify";

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

  const locale = await getLocale();
  const t = getDict(locale);
  const bio = locale === "en" ? artist.bioEn ?? artist.bio : artist.bio;
  const genre = locale === "en" ? artist.genreEn ?? artist.genre : artist.genre;

  const [releases, topTracks] = await Promise.all([
    getArtistLatestReleases(artist.spotifyArtistId, artist.slug),
    getArtistTopTracks(artist.spotifyArtistId, artist.slug, 5),
  ]);
  const latestReleases = releases.slice(0, 3);

  return (
    <>
      <Nav locale={locale} nav={t.nav} />
      <div className="artist-view">
        <div className="artist-page">
          <Reveal>
            <Link href="/#artists" className="ap-back">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t.artist.back}
            </Link>
          </Reveal>

          {/* vstupní kaskáda: foto naskočí první, texty s jemným odstupem */}
          <div className="ap-hero">
            <Reveal className="ap-photo">
              {artist.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={artist.image} alt={artist.name} />
              ) : (
                artist.initials
              )}
            </Reveal>
            <Reveal className="ap-info" delay={1}>
              <div className="ap-genre-tag">{genre}</div>
              <h1 className="ap-name">{artist.name}</h1>
              <p className="ap-bio">{bio}</p>
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
            </Reveal>
          </div>

          {topTracks.length > 0 && (
            <>
              <Reveal className="ap-section-title">
                <span>{t.artist.topTracks}</span>
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sm"
                >
                  {t.artist.openSpotifyArrow}
                </a>
              </Reveal>

              <Reveal>
                <TopTracks tracks={topTracks} />
              </Reveal>
            </>
          )}

          {latestReleases.length > 0 && (
            <>
              <Reveal className="ap-section-title">
                <span>{t.artist.listen}</span>
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sm"
                >
                  {t.artist.openSpotifyArrow}
                </a>
              </Reveal>

              <Reveal>
                <ArtistTracks releases={latestReleases} />
              </Reveal>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
