import { ArrowRight, Phone, TriangleAlert, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { IconChip } from "@/components/common/Layout";
import { cn } from "@/lib/utils";

/**
 * One water-heater technology, summarised honestly: where it fits, where it
 * does not. Both halves are always present.
 *
 * A card that lists only benefits is a product tile. Listing the cautions in
 * the same visual weight is what makes it an assessment — and it costs nothing,
 * because a homeowner who self-selects out of a bad fit was never going to
 * become a completed job anyway.
 */
export function TechnologyCard({
  name,
  href,
  icon,
  summary,
  fits,
  cautions,
}: {
  name: string;
  href: string;
  icon?: LucideIcon;
  summary: string;
  fits: string[];
  cautions: string[];
}) {
  return (
    // `relative` is load-bearing: the heading link below stretches an
    // `after:inset-0` overlay to make the whole card clickable, and without a
    // positioned ancestor that overlay escapes to the nearest one and covers
    // the page.
    <article className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(11,33,67,0.16)]">
      {icon ? <IconChip icon={icon} /> : null}

      <h3 className={cn("text-xl", icon && "mt-5")}>
        <Link href={href} className="after:absolute after:inset-0">
          {name}
        </Link>
      </h3>
      {/* Short rule under the card title, matching the section headings. */}
      <div aria-hidden className="mt-2 h-1 w-10 rounded-full bg-blue" />

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
        {summary}
      </p>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        <TechList heading="Good fit when" items={fits} tone="fit" />
        <TechList heading="Think twice when" items={cautions} tone="unfit" />
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue">
        Read the full guide
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}

function TechList({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "fit" | "unfit";
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {heading}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed">
            <span
              aria-hidden
              className={cn(
                "mt-[0.5em] size-1.5 shrink-0 rounded-full",
                tone === "fit" ? "bg-verdict-fit" : "bg-verdict-unfit",
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Emergency short-circuit.
 *
 * This is the only component in the system permitted to use urgency styling,
 * and it exists to solve the one real weakness of the reviewer register: a
 * homeowner standing over a leaking tank at 6am does not want an editorial
 * essay on efficiency.
 *
 * The fix is structural rather than stylistic. Rather than warming up the whole
 * site and diluting its independence, the emergency case gets its own visible
 * exit at the top of the page — and the educational pages below stay calm.
 */
export function EmergencyBar() {
  return (
    <aside className="border-b border-verdict-unfit/25 bg-verdict-unfit-bg">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 sm:px-6 lg:px-8">
        <TriangleAlert
          aria-hidden
          className="size-4 shrink-0 text-verdict-unfit"
          strokeWidth={2.5}
        />
        <p className="text-sm font-medium">
          No hot water right now, or a tank that is leaking?
        </p>
        <Link
          href="/emergency"
          className="inline-flex min-h-8 items-center gap-1.5 rounded-md text-sm font-semibold text-verdict-unfit underline underline-offset-4 hover:brightness-110"
        >
          <Phone aria-hidden className="size-3.5" />
          Skip the research, get help today
        </Link>
      </div>
    </aside>
  );
}

/**
 * Where the homeowner is in the decision. Mirrors the blueprint's recommended
 * journey rather than a generic breadcrumb, so it doubles as an explanation of
 * how the site reasons — which is itself a trust signal.
 */
const PATH = [
  "Problem",
  "Technology",
  "Feasibility",
  "Sizing",
  "Cost",
  "Local rules",
  "Installer",
] as const;

export function DecisionPath({ current }: { current: (typeof PATH)[number] }) {
  const index = PATH.indexOf(current);
  return (
    <nav aria-label="Decision progress" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-1.5 text-xs">
        {PATH.map((step, i) => {
          const done = i < index;
          const active = i === index;
          return (
            <li key={step} className="flex items-center gap-1.5">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1 font-medium whitespace-nowrap",
                  active && "bg-blue text-white",
                  done && "bg-muted text-muted-foreground",
                  !done && !active && "text-muted-foreground/60",
                )}
              >
                {step}
              </span>
              {i < PATH.length - 1 ? (
                <span aria-hidden className="text-muted-foreground/40">
                  ›
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Per-market data with per-field provenance.
 *
 * Every row can carry its own source and check date because market facts do not
 * age at the same rate — a utility territory is stable for years, a rebate
 * balance can change in a week. Presenting them at one freshness would be a
 * quiet lie.
 */
export function LocalDataPanel({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: ReactNode; meta?: ReactNode }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <h3 className="border-b border-border px-6 py-4 text-lg">{title}</h3>
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="px-6 py-4 sm:flex sm:gap-6">
            <dt className="text-sm font-medium text-muted-foreground sm:w-52 sm:shrink-0">
              {row.label}
            </dt>
            <dd className="mt-1 text-[0.9375rem] sm:mt-0">
              {row.value}
              {row.meta}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Editorial pull-out for the site's genuinely contrarian positions. */
export function Callout({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "warn";
}) {
  return (
    <aside
      className={cn(
        "my-8 rounded-lg border-l-[3px] py-5 pl-6 pr-6",
        tone === "warn"
          ? "border-l-status-warn bg-status-warn-bg/60"
          : "border-l-blue bg-muted/50",
      )}
    >
      <p className="mb-1.5 font-heading text-lg">{title}</p>
      <div className="text-[0.9375rem] leading-relaxed text-foreground/80">{children}</div>
    </aside>
  );
}
