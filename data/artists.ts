/**
 * Datová vrstva Bonghemia Label.
 *
 * Obsah (umělci, bia, diskografie, Spotify ID, obaly) odpovídá referenční
 * předloze a je připravený na napojení Spotify API (viz `lib/spotify.ts`).
 * Dokud nejsou nastavené credentials, web jede na těchto datech.
 *
 * Co klient typicky mění:
 *   - obaly/fotky (teď reálné Spotify CDN URL u releasů; fotky umělců = iniciály),
 *   - obsah sekce „Aktuální single" (`featuredSingle` — zatím placeholder),
 *   - koncerty a kolaborace.
 */

export type ReleaseType = "Album" | "Single" | "EP";

/** Položka diskografie (jak je uložená u umělce). */
export interface DiscographyItem {
  type: ReleaseType;
  title: string;
  year: string;
  cover: string | null;
  /** Fallback barva pozadí obalu. */
  bg?: string;
}

/** Release pro UI (karty) — s navázaným umělcem a odkazem. */
export interface Release extends DiscographyItem {
  artistName: string;
  artistSlug: string;
  /** Spotify Artist ID — pro vložený přehrávač (embed). */
  artistSpotifyId: string;
  spotifyUrl: string;
  /** Plné datum vydání (ISO) — pro spolehlivé řazení podle data. */
  releaseDate: string;
}

export interface Artist {
  id: number;
  slug: string;
  initials: string;
  name: string;
  /** Zobrazovaný řetězec žánrů, např. "Rap / Jazz / Soul / R&B". */
  genre: string;
  /** Spotify Artist ID (reálné — funguje s /api/spotify). */
  spotifyArtistId: string;
  spotifyUrl: string;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  /** Fotka umělce (v `public/`) nebo URL. `null` → iniciály jako fallback. */
  image: string | null;
  bio: string;
  discography: DiscographyItem[];
}

export interface Concert {
  date: string;
  day: string;
  name: string;
  venue: string;
  city: string;
  artists: string;
  /** Odkaz na vstupenky; `#` nebo soldOut → bez prokliku. */
  ticket: string;
  soldOut: boolean;
}

export interface Collab {
  initials: string;
  name: string;
  type: string;
  link: string;
}

/**
 * Statistiky labelu — ověřené z veřejných Spotify profilů (snapshot 18. 6. 2026).
 * `streams` = konzervativní spodní odhad: jen součet přehrání viditelných top
 * skladeb všech 5 umělců přesahuje 1 mil. (samotná Yambro ~895 tis.).
 * `listeners` = součet měsíčních posluchačů (~18 574). Čísla se v čase mění.
 */
export const labelStats = {
  streams: "1M+",
  artists: "5",
  listeners: "18K+",
};

