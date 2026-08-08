import { brandMismatch } from "@/lib/brands";
import { designRiseF, riseExplanation } from "@/lib/market";

import { suggestBrands, type BrandFit } from "./brand-fit";

import type { Answers } from "./questions";
import { hasAuthority, isUrgent } from "./questions";

/**
 * Upper bound of each budget band, in dollars. `null` means they declined.
 *
 * Boundaries sit where the realistic answer changes, not on round numbers.
 * $2,500 is roughly the ceiling for a basic tank job, $4,000 the floor for
 * anything beyond one, and $6,000 the point at which a conversion needing gas,
 * venting or electrical work becomes affordable.
 */
const BUDGET_CEILING: Record<string, number | null> = {
  "under-2500": 2500,
  "2500-4000": 4000,
  "4000-6000": 6000,
  "6000-8000": 8000,
  "over-8000": Number.MAX_SAFE_INTEGER,
  unsure: null,
};

/**
 * Lead quality on the classic BANT axes, 0 to 100.
 *
 * This exists because the site is paid a percentage of completed work, not per
 * lead. Under that model an introduction that never closes costs the contractor
 * nothing but costs us the relationship, so the scoring is tuned to protect
 * partner goodwill rather than to maximise introduction volume.
 *
 * Weighting reflects what actually predicts a completed job: a dead heater and
 * a real timeline matter far more than a confident budget answer, because
 * urgency converts and budgets move once a homeowner has a quote in hand.
 */
export function leadScore(answers: Answers): number {
  let s = 0;

  // Need — 40 points. The strongest single predictor.
  if (answers.status === "failed" || answers.status === "leaking") s += 40;
  else if (answers.status === "unreliable") s += 30;
  else if (answers.status === "aging") s += 20;
  else if (answers.status === "new") s += 22;
  else s += 8;

  if (answers.age === "over-12") s += 8;
  else if (answers.age === "9-12") s += 6;
  else if (answers.age === "5-8") s += 2;

  // Authority — 20 points. A renter cannot sign for the work.
  if (answers.owner === "own" || answers.owner === "landlord") s += 20;
  else if (answers.owner === "own-with") s += 16;

  // Timing — 22 points.
  if (answers.timeline === "asap") s += 22;
  else if (answers.timeline === "2-weeks") s += 18;
  else if (answers.timeline === "month") s += 12;
  else if (answers.timeline === "1-3-months") s += 6;

  // Budget — 10 points, and declining to answer is barely penalised. Someone
  // who wants to see options before naming a number is being sensible, not
  // evasive.
  if (answers.budget === "over-8000" || answers.budget === "6000-8000") s += 10;
  else if (answers.budget === "4000-6000") s += 9;
  else if (answers.budget === "2500-4000") s += 7;
  else if (answers.budget === "under-2500") s += 4;
  else s += 5;

  return Math.min(100, s);
}

/** Which partner category this introduction belongs to. */
export function routingCategory(answers: Answers, tech: TechId): string {
  if (!hasAuthority(answers)) return "nurture-renter";
  if (answers.timeline === "researching") return "nurture-early";
  if (isUrgent(answers)) return "emergency-replacement";
  if (tech === "heat-pump") return "heat-pump-electrification";
  if (tech === "gas-tankless") {
    return answers.current === "tankless" ? "tankless-replacement" : "tankless-conversion";
  }
  return "standard-replacement";
}

export type TechId = "gas-tank" | "electric-tank" | "gas-tankless" | "heat-pump";

export interface TechProfile {
  id: TechId;
  name: string;
  /** Broad installed range for a Modesto-area job. Ranges, never a point estimate. */
  cost: [number, number];
}

/**
 * Installed cost ranges, Modesto market, 2026.
 *
 * These are the *baseline* figures. `costFor()` below adjusts them for whether
 * the job is a like-for-like swap or a technology conversion, which is worth
 * far more than any refinement of the numbers themselves.
 *
 * Revised upward from an earlier pass that was simply wrong at the bottom end.
 * Two local observations moved it:
 *
 *   - A Modesto plumbing company quoting roughly $2,700 for a Bradford White
 *     tank installation. First-party, and the single most reliable figure we
 *     have.
 *   - A Modesto water-heater specialist publicly advertising $1,995 to $2,495
 *     for a 40-gallon replacement including standard installation, haul-away
 *     and basic code items.
 *
 * The old gas-tank floor of $1,600 sat below both. A floor beneath every real
 * quote in the market is not a conservative estimate, it is a number that makes
 * every actual quote look like a rip-off, which is the opposite of useful.
 *
 * Worth noting against the national data: 2026 national sources put tank
 * replacement around $882 to $1,825. Modesto contractor pricing runs well above
 * that. National averages understate this market, so they are a sanity check
 * and never the published figure.
 */
