import { ROLES } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/site";
import { Arrow, PrimaryLink } from "../ArrowLink";
import { Container } from "../Container";
import { Kicker } from "../Kicker";
import { MetaLabel } from "../MetaLabel";
import { Reveal } from "../Reveal";
import { Section } from "../Section";

export function GetInvolved({ index }: { index?: number }) {
  return (
    <Section aria-labelledby="involved-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <Kicker index={index}>Join the lab</Kicker>
          <h2
            id="involved-title"
            className="mt-6 max-w-[26ch] text-lede font-medium text-balance"
          >
            Adaptive TTS is heading toward an open-source inference engine and a
            paper submission, and we&rsquo;re looking for collaborators and
            early testers along the way.
          </h2>
          <PrimaryLink href={`mailto:${CONTACT_EMAIL}`} className="mt-10">
            Write to the lab
          </PrimaryLink>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <MetaLabel className="mb-4 block">Open roles · {ROLES.length}</MetaLabel>
          <ul className="border-t border-ink">
            {ROLES.map((role) => (
              <li key={role.title} className="border-b border-rule">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(role.title)}`}
                  className="row-glide group flex items-start justify-between gap-6 py-5"
                >
                  <span className="flex flex-col gap-1.5 transition-transform duration-500 ease-out-soft group-hover:translate-x-3">
                    <span className="text-[1.0625rem] tracking-[-0.01em]">{role.title}</span>
                    <span className="meta text-[0.6875rem] text-muted">
                      {role.meta} · {role.place}
                    </span>
                  </span>
                  <Arrow className="mt-1 pr-3 text-muted group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
