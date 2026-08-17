import { cn } from "@/lib/utils";

/**
 * The set-point mark.
 *
 * A thermostat scale: thirteen ticks at 5°F steps running 90 through 150, which
 * is the range of an actual residential gas control. Six cool, six hot, and the
 * recommended setting standing between them.
 *
 * The point of drawing it this way is that it makes the site's two colours
 * *mean* something. Red anywhere on this site is rationed — it carries emergency
 * and "Not a fit" and nothing else, which is the argument AccentRule makes for
 * why the rules under headings are blue. A logo with a decorative red word in it
 * would spend that signal on every page. Here red is not decoration: it is the
 * hot end of a temperature scale, and it stays a hairline.
 *
 * 120°F is the midpoint for a real reason rather than a layout convenience.
 * Below it, water sits in the range where Legionella grows; above it, tap water
 * scalds faster than a child can pull away. The symmetry is the recommendation.
 *
 * The marker is 3px — the same stroke as the spine on VerdictCard. The mark and
 * the product make the same gesture: both point at the answer.
 */

/** Regular tick positions, cool then hot. The marker sits at 36, the midpoint. */
const COOL = [6, 16, 26];
const HOT = [46, 56, 66];

export function SetPointMark({
  className,
  width = 50,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 72 32"
      width={width}
      height={Math.round((width * 32) / 72)}
      aria-hidden
      focusable="false"
      fill="none"
      strokeLinecap="round"
      className={cn("shrink-0", className)}
    >
      {/* The axis. Without it the ticks read as a bar chart rather than a scale. */}
      <line x1="6" y1="24" x2="66" y2="24" stroke="currentColor" strokeOpacity="0.18" />

      <g strokeWidth="2.5">
        {COOL.map((x) => (
          <path key={x} d={`M${x} 24V16`} className="stroke-blue" />
        ))}
        {HOT.map((x) => (
          <path key={x} d={`M${x} 24V16`} className="stroke-flag-red" />
        ))}
      </g>

      {/* The recommendation. */}
      <path d="M36 26V4" strokeWidth="3.2" className="stroke-navy" />
    </svg>
  );
}
