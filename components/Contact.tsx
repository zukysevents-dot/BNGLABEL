import { Reveal } from "@/components/Reveal";
import { contact } from "@/data/artists";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <Reveal className="max contact-inner">
        <div className="contact-pre">06 — Kontakt</div>
        <h2 className="contact-h">
          Pojďme
          <br />
          <span className="dim">spolupracovat.</span>
        </h2>
        <p className="contact-txt">
          Máš muziku, máš příběh? Piš nám. Hledáme umělce, kteří přesně vědí, co
          chtějí říct.
        </p>
        <a href={`mailto:${contact.email}`} className="contact-mail">
          {contact.email}
        </a>
      </Reveal>
    </section>
  );
}
