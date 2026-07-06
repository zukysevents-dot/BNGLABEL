/**
 * Překlady UI (CZ/EN). Jeden zdroj pravdy pro všechny texty webu.
 * Anglické texty jsou překlad k doladění klientem — stačí upravit zde.
 *
 * Jazyk se drží v cookie `locale` (viz `lib/getLocale.ts`). Bez cookie = CZ.
 */

export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";
export const LOCALE_COOKIE = "locale";

const cs = {
  nav: { label: "Label", artists: "Umělci", releases: "Releases", contact: "Kontakt" },
  hero: { tag: "Independent Music Label", scroll: "Scroll down" },
  about: {
    num: "01 — Label",
    titleTop: "Hudba bez",
    titleAccent: "limitů.",
    body1:
      "Bonghemia Label je brněnský independent label. Vydáváme umělce, kteří mají co říct — bez formátů, bez prostředníků.",
    body2: "Nevydáváme jen hudbu — spojujeme scénu kolem ní.",
  },
  roster: { num: "02 — Roster", title: "Umělci" },
  releases: {
    num: "04 — Katalog",
    titleTop: "Poslední",
    titleAccent: "releases",
    full: "Celý katalog →",
  },
  concerts: {
    num: "05 — Live",
    titleTop: "Nejbližší",
    titleAccent: "koncerty",
    tickets: "Lístky →",
    soldOut: "Vyprodáno",
  },
  featured: {
    badge: "Aktuální single",
    desc: "Nejnovější singl z Bonghemia Label — poslechni si ho na svojí platformě.",
  },
  contact: {
    num: "06 — Kontakt",
    titleTop: "Pojďme",
    titleAccent: "spolupracovat.",
    text: "Tvoříš hudbu nebo chceš začít? Napiš nám. Podporujeme umělce z komunity a posouváme je dál.",
  },
  distribution: "Distribuci zajišťuje",
  artist: {
    back: "Zpět na roster",
    topTracks: "Top tracky",
    listen: "Poslech",
    openSpotifyArrow: "Otevřít na Spotify →",
  },
};

export type Dict = typeof cs;

const en: Dict = {
  nav: { label: "Label", artists: "Artists", releases: "Releases", contact: "Contact" },
  hero: { tag: "Independent Music Label", scroll: "Scroll down" },
  about: {
    num: "01 — Label",
    titleTop: "Music with",
    titleAccent: "no limits.",
    body1:
      "Bonghemia Label is an independent label from Brno. We release artists who have something to say — no formats, no middlemen.",
    body2: "We don't just release music — we connect the scene around it.",
  },
  roster: { num: "02 — Roster", title: "Artists" },
  releases: {
    num: "04 — Catalog",
    titleTop: "Latest",
    titleAccent: "releases",
    full: "Full catalog →",
  },
  concerts: {
    num: "05 — Live",
    titleTop: "Upcoming",
    titleAccent: "shows",
    tickets: "Tickets →",
    soldOut: "Sold out",
  },
  featured: {
    badge: "Latest single",
    desc: "The newest single from Bonghemia Label — listen on your platform.",
  },
  contact: {
    num: "06 — Contact",
    titleTop: "Let's",
    titleAccent: "work together.",
    text: "Do you make music or want to start? Write to us. We support artists from the community and push them forward.",
  },
  distribution: "Distributed by",
  artist: {
    back: "Back to roster",
    topTracks: "Top Tracks",
    listen: "Listen",
    openSpotifyArrow: "Open on Spotify →",
  },
};

export const dictionaries: Record<Locale, Dict> = { cs, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
