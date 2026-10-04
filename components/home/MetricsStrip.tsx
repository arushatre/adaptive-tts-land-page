"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EVAL_SETS, METRICS } from "@/lib/content";
import { Container } from "../Container";
import { MetaLabel } from "../MetaLabel";

/** Real minus sign for negative values, fixed decimals. */
const format = (n: number, decimals: number) =>
  `${n < 0 ? "−" : ""}${Math.abs(n).toFixed(decimals)}`;

/** Counts up to `value` the first time it scrolls into view. */
function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: jump straight to the value.
    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {/* Screen readers get the final value, not the ticking one. */}
      <span className="sr-only">{format(value, decimals)}</span>
      <span aria-hidden="true">{format(shown, decimals)}</span>
    </span>
  );
}

export function MetricsStrip() {
  return (
    <section aria-label="Key metrics" className="pb-24 lg:pb-32">
      <Container>
        <dl className="grid border-y border-ink sm:grid-cols-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`group flex flex-col gap-3 py-8 sm:px-6 sm:py-10 lg:px-10 ${
                i > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""
              } ${i === 0 ? "sm:pl-0 lg:pl-0" : ""}`}
            >
              <dt>
                <MetaLabel>{m.label}</MetaLabel>
              </dt>
              <dd className="order-first font-mono text-5xl tracking-[-0.04em] tabular-nums lg:text-7xl">
                <CountUp value={m.value} decimals={m.decimals} />
                {m.unit ? (
                  <span className="ml-1 text-2xl text-muted lg:text-3xl">{m.unit}</span>
                ) : null}
              </dd>
              <dd className="max-w-[34ch] text-[0.875rem] leading-snug text-muted">
                {m.detail}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-baseline">
          <MetaLabel className="lg:col-span-2">Evaluated on</MetaLabel>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:col-span-10">
            {EVAL_SETS.map((set) => (
              <li key={set.name} className="group flex flex-col gap-1">
                <span className="text-xl tracking-[-0.02em] text-ink/80 transition-colors duration-300 group-hover:text-ink">
                  {set.name}
                </span>
                <span className="meta text-[0.6875rem] text-muted">{set.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <MetaLabel className="mt-8 block">Placeholder values · not results</MetaLabel>
      </Container>
    </section>
  );
}
