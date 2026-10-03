import { METRICS } from "@/lib/content";
import { Container } from "../Container";
import { MetaLabel } from "../MetaLabel";

export function MetricsStrip() {
  return (
    <section aria-label="Key metrics" className="py-16 lg:py-24">
      <Container>
        <dl className="grid border-y border-rule sm:grid-cols-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-row-reverse items-baseline justify-between gap-4 py-6 sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-3 sm:px-6 sm:py-10 lg:px-10 ${
                i > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""
              } ${i === 0 ? "sm:pl-0 lg:pl-0" : ""}`}
            >
              <dt className="text-right sm:text-left">
                <MetaLabel>{m.label}</MetaLabel>
              </dt>
              <dd className="font-mono text-4xl tracking-[-0.04em] tabular-nums sm:text-5xl lg:text-7xl">
                {m.value}
                {m.unit ? (
                  <span className="ml-1 text-2xl text-muted lg:text-3xl">{m.unit}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <MetaLabel className="mt-4 block">Placeholder values · not results</MetaLabel>
      </Container>
    </section>
  );
}
