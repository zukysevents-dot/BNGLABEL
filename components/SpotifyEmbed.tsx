interface SpotifyEmbedProps {
  /** Spotify Artist ID. */
  artistId: string;
  title?: string;
  /** 152 = kompaktní, 352 = seznam skladeb. */
  height?: number;
}

/**
 * Vložený Spotify přehrávač (oficiální embed). Hraje ukázky přímo na webu,
 * nepotřebuje credentials ani API.
 */
export function SpotifyEmbed({
  artistId,
  title = "Spotify přehrávač",
  height = 352,
}: SpotifyEmbedProps) {
  return (
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
      width="100%"
      height={height}
      loading="lazy"
      style={{ border: 0, borderRadius: 12 }}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
}
