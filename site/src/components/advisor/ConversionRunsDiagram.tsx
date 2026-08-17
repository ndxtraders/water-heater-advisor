/**
 * Why two identical houses get quotes thousands apart.
 *
 * The page argues, correctly, that "what does tankless cost" is the wrong
 * question — the unit is frequently the cheapest line on the quote, and gas,
 * venting, a circuit and condensate routinely add more than the appliance. The
 * argument is right and it is also abstract. A homeowner reading it still has
 * no idea whether their house is the cheap one or the expensive one.
 *
 * What makes it concrete is that all four of those costs are *runs*. The unit
 * has a fixed price; the distance from it to an exterior wall, to the meter, to
 * the panel and to a drain does not. That is the whole explanation for the
 * spread between two houses on the same street, and it is spatial, so it draws
 * far better than it reads.
 *
 * The closing line is the one that does the work: a like-for-like tank swap
 * reuses all four. That difference *is* the conversion cost.
 *
 * No dollar figures here on purpose — the itemised breakdown lives in
 * CostBreakdown, where every line carries its own source and checked date.
 */

const RUNS = [
  {
    n: 1,
    label: "Venting",
    body: "Sealed and dedicated. It cannot reuse the flue the old tank vented through, so the cost is however far the unit sits from an exterior wall. On an outside wall this is cheap. In an interior closet it is not.",
  },
  {
    n: 2,
    label: "Gas supply",
    body: "A tankless burner asks for several times what a storage tank does, because it heats on demand instead of slowly. If the existing line cannot carry that, it gets upsized — and not just at the unit. Back to the meter.",
  },
  {
    n: 3,
    label: "Dedicated circuit",
    body: "Even a gas unit needs power for its controls and fan. The cost is the run from your panel, plus whatever the panel needs if it has no room left.",
  },
  {
    n: 4,
    label: "Condensate drain",
    body: "A condensing unit produces acidic water as it runs. That needs a drain within reach, often a neutraliser, and sometimes a pump if the unit sits below the nearest drain.",
  },
];

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10.5" className="fill-blue" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white"
        style={{ fontSize: "12px", fontWeight: 700 }}
      >
        {n}
      </text>
    </g>
  );
}

function RunsArt() {
  const line = "stroke-current";
  return (
    <svg
      viewBox="0 0 340 212"
      aria-hidden
      className="mx-auto h-auto w-full max-w-[520px] text-ink"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Exterior wall and floor, so "distance to outside" has something to be
          measured against. */}
      <path d="M22 12 V186 M30 12 V186" strokeWidth="2" className={`${line} opacity-45`} />
      <path
        d="M22 24 L30 16 M22 40 L30 32 M22 56 L30 48 M22 72 L30 64 M22 88 L30 80 M22 104 L30 96 M22 120 L30 112 M22 136 L30 128 M22 152 L30 144 M22 168 L30 160"
        strokeWidth="1.25"
        className={`${line} opacity-25`}
      />
      <path d="M12 186 H330" strokeWidth="1.5" className={`${line} opacity-30`} />

      {/* The four runs, drawn before the unit so they tuck behind it. One per
          quadrant: the first version sent gas and condensate along the same
          edge, fourteen units apart, and they read as one ambiguous tangle. */}
      <path d="M177 74 V40 H32" strokeWidth="2" className={line} />
      <path d="M186 140 V162 H296" strokeWidth="2" className={line} />
      <path d="M204 94 H268 V52" strokeWidth="2" className={line} />
      <path d="M162 140 V178 H106" strokeWidth="2" className={line} />

      {/* Wall penetration for the vent. */}
      <rect x="18" y="34" width="16" height="12" rx="2" strokeWidth="2" className={`${line} fill-background`} />

      {/* Panel. */}
      <rect x="255" y="26" width="26" height="26" rx="2.5" strokeWidth="2" className={`${line} fill-background`} />
      <path d="M261 35 H275 M261 42 H275" strokeWidth="1.75" className={line} />

      {/* Meter. */}
      <rect x="296" y="150" width="26" height="26" rx="3" strokeWidth="2" className={`${line} fill-background`} />
      <circle cx="309" cy="163" r="6.5" strokeWidth="1.75" className={line} />

      {/* Drain. */}
      <ellipse cx="98" cy="178" rx="9" ry="4.5" strokeWidth="2" className={line} />
      <path d="M93 178 H103" strokeWidth="1.5" className={`${line} opacity-50`} />

      {/* The unit itself — deliberately the smallest thing on the drawing. */}
      <rect x="150" y="74" width="54" height="66" rx="5" strokeWidth="2.5" className={`${line} fill-blue/[0.07]`} />
      <rect x="163" y="86" width="28" height="13" rx="2" strokeWidth="2" className={line} />
      <path d="M150 120 H204" strokeWidth="2" className={line} />

      <Marker x={100} y={40} n={1} />
      <Marker x={248} y={162} n={2} />
      <Marker x={268} y={80} n={3} />
      <Marker x={132} y={178} n={4} />
    </svg>
  );
}

export function ConversionRunsDiagram() {
  return (
    <figure
      data-print="keep"
      className="rounded-xl border border-border bg-card p-5 sm:p-7"
    >
      <figcaption className="text-[1.0625rem] font-semibold">
        The unit is the cheapest part. These four are runs.
      </figcaption>
      <p className="mt-1.5 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
        A tankless heater costs what it costs. The distance from it to an
        exterior wall, to your gas meter, to your panel and to a drain does not —
        and that is the entire reason two identical houses on the same street get
        quotes thousands of dollars apart.
      </p>

      <div className="mt-7">
        <RunsArt />

        <ol className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {RUNS.map((r) => (
            <li key={r.n} className="flex gap-3.5">
              <span
                aria-hidden
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue text-xs font-bold text-white"
              >
                {r.n}
              </span>
              <div>
                <p className="text-[0.9375rem] font-semibold leading-snug">{r.label}</p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-7 border-t border-border pt-4 text-[0.9375rem] leading-relaxed">
        A like-for-like tank swap reuses all four — the existing flue, a gas line
        already sized for it, no new circuit, no condensate.{" "}
        <span className="font-semibold">
          That difference is the conversion cost, not the appliance.
        </span>
      </p>
    </figure>
  );
}
