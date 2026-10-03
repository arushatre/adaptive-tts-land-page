import type { ComponentPropsWithoutRef } from "react";

type MetaLabelProps = ComponentPropsWithoutRef<"span"> & {
  /** "muted" on the light canvas; "inherit" picks up the section's ink. */
  tone?: "muted" | "inherit";
};

/** Mono, uppercase, tracked label: BENCHMARK, SAMPLE, PAPER, DATE. */
export function MetaLabel({
  tone = "muted",
  className = "",
  ...props
}: MetaLabelProps) {
  const color = tone === "muted" ? "text-muted" : "text-inherit opacity-70";
  return <span className={`meta ${color} ${className}`} {...props} />;
}