export const artists: Artist[] = [
  {
    id: 1,
    slug: "yambro",
    initials: "YA",
    name: "Yambro",
    genre: "Rap / Jazz / Soul / R&B",
    spotifyArtistId: "5ZqdxN3WMMM2nvUg7lyfJg",
    spotifyUrl: "https://open.spotify.com/artist/5ZqdxN3WMMM2nvUg7lyfJg",
    instagramUrl: "https://instagram.com/vaneskayambro",
    youtubeUrl: null,
    image: null,
    bio: "Yambro je slovenská zpěvačka a raperka pocházející z Ružomberoku, usazená v Brně. Pod Bonghemia Label od roku 2024. Její hudba kombinuje nezaměnitelný hlas se sebevědomým projevem napříč rapem, jazzem, soulem a R&B. Debutové album Slow Low vydala v roce 2022, širší pozornost získala v soutěži The Mag Wrap v týmu Rytmuse.",
    discography: [
      { type: "Album", title: "Aj tak sa na ten FAKIN LAJF usmievam", year: "2026", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b273c27eeefb1bdec12d34af46ab" },
      { type: "Single", title: "Šepkám", year: "2025", bg: "#12100f", cover: "https://i.scdn.co/image/ab67616d0000b273f968f741eb0ec0efd9f76802" },
      { type: "EP", title: "CHATA", year: "2025", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b273e4a4f73a301959613ac31653" },
      { type: "Single", title: "Život je Art", year: "2024", bg: "#141210", cover: "https://i.scdn.co/image/ab67616d0000b2737894d5782489a58de2ed844b" },
      { type: "Single", title: "NECHAJ MA ÍSŤ", year: "2023", bg: "#120f14", cover: "https://i.scdn.co/image/ab67616d0000b273c27eeefb1bdec12d34af46ab" },
      { type: "Single", title: "Čo chcem mať", year: "2023", bg: "#0f1014", cover: "https://i.scdn.co/image/ab67616d0000b273c27eeefb1bdec12d34af46ab" },
      { type: "Album", title: "SLOW LOW", year: "2022", bg: "#14100a", cover: "https://i.scdn.co/image/ab67616d0000b273d858efcbc2842076542bb1c9" },
      { type: "Single", title: "Sami Sebou", year: "2022", bg: "#0a1014", cover: "https://i.scdn.co/image/ab67616d0000b273d858efcbc2842076542bb1c9" },
    ],
  },
  {
    id: 2,
    slug: "doc-bng",
    initials: "DB",
    name: "DOC BNG",
    genre: "Rap / Lyrický hip-hop",
    spotifyArtistId: "14KzTbCRtiDfrN5dcAHunx",
    spotifyUrl: "https://open.spotify.com/artist/14KzTbCRtiDfrN5dcAHunx",
    instagramUrl: "https://instagram.com/docskibng",
    youtubeUrl: null,
    image: null,
    bio: "DOC BNG je slovenský rapper a člen Bonghemia Label. Výherce freestyle battle v Praze v roce 2022, díky čemuž se stal oficiálním členem labelu. Tvoří převážně lyrické texty, kde posluchači předává zážitky a emoce prostřednictvím silného flow.",
    discography: [
      { type: "Single", title: "DOCSKIHO DIÁR", year: "2026", bg: "#14100f", cover: "https://i.scdn.co/image/ab67616d0000b273969d55d9a60d47f1c019ab32" },
      { type: "Single", title: "Exit", year: "2026", bg: "#111215", cover: "https://i.scdn.co/image/ab67616d0000b27315b525600797d4f3c879022e" },
      { type: "EP", title: "NA RAPE ZÁLEŽÍ", year: "2025", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b273442e45032a06b4b53e9b08fb" },
      { type: "EP", title: "CHATA", year: "2025", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b273e4a4f73a301959613ac31653" },
      { type: "EP", title: "NIGHT RIDER EP", year: "2023", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b2734837ee88f33ed9b804925cac" },
    ],
  },
  {
    id: 3,
    slug: "nell-odonnell",
    initials: "NO",
    name: "Nell O'Donnell",
    genre: "Rap / Hip-hop",
    spotifyArtistId: "6tshCRxTdroRa4OXrfCujW",
    spotifyUrl: "https://open.spotify.com/artist/6tshCRxTdroRa4OXrfCujW",
    instagramUrl: null,
    youtubeUrl: null,
    image: null,
    bio: "Nell O'Donnell je brněnský rapper s vlastní sound identitou. Mezi jeho nejposlouchanější tracky patří Poppin, Haf Haf a Brno Southside. Aktivně vydává od roku 2023 a buduje si silnou lokální základnu.",
    discography: [
      { type: "EP", title: "CHATA", year: "2025", bg: "#101418", cover: "https://i.scdn.co/image/ab67616d0000b273e4a4f73a301959613ac31653" },
      { type: "Single", title: "BBUHOT", year: "2025", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b273df8085fdbeca41b1e106a226" },
      { type: "Single", title: "Haf Haf", year: "2025", bg: "#12100f", cover: "https://i.scdn.co/image/ab67616d0000b273fd486b7620307aad16a2705c" },
      { type: "Single", title: "Zvedaj mi tlak", year: "2023", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b2736435ac3614586af0cf7c99a0" },
    ],
  },
  {
    id: 4,
    slug: "stiff-jangle",
    initials: "SJ",
    name: "Stiff Jangle",
    genre: "Drum & Bass / MC / Underground",
    spotifyArtistId: "2Y9DcJmnY2NAHl6HbolRCJ",
    spotifyUrl: "https://open.spotify.com/artist/2Y9DcJmnY2NAHl6HbolRCJ",
    instagramUrl: "https://instagram.com/stiffjangle/",
    youtubeUrl: null,
    image: null,
    bio: "Stiff Jangle je undergroundový umělec s experimentálním přístupem k hudbě. Drum & Bass MC kombinující různé žánry a abstraktní texty, které nechávají prostor pro interpretaci. Oslovuje posluchače hledající něco originálního a neotřelého.",
    discography: [
      { type: "Single", title: "NO RISK NO FERRARI", year: "2026", bg: "#12100f", cover: "https://i.scdn.co/image/ab67616d0000b273bdd4f79a11fb723bac2058e7" },
      { type: "Single", title: "Žijeme Dropem", year: "2026", bg: "#141014", cover: "https://i.scdn.co/image/ab67616d0000b2736ec59da0afb4cb612af9550e" },
      { type: "Album", title: "Na vlastní nebezpečí", year: "2024", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b273b93a7830dc81c7f203778f1e" },
      { type: "EP", title: "Furious Jangle EP", year: "2023", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b2739eb783de73fccfb1cbb6908f" },
    ],
  },
  {
    id: 5,
    slug: "mladeyvlk",
    initials: "MV",
    name: "mladeyvlk",
    genre: "Rap / Hip-hop",
    spotifyArtistId: "2w2XRFHOJLgsKFD62kGN5G",
    spotifyUrl: "https://open.spotify.com/artist/2w2XRFHOJLgsKFD62kGN5G",
    instagramUrl: null,
    youtubeUrl: null,
    image: null,
    bio: "mladeyvlk je mladý rapper s vlastním hlasem a energií. Aktivně vydává od roku 2022, mezi jeho nejposlouchanější patří Vtedy, keď sníváš. Pravidelně spolupracuje s ostatními členy Bonghemia Label.",
    discography: [
      { type: "Single", title: "Malaga", year: "2025", bg: "#101410", cover: "https://i.scdn.co/image/ab67616d0000b273b5d7cef1a60eebb83a48e91b" },
      { type: "Single", title: "NABÍHÁM", year: "2025", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b273312902213b2fa2144a68de7e" },
      { type: "EP", title: "CHATA", year: "2025", bg: "#12100f", cover: "https://i.scdn.co/image/ab67616d0000b273e4a4f73a301959613ac31653" },
      { type: "EP", title: "23 Savage", year: "2024", bg: "#0f1410", cover: "https://i.scdn.co/image/ab67616d0000b2734f299d17a9c13296d63cfd7a" },
    ],
  },
];

/** Kurátorovaný výběr pro sekci „Poslední releases" na úvodní stránce. */
export const latestReleases: Release[] = [
  { type: "Album", title: "Aj tak sa na ten FAKIN LAJF", year: "2026", releaseDate: "2026-02-20", bg: "#141414", cover: "https://i.scdn.co/image/ab67616d0000b273c27eeefb1bdec12d34af46ab", artistName: "Yambro", artistSlug: "yambro", artistSpotifyId: "5ZqdxN3WMMM2nvUg7lyfJg", spotifyUrl: "https://open.spotify.com/artist/5ZqdxN3WMMM2nvUg7lyfJg" },
  { type: "Single", title: "DOCSKIHO DIÁR", year: "2026", releaseDate: "2026-01-15", bg: "#14100f", cover: "https://i.scdn.co/image/ab67616d0000b273969d55d9a60d47f1c019ab32", artistName: "DOC BNG", artistSlug: "doc-bng", artistSpotifyId: "14KzTbCRtiDfrN5dcAHunx", spotifyUrl: "https://open.spotify.com/artist/14KzTbCRtiDfrN5dcAHunx" },
  { type: "Single", title: "Žijeme Dropem", year: "2026", releaseDate: "2026-03-06", bg: "#141014", cover: "https://i.scdn.co/image/ab67616d0000b273bdd4f79a11fb723bac2058e7", artistName: "Stiff Jangle", artistSlug: "stiff-jangle", artistSpotifyId: "2Y9DcJmnY2NAHl6HbolRCJ", spotifyUrl: "https://open.spotify.com/artist/2Y9DcJmnY2NAHl6HbolRCJ" },
  { type: "Single", title: "Malaga", year: "2025", releaseDate: "2025-07-11", bg: "#101410", cover: "https://i.scdn.co/image/ab67616d0000b273b5d7cef1a60eebb83a48e91b", artistName: "mladeyvlk", artistSlug: "mladeyvlk", artistSpotifyId: "2w2XRFHOJLgsKFD62kGN5G", spotifyUrl: "https://open.spotify.com/artist/2w2XRFHOJLgsKFD62kGN5G" },
];

/** Aktuální single (sekce Featured). Placeholder dle předlohy — k vyplnění. */
export const featuredSingle = {
  titleLines: ["Název", "Singlu"],
  sub: "Umělec · 2025",
  cover: null as string | null,
  description: "Krátký popis singlu — co ho inspirovalo, jaký nese příběh.",
  spotifyUrl: "#",
  appleMusicUrl: "#",
  youtubeUrl: "#",
};

export const concerts: Concert[] = [
  { date: "14. 8.", day: "Čt", name: "Festival TLAK 2026", venue: "Beach Club Zátoka", city: "Žermanická přehrada", artists: "58G, Rest, Maniak + další", ticket: "https://goout.net", soldOut: false },
  { date: "22. 8.", day: "So", name: "Open Air Brno", venue: "Název místa", city: "Brno", artists: "Umělec Jeden, Umělec Dva", ticket: "#", soldOut: false },
  { date: "6. 9.", day: "So", name: "Název Akce", venue: "Klub / Venue", city: "Praha", artists: "Umělec Tři", ticket: "#", soldOut: true },
  { date: "18. 10.", day: "Ne", name: "Podzimní Show", venue: "Název klubu", city: "Brno", artists: "Label Night", ticket: "#", soldOut: false },
];

export const collabs: Collab[] = [
  { initials: "PR", name: "Projekt Alfa", type: "Film / Vizuál", link: "#" },
  { initials: "BE", name: "Beta Event", type: "Festival / Event", link: "#" },
  { initials: "GS", name: "Gamma Studio", type: "Recording Studio", link: "#" },
  { initials: "DT", name: "Delta Tým", type: "Kreativní agentura", link: "#" },
  { initials: "EK", name: "Epsilon Kolektiv", type: "Vizuální umění", link: "#" },
  { initials: "ZS", name: "Zeta Sound", type: "Mixing / Mastering", link: "#" },
  { initials: "HB", name: "Eta Brand", type: "Branding / Design", link: "#" },
  { initials: "TH", name: "Theta Hostel", type: "Venue / Prostor", link: "#" },
];

export const contact = {
  email: "label@bonghemia.cz",
  city: "Brno, CZ",
  established: "2020",
  instagramUrl: "https://www.instagram.com/bonghemia/",
  spotifyUrl: "https://open.spotify.com/search/Bonghemia%20Label",
  youtubeUrl: "https://www.youtube.com/results?search_query=BNG+Label",
  /**
   * Independent label (ověřeno — žádná vazba na Warner Music Group nebyla
   * potvrzena; předloha to uváděla mylně). Pokud reálná vazba existuje, doplní klient.
   */
  affiliation: "Independent Label",
};

/* ── Pomocné funkce ── */

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

/** Diskografie umělce převedená na Release[] (s odkazem a jménem). */
export function releasesByArtist(slug: string): Release[] {
  const artist = getArtist(slug);
  if (!artist) return [];
  return artist.discography.map((d) => ({
    ...d,
    artistName: artist.name,
    artistSlug: artist.slug,
    artistSpotifyId: artist.spotifyArtistId,
    spotifyUrl: artist.spotifyUrl,
    // mock nemá plné datum → odhad z roku (reálná data ze Spotify mají přesné)
    releaseDate: `${d.year}-01-01`,
  }));
}
