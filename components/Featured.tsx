import { Cover } from "@/components/Cover";
import { PlayButton } from "@/components/PlayButton";
import { Reveal } from "@/components/Reveal";
import { getLatestSingle } from "@/lib/spotify";

/**
 * Sekce „Aktuální single" — vždy nejnovější vydaný singl napříč všemi umělci
 * (kdokoli z nich vydal naposled). Drží se aktuální (ISR + Spotify API).
 */
export async function Featured() {
  const single = await getLatestSingle();
  if (!single) return null;

  const query = encodeURIComponent(`${single.title} ${single.artistName}`);
  const appleUrl = `https://music.apple.com/search?term=${query}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;

  return (
    <section className="featured">
      <Reveal className="feat-left">
        <div className="feat-cover">
          {single.cover ? (
            <Cover
              src={single.cover}
              alt={`Obal: ${single.title} — ${single.artistName}`}
              fallback="Cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          ) : (
            "Cover"
          )}
          <PlayButton
            artistId={single.artistSpotifyId}
            label={`${single.title} — ${single.artistName}`}
          />
        </div>
      </Reveal>

      <Reveal delay={2} className="feat-right">
        <div className="feat-badge">Aktuální single</div>
        <h2 className="feat-title">{single.title}</h2>
        <div className="feat-sub">
          {single.artistName} · {single.year}
        </div>
        <p className="feat-desc">
          Nejnovější singl z Bonghemia Label — poslechni si ho na svojí platformě.
        </p>
        <div className="feat-platforms">
          <a
            href={single.spotifyUrl}
            className="pltf sp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.43c-.18.3-.57.39-.87.21-2.39-1.46-5.4-1.79-8.94-.98-.34.08-.68-.13-.76-.47-.08-.34.13-.68.47-.76 3.88-.89 7.21-.51 9.89 1.13.3.18.39.57.21.87zm1.23-2.73c-.23.37-.71.49-1.08.26-2.73-1.68-6.9-2.17-10.13-1.19-.42.13-.86-.11-.99-.52-.13-.42.11-.86.52-.99 3.69-1.12 8.28-.57 11.42 1.36.37.23.49.71.26 1.08zm.11-2.85C14.7 8.85 9.39 8.68 6.4 9.59c-.5.15-1.02-.13-1.17-.63-.15-.5.13-1.02.63-1.17 3.43-1.04 9.29-.84 12.96 1.34.45.27.6.85.33 1.3-.27.45-.85.6-1.3.33z" />
            </svg>
            Spotify
          </a>
          <a href={appleUrl} className="pltf" target="_blank" rel="noopener noreferrer">
            Apple Music
          </a>
          <a href={youtubeUrl} className="pltf" target="_blank" rel="noopener noreferrer">
            YouTube ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
