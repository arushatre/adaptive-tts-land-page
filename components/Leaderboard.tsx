import { LEADERBOARD } from "@/lib/content";
import { ArrowLink } from "./ArrowLink";
import { MetaLabel } from "./MetaLabel";

const COLUMNS = [
  { key: "rank", label: "#", align: "left" },
  { key: "model", label: "Method", align: "left" },
  { key: "steps", label: "Steps", align: "right" },
  { key: "mos", label: "MOS ↑", align: "right" },
  { key: "wer", label: "WER ↓", align: "right" },
  { key: "latency", label: "Latency ↓", align: "right" },
  { key: "speedup", label: "Speedup ↑", align: "right" },
] as const;

// On narrow screens the table scrolls; rank and model stay pinned.
const STICKY = {
  rank: "w-10 sticky left-0 z-10 lg:static",
  model: "sticky left-10 z-10 border-r border-r-rule lg:static lg:border-r-0",
} as const;

// Cells carry the background so pinned columns cover scrolled content.
const cell = (i: number) =>
  i === 0
    ? "bg-accent"
    : "bg-paper transition-colors group-hover/row:bg-paper-hover";

export function Leaderboard({
  captionId,
  showMethodLink = true,
}: {
  captionId: string;
  showMethodLink?: boolean;
}) {
  return (
    <div>
      <MetaLabel aria-hidden="true" className="mb-3 block lg:hidden">
        Swipe table →
      </MetaLabel>
      <div
        role="region"
        aria-labelledby={captionId}
        tabIndex={0}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`meta border-b border-ink bg-paper py-3 pr-4 font-normal whitespace-nowrap text-muted last:pr-0 ${
                    col.align === "right" ? "text-right" : ""
                  } ${STICKY[col.key as keyof typeof STICKY] ?? ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {LEADERBOARD.map((row, i) => (
              <tr
                key={row.method}
                className={`group/row border-b border-rule ${
                  i === 0 ? "bg-accent" : "bg-paper"
                }`}
              >
                <td className={`${cell(i)} py-5 pr-4 pl-2 text-sm text-muted ${STICKY.rank}`}>
                  {row.rank === null ? "Ref" : String(row.rank).padStart(2, "0")}
                </td>
                <th
                  scope="row"
                  className={`${cell(i)} py-5 pr-4 font-sans font-normal ${STICKY.model}`}
                >
                  <span className="block text-lg tracking-[-0.01em] whitespace-nowrap lg:inline">{row.method}</span>
                  <span className="meta whitespace-nowrap text-muted lg:ml-3">{row.note}</span>
                </th>
                <td className={`${cell(i)} py-5 pr-4 text-right`}>{row.steps}</td>
                <td className={`${cell(i)} py-5 pr-4 text-right`}>{row.mos}</td>
                <td className={`${cell(i)} py-5 pr-4 text-right`}>{row.wer}</td>
                <td className={`${cell(i)} py-5 pr-4 text-right`}>{row.latency}</td>
                <td className={`${cell(i)} py-5 pr-2 text-right`}>{row.speedup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-7">
          <MetaLabel>Placeholder data</MetaLabel>
          <p className="max-w-measure text-[0.9375rem] leading-relaxed text-muted">
            Ranked by MOS among accelerated methods; the full 32-step model is
            shown for reference. Steps are mean refinement steps per frame. MOS
            on a 5-point scale from 40 listeners × 120 utterances; WER from an
            off-the-shelf ASR model. Latency is median wall-clock time per
            utterance on one GPU, including our step predictor.
            Speedup is relative to full steps.
          </p>
        </div>
        {showMethodLink ? (
          <div className="lg:col-span-5 lg:justify-self-end">
            <ArrowLink href="/benchmarks">Full benchmark and method</ArrowLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
