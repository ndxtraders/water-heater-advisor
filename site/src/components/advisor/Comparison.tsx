import { Check, Minus, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type Cell = string | { value: "yes" | "no" | "partial"; note?: string };

/**
 * Technology-vs-technology comparison.
 *
 * Comparison tables are a first-class design object here, not an afterthought.
 * They are the reason a homeowner visits a comparison page at all, and on most
 * competing sites they are an unstyled `<table>` dumped mid-article or, worse,
 * a screenshot.
 *
 * Responsive strategy: real table on desktop, stacked per-column cards on
 * mobile. Never a horizontal scroll — a table you have to drag sideways on a
 * phone is a table nobody reads, and this audience is heavily mobile.
 */
export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: { label: string; cells: Cell[] }[];
}) {
  return (
    <div>
      {/* Desktop */}
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[26%] pb-3" />
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="border-b-2 border-border pb-3 pl-5 font-heading text-lg font-normal"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border align-top last:border-0">
              <th
                scope="row"
                className="py-4 pr-5 text-sm font-medium text-muted-foreground"
              >
                {row.label}
              </th>
              {row.cells.map((cell, i) => (
                <td key={columns[i]} className="py-4 pl-5 text-[0.9375rem] leading-relaxed">
                  <CellContent cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile — one card per option, so the comparison is read vertically
          rather than dragged sideways. */}
      <div className="space-y-5 md:hidden">
        {columns.map((c, colIndex) => (
          <div key={c} className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 border-b border-border pb-3 text-xl">{c}</h3>
            <dl className="space-y-3">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-[0.9375rem] leading-relaxed">
                    <CellContent cell={row.cells[colIndex]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

const MARKS = {
  yes: { Icon: Check, className: "text-verdict-fit", label: "Yes" },
  no: { Icon: X, className: "text-verdict-unfit", label: "No" },
  partial: { Icon: Minus, className: "text-status-warn", label: "Sometimes" },
} as const;

function CellContent({ cell }: { cell: Cell }) {
  if (typeof cell === "string") return <>{cell}</>;

  const m = MARKS[cell.value];
  return (
    <span className="inline-flex items-start gap-2">
      <m.Icon
        aria-hidden
        className={cn("mt-0.5 size-4 shrink-0", m.className)}
        strokeWidth={2.75}
      />
      {/* The word travels with the mark. An icon-only cell is unreadable to a
          screen reader and ambiguous to everyone else. */}
      <span>{cell.note ?? m.label}</span>
    </span>
  );
}
