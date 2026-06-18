# Placeholder obrázky

Sem patří reálné assety klienta. Dokud tu nic není, web vykresluje grafický
fallback (gradient + popisek) — nic se nerozbije.

## Co sem doplnit a kde to nastavit

| Obrázek | Doporučený rozměr | Kde nastavit cestu |
|---|---|---|
| Fotky umělců | 1000×1000 px (čtverec) | `data/artists.ts` → `artists[].image` |
| Obaly releasů | 1000×1000 px (čtverec) | `data/artists.ts` → `releases[].cover` |
| Obal aktuálního singlu | 1000×1000 px | `data/artists.ts` → `featuredSingle.cover` |

Příklad: nahraj `yambro.jpg` sem do `public/placeholders/` a v `data/artists.ts`
nastav `image: "/placeholders/yambro.jpg"`.

Pozn.: Při napojení Spotify API (viz `.env.example`) se obaly a fotky tahají
automaticky z Spotify CDN — tyto soubory pak slouží jen jako fallback.
