// All placeholder content. Replace with real data when it exists.

export const DEMO_SENTENCE =
  "Your train to Leeds is delayed by twelve minutes, and will now depart from platform four.";

/** Seconds of (simulated) audio for the demo sentence. Same under every schedule. */
export const DEMO_DURATION = 5.6;

/**
 * Single source for the headline numbers, so the metrics strip,
 * leaderboard and demo always agree.
 */
export const STEP_BUDGET = {
  /** Steps per frame in the fixed, full-step model. */
  fixed: 32,
  /** Mean steps per frame chosen by our predictor. */
  adaptiveMean: 7.8,
  /** Wall-clock speedup vs. full steps (300 ms → 96 ms). */
  speedup: 3.1,
} as const;

export const METRICS = [
  { value: STEP_BUDGET.speedup.toFixed(1), unit: "×", label: "Wall-clock speedup" },
  { value: STEP_BUDGET.adaptiveMean.toFixed(1), unit: `/${STEP_BUDGET.fixed}`, label: "Mean steps / frame" },
  { value: "−0.04", unit: "", label: "MOS vs. full steps" },
];

export type LeaderboardRow = {
  /** null marks the unranked full-step reference row. */
  rank: number | null;
  method: string;
  note: string;
  steps: string;
  mos: string;
  wer: string;
  latency: string;
  speedup: string;
};

// Ranked by MOS among accelerated methods. Speedup = 300 ms / latency.
export const LEADERBOARD: LeaderboardRow[] = [
  { rank: 1, method: "Adaptive TTS", note: "Ours · per-frame", steps: STEP_BUDGET.adaptiveMean.toFixed(1), mos: "4.27", wer: "2.9%", latency: "96 ms", speedup: `${STEP_BUDGET.speedup.toFixed(1)}×` },
  { rank: 2, method: "Step distillation", note: "Baseline", steps: "8", mos: "4.10", wer: "3.3%", latency: "92 ms", speedup: "3.3×" },
  { rank: 3, method: "Uniform reduction", note: "Baseline", steps: "8", mos: "3.86", wer: "4.4%", latency: "92 ms", speedup: "3.3×" },
  { rank: null, method: "Full steps", note: "Reference", steps: String(STEP_BUDGET.fixed), mos: "4.31", wer: "2.8%", latency: "300 ms", speedup: "1.0×" },
];

export type Post = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
};

export const POSTS: Post[] = [
  {
    category: "Systems",
    date: "Sep 18, 2026",
    readTime: "9 min",
    title: "From fewer steps to faster wall-clock",
    summary:
      "Why skipped compute doesn’t automatically become saved milliseconds, and where Triton kernels and GPU-aware scheduling actually help.",
  },
  {
    category: "Method",
    date: "Aug 27, 2026",
    readTime: "7 min",
    title: "Predicting step counts per frame",
    summary:
      "A lightweight predictor that decides how many refinement steps each frame needs before any of them are spent.",
  },
  {
    category: "Analysis",
    date: "Jul 30, 2026",
    readTime: "11 min",
    title: "Not every frame is equally hard",
    summary:
      "Measuring where a fixed step schedule over-spends compute, and where it can’t afford to cut back.",
  },
  {
    category: "Evaluation",
    date: "Jun 12, 2026",
    readTime: "6 min",
    title: "Benchmarking step reduction fairly",
    summary:
      "Comparing adaptive inference with distillation and uniform step cuts at matched quality, not just matched speed.",
  },
];
