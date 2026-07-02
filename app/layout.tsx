import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { PlayerBar } from "@/components/PlayerBar";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getLocale } from "@/lib/getLocale";

const spaceGrotesk = Space_Grotesk({
  variable: "--f-display-font",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Hurme Geometric Sans 3 — písmo pro běžný text (nadpisy zůstávají na Space
// Grotesk). Všechny dodané řezy → prohlížeč si sám vybere správnou váhu i kurzívu
// (font-weight / font-style: italic). Chybějící řezy (Light/Bold normal) se
// dopočítají z nejbližší dostupné váhy.
const hurme = localFont({
  src: [
    { path: "./fonts/HurmeGeometricSans3.otf", weight: "400", style: "normal" },
    { path: "./fonts/HurmeGeometricSans3-Oblique.otf", weight: "400", style: "italic" },
    { path: "./fonts/HurmeGeometricSans3-LightOblique.otf", weight: "300", style: "italic" },
    { path: "./fonts/HurmeGeometricSans3-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/HurmeGeometricSans3-SemiBoldOblique.otf", weight: "600", style: "italic" },
    { path: "./fonts/HurmeGeometricSans3-BoldOblique.otf", weight: "700", style: "italic" },
    { path: "./fonts/HurmeGeometricSans3-Black.otf", weight: "900", style: "normal" },
    { path: "./fonts/HurmeGeometricSans3-BlackOblique.otf", weight: "900", style: "italic" },
  ],
  variable: "--f-body-font",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonghemia.cz"),
  title: {
    default: "Bonghemia Label — Independent music label, Brno",
    template: "%s — Bonghemia Label",
  },
  description:
    "Bonghemia Label je brněnský independent label. Vydáváme umělce, kteří mají co říct — bez formátů, bez prostředníků.",
  keywords: [
    "Bonghemia",
    "music label",
    "hudební label",
    "Brno",
    "rap",
    "hip-hop",
    "independent",
  ],
  openGraph: {
    title: "Bonghemia Label",
    description: "Brněnský independent label. Hudba bez limitů.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${hurme.variable}`}
    >
      <body>
        {/* předpřipojení ke Spotify pro rychlejší načtení přehrávače */}
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://i.scdn.co" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <Preloader />
        <ScrollProgress />
        {children}
        <PlayerBar />
      </body>
    </html>
  );
}
