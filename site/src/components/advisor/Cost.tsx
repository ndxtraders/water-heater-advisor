import { cn } from "@/lib/utils";

export interface CostLine {
  label: string;
  low: number;
  high: number;
  /** Shown when this line only applies to some homes. Most of the variance in
   *  a water heater quote lives in these conditional lines, not the appliance. */
  condition?: string;
  optional?: boolean;
}

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Line-item job modelling.
 *
 * The blueprint is explicit that the site must not publish a single headline
 * figure like "average Modesto tankless installation: $5,273" — the evidence
 * does not support that precision, and the number would be wrong for most
 * houses anyway.
 *
 * More usefully, a single number answers the wrong question. The homeowner is
 * not asking "what does tankless cost?" They are asking "what would tankless
 * cost *in my house*?" — and the answer is dominated by the conditional lines:
 * gas line capacity, venting, electrical, condensate. Breaking the job into
 * parts, with the conditions attached, is both more honest and more useful than
 * any average could be.
 */
export function CostBreakdown({
  title,
  lines,
  note,
}: {
  title: string;
  lines: CostLine[];
  note?: string;
}) {
  const base = lines.filter((l) => !l.optional);
  const baseLow = base.reduce((s, l) => s + l.low, 0);
  const baseHigh = base.reduce((s, l) => s + l.high, 0);
  const allHigh = lines.reduce((s, l) => s + l.high, 0);

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-6 py-5">
        <h3 className="text-xl">{title}</h3>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{title} — itemised cost ranges</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Range</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.label} className="border-b border-border/70">
              <th scope="row" className="py-3.5 pl-6 pr-4 font-normal align-top">
                <span
                  className={cn(
                    "text-[0.9375rem]",
                    line.optional && "text-muted-foreground",
                  )}
                >
                  {line.label}
                </span>
                {line.condition ? (
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {line.condition}
                  </span>
                ) : null}
              </th>
              <td
                className={cn(
                  "tabular py-3.5 pr-6 text-right text-[0.9375rem] whitespace-nowrap align-top",
                  line.optional && "text-muted-foreground",
                )}
              >
                {usd(line.low)}–{usd(line.high)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted/50">
            <th scope="row" className="py-4 pl-6 pr-4 text-left text-[0.9375rem]">
              Typical straightforward job
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                Required items only
              </span>
            </th>
            <td className="tabular py-4 pr-6 text-right font-semibold whitespace-nowrap">
              {usd(baseLow)}–{usd(baseHigh)}
            </td>
          </tr>
          <tr className="bg-muted/50 border-t border-border">
            <th scope="row" className="py-4 pl-6 pr-4 text-left text-[0.9375rem]">
              If every upgrade applies
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                Uncommon, but this is the ceiling
              </span>
            </th>
            <td className="tabular py-4 pr-6 text-right font-semibold whitespace-nowrap">
              up to {usd(allHigh)}
            </td>
          </tr>
        </tfoot>
      </table>

      {note ? (
        <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      ) : null}
    </div>
  );
}
