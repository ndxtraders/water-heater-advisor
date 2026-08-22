import type { ReactNode } from "react";

import { RebateStatus, SourceNote, type RebateState } from "@/components/advisor/Status";
import {
  DAILY_DRAW_GALLONS,
  EFFICIENCY,
  type FuelRates,
  annualFuelCost,
  usdRange,
} from "@/lib/energy";
import { type Market, meanInletF } from "@/lib/market";
import type { TechId } from "@/lib/quiz/engine";
import { cn } from "@/lib/utils";

/**
 * Shared furniture for the `/local/california/*` pages.
 *
 * Everything here started life inside one city page and moved out when a second
 * market earned it. The rule the file exists to enforce: a component may be
 * shared, a *claim* may not. Two cities can render the same table; they must
 * never render the same number without each having its own source behind it.
 */

/**
 * One incentive, with the four-state badge doing the load-bearing work.
 *
 * Lifted out of the Modesto and Turlock pages, which had two identical copies.
 * A rebate row is the single most duplicated object across local pages and the
 * single most dangerous one to let drift, because the badge is a claim about
 * what the site has confirmed.
 */
export function IncentiveRow({
  name,
  detail,
  amount,
  state,
  source,
  href,
  checked,
}: {
  name: string;
  detail: ReactNode;
  amount?: string;
  state: RebateState;
  source: string;
  href?: string;
  checked: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-md text-lg leading-snug">{name}</h3>
        <div className="flex items-center gap-3">
          {amount ? <span className="tabular text-lg font-semibold">{amount}</span> : null}
          <RebateStatus state={state} />
        </div>
      </div>
      <div className="mt-2.5 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2">
        {detail}
      </div>
      <SourceNote source={source} href={href} checked={checked} />
    </article>
  );
}

/**
 * Tabular local evidence, styled to match the Resources hub's markdown tables.
 *
 * The Resources pages already had a table idiom and the local pages had none,
 * so a water report or a fee schedule was arriving as a paragraph of numbers.
 * Same navy header, so a reader moving between a resource article and a city
 * page sees one site.
 *
 * Responsive strategy is `ComparisonTable`'s rather than the Resources hub's:
 * real table from `md` up, one stacked card per row below it. The hub's tables
 * scroll sideways on a phone, and the rule this codebase already wrote down is
 * that a table you have to drag sideways on a phone is a table nobody reads.
 * These carry the most decision-relevant numbers on the local pages, and this
 * audience is heavily mobile, so they get the treatment that survives a phone.
 *
 * The first column is treated as the row's identity and becomes the card
 * heading, which is why callers put the label there.
 */