export const TECHNOLOGIES: Record<TechId, TechProfile> = {
  "gas-tank": { id: "gas-tank", name: "Gas storage tank", cost: [2000, 3800] },
  "electric-tank": { id: "electric-tank", name: "Electric storage tank", cost: [1700, 3200] },
  "gas-tankless": { id: "gas-tankless", name: "Gas tankless", cost: [4200, 9000] },
  "heat-pump": { id: "heat-pump", name: "Heat pump water heater", cost: [4000, 8000] },
};

/**
 * Cost adjusted for what the job actually is.
 *
 * A homeowner replacing a failed tankless unit and one converting a gas tank to
 * tankless were being quoted the same range, and those are not the same job.
 * The conversion carries gas line, venting, electrical and condensate work; the
 * replacement mostly reuses what is already there.
 *
 * The same applies to heat pumps. Coming from an existing electric tank there
 * is usually a circuit to work with. Coming off gas means new electrical, and
 * that is most of the difference.
 */
export function costFor(id: TechId, answers: Answers): [number, number] {
  const base = TECHNOLOGIES[id].cost;
  const current = answers.current;

  if (id === "gas-tankless" && current === "tankless") {
    // Like-for-like tankless swap. Gas, venting and power already sized.
    return [2800, 5200];
  }
  if (id === "heat-pump" && (current === "heat-pump" || current === "electric-tank")) {
    // Existing electrical service to work from.
    return [3200, 6500];
  }
  if (id === "gas-tank" && current === "gas-tank") {
    // The straightforward swap. Still not cheap in this market.
    return [2000, 3400];
  }
  return base;
}

export interface Assessment {
  id: TechId;
  name: string;
  score: number;
  /** Hard disqualification. Scoring cannot override it. */
  eliminated?: string;
  reasons: string[];
}

export interface Recommendation {
  urgent: boolean;
  primary: Assessment;
  alternative?: Assessment;
  /** Headline sentence for the verdict card. */
  summary: string;
  ruledOut: { technology: string; reason: string }[];
  confidence: "High" | "Moderate" | "Low";
  sizing: string;
  costRange: [number, number];
  installerType: string;
  watchFor: string[];
  questionsToAsk: string[];
  /** BANT score, 0 to 100. */
  score: number;
  /** Partner category this introduction should route to. */
  category: string;
  /** Set when the recommendation's floor price exceeds the stated budget. */
  budgetGap?: { ceiling: number; floor: number };
  /** Set when the respondent rents and cannot authorise the work. */
  needsOwner: boolean;
  /**
   * Set when the homeowner named a brand that does not make the recommended
   * technology. The recommendation stands; this exists so the site can explain
   * the mismatch rather than silently discarding what they asked for.
   */
  brandNote?: { brandName: string; alternatives: string[] };
  /** Shortlist of brands that suit this specific job, with reasons. */
  brandFits: BrandFit[];
}

/**
 * Rule-based recommendation, following the blueprint's ordering:
 *
 *   urgency → eliminate the technically unsuitable → demand → conversion
 *   complexity → local conditions → homeowner priorities → brand tie-break
 *
 * Elimination runs before scoring and cannot be outvoted. This matters: a
 * homeowner who says "lowest running cost" and lives in a sealed interior
 * closet must not be handed a heat pump because preference points piled up. A
 * pure points quiz would do exactly that, which is why this is not one.
 *
 * The engine is deliberately willing to return "not tankless". A quiz that
 * recommends the expensive option to almost everyone is a sales tool wearing a
 * quiz costume, and homeowners can smell it.
 */
