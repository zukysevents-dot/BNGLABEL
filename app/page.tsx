import { About } from "@/components/About";
import { Concerts } from "@/components/Concerts";
import { Contact } from "@/components/Contact";
import { Distribution } from "@/components/Distribution";
import { Featured } from "@/components/Featured";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JointStatement } from "@/components/JointStatement";
import { Nav } from "@/components/Nav";
import { Releases } from "@/components/Releases";
import { Roster } from "@/components/Roster";
import { getDict } from "@/lib/dictionaries";
import { getLocale } from "@/lib/getLocale";

// ISR: stránka se přegeneruje max. jednou za hodinu → nové releasy ze Spotify
// naběhnou automaticky bez nového deploye.
export const revalidate = 3600;

export default async function Home() {
  const locale = await getLocale();
  const t = getDict(locale);

  return (
    <>
      <Nav locale={locale} nav={t.nav} />
      <main>
        <Hero />
        <JointStatement />
        <About />
        <Roster />
        <Releases />
        <Concerts />
        <Featured />
        <Contact />
        {/* Sekce „Spolupráce" (Collabs) je zatím skrytá — vrátíme ji, až bude víc spoluprací. */}
      </main>
      <Distribution />
      <Footer />
    </>
  );
}
