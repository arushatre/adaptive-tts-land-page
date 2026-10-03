import Link from "next/link";
import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/site";
import { Container } from "./Container";
import { MetaLabel } from "./MetaLabel";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col gap-4 md:col-span-6">
          <Wordmark />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="w-fit text-muted transition-colors hover:text-ink"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <MetaLabel className="mb-4 block">Site</MetaLabel>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 md:col-span-3 md:items-end md:justify-end">
          <MetaLabel>© 2026 Adaptive TTS</MetaLabel>
          <a href="#" className="meta text-muted hover:text-ink">
            Privacy
          </a>
        </div>
      </Container>
    </footer>
  );
}
