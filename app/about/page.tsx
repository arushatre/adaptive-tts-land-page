import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pb-12 lg:pb-24">
      <PageIntro label="About · Join" title="Spending compute where speech actually needs it.">
        Adaptive TTS is a research project on adaptive inference for text-to-speech.
        We validate ideas in PyTorch first, and reach for Triton and GPU-aware
        scheduling only where profiling shows they&rsquo;re needed. The team
        and open roles will be published here.
      </PageIntro>
    </div>
  );
}