export function EvidenceTable({
  caption,
  columns,
  rows,
  note,
  align,
}: {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  note?: ReactNode;
  /** Column indices to range right. Figures compare better ranged right. */
  align?: number[];
}) {
  const right = new Set(align ?? []);
  return (
    <div data-print="keep" className="my-8">
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-navy-deep text-white">
            <tr>
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={cn("px-4 py-3 font-semibold", right.has(i) && "text-right")}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {rows.map((cells, r) => (
              <tr key={r} className="align-top">
                {cells.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "px-4 py-3 leading-relaxed",
                      right.has(i) && "apparatus text-right whitespace-nowrap",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile, read top to bottom instead of dragged left to right. */}
      <div className="space-y-4 md:hidden">
        {rows.map((cells, r) => (
          <div key={r} className="rounded-lg border border-border bg-card p-5">
            <h4 className="mb-3 border-b border-border pb-2.5 font-heading text-base leading-snug">
              {cells[0]}
            </h4>
            <dl className="space-y-3">
              {cells.slice(1).map((cell, i) => (
                <div key={i}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {columns[i + 1]}
                  </dt>
                  <dd
                    className={cn(
                      "mt-0.5 text-[0.9375rem] leading-relaxed",
                      right.has(i + 1) && "apparatus",
                    )}
                  >
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {note ? (
        <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A branch the reader has to resolve before anything below it means anything.
 *
 * Merced's electric provider and Stockton's retail water provider are both
 * questions the site genuinely cannot answer from a city name, and the honest
 * page shape is two labelled paths rather than one hedged paragraph. Rendering
 * them side by side also stops the second branch reading as a footnote to the
 * first, which is what happens when they are consecutive prose sections.
 */
export function ProviderFork({
  question,
  how,
  branches,
}: {
  question: string;
  how: ReactNode;
  branches: { label: string; heading: string; body: ReactNode }[];
}) {
  return (
    <div className="my-8">
      <div className="rounded-t-lg border border-b-0 border-border bg-navy-deep px-5 py-4 text-white sm:px-6">
        <p className="font-heading text-lg">{question}</p>
        <div className="mt-1.5 text-sm leading-relaxed text-white/75 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2">
          {how}
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-b-lg border border-border bg-border sm:grid-cols-2">
        {branches.map((b) => (
          <div key={b.label} className="bg-card p-5 sm:p-6">
            <p className="apparatus text-xs uppercase tracking-wider text-muted-foreground">
              {b.label}
            </p>
            <h3 className="mt-2 text-lg leading-snug">{b.heading}</h3>
            <div className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2 [&_p]:mt-2.5 [&_p:first-child]:mt-0">
              {b.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Evidence and review status, carried over from the Resources article template.
 *
 * The local pages make permit, incentive and technical claims and had nothing
 * saying who wrote them or what review they have not had. The Resources pages
 * already solved that, and running the same panel in both places means the
 * disclaimer is one object rather than a paragraph somebody rewrites per city.
 *
 * `CheckedStamp` in the hero answers "how fresh". This answers "how sure", and
 * they are different questions.
 */
export function LocalReviewStatus({
  city,
  checked,
  unresolved,
}: {
  city: string;
  checked: string;
  unresolved: ReactNode[];
}) {
  return (
    <aside
      aria-labelledby="local-review-status"
      className="mt-12 rounded-xl border border-border bg-tint p-5 sm:p-6"
    >
      <h2 id="local-review-status" className="text-lg">
        What we have not settled in {city}
      </h2>
      <p className="mt-2 max-w-measure text-sm leading-relaxed text-foreground">
        Sources last checked <span className="apparatus">{checked}</span>. No professional
        technical review is claimed. No plumber, contractor, engineer or city official has
        reviewed this page, and nothing here should be read as a code interpretation for a
        particular house. Verify incentive, permit, code, water, price and product
        information with the organisation that owns it before acting on it.
      </p>
      <p className="mt-3 max-w-measure text-sm leading-relaxed text-foreground">
        Below are the open items we know about, listed because a page that shows only what
        it knows is the harder one to trust.
      </p>
      <ul className="mt-4 space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-2">
        {unresolved.map((item, i) => (
          <li key={i} className="list-disc marker:text-blue">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/**
 * The fuel comparison, parameterised by market and rate card.
 *
 * It lived inside the Turlock page with a note saying it moves out when a
 * second market earns it. Patterson earned it: TID sells the electricity and
 * PG&E sells the gas in both cities, off the same two published schedules, so
 * the arithmetic transfers exactly and the commentary does not.
 *
 * The commentary is the caller's job on purpose. The table is arithmetic and is
 * the same everywhere; what the numbers *mean* depends on the local rebate
 * position and the local water, and that is the part that must never be shared.
 */
const ROWS: { id: TechId; name: string }[] = [
  { id: "gas-tank", name: "Gas storage tank" },
  { id: "gas-tankless", name: "Gas tankless, condensing" },
  { id: "electric-tank", name: "Electric resistance tank" },
  { id: "heat-pump", name: "Heat pump water heater" },
];

export function FuelTable({
  market,
  rates,
  title,
  note,
}: {
  market: Market;
  rates: FuelRates;
  title: string;
  note: ReactNode;
}) {
  return (
    <div data-print="keep" className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-5 sm:px-6">
        <h3 className="text-xl">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {/* Cents, because that is the unit TID publishes and $0.1338 makes a
              reader count decimal places to compare two numbers. */}
          {rates.electricUtility} electricity at {(rates.kWh[0] * 100).toFixed(2)}¢ to{" "}
          {(rates.kWh[1] * 100).toFixed(2)}¢ per kWh. {rates.gasUtility} gas at $
          {rates.therm.toFixed(3)} per therm.
        </p>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Estimated yearly fuel cost by water heater technology at {market.city} rates
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="py-3 pl-4 pr-3 text-sm font-medium text-muted-foreground sm:pl-6"
            >
              Technology
            </th>
            <th
              scope="col"
              className="py-3 pr-3 text-right text-sm font-medium text-muted-foreground"
            >
              Energy bought
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-right text-sm font-medium text-muted-foreground sm:pr-6"
            >
              Cost a year
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ id, name }) => {
            const cost = annualFuelCost(id, market, rates);
            return (
              <tr key={id} className="border-b border-border/70 last:border-0">
                <th
                  scope="row"
                  className="py-3.5 pl-4 pr-3 text-left align-top font-normal sm:pl-6"
                >
                  <span className="text-[0.9375rem]">{name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {EFFICIENCY[id].basis}. Rated {EFFICIENCY[id].uef.toFixed(2)}.
                  </span>
                </th>
                <td className="apparatus py-3.5 pr-3 text-right align-top whitespace-nowrap text-muted-foreground">
                  {cost.purchased}
                </td>
                <td className="apparatus py-3.5 pr-4 text-right align-top whitespace-nowrap font-semibold sm:pr-6">
                  {usdRange(cost.range)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {note}
        <p className="mt-2">
          Assumes {DAILY_DRAW_GALLONS} gallons a day at {rates.setpointF}°F against a{" "}
          {meanInletF(market)}°F yearly mean incoming temperature, and a non-CARE gas
          household. On CARE, read every gas figure here as roughly a fifth lower.
        </p>
      </div>
    </div>
  );
}

/**
 * `Article` structured data, matching what the Resources pages already emit.
 *
 * Deliberately not `LocalBusiness`. This site is not a plumbing company and
 * must never be marked up as one, which is a licensing constraint rather than
 * an SEO preference. `Article` says what these pages actually are.
 */
export function LocalPageSchema({
  title,
  description,
  url,
  modified,
  siteName,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  modified: string;
  siteName: string;
  siteUrl: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified: modified,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName },
    mainEntityOfPage: url,
    isPartOf: {
      "@type": "CollectionPage",
      name: "Local water heater guides",
      url: `${siteUrl}/local`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
