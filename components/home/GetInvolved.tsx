import { ArrowLink } from "../ArrowLink";
import { Container } from "../Container";
import { MetaLabel } from "../MetaLabel";

export function GetInvolved() {
  return (
    <section aria-labelledby="involved-title" className="pb-24 lg:pb-36">
      <Container>
        <div>
          <MetaLabel>Get involved</MetaLabel>
          <h2
            id="involved-title"
            className="mt-6 max-w-[30ch] text-lede font-normal text-balance"
          >
            Adaptive TTS is heading toward an open-source inference engine and a
            paper submission, and we&rsquo;re looking for collaborators and
            early testers along the way.
          </h2>
          <ArrowLink href="#" className="mt-10">
            Request early access
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
