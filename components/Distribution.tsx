import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

/**
 * Pruh nad patičkou — oficiální distribuci zajišťuje Warner Music CZ & SK.
 * Logo je čisté průhledné PNG (bílý wordmark, bez JPEG artefaktů) — sedí na
 * jakémkoli pozadí bez blend-mode triků.
 */
export async function Distribution() {
  const t = getDict(await getLocale());

  return (
    <section className="distribution" aria-label="Distribuce">
      <span className="distribution-label">{t.distribution}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="distribution-logo"
        src="/warner-music.png"
        alt="Warner Music Czech Republic & Slovakia"
        width={440}
        height={189}
        loading="lazy"
      />
    </section>
  );
}
