import { About } from "@/components/About";
import { Collabs } from "@/components/Collabs";
import { Concerts } from "@/components/Concerts";
import { Contact } from "@/components/Contact";
import { Featured } from "@/components/Featured";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JointStatement } from "@/components/JointStatement";
import { Nav } from "@/components/Nav";
import { Releases } from "@/components/Releases";
import { Roster } from "@/components/Roster";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <JointStatement />
        <About />
        <Roster />
        <Releases />
        <Concerts />
        <Featured />
        <Contact />
        <Collabs />
      </main>
      <Footer />
    </>
  );
}
