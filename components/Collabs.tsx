import { Reveal } from "@/components/Reveal";
import { collabs } from "@/data/artists";

export function Collabs() {
  return (
    <section className="collabs s">
      <div className="max">
        <Reveal className="collabs-head">
          <div>
            <div className="s-num">07 — Projekty</div>
            <h2 className="s-title">
              Také jsme
              <br />
              <span className="dim">spolupracovali</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1} className="collabs-grid">
          {collabs.map((c) => (
            <div className="collab-item" key={c.name}>
              <div className="collab-avatar">{c.initials}</div>
              <div className="collab-name">{c.name}</div>
              <div className="collab-type">{c.type}</div>
              <a
                href={c.link}
                className="collab-link"
                target={c.link.startsWith("http") ? "_blank" : undefined}
                rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Více →
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
