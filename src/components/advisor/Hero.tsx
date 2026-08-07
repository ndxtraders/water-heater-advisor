import {
  CalendarCheck,
  FileSearch,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Homepage hero. Light, split, with the quiz live on the right.
 *
 * Replaces a full-bleed navy slab. Two problems with that slab: it was the
 * heaviest treatment in the system used at the very front door, and it
 * contained nothing that told a homeowner arriving from "tankless water heater
 * modesto" that they had landed somewhere relevant.
 *
 * The reference plumbing site solves the same problem with a photograph of the
 * work under a navy gradient. We cannot — there is no crew to photograph and
 * implying one would misrepresent what this business does. The quiz is the
 * equivalent asset, so it goes above the fold rather than behind a button.
 *
 * Navy is not gone, it is relocated. It now marks the "where we differ" band
 * further down, where a dark section reads as a turn in the argument rather
 * than a wall at the entrance.
 */
export function HeroSplit({
  tagline,
  heading,
  subheading,
  aside,
}: {
  tagline: ReactNode;
  heading: ReactNode;
  subheading: ReactNode;
  aside: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-gradient-to-b from-tint to-background">
      <div
        aria-hidden
        className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-blue/[0.07] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {/* Tagline rather than a short label. It has to do the "right
                place" work that a hero photograph would normally do, so it says
                what the site is and where it operates before the headline asks
                a question. Sentence case, not uppercase — at this length
                uppercase stops being readable. */}
            <p className="mb-5 inline-flex items-start gap-2 rounded-full bg-blue/10 px-3.5 py-2 text-[0.8125rem] font-semibold leading-snug text-blue">
              <ShieldCheck aria-hidden className="mt-px size-4 shrink-0" />
              {tagline}
            </p>

            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              {heading}
            </h1>

            <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {subheading}
            </p>
          </div>

          <div className="lg:pl-2">{aside}</div>
        </div>
      </div>
    </header>
  );
}

/**
 * Dark hero, kept for interior pages.
 *
 * Adapted from the J. Hart pattern — deep navy field, subtle dot texture,
 * heavy sans headline, two CTAs. It solves v1's real problem: a hero set in
 * serif on near-white paper had no arrival, so the page opened at the same
 * visual weight it maintained throughout.
 *
 * What is not borrowed: the background photograph of a van and a technician.
 * A dark field and a claim is the advisor version. There is no crew to show,
 * and pretending otherwise is the exact impression the site must not give.
 */
export function Hero({
  eyebrow,
  heading,
  subtitle,
  children,
}: {
  eyebrow?: string;
  heading: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-navy-deep">
      {/* Texture at 3.5% so it reads as surface rather than pattern. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Warmth in the corner so the navy is not a flat slab. */}
      <div
        aria-hidden
        className="absolute -right-40 -top-40 size-[32rem] rounded-full bg-blue/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        {eyebrow ? (
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white/90">
            {eyebrow}
          </span>
        ) : null}

        <h1 className="max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
          {heading}
        </h1>

        <div aria-hidden className="mt-6 h-1 w-16 rounded-full bg-flag-red-light" />

        {subtitle ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>
        ) : null}

        {children}
      </div>
    </header>
  );
}

interface TrustItem {
  icon: LucideIcon;
  label: string;
}

/**
 * Trust bar.
 *
 * The device is lifted wholesale from the contractor site, where it reads
 * "Family-Owned Since 1984 · Licensed & Insured · Same-Day Service". That
 * content would be a lie here and a CSLB problem besides.
 *
 * The advisor version makes the same move with the site's actual claims. Every
 * one of these is falsifiable and every one is a thing no plumber's site can
 * say, which is what makes the bar worth the space.
 */
const DEFAULT_ITEMS: TrustItem[] = [
  { icon: ShieldCheck, label: "We do not install anything" },
  { icon: FileSearch, label: "Every figure sourced and dated" },
  { icon: UserRoundCheck, label: "One installer, not four" },
  { icon: CalendarCheck, label: "Recommendation before contact details" },
];

export function TrustBar({
  items = DEFAULT_ITEMS,
  className,
}: {
  items?: TrustItem[];
  className?: string;
}) {
  return (
    <div className={cn("relative border-y border-white/10 bg-navy py-4", className)}>
      <div className="flex items-center gap-0 overflow-x-auto px-4 md:justify-center">
        {items.map((item, i) => (
          <div key={item.label} className="flex shrink-0 items-center">
            {i > 0 ? (
              <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />
            ) : null}
            <div className="flex items-center gap-2.5 px-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <item.icon aria-hidden className="size-4 text-flag-red-light" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium whitespace-nowrap text-white/90">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
