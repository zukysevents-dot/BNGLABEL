import Link from "next/link";

import { contact } from "@/data/artists";

const SOCIALS = [
  { href: contact.instagramUrl, label: "Instagram" },
  { href: contact.spotifyUrl, label: "Spotify" },
  { href: contact.youtubeUrl, label: "YouTube" },
];

export function Footer() {
  return (
    <footer>
      <Link href="/" className="ft-logo">
        Bonghemia
      </Link>
      <div className="ft-copy">
        © 2025 Bonghemia Label · Brno ·{" "}
        <span style={{ color: "rgba(255,255,255,.35)" }}>
          {contact.affiliation}
        </span>
      </div>
      <div className="ft-soc">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
