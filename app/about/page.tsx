import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GetInvolved } from "@/components/home/GetInvolved";
import { PageIntro } from "@/components/PageIntro";
import { Pipeline } from "@/components/Pipeline";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageIntro label="About · Join" title="Spending compute where speech actually needs it.">
        Adaptive TTS is a research project on adaptive inference for text-to-speech.
        We validate ideas in PyTorch first, and reach for Triton and GPU-aware
        scheduling only where profiling shows they&rsquo;re needed. The team
        will be published here.
      </PageIntro>

      <section aria-labelledby="system-title" className="pb-24 lg:pb-36">
        <Container>
          <SectionHeader
            id="system-title"
            label="System"
            title="What we change, and what we leave alone."
            aside="Two new stages and one modified loop. Everything else is the unmodified base model, so results transfer to any iterative TTS model."
          />
          <div className="mt-12 lg:mt-16">
            <Pipeline />
          </div>
        </Container>
      </section>

      <GetInvolved />
    </>
  );
}
