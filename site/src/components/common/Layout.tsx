import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  };
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}

/**
 * Section tones.
 *
 * The band rhythm is doing most of the work. v1 alternated white and a flat
 * neutral grey, which reads static — every section the same weight, nothing
 * arriving. Running white → tint → dark instead gives the page momentum and
 * lets a dark band mark the moments that matter (the trust bar, the mid-page
 * decision point, the closing call).
 *
 * `dark` inverts its own text colours so callers never have to remember to.
 */
export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "tint" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "tint" && "bg-tint",
        tone === "dark" && "bg-navy-deep text-white [&_h2]:text-white [&_h3]:text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Long-form editorial wrapper. Caps the measure; tables and quiz UI opt out. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Full ink, not 85%. Long-form explanation is the product; running the
        // product at reduced opacity was costing readability for no gain.
        "max-w-measure text-[1.0625rem] leading-[1.75] text-foreground",
        "[&_p]:mb-5 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl [&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-xl",
        "[&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-blue",
        "[&_a]:text-blue [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:text-blue-bright",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Pill badge. Replaces the bare uppercase eyebrow from v1 — the pill has more
 * presence at the top of a section and gives an icon somewhere to live.
 */
export function Eyebrow({
  children,
  icon: Icon,
  tone = "light",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5",
        "text-xs font-bold uppercase tracking-[0.1em]",
        tone === "dark" ? "bg-white/10 text-white/90" : "bg-blue/10 text-blue",
      )}
    >
      {Icon ? <Icon aria-hidden className="size-3.5" /> : null}
      {children}
    </span>
  );
}

/**
 * Short rule beneath a section heading.
 *
 * Lifted from the J. Hart pattern, where it is red. Here it is blue. Not because
 * red is forbidden — §3 no longer says that — but because a rule under every
 * heading is the definition of decoration, and decoration is the one thing red
 * should not be spent on. The device survives the translation; the colour does
 * not.
 *
 * That argument was written in V.2 and then contradicted two lines below it: the
 * dark variant rendered in flag red, which is the same decorative spend on the
 * bands where it is most visible. V.3 makes the dark rule white.
 */
export function AccentRule({
  align = "left",
  tone = "light",
}: {
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "mt-4 h-1 w-14 rounded-full",
        tone === "dark" ? "bg-white/80" : "bg-blue",
        align === "center" && "mx-auto",
      )}
    />
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <header className={cn("mb-12", align === "center" && "text-center")}>
      {eyebrow ? (
        <Eyebrow icon={eyebrowIcon} tone={tone}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2 className={cn("text-3xl sm:text-4xl", tone === "dark" && "text-white")}>{title}</h2>
      <AccentRule align={align} tone={tone} />
      {lead ? (
        <p
          className={cn(
            // Navy, not muted grey. The lead is the first sentence a homeowner
            // actually reads; running it at 7:1 grey was the single most
            // visible place the site failed its own "readable black" brief.
            "mt-5 max-w-measure text-lg leading-relaxed",
            tone === "dark" ? "text-white/75" : "text-navy",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}

/**
 * Card surface. rounded-2xl and one quiet shadow.
 *
 * v1 was near-flat with borders doing all the separation, on the argument that
 * heavy shadows are a marketing idiom. That was too austere — flat cards on a
 * flat background is what made the site feel like a document rather than a
 * tool. One shadow, and borders still do most of the work.
 *
 * The `interactive` hover-lift prop is gone in V.3: no caller ever passed it,
 * and a card that lifts without navigating anywhere is an affordance that lies.
 * TechnologyCard, which does navigate, keeps its lift.
 */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06),0_1px_2px_rgba(11,33,67,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Tinted rounded square holding a lucide icon.
 *
 * Only where the icon encodes something — emergency, status, a verdict. It is
 * not a decoration to hang on every card; when every card has an anchor, none
 * of them is one.
 *
 * The `green` tone is gone with the rest of the green.
 */
export function IconChip({
  icon: Icon,
  tone = "blue",
}: {
  icon: LucideIcon;
  tone?: "blue" | "red" | "dark";
}) {
  const tones = {
    blue: "bg-blue/10 text-blue",
    red: "bg-flag-red/10 text-flag-red",
    dark: "bg-white/10 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-xl",
        tones[tone],
      )}
    >
      <Icon aria-hidden className="size-6" strokeWidth={2} />
    </span>
  );
}
