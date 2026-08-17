import { Check, Circle, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Verdict = "fit" | "alternative" | "unfit";

/**
 * The verdict scale.
 *
 * Three states, two hues, one fill rule.
 *
 * Colour is the third channel here, never the only one. Every entry carries an
 * icon and a word as well — roughly one in twelve men has some form of colour
 * vision deficiency, and the moment a homeowner is told "this technology is
 * wrong for your house" is precisely the moment the site cannot afford to be
 * misread.
 *
 * The fill rule is what replaced green. `fit` and `unfit` are *filled*: the
 * site is making a claim and wears its two colours to make it. `alternative`
 * is *outlined*, because it is a weaker statement and should look like one.
 * That is the same vocabulary RebateStatus uses for confirmed-versus-
 * unconfirmed data, which means the whole site now says "we stand behind this"
 * one way and only one way.
 *
 * Fit blue is deliberately lighter and more cyan than --blue. A verdict must
 * never read as a link.
 */
const VERDICTS = {
  fit: {
    label: "Recommended",
    Icon: Check,
    badge: "bg-verdict-fit text-white",
    spine: "bg-verdict-fit",
    border: "border-verdict-fit/30",
  },
  alternative: {
    label: "Worth considering",
    Icon: Circle,
    // Outline only. The absence of a fill is the message.
    badge: "border border-verdict-alt/45 text-verdict-alt",
    spine: "bg-verdict-alt/50",
    border: "border-border",
  },
  unfit: {
    label: "Not a fit",
    Icon: X,
    badge: "bg-verdict-unfit text-white",
    spine: "bg-verdict-unfit",
    border: "border-verdict-unfit/30",
  },
} as const satisfies Record<Verdict, unknown>;

export function VerdictBadge({
  verdict,
  label,
}: {
  verdict: Verdict;
  label?: string;
}) {
  const v = VERDICTS[verdict];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-xs font-semibold tracking-tight",
        v.badge,
      )}
    >
      <v.Icon aria-hidden className="size-3.5" strokeWidth={2.75} />
      {label ?? v.label}
    </span>
  );
}

/**
 * The recommendation output — the single most important component on the site.
 *
 * A homeowner should be able to read the verdict in about three seconds without
 * reading a paragraph, which is why the badge, the technology name and the
 * one-line reason are the only things at full contrast. Detail sits below, at
 * lower emphasis, for the homeowner who wants to check the reasoning.
 */
export function VerdictCard({
  verdict,
  technology,
  summary,
  confidence,
  detail,
  children,
}: {
  verdict: Verdict;
  technology: string;
  summary: string;
  confidence?: "High" | "Moderate" | "Low";
  detail?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  const v = VERDICTS[verdict];

  return (
    <article
      data-print="keep"
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card",
        v.border,
        verdict === "fit" && "shadow-sm",
      )}
    >
      {/* A 3px spine rather than a tinted card body. The whole card washed in
          colour would read as a promotional callout; the spine marks the verdict
          while the content stays on neutral paper and keeps its authority. */}
      <div aria-hidden className={cn("absolute inset-y-0 left-0 w-[3px]", v.spine)} />

      <div className="p-6 pl-7 sm:p-8 sm:pl-9">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <VerdictBadge verdict={verdict} />
          {confidence ? (
            <span className="text-xs text-muted-foreground">
              Confidence: <span className="font-medium text-foreground">{confidence}</span>
            </span>
          ) : null}
        </div>

        <h3 className="text-2xl sm:text-[1.75rem]">{technology}</h3>
        <p className="mt-2.5 max-w-measure text-[1.0625rem] leading-relaxed text-foreground">
          {summary}
        </p>

        {detail?.length ? (
          <dl className="mt-6 grid gap-x-8 gap-y-3.5 border-t border-border pt-5 sm:grid-cols-2">
            {detail.map((d) => (
              <div key={d.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {d.label}
                </dt>
                <dd className="apparatus mt-1 text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </article>
  );
}

/**
 * The "we ruled this out, and here is why" block.
 *
 * Most sites in this category omit the rejected options entirely. Showing the
 * reasoning for a *no* is the cheapest available proof that the recommendation
 * was not foreordained — it is the visible form of the independence claim.
 */
export function RuledOut({ items }: { items: { technology: string; reason: string }[] }) {
  return (
    <section
      data-print="keep"
      className="rounded-lg border border-border bg-muted/30 p-6 sm:p-7"
    >
      <h3 className="text-lg">What we ruled out for your home</h3>
      <ul className="mt-4 space-y-3.5">
        {items.map((item) => (
          <li key={item.technology} className="flex gap-3">
            <X
              aria-hidden
              className="mt-1 size-4 shrink-0 text-verdict-unfit"
              strokeWidth={2.5}
            />
            <p className="text-[0.9375rem] leading-relaxed text-foreground">
              <span className="font-medium">{item.technology}</span>
              {". "}
              {item.reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
