import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { PlayerBar } from "@/components/PlayerBar";
import { ScrollProgress } from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--f-display-font",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--f-body-font",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonghemia.cz"),
  title: {
    default: "Bonghemia Label — Independent music label, Brno",
    template: "%s — Bonghemia Label",
  },
  description:
    "Bonghemia Label je brněnský independent label. Vydáváme hudbu umělců, kteří mají co říct — bez formátových omezení, bez zbytečných prostředníků.",
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
    description: "Brněnský independent label. Hudba bez kompromisů.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <ScrollProgress />
        {children}
        <PlayerBar />
      </body>
    </html>
  );
}
