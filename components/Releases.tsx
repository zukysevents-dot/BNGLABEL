import { ReleaseCard } from "@/components/ReleaseCard";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/data/artists";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";
import { getLabelLatestReleases } from "@/lib/spotify";

/** Server komponenta — releasy z datové vrstvy (Spotify nebo mock fallback). */
export async function Releases() {
  const releases = await getLabelLatestReleases(4);
  const t = getDict(await getLocale()).releases;

  return (
    <section id="releases" className="releases s">
      <div className="max">
        <Reveal className="releases-head">
          <div>
            <div className="s-num">{t.num}</div>
            <h2 className="s-title">
              {t.titleTop}
              <br />
              <span className="dim">{t.titleAccent}</span>
            </h2>
          </div>
          <a
            href={contact.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-sm"
          >
            {t.full}
          </a>
        </Reveal>

        <div className="releases-row">
          {releases.map((release, i) => (
            <Reveal
              key={`${release.artistSlug}-${release.title}`}
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              <ReleaseCard
                release={release}
                fallback={String(i + 1).padStart(2, "0")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
