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
  limit = 10,
): Promise<Release[]> {
  const token = await getAccessToken();
  if (!token || !spotifyArtistId) return releasesByArtist(artistSlug);

  try {
    const res = await fetch(
      // Spotify u tohoto endpointu aktuálně odmítá limit > 10 (400 „Invalid limit"),
      // i když dokumentace uvádí 50 — proto ho tvrdě ořízneme na 10. Bez toho
      // by fetch spadl a vše tiše přešlo na mock data.
      `${API_BASE}/artists/${spotifyArtistId}/albums?include_groups=album,single&market=CZ&limit=${Math.min(limit, 10)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return releasesByArtist(artistSlug);

    const data = (await res.json()) as { items: SpotifyAlbum[] };
    const artist = artists.find((a) => a.slug === artistSlug);

    return data.items
      .map((album) => ({
        type: normalizeType(album.album_type),
        title: album.name,
        year: album.release_date.slice(0, 4),
        releaseDate: album.release_date,
        cover: album.images[0]?.url ?? null,
        artistName: artist?.name ?? album.artists[0]?.name ?? "",
        artistSlug,
        artistSpotifyId: spotifyArtistId,
        spotifyUrl: album.external_urls.spotify,
      }))
      // vždy seřazeno od nejnovějšího vydání
      .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  } catch {
    return releasesByArtist(artistSlug);
  }
}

/** Poslední releasy celého labelu. Bez creds vrací mock (kurátorovaný výběr). */
export async function getLabelLatestReleases(limit = 4): Promise<Release[]> {
  const byDateDesc = (a: Release, b: Release) =>
    b.releaseDate.localeCompare(a.releaseDate);

  if (!hasSpotifyCredentials()) {
    return [...latestReleases].sort(byDateDesc).slice(0, limit);
  }

  const perArtist = await Promise.all(
    artists.map((a) => getArtistLatestReleases(a.spotifyArtistId, a.slug, 6)),
  );
  const all = perArtist.flat();
  if (all.length === 0) return [...latestReleases].sort(byDateDesc).slice(0, limit);

  // nejnovější release každého umělce, pak celé seřazené podle data
  return all.sort(byDateDesc).slice(0, limit);
}

/**
 * Nejnovější SINGL napříč všemi umělci (kdokoli vydal naposled).
 * Bez creds vrací nejnovější singl z mock dat. Drží se aktuální (ISR + Spotify).
 */
export async function getLatestSingle(): Promise<Release | null> {
  const byDateDesc = (a: Release, b: Release) =>
    b.releaseDate.localeCompare(a.releaseDate);

  let pool: Release[];
  if (hasSpotifyCredentials()) {
    const perArtist = await Promise.all(
      artists.map((a) => getArtistLatestReleases(a.spotifyArtistId, a.slug, 10)),
    );
    pool = perArtist.flat();
  } else {
    pool = [
      ...latestReleases,
      ...artists.flatMap((a) => releasesByArtist(a.slug)),
    ];
  }

  const singles = pool
    .filter((r) => r.type === "Single")
    .sort(byDateDesc);

  // fallback: kdyby žádný singl nebyl, vezmi nejnovější release
  return singles[0] ?? pool.sort(byDateDesc)[0] ?? null;
}
