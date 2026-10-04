"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { STEP_BUDGET } from "@/lib/content";
import { MODEL_STATUS } from "@/lib/site";
import { ArrowLink } from "../ArrowLink";
import { Container } from "../Container";
import { MetaLabel } from "../MetaLabel";
import { StepMask } from "./StepMask";

const HEADLINE = "Some syllables are harder than others.";
const ease = [0.22, 1, 0.36, 1] as const;

const SPEC = [
  { label: "Base model", value: `${STEP_BUDGET.fixed}-step iterative TTS` },
  { label: "Predictor", value: "1.2M params · 1.8 ms" },
  { label: "Hardware", value: "Single GPU, batch 1" },
  { label: "Status", value: `${MODEL_STATUS.model} · eval ${MODEL_STATUS.lastEval}` },
];

export function Hero() {
  const words = HEADLINE.split(" ");
  // Reduced motion: render the final state immediately.
  const speed = useReducedMotion() ? 0 : 1;
  const after = (0.1 + words.length * 0.055) * speed;

  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-24 md:pt-24 lg:pt-28 lg:pb-32">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <MetaLabel>Adaptive inference for speech</MetaLabel>
          <MetaLabel className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse-dot rounded-full bg-accent-strong"
            />
            Research preview · Placeholder data
          </MetaLabel>
        </div>

        <h1
          id="hero-title"
          className="mt-8 max-w-[12.5em] text-hero font-normal text-balance"
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              {/* Each word rises out of its own mask. */}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9 * speed, delay: (0.1 + i * 0.055) * speed, ease }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <motion.div
            className="flex flex-col items-start gap-10 lg:col-span-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 * speed, delay: after, ease }}
          >
            <p className="max-w-measure text-body md:text-xl md:leading-[1.5]">
              Text-to-speech models that refine audio iteratively spend the same
              number of steps on every frame: a pause costs as much as a plosive.
              Adaptive TTS predicts how many steps each frame actually needs, then
              turns the saved compute into real wall-clock speedup on the GPU.
            </p>
            <ArrowLink href="#demo">Hear the difference</ArrowLink>

            <dl className="w-full border-t border-rule">
              {SPEC.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule py-3"
                >
                  <dt className="meta pt-px text-muted">{row.label}</dt>
                  <dd className="text-[0.9375rem]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 * speed, delay: after * 0.6, ease }}
          >
            <StepMask />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
