/**
 * "What do I have?" — the four types, by the one feature you can see.
 *
 * The quiz asks what kind of water heater is installed, and that answer drives
 * more of the recommendation than any other single input. It also ships with an
 * "I am not sure" escape hatch, which is the honest thing to offer and a dead
 * end for the engine: an unsure answer costs the homeowner specificity in every
 * result that follows.
 *
 * Prose cannot fix that. "A gas unit vents combustion gases through a flue"
 * means nothing to somebody standing in a garage holding a phone. A silhouette
 * with the flue drawn on it is instant.
 *
 * So each drawing calls out exactly one tell — the single feature that
 * distinguishes it from the other three at a glance, visible without tools,
 * without moving anything, and without reading a label. Nothing here asserts a
 * dimension or a brand-specific detail, because those vary and a diagram that
 * is confidently wrong is worse than no diagram.
 *
 * Drawn rather than photographed for three reasons: a photograph of an
 * installation implies we performed it, line work prints cleanly on the sheet a
 * homeowner carries to their contractor, and `currentColor` means these inherit
 * the palette and the print stylesheet for free.
 */

const S = {
  fill: "fill-blue/[0.06]",
  stroke: "stroke-current",
} as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 170"
      aria-hidden
      className="h-auto w-full max-w-[124px] text-ink"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
      {/* Floor. Gives every unit a common baseline so the height differences
          between them — which are themselves a tell — read as real. */}
      <path d="M6 163 H114" strokeWidth="1.5" className="stroke-current opacity-25" />
    </svg>
  );
}

/** Gas storage tank. The tell is the flue. */
function GasTank() {
  return (
    <Frame>
      <rect x="34" y="56" width="52" height="98" rx="7" strokeWidth="2.5" className={`${S.stroke} ${S.fill}`} />
      {/* Draft hood, then the flue leaving the top. */}
      <path d="M41 56 L52 42 H68 L79 56" strokeWidth="2.5" className={S.stroke} />
      <path d="M52 42 V9 M68 42 V9" strokeWidth="2.5" className={S.stroke} />
      {/* T&P discharge off the side. */}
      <path d="M86 68 H97 V99" strokeWidth="2" className={S.stroke} />
      {/* Gas supply and control valve. */}
      <path d="M86 130 H105" strokeWidth="2" className={S.stroke} />
      <circle cx="98" cy="130" r="3.5" strokeWidth="2" className={S.stroke} />
      <rect x="43" y="124" width="20" height="16" rx="2.5" strokeWidth="2" className={S.stroke} />
      <path d="M45 154 V163 M75 154 V163" strokeWidth="2" className={S.stroke} />
    </Frame>
  );
}

/** Electric storage tank. The tell is the absence of a flue, plus the panels. */
function ElectricTank() {
  return (
    <Frame>
      <rect x="34" y="56" width="52" height="98" rx="7" strokeWidth="2.5" className={`${S.stroke} ${S.fill}`} />
      {/* Cold in, hot out. Nothing else leaves the top. */}
      <path d="M48 56 V42 M72 56 V42" strokeWidth="2.5" className={S.stroke} />
      {/* Electrical conduit. */}
      <rect x="54" y="46" width="13" height="10" rx="2" strokeWidth="2" className={S.stroke} />
      <path d="M60 46 V34" strokeWidth="2" className={S.stroke} />
      {/* The two element access panels. */}
      <rect x="45" y="78" width="19" height="14" rx="2" strokeWidth="2" className={S.stroke} />
      <rect x="45" y="112" width="19" height="14" rx="2" strokeWidth="2" className={S.stroke} />
      <path d="M45 154 V163 M75 154 V163" strokeWidth="2" className={S.stroke} />
    </Frame>
  );
}

/** Tankless. The tell is that there is no tank. */
function Tankless() {
  return (
    <Frame>
      {/* Wall, so the scale reads as wall-mounted rather than small-and-floor-standing. */}
      <path d="M16 9 V163" strokeWidth="1.5" className="stroke-current opacity-25" />
      <rect x="40" y="47" width="46" height="61" rx="5" strokeWidth="2.5" className={`${S.stroke} ${S.fill}`} />
      <path d="M40 92 H86" strokeWidth="2" className={S.stroke} />
      <rect x="52" y="58" width="22" height="11" rx="2" strokeWidth="2" className={S.stroke} />
      {/* Vent out of the top. */}
      <path d="M56 47 V11 M70 47 V11" strokeWidth="2.5" className={S.stroke} />
      {/* Water and gas below, running back to the wall. */}
      <path d="M51 108 V126 H24" strokeWidth="2" className={S.stroke} />
      <path d="M63 108 V120" strokeWidth="2" className={S.stroke} />
      <path d="M75 108 V120" strokeWidth="2" className={S.stroke} />
    </Frame>
  );
}

/** Heat pump. The tell is the unit sitting on top of the tank. */
function HeatPump() {
  return (
    <Frame>
      <rect x="34" y="62" width="52" height="92" rx="7" strokeWidth="2.5" className={`${S.stroke} ${S.fill}`} />
      {/* The compressor and evaporator, which is what makes these unmistakable
          and also what makes them tall enough to fail a closet. */}
      <rect x="28" y="28" width="64" height="34" rx="6" strokeWidth="2.5" className={`${S.stroke} ${S.fill}`} />
      <path d="M36 39 H58 M36 45 H58 M36 51 H58" strokeWidth="2" className={S.stroke} />
      <circle cx="75" cy="45" r="9" strokeWidth="2" className={S.stroke} />
      {/* Condensate drain — the line a garage install has to have somewhere to go. */}
      <path d="M86 78 H98 V146 H109" strokeWidth="2" className={S.stroke} />
      <path d="M45 154 V163 M75 154 V163" strokeWidth="2" className={S.stroke} />
    </Frame>
  );
}

const TYPES = [
  {
    name: "Gas tank",
    Art: GasTank,
    tell: "A metal flue pipe leaving the top, going up into the ceiling or out a wall.",
  },
  {
    name: "Electric tank",
    Art: ElectricTank,
    tell: "No flue anywhere. Usually two small bolted panels on the side.",
  },
  {
    name: "Tankless",
    Art: Tankless,
    tell: "A box on the wall, roughly the size of a carry-on. Nothing stores water.",
  },
  {
    name: "Heat pump",
    Art: HeatPump,
    tell: "A fan and compressor unit sitting on top of the tank. Taller than the rest.",
  },
];

export function IdentifyDiagram() {
  return (
    <figure data-print="keep" className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
      <figcaption className="mb-1 text-[0.9375rem] font-semibold">
        Not sure? Look for one thing on each.
      </figcaption>
      <p className="mb-5 max-w-measure text-sm leading-relaxed text-muted-foreground">
        You do not need the model number for this question — just what leaves the
        top of the unit.
      </p>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4">
        {TYPES.map(({ name, Art, tell }) => (
          <li key={name} className="flex flex-col items-center text-center">
            <Art />
            <p className="mt-3 text-[0.9375rem] font-semibold leading-snug">{name}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {tell}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-border pt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
        Still not sure after looking? Answer{" "}
        <span className="font-medium text-foreground">I am not sure</span> — the
        recommendation still works, it just carries a wider cost range until an
        installer confirms it on site.
      </p>
    </figure>
  );
}