export function recommend(answers: Answers): Recommendation {
  const urgent = isUrgent(answers);
  const hasGas = answers.fuel === "natural-gas" || answers.fuel === "propane";
  const noGas = answers.fuel === "electric-only";
  const tightSpace = answers.location === "closet";
  const panelFull = answers.electrical === "full";
  const highDemand =
    answers.simultaneous === "often" ||
    (answers.household === "5+" && answers.bathrooms === "3+");
  const lowDemand = answers.household === "1-2" && answers.simultaneous !== "often";

  const a: Record<TechId, Assessment> = {
    "gas-tank": { id: "gas-tank", name: "Gas storage tank", score: 0, reasons: [] },
    "electric-tank": {
      id: "electric-tank",
      name: "Electric storage tank",
      score: 0,
      reasons: [],
    },
    "gas-tankless": { id: "gas-tankless", name: "Gas tankless", score: 0, reasons: [] },
    "heat-pump": { id: "heat-pump", name: "Heat pump water heater", score: 0, reasons: [] },
  };

  // 1. Eliminate on feasibility ------------------------------------------------
  if (noGas) {
    a["gas-tank"].eliminated = "There is no gas service at the property.";
    a["gas-tankless"].eliminated = "There is no gas service at the property.";
  }
  if (tightSpace) {
    a["heat-pump"].eliminated =
      "An interior closet rarely has the air volume a heat pump needs, and ducting it is expensive.";
  }
  if (panelFull && !tightSpace) {
    a["heat-pump"].reasons.push("Your panel may need work first, which adds cost");
    a["heat-pump"].score -= 2;
  }

  // 2. Urgency ---------------------------------------------------------------
  if (urgent) {
    // Like for like is what gets hot water back fastest. Conversions take
    // permits, parts and often a second trade.
    if (answers.current === "gas-tank" && hasGas) {
      a["gas-tank"].score += 5;
      a["gas-tank"].reasons.push("Direct swap for what you already have, so it can be done fast");
    }
    if (answers.current === "electric-tank") {
      a["electric-tank"].score += 4;
      a["electric-tank"].reasons.push("Fastest way to get hot water back");
      a["heat-pump"].score += 1;
    }
    a["gas-tankless"].score -= 3;
    a["gas-tankless"].reasons.push("Conversions take longer, which is hard when you have no hot water");
    a["heat-pump"].score -= 1;
  }

  // 3. Demand ----------------------------------------------------------------
  if (highDemand) {
    a["gas-tankless"].score += 3;
    a["gas-tankless"].reasons.push("Handles overlapping showers without running out");
    a["electric-tank"].score -= 2;
    a["heat-pump"].score += 1;
  }
  if (lowDemand) {
    a["gas-tankless"].score -= 2;
    a["gas-tankless"].reasons.push("A small household rarely recovers the conversion cost");
  }

  // 4. Conversion complexity -------------------------------------------------
  if (answers.current !== "tankless" && hasGas) {
    a["gas-tankless"].score -= 1;
    a["gas-tankless"].reasons.push("Converting means gas line, venting and condensate work");
  }
  if (answers.current === "tankless") {
    a["gas-tankless"].score += 3;
    a["gas-tankless"].reasons.push("You already have the gas, venting and space for it");
  }

  // 5. Location --------------------------------------------------------------
  if (answers.location === "garage" || answers.location === "utility") {
    a["heat-pump"].score += 3;
    a["heat-pump"].reasons.push("A garage or utility room is close to ideal for a heat pump");
  }
  if (answers.location === "outside" && hasGas) {
    a["gas-tankless"].score += 2;
    a["gas-tankless"].reasons.push("An outdoor unit avoids most of the venting cost");
  }

  // 6. Priorities ------------------------------------------------------------
  switch (answers.priority) {
    case "upfront":
      a["gas-tank"].score += 3;
      a["electric-tank"].score += 3;
      a["gas-tankless"].score -= 2;
      a["heat-pump"].score -= 1;
      break;
    case "running":
      a["heat-pump"].score += 4;
      a["heat-pump"].reasons.push("Cheapest to run of everything on the table");
      a["electric-tank"].score -= 3;
      break;
    case "endless":
      a["gas-tankless"].score += 4;
      a["gas-tankless"].reasons.push("This is the thing tankless genuinely does better");
      break;
    case "space":
      a["gas-tankless"].score += 3;
      a["gas-tankless"].reasons.push("Frees the floor space a tank occupies");
      a["heat-pump"].score -= 1;
      break;
    case "electrify":
      a["heat-pump"].score += 5;
      a["heat-pump"].reasons.push("The right move if you are taking the house off gas");
      a["gas-tank"].score -= 3;
      a["gas-tankless"].score -= 3;
      break;
  }

  // 7. Budget ----------------------------------------------------------------
  // A stated budget nudges, it does not eliminate. Homeowners routinely revise
  // upward once they see an itemised quote, and a site that hid the right
  // answer because someone guessed low in question fifteen would be failing at
  // the one job it has.
  const ceiling = answers.budget ? BUDGET_CEILING[answers.budget] : null;
  if (ceiling !== null && ceiling !== undefined) {
    for (const t of Object.values(a)) {
      // costFor, not the static baseline: someone replacing an existing
      // tankless should not be scored against conversion pricing they will
      // never pay.
      const floor = costFor(t.id, answers)[0];
      if (floor > ceiling) t.score -= 3;
      else if (costFor(t.id, answers)[1] <= ceiling) t.score += 1;
    }
  }

  // 8. Age -------------------------------------------------------------------
  // Past twelve years, repairing a failed unit is usually money spent twice.
  if (answers.age === "over-12" && urgent) {
    a["gas-tank"].reasons.push("At this age a repair is usually money spent twice");
  }

  // 9. Baseline nudges -------------------------------------------------------
  if (hasGas && answers.current === "gas-tank") a["gas-tank"].score += 1;
  if (answers.current === "heat-pump") a["heat-pump"].score += 2;

  const viable = Object.values(a)
    .filter((t) => !t.eliminated)
    .sort((x, y) => y.score - x.score);

  const primary = viable[0] ?? a["gas-tank"];
  const alternative = viable[1];

  const ruledOut = Object.values(a)
    .filter((t) => t.eliminated)
    .map((t) => ({ technology: t.name, reason: t.eliminated! }));

  // A thin margin between the top two is genuinely low confidence, and saying
  // so is more useful than manufacturing certainty.
  const margin = alternative ? primary.score - alternative.score : 99;
  const unknowns = [answers.fuel, answers.electrical, answers.location].filter(
    (v) => v === "unsure",
  ).length;
  const confidence: Recommendation["confidence"] =
    unknowns >= 2 || margin <= 1 ? "Low" : margin >= 4 && unknowns === 0 ? "High" : "Moderate";

  return {
    urgent,
    primary,
    alternative,
    summary: summaryFor(primary, ruledOut.length),
    ruledOut,
    confidence,
    sizing: sizingFor(primary.id, answers),
    costRange: costFor(primary.id, answers),
    installerType: installerFor(primary.id, urgent),
    watchFor: watchFor(primary.id, answers),
    questionsToAsk: QUESTIONS_FOR_INSTALLER[primary.id],
    score: leadScore(answers),
    category: routingCategory(answers, primary.id),
    budgetGap:
      ceiling !== null && ceiling !== undefined && costFor(primary.id, answers)[0] > ceiling
        ? { ceiling, floor: costFor(primary.id, answers)[0] }
        : undefined,
    needsOwner: !hasAuthority(answers),
    brandNote: brandMismatch(answers.brand, primary.id) ?? undefined,
    brandFits: suggestBrands(primary.id, answers),
  };
}

