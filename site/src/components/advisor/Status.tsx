import { CircleAlert, CircleCheck, CircleHelp, CircleSlash } from "lucide-react";

import { cn } from "@/lib/utils";

export type RebateState = "active" | "reserved" | "expired" | "verify";

/**
 * Rebate and incentive status.
 *
 * The blueprint is emphatic that a stale rebate finder is worse than no rebate
 * finder, and that incentives are live data rather than evergreen content. This
 * badge is that principle made visible — and the fill rule is the whole idea.
 *
 * **Filled badges are claims. Outlined badges are not.** ACTIVE, RESERVED and
 * EXPIRED are all things the site has confirmed, so they carry a fill or a
 * solid edge. VERIFY is the one state where we have not checked, and it renders
 * as a dashed outline: the absence of a fill is the message. A homeowner can
 * tell at a glance which numbers the site stands behind and which it does not.
 *
 * Every competitor in this category presents unverified and verified figures in
 * identical type, which is exactly the habit that makes them untrustworthy on
 * rebates.
 *
 * V.3 removed the amber that used to carry RESERVED. It was the only warm hue
 * in the system and it existed for one state — the fill rule expresses the same
 * thing without spending a colour on it.
 */
const STATES = {
  active: {
    label: "Active",
    Icon: CircleCheck,
    className: "bg-verdict-fit text-white",
    hint: "Confirmed available as of the check date.",
  },
  reserved: {
    // Confirmed, but the money is not available to you. Solid edge, no fill:
    // the claim is real, the offer is not open.
    label: "Fully reserved",
    Icon: CircleAlert,
    className: "border border-foreground/35 text-foreground",
    hint: "Program exists but funds are committed. New projects are waitlisted.",
  },
  expired: {
    label: "Expired",
    Icon: CircleSlash,
    className: "bg-muted text-muted-foreground line-through decoration-1",
    hint: "No longer available for new installations.",
  },
  verify: {
    // Dashed outline. We have not confirmed this, and it must not look like we
    // have.
    label: "Verify",
    Icon: CircleHelp,
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
 * It is also the cheapest durable advantage the site has, and through V.2 it
 * was set in 12px grey, which made the site's single differentiator look like a
 * disclaimer — the one thing every reader has been trained to skip. V.3 gives
 * it a form: a rule down the left marking it as apparatus, the source at full
 * ink because it is evidence rather than a footnote, and the checked date in
 * mono because the date is the claim.
 *
 * A plumber's marketing page will never date-stamp its rebate claims, because
 * doing so would expose how old they are. This should look like the thing they
 * cannot do.
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
    <div
      data-print="keep"
      className="mt-3 border-l-2 border-blue/25 py-0.5 pl-3 text-xs leading-relaxed"
    >
      <span className="text-muted-foreground">Source: </span>
      {href ? (
        <a
          href={href}
          rel="nofollow noopener"
          target="_blank"
          className="font-medium text-foreground underline decoration-blue/40 underline-offset-2 hover:decoration-blue"
        >
          {source}
        </a>
      ) : (
        <span className="font-medium text-foreground">{source}</span>
      )}
      <span className="apparatus mt-0.5 block text-muted-foreground">
        Checked {checked}
      </span>
    </div>
  );
}

/**
 * Freshness stamp for a whole page or data panel. Sits at the top of local
 * pages, where every figure below is time-sensitive.
 */
export function CheckedStamp({ date }: { date: string }) {
  return (
    <p
      data-print="keep"
      className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-verdict-fit" />
      Local data last verified <span className="apparatus">{date}</span>
    </p>
  );
}
