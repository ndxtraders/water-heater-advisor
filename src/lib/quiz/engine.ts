import type { Answers } from "./questions";
import { isUrgent } from "./questions";

export type TechId = "gas-tank" | "electric-tank" | "gas-tankless" | "heat-pump";

export interface TechProfile {
  id: TechId;
  name: string;
  /** Broad installed range for a Modesto-area job. Ranges, never a point estimate. */
  cost: [number, number];
}

export const TECHNOLOGIES: Record<TechId, TechProfile> = {
  "gas-tank": { id: "gas-tank", name: "Gas storage tank", cost: [1600, 3100] },
  "electric-tank": { id: "electric-tank", name: "Electric storage tank", cost: [1400, 2600] },
  "gas-tankless": { id: "gas-tankless", name: "Gas tankless", cost: [3200, 8000] },
  "heat-pump": { id: "heat-pump", name: "Heat pump water heater", cost: [2800, 6500] },
};

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
  ruledOut: { technology: string; reason: string }[];
  confidence: "High" | "Moderate" | "Low";
  sizing: string;
  costRange: [number, number];
  installerType: string;
  watchFor: string[];
  questionsToAsk: string[];
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

  // 7. Baseline nudges -------------------------------------------------------
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
    ruledOut,
    confidence,
    sizing: sizingFor(primary.id, answers),
    costRange: TECHNOLOGIES[primary.id].cost,
    installerType: installerFor(primary.id, urgent),
    watchFor: watchFor(primary.id, answers),
    questionsToAsk: QUESTIONS_FOR_INSTALLER[primary.id],
  };
}

function sizingFor(id: TechId, answers: Answers): string {
  const big = answers.household === "5+" || answers.bathrooms === "3+";
  const mid = answers.household === "3-4" || answers.bathrooms === "2";

  if (id === "gas-tankless") {
    // Simultaneous flow plus temperature rise, not household size alone.
    if (big) return "Roughly 9 to 11 GPM, sized on simultaneous flow and winter inlet temperature";
    if (mid) return "Roughly 7 to 9 GPM, confirmed against your incoming water temperature";
    return "Roughly 6 to 8 GPM is usually plenty";
  }
  if (id === "heat-pump") {
    // ENERGY STAR advises upsizing in high-demand homes so the resistance
    // backup elements run less often.
    if (big) return "80 gallon. Upsizing keeps the backup resistance elements from running";
    if (mid) return "65 to 80 gallon";
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
  }
  if (id === "heat-pump") {
    out.push("Confirm there is a condensate route from where the unit will sit");
    if (answers.electrical === "unsure" || answers.electrical === "full") {
      out.push("Your installer should check panel capacity before ordering anything");
    }
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
