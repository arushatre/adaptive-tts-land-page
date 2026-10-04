import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Findings } from "@/components/Findings";
import { AdaptiveDemo } from "@/components/home/AdaptiveDemo";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Hero } from "@/components/home/Hero";
import { MetricsStrip } from "@/components/home/MetricsStrip";
import { Leaderboard } from "@/components/Leaderboard";
import { Pipeline } from "@/components/Pipeline";
import { ResearchIndex } from "@/components/ResearchIndex";
import { SectionHeader } from "@/components/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <AdaptiveDemo />

      <section aria-labelledby="benchmarks-title" className="section-y">
        <Container>
          <SectionHeader
            id="benchmarks-title"
            label="Benchmark · Sep 2026"
            title="Fewer steps, measured against the alternatives."
            aside="Same base model, same test set. Each method cuts refinement steps differently; quality is checked against the full-step model. Open any row for its breakdown."
          />
          <div className="mt-12 lg:mt-16">
            <Leaderboard captionId="benchmarks-title" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="analysis-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="analysis-title"
            label="Analysis · 5 findings"
            title="What the numbers don’t show on their own."
            aside="Where the predictor spends steps, what listeners actually hear, what happens under batching, and where adaptive inference still loses."
          />
          <div className="mt-12 lg:mt-16">
            <Findings />
          </div>
          <div className="mt-8 flex justify-end">
            <ArrowLink href="/benchmarks#analysis">All findings and method notes</ArrowLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="fieldnote-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="fieldnote-title"
            label="Field note · System"
            title="Two new stages, one modified loop."
            aside="Everything outside the refinement loop is the unmodified base model. Hover a stage to see what it does."
          />
          <div className="mt-12 lg:mt-16">
            <Pipeline />
          </div>
        </Container>
      </section>

      <section aria-labelledby="research-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="research-title"
            label="Research · Writing"
            title="Notes from the lab."
          />
          <div className="mt-12 lg:mt-16">
            <ResearchIndex />
          </div>
        </Container>
      </section>

      <GetInvolved />
    </>
  );
}