/**
 * The headline sentence on the verdict card.
 *
 * The case worth handling carefully is a winner that has no positive reasons at
 * all — it survived because everything else was eliminated. Dressing that up as
 * an enthusiastic recommendation would be dishonest, and a homeowner who later
 * learns why would be right to feel misled. Saying it plainly costs nothing and
 * is the whole reason the site is worth trusting.
 */
function summaryFor(primary: Assessment, eliminatedCount: number): string {
  if (primary.reasons.length > 0) return primary.reasons[0];
  if (eliminatedCount > 0) {
    return (
      "This is the sensible choice here mostly by elimination. The other options are " +
      "ruled out by your fuel supply or the space the unit has to live in, not by preference."
    );
  }
  return "The best balance of fit, cost and practicality for your home.";
}

/**
 * Winter design temperature rise, from the market record.
 *
 * A homeowner has no way to know their incoming water temperature, so we never
 * ask. It is modelled per market in `lib/market.ts`, stated on screen as an
 * assumption, and flagged for the installer to confirm.
 */
const DESIGN_TEMP_RISE_F = designRiseF();

/**
 * Tankless sizing, expressed as required flow **at a design temperature rise**.
 *
 * The earlier version returned bare GPM figures like "roughly 9 to 11 GPM", and
 * that was actively misleading. A tankless unit's headline rating is quoted at a
 * 35F rise; the same unit delivers roughly half that at a winter rise. A
 * Navien NPE-240A2 is 11.2 GPM at 35F and 5.6 GPM at around 67F. A homeowner
 * matching a bare "9 to 11 GPM" against a spec sheet would buy a unit that runs
 * cold every January.
 *
 * So the output is now the flow the household actually needs, paired with the
 * rise it has to be met at. That is the number a contractor sizes against, and
 * it is the number that makes a spec sheet comparable.
 */
