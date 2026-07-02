import { ArtistRow } from "@/components/ArtistRow";
import { Reveal } from "@/components/Reveal";
import { artists } from "@/data/artists";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

export async function Roster() {
  const locale = await getLocale();
  const t = getDict(locale).roster;

  return (
    <section id="artists" className="artists s">
      <div className="max">
        <Reveal className="artists-head">
          <div>
            <div className="s-num">{t.num}</div>
            <h2 className="s-title">{t.title}</h2>
          </div>
        </Reveal>

        <div className="artist-list">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <ArtistRow artist={artist} index={i} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
