import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

/**
 * Pruh nad patičkou — oficiální distribuci zajišťuje Warner Music CZ & SK.
 * Logo (wordmark s textem) je bílé na černém pozadí → přes `mix-blend-mode:
 * screen` černá splyne s tmavým webem a zůstane jen bílé logo + text.
 */
export async function Distribution() {
  const t = getDict(await getLocale());

  return (
    <section className="distribution" aria-label="Distribuce">
      <span className="distribution-label">{t.distribution}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="distribution-logo"
        src="/warner-music.jpg"
        alt="Warner Music Czech Republic & Slovakia"
      />
    </section>
  );
}
