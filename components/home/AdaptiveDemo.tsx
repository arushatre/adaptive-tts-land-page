"use client";

import { useState } from "react";
import { DEMO_DURATION, DEMO_SENTENCE, STEP_BUDGET } from "@/lib/content";
import { MODEL_STATUS } from "@/lib/site";
import {
  adaptiveSchedule,
  buildTimeline,
  fixedSchedule,
  stepsSpentAt,
  wordIndexAt,
} from "@/lib/speech";
import { useMockPlayback } from "@/lib/useMockPlayback";
import { Container } from "../Container";
import { SectionHeader } from "../SectionHeader";
import { WaveformPlayer } from "../WaveformPlayer";

const FRAMES = 120;
const TIMELINE = buildTimeline(DEMO_SENTENCE);

const MODES = [
  {
    id: "fixed",
    label: "Fixed",
    note: `${STEP_BUDGET.fixed} steps on every frame`,
    schedule: fixedSchedule(FRAMES, STEP_BUDGET.fixed, STEP_BUDGET.fixed),
    speedup: 1,
  },
  {
    id: "adaptive",
    label: "Adaptive",
    note: "Steps predicted per frame",
    schedule: adaptiveSchedule(
      TIMELINE,
      FRAMES,
      STEP_BUDGET.adaptiveMean,
      STEP_BUDGET.fixed,
    ),
    speedup: STEP_BUDGET.speedup,
  },
] as const;

type ModeId = (typeof MODES)[number]["id"];

const FIXED_TOTAL = FRAMES * STEP_BUDGET.fixed;
const SAVED_PCT = Math.round((1 - STEP_BUDGET.adaptiveMean / STEP_BUDGET.fixed) * 100);
const fmt = (n: number) => n.toLocaleString("en-US");

export function AdaptiveDemo() {
  const [modeId, setModeId] = useState<ModeId>("adaptive");
  const mode = MODES.find((m) => m.id === modeId)!;
  const { schedule } = mode;
  const { progress, playing, toggle, seek } = useMockPlayback(DEMO_DURATION);
  const current = wordIndexAt(TIMELINE.spans, progress);
  const idle = progress <= 0 || progress >= 1;
  const spent = stepsSpentAt(schedule.steps, progress);
  const saved = Math.round((1 - schedule.mean / STEP_BUDGET.fixed) * 100);

  const readout = [
    { label: "Steps / frame", value: schedule.mean.toFixed(1) },
    { label: "Steps spent", value: fmt(spent), of: `/${fmt(FIXED_TOTAL)}` },
    { label: "Compute saved", value: `${saved}%` },
    { label: "Wall-clock", value: `${mode.speedup.toFixed(1)}×` },
  ];

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="section-y scroll-mt-4 bg-night text-night-ink"
    >
      <Container>
        <SectionHeader
          id="demo-title"
          label="Featured · Step budget"
          title="Same audio, a fraction of the compute."
          aside={`Each bar is one frame; its height is the refinement steps spent on it, up to the dashed ${STEP_BUDGET.fixed}-step budget. Adaptive spends ${SAVED_PCT}% fewer steps. Turning that into ${STEP_BUDGET.speedup.toFixed(1)}× wall-clock speedup is the systems half of the work.`}
        />

        <div className="mt-14 overflow-hidden rounded-[6px] border border-night-rule lg:mt-20">
          <fieldset>
            <legend className="sr-only">Step schedule</legend>
            <div className="grid grid-cols-2 gap-px border-b border-night-rule bg-night-rule">
              {MODES.map((m, i) => {
                const selected = m.id === modeId;
                return (
                  <label
                    key={m.id}
                    className={`relative flex cursor-pointer flex-col gap-1 bg-night px-4 py-4 transition-colors md:px-6 md:py-5 has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-night-ink ${
                      selected ? "text-night-ink" : "text-night-muted hover:text-night-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schedule"
                      value={m.id}
                      checked={selected}
                      onChange={() => setModeId(m.id)}
                      className="sr-only"
                    />
                    <span className="meta flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-2 rounded-[1px] transition-colors ${
                          selected ? "bg-accent" : "border border-current/50"
                        }`}
                      />
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] tracking-[-0.01em]">{m.label}</span>
                    <span className="text-[0.8125rem] leading-snug opacity-70">{m.note}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="px-4 py-8 md:px-10 md:py-12">
            <p className="max-w-[32ch] text-lede">
              <span className="sr-only">{DEMO_SENTENCE}</span>
              {TIMELINE.words.map((word, i) => {
                const state =
                  idle || i < current
                    ? "text-night-ink"
                    : i === current
                      ? "text-accent"
                      : "text-night-muted";
                return (
                  <span key={i} aria-hidden="true">
                    <span className={`transition-colors duration-150 ${state}`}>
                      {word}
                    </span>{" "}
                  </span>
                );
              })}
            </p>

            <WaveformPlayer
              className="mt-10 md:mt-14"
              align="bottom"
              ceiling
              bars={schedule.bars}
              duration={DEMO_DURATION}
              label={`sample with ${mode.label.toLowerCase()} schedule`}
              meta={[mode.label]}
              progress={progress}
              playing={playing}
              onToggle={toggle}
              onSeek={seek}
            />
          </div>

          <dl className="grid grid-cols-2 gap-px border-t border-night-rule bg-night-rule md:grid-cols-4">
            {readout.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 bg-night px-4 py-4 md:px-6">
                <dt className="meta text-night-muted">{item.label}</dt>
                <dd className="font-mono text-xl tabular-nums md:text-2xl">
                  {item.value}
                  {item.of ? (
                    <span className="text-sm text-night-muted md:text-base">{item.of}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="meta mt-6 flex flex-col gap-2 text-night-muted lg:flex-row lg:items-center lg:justify-between">
          <p className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 -translate-y-px animate-pulse-dot self-center rounded-full bg-accent"
            />
            Model {MODEL_STATUS.model} · last eval {MODEL_STATUS.lastEval}
          </p>
          <p>Illustrative schedule · simulated playback</p>
        </div>
      </Container>
    </section>
  );
}