function sizingFor(id: TechId, answers: Answers): string {
  const big = answers.household === "5+" || answers.bathrooms === "3+";
  const mid = answers.household === "3-4" || answers.bathrooms === "2";
  const heavyOverlap = answers.simultaneous === "often";

  if (id === "gas-tankless") {
    const rise = `at a ${DESIGN_TEMP_RISE_F}°F temperature rise`;
    if (big || heavyOverlap) {
      return `About 6 to 7 GPM ${rise}. That usually means a 199,000 BTU unit, because headline GPM ratings are quoted at a much smaller rise`;
    }
    if (mid) {
      return `About 4 to 5 GPM ${rise}, which is more unit than the headline rating on the box suggests`;
    }
    return `About 3 to 4 GPM ${rise}, enough for one shower plus a sink`;
  }

  if (id === "heat-pump") {
    // ENERGY STAR advises upsizing in high-demand homes so the resistance
    // backup elements run less often.
    if (big) return "80 gallon, around an 85 gallon first hour rating. Upsizing keeps the backup resistance elements from running";
    if (mid) return "65 to 80 gallon, around an 80 gallon first hour rating";
    return "50 to 65 gallon";
  }

  if (big) return "75 gallon, or 50 gallon with a high recovery rate";
  if (mid) return "50 gallon";
  return "40 gallon";
}

function installerFor(id: TechId, urgent: boolean): string {
  if (urgent) return "A contractor with same or next day replacement capacity";
  if (id === "heat-pump") return "A contractor experienced with heat pump water heaters and the electrical coordination they need";
  if (id === "gas-tankless") return "A tankless specialist who does their own gas line sizing and venting";
  return "A general water heater contractor";
}

function watchFor(id: TechId, answers: Answers): string[] {
  const out: string[] = [];
  if (id === "gas-tankless") {
    out.push("Ask whether your existing gas line can carry the unit before anyone quotes a price");
    out.push("Hard water makes annual descaling non optional, so budget for it");
    out.push(
      riseExplanation(),
    );
    out.push(
      "Spec sheets quote flow at a much smaller rise than we use, so a unit rated 11 GPM on the box may deliver closer to 6 here in winter",
    );
    // From the brand research: uncontrolled recirculation can cut Navien's
    // residential heat exchanger cover from 15 years to 5. Expensive to learn
    // afterwards, and almost nobody mentions it at quote stage.
    out.push(
      "If you are adding a recirculation pump, ask how it is controlled. On some brands an uncontrolled recirculation loop materially reduces the warranty",
    );
  }
  if (id === "heat-pump") {
    out.push("Confirm there is a condensate route from where the unit will sit");
    if (answers.electrical === "unsure" || answers.electrical === "full") {
      out.push("Your installer should check panel capacity before ordering anything");
    }
    out.push(
      "Unducted, these typically need around 450 cubic feet of air around them. A small closet needs ducting, which adds cost",
    );
    out.push("These make some noise, so think about what is on the other side of that wall");
  }
  if (id === "gas-tank" || id === "electric-tank") {
    out.push("Modesto requires a permit, and a legitimate contractor will pull it without being asked");
  }
  if (answers.fuel === "unsure") {
    out.push("We assumed your fuel type. Confirming it may change this recommendation");
  }
  return out;
}

const QUESTIONS_FOR_INSTALLER: Record<TechId, string[]> = {
  "gas-tankless": [
    "Is my current gas line big enough, or does it need upsizing?",
    "What venting does this unit need, and is that included in the quote?",
    "Who descales it, and what does that cost annually?",
    "Is the permit included in the price you quoted me?",
  ],
  "heat-pump": [
    "Does my panel have capacity, or is that an extra cost?",
    "Where does the condensate drain to?",
    "How loud is it, and where exactly will it sit?",
    "Which rebates are you handling, and which do I file myself?",
  ],
  "gas-tank": [
    "Is the permit included, and will you schedule the inspection?",
    "Does anything need to change to meet current code?",
    "Is haul away of the old unit included?",
    "What is the warranty, and who honours the labour portion?",
  ],
  "electric-tank": [
    "Would a heat pump fit here, and what would the difference cost?",
    "Is the permit included?",
    "Is haul away included?",
    "What is the warranty on parts and on labour?",
  ],
};
