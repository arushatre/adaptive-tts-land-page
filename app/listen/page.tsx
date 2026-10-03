import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { WaveformPlayer } from "@/components/WaveformPlayer";
import { DEMO_DURATION, DEMO_SENTENCE, STEP_BUDGET } from "@/lib/content";
import { adaptiveSchedule, buildTimeline, fixedSchedule } from "@/lib/speech";

export const metadata: Metadata = { title: "Listen" };

const FRAMES = 120;
const MAX = STEP_BUDGET.fixed;
const timeline = buildTimeline(DEMO_SENTENCE);

const SAMPLES = [
  { method: "Full steps", schedule: fixedSchedule(FRAMES, MAX, MAX) },
  { method: "Uniform reduction", schedule: fixedSchedule(FRAMES, 8, MAX) },
  { method: "Step distillation", schedule: fixedSchedule(FRAMES, 8, MAX) },
  {
    method: "Adaptive TTS",
    schedule: adaptiveSchedule(timeline, FRAMES, STEP_BUDGET.adaptiveMean, MAX),
  },
];

export default function ListenPage() {
  return (
    <>
      <PageIntro label="Listen · Samples" title="Hear what fewer steps sound like.">
        Side-by-side samples from the full-step model, uniform step reduction,
        step distillation and our adaptive schedule, rendered from
        the same text. Real audio will be published here alongside the paper.
      </PageIntro>
      <section aria-label="Samples" className="pb-24 lg:pb-36">
        <Container>
          <ul className="border-t border-ink">
            {SAMPLES.map((s) => (
              <li key={s.method} className="border-b border-rule py-8">
                <WaveformPlayer
                  align="bottom"
                  ceiling
                  bars={s.schedule.bars}
                  duration={DEMO_DURATION}
                  label={`${s.method} sample`}
                  meta={[
                    s.method,
                    `${Number.isInteger(s.schedule.mean) ? s.schedule.mean : s.schedule.mean.toFixed(1)} steps/frame`,
                  ]}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
