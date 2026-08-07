import { CircleAlert, CircleCheck, CircleHelp, CircleSlash } from "lucide-react";

import { cn } from "@/lib/utils";

export type RebateState = "active" | "reserved" | "expired" | "verify";

/**
 * Rebate and incentive status.
 *
 * The blueprint is emphatic that a stale rebate finder is worse than no rebate
 * finder, and that incentives are live data rather than evergreen content. This
 * badge is that principle made visible — and the fourth state is the one that
 * matters.
 *
 * ACTIVE / RESERVED / EXPIRED render **filled**. VERIFY renders as an **unfilled
 * outline**. Filled badges are claims; the empty badge is visibly a non-claim.
 * A homeowner can tell at a glance which numbers the site stands behind and
 * which it has not confirmed. Every competitor in this category presents
 * unverified and verified figures in identical type, which is exactly the habit
 * that makes them untrustworthy on rebates.
 */
const STATES = {
  active: {
    label: "Active",
    Icon: CircleCheck,
    className: "bg-verdict-fit-bg text-verdict-fit",
    hint: "Confirmed available as of the check date.",
  },
  reserved: {
    label: "Fully reserved",
    Icon: CircleAlert,
    className: "bg-status-warn-bg text-status-warn",
    hint: "Program exists but funds are committed. New projects are waitlisted.",
  },
  expired: {
    label: "Expired",
    Icon: CircleSlash,
    className: "bg-muted text-muted-foreground line-through decoration-1",
    hint: "No longer available for new installations.",
  },
  verify: {
    label: "Verify",
    Icon: CircleHelp,
    // Outline only. The absence of a fill is the message.
    className: "border border-dashed border-input text-muted-foreground",
    hint: "We have not independently confirmed this. Check with the provider before relying on it.",
  },
} as const satisfies Record<RebateState, unknown>;

export function RebateStatus({ state }: { state: RebateState }) {
  const s = STATES[state];
  return (
    <span
      title={s.hint}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-xs font-semibold tracking-tight whitespace-nowrap",
        s.className,
      )}
    >
      <s.Icon aria-hidden className="size-3.5 shrink-0" strokeWidth={2.5} />
      {s.label}
    </span>
  );
}

/**
 * Inline citation with a checked date.
 *
 * This appears anywhere a volatile claim does — rebate amounts, code effective
 * dates, local pricing, utility territory. It is the blueprint's
 * `source + checked date + confidence` database rule promoted from a schema
 * field to a piece of user interface.
 *
 * It is also the cheapest durable advantage the site has. A plumber's marketing
 * page will never date-stamp its rebate claims, because doing so would expose
 * how old they are.
 */
export function SourceNote({
  source,
  href,
  checked,
}: {
  source: string;
  href?: string;
  checked: string;
}) {
  return (
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
      Source:{" "}
      {href ? (
        <a
          href={href}
          rel="nofollow noopener"
          target="_blank"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {source}
        </a>
      ) : (
        source
      )}
      <span aria-hidden> · </span>
      <span className="tabular">Checked {checked}</span>
    </p>
  );
}

/**
 * Freshness stamp for a whole page or data panel. Sits at the top of local
 * pages, where every figure below is time-sensitive.
 */
export function CheckedStamp({ date }: { date: string }) {
  return (
    <p className="tabular inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-verdict-fit" />
      Local data last verified {date}
    </p>
  );
}
