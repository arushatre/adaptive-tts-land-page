import Link from "next/link";
import { POSTS } from "@/lib/content";
import { Arrow } from "./ArrowLink";
import { MetaLabel } from "./MetaLabel";

export function ResearchIndex({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Title = headingLevel;
  return (
    <ul className="border-t border-ink">
      {POSTS.map((post) => (
        <li key={post.title} className="border-b border-rule">
          <Link
            href="/research"
            className="group grid gap-3 py-8 lg:grid-cols-12 lg:gap-6 lg:py-10"
          >
            <div className="flex flex-wrap gap-x-3 gap-y-1 lg:col-span-3 lg:flex-col">
              <MetaLabel className="text-ink">{post.category}</MetaLabel>
              <MetaLabel>
                {post.date} · {post.readTime}
              </MetaLabel>
            </div>
            <div className="flex flex-col gap-2 lg:col-span-7">
              <Title className="text-2xl font-normal tracking-[-0.02em] md:text-[1.75rem] md:leading-tight">
                {post.title}
              </Title>
              <p className="max-w-measure text-muted">{post.summary}</p>
            </div>
            <span className="mt-2 inline-flex items-baseline gap-2 text-[0.9375rem] whitespace-nowrap lg:col-span-2 lg:mt-1 lg:justify-self-end">
              Read more <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
