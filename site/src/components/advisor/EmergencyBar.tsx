"use client";

import { Phone, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Emergency short-circuit.
 *
 * This is the only component in the system permitted to use urgency styling,
 * and it exists to solve the one real weakness of the reviewer register: a
 * homeowner standing over a leaking tank at 6am does not want an editorial
 * essay on efficiency.
 *
 * The fix is structural rather than stylistic. Rather than warming up the whole
 * site and diluting its independence, the emergency case gets its own visible
 * exit at the top of the page — and the educational pages below stay calm.
 *
 * V.3 fixed where it appears. Through V.2 it was rendered exactly once, on the
 * homepage, which is the page a panicking homeowner is *least* likely to land
 * on: that search arrives on a local page or a technology page, on a phone. The
 * one surface built for the emergency case was missing from every page where
 * the emergency case actually shows up.
 *
 * It now lives in the root layout and hides itself on /emergency, so it covers
 * every route including ones that do not exist yet.
 */
export default function EmergencyBar() {
  const pathname = usePathname();

  // Already there. Offering the exit from inside the exit is noise.
  if (pathname === "/emergency") return null;

  return (
    <aside
      data-print="hide"
      className="border-b border-verdict-unfit/25 bg-verdict-unfit-bg"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 sm:px-6 lg:px-8">
        <TriangleAlert
          aria-hidden
          className="size-4 shrink-0 text-verdict-unfit"
          strokeWidth={2.5}
        />
        <p className="text-sm font-medium">
          No hot water right now, or a tank that is leaking?
        </p>
        <Link
          href="/emergency"
          className="inline-flex min-h-8 items-center gap-1.5 rounded-md text-sm font-semibold text-verdict-unfit underline underline-offset-4 hover:brightness-110"
        >
          <Phone aria-hidden className="size-3.5" />
          Skip the research, get help today
        </Link>
      </div>
    </aside>
  );
}
