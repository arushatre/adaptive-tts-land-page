import { MetaLabel } from "./MetaLabel";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  label: string;
  title: React.ReactNode;
  id?: string;
  /** Optional short note aligned right on wide screens. */
  aside?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  id,
  aside,
  as: Heading = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <Reveal>
      <header
        className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}
      >
        <div className="flex flex-col gap-5 lg:col-span-8">
          <MetaLabel tone="inherit">{label}</MetaLabel>
          <Heading
            id={id}
            className="max-w-[18ch] text-h2 font-normal text-balance"
          >
            {title}
          </Heading>
        </div>
        {aside ? (
          <div className="max-w-measure text-base text-inherit opacity-70 lg:col-span-4">
            {aside}
          </div>
        ) : null}
      </header>
    </Reveal>
  );
}
