import { SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";

/**
 * Why the room decides whether a heat pump is possible.
 *
 * This question looks like bookkeeping — where is the thing installed — and it
 * is the most consequential answer in the quiz after the technology itself. The
 * engine *eliminates* heat pump outright for an interior closet: "rarely has
 * the air volume a heat pump needs, and ducting it is expensive." A homeowner
 * who answers loosely here loses a whole technology, or gets recommended one
 * their house cannot take.
 *
 * The question's own `why` text already states the mechanism: a heat pump needs
 * air around it. What it cannot do is convey how *much*, because a figure in
 * cubic feet is not a quantity anybody can picture. So the drawing keeps the
 * unit identical across all three panels and shrinks the room around it. Same
 * appliance, three rooms, and the problem is immediately obvious.
 *
 * On the number: the site has exactly one manufacturer air-volume figure it has
 * actually checked — Navien's NWP500 at 450 cu ft — and `research/` still lists
 * minimum air volume as an open question across the rest of the field. So that
 * one figure is given with its source and its check date, framed as the one
 * model we have confirmed rather than as a rule for the category. Stating a
 * generic requirement here would be inventing a spec, which is the exact habit
 * this site exists to be the opposite of.
 */

const CHECKED = "7 Aug 2026";

type Room = {
  key: string;
  name: string;
  verdict: "fit" | "unfit";
  badge: string;
  /** Room rect in the shared 160x140 viewBox. Floor is always y=126. */
  room: { x: number; y: number; w: number };
  duct?: boolean;
  door?: boolean;
  body: string;
};

const ROOMS: Room[] = [
  {
    key: "garage",
    name: "Garage",
    verdict: "fit",
    badge: "Close to ideal",
    room: { x: 6, y: 16, w: 148 },
    door: true,
    body: "Far more air than the unit can use, and the cool exhaust is no problem in a space nobody sits in.",
  },
  {
    key: "utility",
    name: "Utility or laundry room",
    verdict: "fit",
    badge: "Usually fine",
    room: { x: 30, y: 34, w: 100 },
    body: "Normally enough on its own. Worth checking the ceiling height, because these units are tall.",
  },
  {
    key: "closet",
    name: "Interior closet",
    verdict: "unfit",
    badge: "Rules it out",
    room: { x: 58, y: 38, w: 44 },
    duct: true,
    body: "Not enough air to draw from. It can be ducted to a larger space, but that is expensive enough that the recommendation usually goes elsewhere.",
  },
];

function RoomArt({ room, duct, door }: { room: Room["room"]; duct?: boolean; door?: boolean }) {
  const line = "stroke-current";
  const FLOOR = 126;
  const unitX = room.x + room.w - 34;
  const capY = 58;

  return (
    <svg
      viewBox="0 0 160 140"
      aria-hidden
      className="h-auto w-full text-ink"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The room. Air is tinted, so "how much blue" reads as "how much air"
          without anybody having to convert cubic feet into anything. */}
      <rect
        x={room.x}
        y={room.y}
        width={room.w}
        height={FLOOR - room.y}
        rx="2"
        strokeWidth="2"
        className={`${line} fill-blue/[0.05]`}
      />

      {/* A garage door on the wide one, so the biggest panel reads as a place
          rather than as an anonymous rectangle. */}
      {door ? (
        <g className={`${line} opacity-35`} strokeWidth="1.5">
          <path d={`M${room.x + 10} ${room.y + 16} H${room.x + 62}`} />
          <path d={`M${room.x + 10} ${room.y + 34} H${room.x + 62}`} />
          <path d={`M${room.x + 10} ${room.y + 52} H${room.x + 62}`} />
          <path d={`M${room.x + 10} ${room.y + 8} V${FLOOR} M${room.x + 62} ${room.y + 8} V${FLOOR}`} />
        </g>
      ) : null}

      {/* The unit, identical in every panel. That is the whole argument. */}
      <rect x={unitX} y={capY} width="28" height="20" rx="6" strokeWidth="2" className={`${line} fill-background`} />
      <path d={`M${unitX + 6} ${capY + 7} H${unitX + 22} M${unitX + 6} ${capY + 13} H${unitX + 22}`} strokeWidth="1.5" className={line} />
      <rect x={unitX + 2} y={capY + 18} width="24" height={FLOOR - capY - 18} rx="4" strokeWidth="2" className={`${line} fill-background`} />

      {/* Ducting: the closet's only way out, drawn last and punched through the
          ceiling so it is visibly leaving the room rather than stopping at it. */}
      {duct ? (
        <>
          <rect
            x={unitX + 2}
            y={room.y - 3}
            width="24"
            height="6"
            className="fill-background"
          />
          <path
            d={`M${unitX + 6} ${capY} V4 M${unitX + 22} ${capY} V4`}
            strokeWidth="2"
            strokeDasharray="5 4"
            className={line}
          />
        </>
      ) : null}

      <path d={`M0 ${FLOOR} H160`} strokeWidth="1.5" className={`${line} opacity-30`} />
    </svg>
  );
}

export function AirVolumeDiagram() {
  return (
    <figure data-print="keep" className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
      <figcaption className="text-[0.9375rem] font-semibold">
        Same unit, three rooms
      </figcaption>
      <p className="mt-1.5 max-w-measure text-sm leading-relaxed text-muted-foreground">
        A heat pump water heater makes hot water by pulling heat out of the air
        around it, so it needs a supply of air to pull from. The appliance is the
        same size in all three drawings below. The room is what changes.
      </p>

      <ul className="mt-6 grid gap-x-5 gap-y-7 sm:grid-cols-3">
        {ROOMS.map((r) => (
          <li key={r.key}>
            <RoomArt room={r.room} duct={r.duct} door={r.door} />
            <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <p className="text-[0.9375rem] font-semibold leading-snug">{r.name}</p>
              <VerdictBadge verdict={r.verdict} label={r.badge} />
            </div>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {r.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-border pt-4">
        <p className="max-w-measure text-[0.8125rem] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">How much air, in numbers.</span>{" "}
          One model we have checked, Navien&rsquo;s NWP500, needs at least 450 cubic
          feet unless it is ducted — roughly a 7½ by 7½ foot room with an
          eight-foot ceiling. Requirements differ by manufacturer and model, and
          this is the only figure we have confirmed, so treat it as a sense of
          scale rather than a threshold your unit must clear.
        </p>
        <SourceNote
          source="Navien NWP500 installation requirements"
          checked={CHECKED}
        />
      </div>
    </figure>
  );
}
