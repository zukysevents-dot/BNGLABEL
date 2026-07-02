import { HeroSymbol } from "@/components/HeroSymbol";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/data/artists";

export function Hero() {
  return (
    <section className="hero">
      <HeroSymbol />

      <div className="hero-top">
        <span className="hero-top-tag">
          {contact.city} — Est. {contact.established}
        </span>
        <span className="hero-top-tag">Independent Music Label</span>
      </div>

      <div className="hero-bottom">
        <h1 className="hero-title">
          <span className="hl">
            <span>Bonghemia</span>
          </span>
          <span className="hl line2">
            <span>Label</span>
          </span>
        </h1>
        <Reveal className="hero-meta" delay={2}>
          <a href="#about" className="hero-scroll">
            Scroll down <span className="hero-scroll-line" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
