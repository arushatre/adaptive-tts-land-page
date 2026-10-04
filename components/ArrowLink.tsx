import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ArrowLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

/** The site's only CTA style: text plus an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
  ...props
}: ArrowLinkProps) {
  const classes = `group inline-flex items-baseline gap-2 border-b border-current/25 pb-0.5 transition-colors hover:border-current ${className}`;
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
