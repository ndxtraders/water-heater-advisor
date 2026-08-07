import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "emergency";
type Size = "md" | "lg";

/**
 * Written rather than inherited from shadcn, whose default button is `h-8`.
 * That is an application-chrome size. Half this audience is on a phone and some
 * of them are standing in a garage next to a leaking tank, so every control
 * clears the 44px target floor from DESIGN-SYSTEM.md §8.
 */
const VARIANTS: Record<Variant, string> = {
  // Copper, not ink, so the single primary action on a page is the one thing
  // wearing the accent colour. Scarcity is what makes it read as the action.
  primary:
    "bg-copper text-white hover:bg-copper-bright active:translate-y-px shadow-xs",
  secondary:
    "bg-transparent text-foreground border border-input hover:bg-muted active:translate-y-px",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
  // The only place urgency styling is permitted anywhere in the system.
  emergency:
    "bg-verdict-unfit text-white hover:brightness-110 active:translate-y-px shadow-xs",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-4 text-[0.9375rem] gap-2",
  lg: "min-h-13 px-6 text-base gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-md font-medium tracking-tight " +
  "transition-[background-color,filter,transform] duration-150 ease-out " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
