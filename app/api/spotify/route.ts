import { NextResponse } from "next/server";

import { getArtist } from "@/data/artists";
import {
  getArtistLatestReleases,
  getLabelLatestReleases,
  hasSpotifyCredentials,
} from "@/lib/spotify";

export const runtime = "nodejs";

/**
 * GET /api/spotify            → poslední releasy celého labelu
 * GET /api/spotify?artist=<slug> → poslední releasy daného artisty
 *
 * Bez nastavených credentials vrací mock data (`source: "mock"`),
 * takže endpoint funguje vždy.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistSlug = searchParams.get("artist");
  const source = hasSpotifyCredentials() ? "spotify" : "mock";

  if (artistSlug) {
    const artist = getArtist(artistSlug);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }
    const releases = await getArtistLatestReleases(
      artist.spotifyArtistId,
      artist.slug,
    );
    return NextResponse.json({ source, artist: artist.slug, releases });
  }

  const releases = await getLabelLatestReleases();
  return NextResponse.json({ source, releases });
}
