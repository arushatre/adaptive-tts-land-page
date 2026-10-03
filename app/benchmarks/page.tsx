import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Leaderboard } from "@/components/Leaderboard";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Benchmarks" };

export default function BenchmarksPage() {
  return (
    <>
      <PageIntro label="Benchmarks · Evaluation" title="How we measure adaptive inference.">
        Adaptive inference compared with existing step-reduction methods on
        the same base model, trading steps and wall-clock latency against
        quality (MOS, WER). Profiling notes and per-utterance breakdowns will
        be published here.
      </PageIntro>
      <section aria-labelledby="leaderboard-title" className="pb-24 lg:pb-36">
        <Container>
          <h2 id="leaderboard-title" className="meta mb-6 text-muted">
            Leaderboard · Sep 2026
          </h2>
          <Leaderboard captionId="leaderboard-title" showMethodLink={false} />
        </Container>
      </section>
    </>
  );
}
