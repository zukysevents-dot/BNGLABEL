/**
 * Spotify datová vrstva — SERVER-ONLY.
 *
 * Credentials se čtou z env (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`)
 * a NIKDY se neposílají do prohlížeče. Importovat jen v server kódu.
 *
 * Bez credentials (nebo při chybě) vše spadne na mock data z `data/artists.ts`,
 * takže web jede i bez napojení.
 */

import "server-only";

import {
  artists,
  latestReleases,
  releasesByArtist,
  type Release,
  type ReleaseType,
} from "@/data/artists";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

export function hasSpotifyCredentials(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET,
  );
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (!hasSpotifyCredentials()) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5_000) {
    return cachedToken.value;
  }

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      access_token: string;
      expires_in: number;
    };
    cachedToken = {
      value: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    return cachedToken.value;
  } catch {
    return null;
  }
}

type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  artists: { name: string }[];
};

function normalizeType(albumType: string): ReleaseType {
  if (albumType === "album") return "Album";
  if (albumType === "single") return "Single";
  return "EP";
}

/** Poslední releasy daného umělce. Bez creds vrací mock (diskografii). */
export async function getArtistLatestReleases(
  spotifyArtistId: string,
  artistSlug: string,
  limit = 12,
): Promise<Release[]> {
  const token = await getAccessToken();
  if (!token || !spotifyArtistId) return releasesByArtist(artistSlug);

  try {
    const res = await fetch(
      `${API_BASE}/artists/${spotifyArtistId}/albums?include_groups=album,single&market=CZ&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return releasesByArtist(artistSlug);

    const data = (await res.json()) as { items: SpotifyAlbum[] };
    const artist = artists.find((a) => a.slug === artistSlug);

    return data.items.map((album) => ({
      type: normalizeType(album.album_type),
      title: album.name,
      year: album.release_date.slice(0, 4),
      cover: album.images[0]?.url ?? null,
      artistName: artist?.name ?? album.artists[0]?.name ?? "",
      artistSlug,
      artistSpotifyId: spotifyArtistId,
      spotifyUrl: album.external_urls.spotify,
    }));
  } catch {
    return releasesByArtist(artistSlug);
  }
}

/** Poslední releasy celého labelu. Bez creds vrací mock (kurátorovaný výběr). */
export async function getLabelLatestReleases(limit = 4): Promise<Release[]> {
  if (!hasSpotifyCredentials()) {
    return latestReleases.slice(0, limit);
  }

  const perArtist = await Promise.all(
    artists.map((a) => getArtistLatestReleases(a.spotifyArtistId, a.slug, 4)),
  );
  const all = perArtist.flat();
  if (all.length === 0) return latestReleases.slice(0, limit);

  return all
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, limit);
}
