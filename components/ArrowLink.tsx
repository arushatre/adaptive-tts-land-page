import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ArrowLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

/** Secondary CTA: text plus an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
  ...props
}: ArrowLinkProps) {
  const classes = `group inline-flex items-baseline gap-2 border-b border-current/25 pb-0.5 transition-colors duration-200 hover:border-current ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );

  // Anchors, placeholders and mailto links don't need client routing.
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {inner}
    </Link>
  );
}

/**
 * The one primary action per section: an ink block with the arrow in an
 * accent cell. `tone="night"` inverts it for the dark bands.
 */
export function PrimaryLink({
  href,
  children,
  tone = "paper",
  className = "",
  ...props
}: ArrowLinkProps & { tone?: "paper" | "night" }) {
  const block =
    tone === "night"
      ? "bg-night-ink text-night hover:bg-night-ink/90"
      : "bg-ink text-paper hover:bg-ink/90";
  const cell = tone === "night" ? "bg-night-accent text-night" : "bg-accent text-ink";
  const classes = `group inline-flex items-stretch text-[0.9375rem] tracking-[-0.01em] transition-colors duration-200 ${block} ${className}`;
  const inner = (
    <>
      <span className="px-5 py-3.5">{children}</span>
      <span
        aria-hidden="true"
        className={`grid w-12 place-items-center overflow-hidden ${cell}`}
      >
        <span className="inline-block transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
          →
        </span>
      </span>
    </>
  );

  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {inner}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-300 ease-out-soft group-hover:translate-x-1 ${className}`}
    >
      →
    </span>
  );
}
