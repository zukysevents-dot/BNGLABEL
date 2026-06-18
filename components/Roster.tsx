import { ArtistRow } from "@/components/ArtistRow";
import { Reveal } from "@/components/Reveal";
import { artists } from "@/data/artists";

export function Roster() {
  return (
    <section id="artists" className="artists s">
      <div className="max">
        <Reveal className="artists-head">
          <div>
            <div className="s-num">02 — Roster</div>
            <h2 className="s-title">Umělci</h2>
          </div>
        </Reveal>

        <div className="artist-list">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <ArtistRow artist={artist} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
