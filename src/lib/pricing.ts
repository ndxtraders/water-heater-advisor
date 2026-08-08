import type { TechId } from "@/lib/quiz/engine";

/**
 * Pricing rules of thumb.
 *
 * The problem this solves: we do not have verified installed pricing for most
 * markets and will not have it until partners are reporting sold jobs. Waiting
 * for that would mean publishing nothing useful about cost for months, in every
 * city except Modesto.
 *
 * The way out is to stop modelling *installed price* and start modelling *the
 * gap between the shelf price and the installed price*. A homeowner can look up
 * the equipment themselves in any market. What they cannot work out is what
 * gets added to it.
 *
 * ## Why additive rather than a multiplier
 *
 * The obvious rule of thumb is "installed costs about three times the unit",
 * and the Modesto data point fits it exactly: a ~$900 tank quoted at ~$2,700.
 *
 * But it breaks at the top of the range. Installing a $2,200 premium tank is
 * the same physical job as installing a $900 one. Labour, permit, code items
 * and haul-away are close to fixed; only the box changes. A flat multiplier
 * therefore overstates the premium unit badly.
 *
 * So the model is `equipment + a fixed work bundle`, and the multiplier is
 * offered only as a memorable sanity check for mid-range equipment.
 *
 * ## Reconciliation against known figures
 *
 *   $900 unit  + $1,800 bundle = $2,700   matches the local Bradford White quote
 *   $950 unit  + $1,045 bundle = $1,995   matches the advertised specialist low end
 *   $2,200 unit + $1,600 bundle = $3,800  matches the top of our published range
 *
 * The bundle is the thing worth researching per market. Equipment price is
 * public everywhere.
 */

export interface WorkBundle {
  /** Added to the equipment price, in dollars. */
  low: number;
  high: number;
  /** What that money buys. Shown to the homeowner. */
  includes: string[];
  /** Typical equipment price range, for sanity checking a quote. */
  equipment: [number, number];
  /** Memorable cross-check for mid-range equipment. */
  roughMultiplier: string;
}

export const WORK_BUNDLE: Record<TechId, WorkBundle> = {
  "gas-tank": {
    low: 1050,
    high: 1900,
    equipment: [900, 2200],
    roughMultiplier: "about 2 to 3 times the shelf price of the unit",
    includes: [
      "Labour for a straightforward swap",
      "Permit and inspection",
      "Code items such as strapping, relief discharge and an expansion tank",
      "Hauling the old unit away",
    ],
  },
  "electric-tank": {
    low: 850,
    high: 1600,
    equipment: [700, 1900],
    roughMultiplier: "about 2 to 2.5 times the shelf price of the unit",
    includes: [
      "Labour for a straightforward swap",
      "Permit and inspection",
      "Code items and a new drain pan where required",
      "Hauling the old unit away",
    ],
  },
  "gas-tankless": {
    low: 2900,
    high: 6200,
    equipment: [1300, 2800],
    roughMultiplier: "about 3 to 4 times the price of the unit on a conversion",
    includes: [
      "Labour, which is a longer job than a tank swap",
      "Permit and inspection",
      "New venting, which a conversion almost always needs",
      "Gas line work where the existing line cannot carry the unit",
      "A dedicated electrical circuit for condensing models",
      "Condensate routing",
    ],
  },
  "heat-pump": {
    low: 2400,
    high: 5000,
    equipment: [1600, 3000],
    roughMultiplier: "about 2.5 to 3 times the price of the unit",
    includes: [
      "Labour",
      "Permit and inspection",
      "Electrical work, which is the largest variable",
      "Condensate routing",
      "Ducting where the space is too small to draw air freely",
    ],
  },
};

/**
 * Estimated installed range for a known equipment price.
 *
 * This is what makes the model portable. A homeowner anywhere can price the
 * unit they want and get a defensible installed range without us having done
 * any local research at all.
 */
export function installedFromEquipment(
  tech: TechId,
  equipmentPrice: number,
): [number, number] {
  const b = WORK_BUNDLE[tech];
  return [equipmentPrice + b.low, equipmentPrice + b.high];
}

/**
 * How portable a given market's numbers are.
 *
 * Equipment price is public everywhere. The work bundle moves with local labour
 * rates and permit fees, but far less than people assume, which is why it is a
 * usable default for a new city on day one and gets corrected as real quotes
 * come in.
 */
export const BUNDLE_CONFIDENCE =
  "Modelled from Modesto observations and 2026 cost data. Expect the labour " +
  "portion to move with local rates. Equipment prices are national and you can " +
  "check them yourself.";
