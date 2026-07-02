import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

export async function About() {
  const t = getDict(await getLocale()).about;

  return (
    <section id="about" className="about s">
      <div className="max about-grid">
        <Reveal className="about-symbol" delay={1}>
          <Monogram decorative />
        </Reveal>

        <Reveal delay={2}>
          <div className="s-num">{t.num}</div>
          <h2 className="s-title">
            {t.titleTop}
            <br />
            <span className="dim">{t.titleAccent}</span>
          </h2>
          <p className="about-body">{t.body1}</p>
          <p className="about-body">{t.body2}</p>
        </Reveal>
      </div>
    </section>
  );
}
