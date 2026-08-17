import { VerdictBadge } from "@/components/advisor/Verdict";

/**
 * Where is the water actually coming from?
 *
 * The page already says the right thing — a leak from a fitting is usually a
 * repair, a leak from the tank body is always a replacement, and no plumber can
 * patch corrosion. What it cannot do in prose is answer the question a homeowner
 * is actually holding: there is water on the floor and no obvious source, so
 * which of those two am I looking at?
 *
 * That distinction is worth roughly the difference between a service call and
 * four thousand dollars, and it is the single highest-stakes judgement anybody
 * makes on this site. It is also genuinely hard to make from a puddle.
 *
 * So: one unit, four places water comes from, colour-coded with the same verdict
 * scale the rest of the site uses. Three of them are serviceable parts. The
 * fourth is the tank, and the drawing puts it at the bottom where the water
 * actually appears — because the failure mode is that a homeowner sees water
 * under the unit, assumes the worst, and replaces a heater that needed a
 * fifteen-dollar drain valve. Or assumes the best, and mops for three weeks.
 *
 * Drawn as a gas unit because it is the most common. The leak points are
 * identical on an electric tank, which simply has no flue — noted below rather
 * than drawn twice.
 */

const POINTS = [
  {
    n: 1,
    label: "Cold inlet or hot outlet",
    verdict: "fit" as const,
    badge: "Often repairable",
    body: "The threaded connections on top. These can be resealed or replaced without touching the tank.",
  },
  {
    n: 2,
    label: "T&P valve or its discharge pipe",
    verdict: "fit" as const,
    badge: "Often repairable",
    body: "Worth saying: sometimes this valve is not broken. It is relieving pressure because something else is wrong, and that is a different repair — not a new heater.",
  },
  {
    n: 3,
    label: "Drain valve near the floor",
    verdict: "fit" as const,
    badge: "Often repairable",
    body: "A common failure and among the cheapest. Easy to mistake for the tank, because the water lands in the same place.",
  },
  {
    n: 4,
    label: "From under the tank, with every fitting dry",
    verdict: "unfit" as const,
    badge: "Replace it",
    body: "The tank has rusted through from the inside. This is corrosion rather than a part, and there is nothing to tighten or swap.",
  },
];

function Marker({ x, y, n, tone }: { x: number; y: number; n: number; tone: "fit" | "unfit" }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="11"
        className={tone === "fit" ? "fill-verdict-fit" : "fill-verdict-unfit"}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white"
        style={{ fontSize: "13px", fontWeight: 700 }}
      >
        {n}
      </text>
    </g>
  );
}

function LeakArt() {
  const stroke = "stroke-current";
  return (
    <svg
      viewBox="0 0 200 226"
      aria-hidden
      className="h-auto w-full max-w-[280px] text-ink"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Puddle first, so the tank sits on top of it. */}
      <path
        d="M52 205 Q64 196 86 198 Q104 200 122 197 Q146 194 156 204 Q142 212 100 213 Q62 213 52 205 Z"
        className="fill-verdict-unfit/15 stroke-verdict-unfit/45"
        strokeWidth="1.5"
      />

      <rect x="60" y="62" width="80" height="128" rx="9" strokeWidth="2.5" className={`${stroke} fill-blue/[0.06]`} />

      {/* Draft hood and flue. */}
      <path d="M70 62 L84 47 H116 L130 62" strokeWidth="2.5" className={stroke} />
      <path d="M84 47 V8 M116 47 V8" strokeWidth="2.5" className={stroke} />

      {/* Cold in and hot out, either side of the hood. */}
      <path d="M69 62 V40 H56" strokeWidth="2" className={stroke} />
      <path d="M131 62 V40 H144" strokeWidth="2" className={stroke} />

      {/* T&P valve and its discharge pipe. */}
      <rect x="140" y="76" width="15" height="11" rx="2" strokeWidth="2" className={stroke} />
      <path d="M155 82 H165 V150" strokeWidth="2" className={stroke} />

      {/* Gas control. */}
      <rect x="72" y="150" width="24" height="18" rx="2.5" strokeWidth="2" className={stroke} />

      {/* Drain valve. */}
      <path d="M60 176 H44" strokeWidth="2" className={stroke} />
      <circle cx="41" cy="176" r="4" strokeWidth="2" className={stroke} />

      <path d="M74 190 V200 M126 190 V200" strokeWidth="2" className={stroke} />

      <Marker x={56} y={28} n={1} tone="fit" />
      <Marker x={176} y={71} n={2} tone="fit" />
      <Marker x={28} y={162} n={3} tone="fit" />
      <Marker x={100} y={218} n={4} tone="unfit" />
    </svg>
  );
}

export function LeakPointDiagram() {
  return (
    <figure
      data-print="keep"
      className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-7"
    >
      <figcaption className="text-[1.0625rem] font-semibold">
        Find the source before you decide
      </figcaption>
      <p className="mt-1.5 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
        Three of these four are parts. The fourth is the tank. From a puddle on
        the floor they look identical, so dry everything you can reach, lay paper
        or a towel under the unit, and come back in an hour — whatever is wet
        again is your answer.
      </p>

      <div className="mt-7 grid gap-8 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-10">
        <div className="flex justify-center sm:justify-start">
          <LeakArt />
        </div>

        <ol className="space-y-5">
          {POINTS.map((p) => (
            <li key={p.n} className="flex gap-3.5">
              <span
                aria-hidden
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  p.verdict === "fit" ? "bg-verdict-fit" : "bg-verdict-unfit"
                }`}
              >
                {p.n}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <p className="text-[0.9375rem] font-semibold leading-snug">{p.label}</p>
                  <VerdictBadge verdict={p.verdict} label={p.badge} />
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-7 border-t border-border pt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
        Drawn as a gas unit because it is the most common. An electric tank has
        the same four points and no flue. On a gas unit, water can also be
        condensation rather than a leak — it shows up during long heating cycles
        and stops once the tank is up to temperature.
      </p>
    </figure>
  );
}
