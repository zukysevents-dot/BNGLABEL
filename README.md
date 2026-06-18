# Bonghemia Label — web

Web brněnského independent labelu **Bonghemia Label**. Next.js (App Router) +
TypeScript + Tailwind CSS. Tmavá, prémiová vizuální identita, připravená na
napojení Spotify API.

## Spuštění lokálně

```bash
npm install
npm run dev      # http://localhost:3000
```

Další skripty:

```bash
npm run build    # produkční build
npm run start    # spuštění produkčního buildu
npm run lint     # ESLint
```

## Struktura

```
app/
  page.tsx                  # landing (skládá všechny sekce)
  artists/[slug]/page.tsx   # detail umělce
  api/spotify/route.ts      # server route → Spotify nebo mock fallback
components/                 # UI sekce a prvky
data/artists.ts             # mock data + typy (umělci, releasy, koncerty, partneři)
lib/spotify.ts              # server-only Spotify klient (+ fallback na mock)
lib/useInView.ts            # scroll-reveal hook
public/placeholders/        # sem reálné fotky/obaly (viz README uvnitř)
```

## Spotify (volitelné)

Web jede i bez Spotify — používá mock data z `data/artists.ts`. Pro napojení
reálných releasů:

1. Vytvoř appku na <https://developer.spotify.com/dashboard>.
2. Zkopíruj `.env.example` na `.env.local` a vyplň `SPOTIFY_CLIENT_ID` a
   `SPOTIFY_CLIENT_SECRET`.
3. V `data/artists.ts` vyplň reálná `spotifyArtistId` u jednotlivých umělců.

Credentials se čtou **jen na serveru** (`lib/spotify.ts`, `server-only`) a nikdy
se neposílají do prohlížeče.

Endpoint: `GET /api/spotify` (celý label) nebo `GET /api/spotify?artist=<slug>`.
Odpověď obsahuje `source: "mock" | "spotify"`.

## Stav obsahu (co je ověřené / co dodá klient)

**Ověřeno z veřejných zdrojů (snapshot 18. 6. 2026):**
- **Umělci** — jména, bia, žánry, **reálná Spotify Artist ID** + diskografie a obaly
  (Spotify CDN).
- **Statistiky labelu** (`labelStats`) — z veřejných Spotify profilů:
  `1M+` streamů (konzervativní spodní odhad: součet přehrání top skladeb > 1 mil.),
  `5` umělců, `18K+` měsíčních posluchačů (součet ~18 574). **Čísla se v čase mění** —
  občas přepočítat.
- **Instagramy** — Yambro [`@vaneskayambro`], DOC BNG [`@docskibng`],
  Stiff Jangle [`@stiffjangle`] (ověřené). Label → [`@bonghemia`].
- **Affiliation** — opraveno na „Independent Label" (vazba na Warner Music Group
  se **nepotvrdila**; předloha ji uváděla mylně).

**K dodání / potvrzení klientem:**
- **Instagram pro Nell O'Donnell a mladeyvlk** — nepodařilo se spolehlivě dohledat
  (`instagramUrl: null`). Doplnit v `data/artists.ts`.
- **Footer Spotify/YouTube** — zatím vyhledávací odkazy; nahradit přesnou URL
  profilu/kanálu labelu (`contact.spotifyUrl`, `contact.youtubeUrl`).
- **Rok založení „Est. 2020"** (`contact.established`) — neověřeno, potvrdit.
- **Aktuální single** (`featuredSingle`) — placeholder „Název / Singlu".
- **Koncerty** (`concerts`) — část placeholder (Název místa, Umělec Jeden…).
- **Projekty / kolaborace** (`collabs`) — placeholder názvy (Projekt Alfa…).
- **Fotky umělců** — zatím iniciály; pro reálné nastav `image` u umělce.
- **Logo** — `components/Monogram.tsx` (heraldický znak); vyměnit za finální asset.
