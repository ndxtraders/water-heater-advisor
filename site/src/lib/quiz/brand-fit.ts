import { BRAND_NAMES, brandsMaking, type BrandId } from "@/lib/brands";

import type { TechId } from "./engine";
import type { Answers } from "./questions";

export interface BrandFit {
  id: BrandId;
  name: string;
  /** Homeowner-facing reasons this brand suits *this* job. */
  reasons: string[];
  /** Something to check before committing. Not a reason to avoid. */
  caution?: string;
}

/**
 * Brand shortlisting, applied only after a technology has been chosen.
 *
 * Rules are drawn from the brand research dataset (checked 2026-08-07) and the
 * rule IDs are cited in comments so any suggestion here can be traced back to
 * its source record.
 *
 * Two constraints shape this. First, brand is downstream of feasibility, always
 * — nothing here can revive a technology the engine eliminated (rule R01).
 * Second, only rules whose conditions the quiz actually collects are
 * implemented. Several good rules in the dataset depend on answers we do not
 * ask for, such as whether the homeowner will keep up with descaling or which
 * brand they currently own. Those are listed at the bottom of this file rather
 * than being faked from adjacent answers, because a brand suggestion built on a
 * guess is worse than no suggestion.
 *
 * The output is a shortlist with reasons, never a single "best brand". The
 * research is explicit that the evidence does not support ranking these six on
 * reliability, and installed price is dominated by the house rather than the
 * badge.
 */
export function suggestBrands(tech: TechId, answers: Answers): BrandFit[] {
  const fits = new Map<BrandId, BrandFit>();

  const add = (id: BrandId, reason: string, caution?: string) => {
    const existing = fits.get(id);
    if (existing) {
      if (!existing.reasons.includes(reason)) existing.reasons.push(reason);
      if (caution && !existing.caution) existing.caution = caution;
      return;
    }
    fits.set(id, { id, name: BRAND_NAMES[id], reasons: [reason], caution });
  };

  // Only brands that actually make the recommended technology are eligible.
  const eligible = new Set(brandsMaking(tech));

  const inModesto = (answers.zip ?? "").startsWith("953");
  const converting = answers.current !== "tankless";

  if (tech === "gas-tankless") {
    // R14 / R15 — Noritz EZ line is designed for tank-to-tankless retrofit,
    // with top-mounted connections that can reuse existing tank plumbing.
    if (converting && eligible.has("noritz")) {
      add(
        "noritz",
        "Their retrofit line is built specifically for tank to tankless conversions, and the top mounted connections can often reuse the pipework your tank already uses",
      );
    }

    // R22 / R23 / R24 — verified service and supply presence around Modesto.
    if (inModesto) {
      for (const id of ["rinnai", "noritz", "ao-smith"] as BrandId[]) {
        if (eligible.has(id)) {
          add(id, "Has service and parts presence in the Modesto area, which matters more than the spec sheet the first time it throws a code");
        }
      }
    }

    // R12 — brands with recirculation designed in rather than bolted on.
    // R13 — and the warranty trap that comes with getting it wrong.
    for (const id of ["navien", "rinnai", "rheem", "noritz"] as BrandId[]) {
      if (eligible.has(id)) {
        add(
          id,
          "Offers recirculation as part of the system rather than an add on, if you want hot water fast at distant taps",
        );
      }
    }
    const navien = fits.get("navien");
    if (navien) {
      navien.caution =
        "If you add recirculation, confirm it is a controlled loop. An uncontrolled one materially reduces the heat exchanger warranty on this line.";
    }
  }

  if (tech === "heat-pump") {
    // R26 — 120V models avoid adding a 240V circuit, which is often the single
    // largest line in a heat pump conversion.
    const noSpareCircuit = answers.electrical === "full" || answers.electrical === "unsure";
    if (noSpareCircuit) {
      for (const id of ["rheem", "ao-smith"] as BrandId[]) {
        if (eligible.has(id)) {
          add(
            id,
            "Has a current 120V model, which can avoid running a new 240V circuit. That is often the biggest single line in a heat pump conversion",
            "A 120V unit still has to pass the demand test for your household. Ask your installer to check the first hour rating against how much hot water you actually use.",
          );
        }
      }
    }

    // R25 — Rheem heat pump service signal, Modesto.
    if (inModesto && eligible.has("rheem")) {
      add("rheem", "Verified heat pump service presence in the Modesto area");
    }

    // R40 — a Navien preference must not be dropped just because the engine
    // chose a heat pump. Their current line covers 50, 65 and 80 gallon.
    if (answers.brand === "navien" && eligible.has("navien")) {
      add(
        "navien",
        "You mentioned Navien, and their current heat pump line runs 50, 65 and 80 gallon, so your preference still works here",
        "Needs roughly 450 cubic feet of air around it unless it is ducted. Worth confirming the space before ordering.",
      );
    }
  }

  if (tech === "gas-tank" || tech === "electric-tank") {
    // R24 — A. O. Smith service presence, all technologies.
    if (inModesto && eligible.has("ao-smith")) {
      add("ao-smith", "Broad local service and parts presence in the Modesto area");
    }
    // R38 — on an urgent like-for-like replacement, what is actually in stock
    // beats brand preference. Said plainly rather than implied.
    if (answers.status === "failed" || answers.status === "leaking") {
      for (const id of eligible) {
        add(
          id,
          "On an urgent replacement, availability matters more than brand. Take what your contractor can fit today in the right size",
        );
      }
    }
  }

  // A brand the homeowner named and that makes this technology goes first.
  const preferred = answers.brand;
  return [...fits.values()]
    .filter((f) => eligible.has(f.id))
    .sort((a, b) => {
      if (a.id === preferred) return -1;
      if (b.id === preferred) return 1;
      return b.reasons.length - a.reasons.length;
    })
    .slice(0, 3);
}

/**
 * Rules in the dataset that are deliberately not implemented, and why.
 *
 *   R19  A. O. Smith scale handling      needs: maintenance intent
 *   R20  maintenance-averse penalty      needs: maintenance intent
 *   R32  same-brand replacement bonus    needs: which brand do you have now?
 *   R33  Bradford White channel fit      needs: do you want to buy the unit yourself?
 *   R28  A. O. Smith outdoor split       needs: is an outdoor location possible?
 *   R16  outdoor tankless approval       needs: the same question
 *
 * ## On the maintenance rules, R19 and R20
 *
 * The obvious fix is to ask "will you keep up with descaling?" We are not going
 * to. It asks a homeowner to predict their own future diligence about a
 * maintenance task most of them have never heard of, and the honest answer from
 * almost everyone is an optimistic yes. A question that reliably returns the
 * same answer is not collecting information, it is collecting noise, and then
 * routing on it would make things worse rather than better.
 *
 * Descaling is handled instead as a disclosed cost of ownership. The results
 * page and the tankless pages state that the unit needs annual service and why,
 * so the homeowner factors it in with everything else rather than being asked
 * to certify their own future behaviour.
 *
 * R32 and R28 are the better candidates if a question is ever added, because
 * both ask about a present fact the homeowner can simply look at.
 */
export const UNIMPLEMENTED_RULES = [
  "R16",
  "R19",
  "R20",
  "R28",
  "R32",
  "R33",
] as const;
