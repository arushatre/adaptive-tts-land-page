"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowLink } from "../ArrowLink";
import { Container } from "../Container";
import { MetaLabel } from "../MetaLabel";

const HEADLINE = "Not every frame of speech needs the same compute.";
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const words = HEADLINE.split(" ");
  // Reduced motion: render the final state immediately.
  const speed = useReducedMotion() ? 0 : 1;

  return (
    <section aria-labelledby="hero-title" className="pt-20 pb-24 md:pt-28 lg:pt-36 lg:pb-36">
      <Container>
        <MetaLabel>Adaptive inference for speech</MetaLabel>

        <h1
          id="hero-title"
          className="mt-8 max-w-[12.5em] text-hero font-normal text-balance"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: "0.3em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 * speed, delay: (0.1 + i * 0.055) * speed, ease }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mt-12 flex max-w-measure flex-col items-start gap-8 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8 * speed,
            delay: (0.1 + words.length * 0.055) * speed,
            ease,
          }}
        >
          <p className="text-body md:text-xl md:leading-[1.5]">
            Many modern text-to-speech models refine audio through a fixed
            number of steps, applied uniformly to every frame, easy or hard.
            Adaptive TTS predicts how many steps each frame actually needs, then
            turns the saved compute into real wall-clock speedup on the GPU.
          </p>
          <ArrowLink href="#demo">See the demo</ArrowLink>
        </motion.div>
      </Container>
    </section>
  );
}
