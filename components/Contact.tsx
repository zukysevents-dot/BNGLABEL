import { Reveal } from "@/components/Reveal";
import { contact } from "@/data/artists";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

export async function Contact() {
  const t = getDict(await getLocale()).contact;

  return (
    <section id="contact" className="contact">
      <Reveal className="max contact-inner">
        <div className="contact-pre">{t.num}</div>
        <h2 className="contact-h">
          {t.titleTop}
          <br />
          <span className="dim">{t.titleAccent}</span>
        </h2>
        <p className="contact-txt">{t.text}</p>
        <a href={`mailto:${contact.email}`} className="contact-mail">
          {contact.email}
        </a>
      </Reveal>
    </section>
  );
}
