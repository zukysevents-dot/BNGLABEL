import { CountUp } from "@/components/CountUp";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { labelStats } from "@/data/artists";

export function About() {
  return (
    <section id="about" className="about s">
      <div className="max about-grid">
        <Reveal className="about-symbol" delay={1}>
          <Monogram decorative />
        </Reveal>

        <Reveal delay={2}>
          <div className="s-num">01 — Label</div>
          <h2 className="s-title">
            Hudba bez
            <br />
            <span className="dim">kompromisů.</span>
          </h2>
          <p className="about-body">
            Bonghemia Label je brněnský independent label. Vydáváme hudbu
            umělců, kteří mají co říct — bez formátových omezení, bez zbytečných
            prostředníků.
          </p>
          <p className="about-body">
            Každý release je záměr. Každý umělec je partner.
          </p>
          <div className="about-stats">
            <div className="stat">
              <div className="stat-n">
                <CountUp value={labelStats.streams} />
              </div>
              <div className="stat-l">Streamů</div>
            </div>
            <div className="stat">
              <div className="stat-n">
                <CountUp value={labelStats.artists} />
              </div>
              <div className="stat-l">Umělců</div>
            </div>
            <div className="stat">
              <div className="stat-n">
                <CountUp value={labelStats.listeners} />
              </div>
              <div className="stat-l">Měs. posluchačů</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
