import { Reveal } from "@/components/Reveal";
import { concerts } from "@/data/artists";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

export async function Concerts() {
  const t = getDict(await getLocale()).concerts;

  return (
    <section className="concerts s" style={{ borderBottom: "1px solid var(--line)" }}>
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
        </Reveal>

        <Reveal delay={1}>
          {concerts.map((c, i) => (
            <div className="concert-row" key={`${c.date}-${i}`}>
              <div className="concert-date">
                {c.date}
                <span>{c.day}</span>
              </div>
              <div>
                <div className="concert-name">{c.name}</div>
                <div className="concert-venue">{c.venue}</div>
              </div>
              <div className="concert-city">{c.city}</div>
              <div className="concert-artists">{c.artists}</div>
              {c.soldOut ? (
                <span className="concert-ticket sold-out">{t.soldOut}</span>
              ) : (
                <a
                  href={c.ticket}
                  target={c.ticket.startsWith("http") ? "_blank" : undefined}
                  rel={c.ticket.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="concert-ticket"
                >
                  {t.tickets}
                </a>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
