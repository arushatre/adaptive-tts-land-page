import { Container } from "@/components/Container";
import { AdaptiveDemo } from "@/components/home/AdaptiveDemo";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Hero } from "@/components/home/Hero";
import { MetricsStrip } from "@/components/home/MetricsStrip";
import { Leaderboard } from "@/components/Leaderboard";
import { ResearchIndex } from "@/components/ResearchIndex";
import { SectionHeader } from "@/components/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <AdaptiveDemo />
      <MetricsStrip />

      <section aria-labelledby="benchmarks-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="benchmarks-title"
            label="Benchmark · Sep 2026"
            title="Fewer steps, measured against the alternatives."
            aside="Same base model, same test set. Each method cuts refinement steps differently; quality is checked against the full-step model."
          />
          <div className="mt-12 lg:mt-16">
            <Leaderboard captionId="benchmarks-title" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="research-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="research-title"
            label="Research"
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
