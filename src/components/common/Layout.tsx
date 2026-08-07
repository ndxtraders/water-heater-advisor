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
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[width], className)}>
      {children}
    </div>
  );
}

/**
 * Section rhythm from DESIGN-SYSTEM.md §5. Whitespace does real work in the
 * reviewer register — it is most of what makes a page read as considered rather
 * than crowded.
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
  tone?: "paper" | "muted";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "muted" && "bg-muted/40 border-y border-border",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Long-form editorial wrapper. Caps the measure at 68ch — comparison tables and
 * quiz UI opt out because they are scanned, not read.
 */
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
        "max-w-measure text-[1.0625rem] leading-[1.7] text-foreground/85",
        "[&_p]:mb-5 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl [&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-xl",
        "[&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-muted-foreground",
        "[&_a]:text-blue [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:text-blue-bright",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small uppercase label. Sets context above a heading without competing with it. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cn("mb-12", align === "center" && "text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 max-w-measure text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
