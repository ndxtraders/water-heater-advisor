import type { TechId } from "@/lib/quiz/engine";

/**
 * Installed price modelled from equipment price.
 *
 * ## Why this shape
 *
 * We will not have verified installed pricing for most markets until partners
 * report sold jobs. But equipment price is public everywhere, so the useful
 * thing to model is the relationship between the shelf price and the installed
 * price. A homeowner can look up the box; what they cannot work out is
 * everything that gets added to it.
 *
 * ## The trade's own rules of thumb, and what the research says
 *
 * Contractors price off two well-known heuristics:
 *
 *   Rule of thirds   a third materials, a third labour, a third overhead and
 *                    profit. With materials at a third of the price, that is
 *                    price = 3x materials.
 *   50 percent rule  hard cost is half the price, so price = 2x hard cost.
 *
 * Together they bracket a standard tank replacement at **2x to 3x the shelf
 * price of the unit**, which is exactly where the observed Modesto data sits: a
 * ~$900 retail unit quoted at ~$2,700.
 *
 * Underlying industry figures that support it:
 *
 *   - Contractors buy below retail. A unit retailing near $1,000 costs a
 *     plumber roughly $800 or less through a supply house.
 *   - Equipment markup on wholesale runs about 50-75% for standard tanks and
 *     75-100%+ for tankless and heat pump, which are treated as specialty.
 *   - Loaded labour cost is roughly $35-50/hour against $85-200/hour billed.
 *   - A like-for-like tank swap is a 2-4 hour job. A tankless conversion is
 *     4-8 hours or more once venting, gas and electrical are involved.
 *   - Published tank installs cluster around $1,200-$2,500 at 30-40% gross
 *     margin; tankless around $2,500-$4,500 at 25-35%.
 *
 * ## Where the simple multiplier breaks, and why the engine does not use it
 *
 * A flat multiplier assumes every cost scales with the box. Labour, permit,
 * code items and haul-away do not: installing a $2,200 premium tank is the same
 * physical job as installing a $900 one. At 3x, a premium unit would be quoted
 * near $6,600, which is well outside anything observed.
 *
 * What actually scales is the *markup on the equipment*. What stays flat is the
 * work. So the model is:
 *
 *     installed = (equipment x markup) + work bundle
 *
 * This reproduces the 2-3x rule at entry-level equipment, where most jobs sit,
 * and stops overstating the premium end. The simple multiplier is still worth
 * publishing as a homeowner-facing sanity check, because it is memorable and it
 * is right for the common case.
 */

export interface PriceModel {
  /** Multiplier applied to the retail equipment price. */
  markup: [number, number];
  /** Flat work cost added on top, in dollars. */
  bundle: [number, number];
  /** Typical retail equipment range, for context. */
  equipment: [number, number];
  /** Memorable homeowner-facing rule of thumb. */
  ruleOfThumb: string;
  /** What the flat portion buys. */
  includes: string[];
  /** Typical on-site hours, useful for judging a suspiciously fast quote. */
  hours: string;
}

export const PRICE_MODEL: Record<TechId, PriceModel> = {
  // Calibrated so a $900 shelf unit lands at $1,825-$2,705, matching both the
  // observed local quote and the 2-3x rule of thumb at entry-level equipment.
  "gas-tank": {
    markup: [1.25, 1.45],
    bundle: [700, 1400],
    equipment: [900, 2200],
    ruleOfThumb: "roughly 2 to 3 times the shelf price of the unit",
    hours: "2 to 4 hours on site for a straight swap",
    includes: [
      "Labour for a like-for-like swap",
      "Permit and inspection",
      "Code items such as strapping, relief discharge and an expansion tank",
      "Hauling the old unit away",
    ],
  },
  "electric-tank": {
    markup: [1.25, 1.5],
    bundle: [600, 1200],
    equipment: [700, 1900],
    ruleOfThumb: "roughly 2 to 2.5 times the shelf price of the unit",
    hours: "2 to 3 hours on site",
    includes: [
      "Labour for a like-for-like swap",
      "Permit and inspection",
      "Code items and a drain pan where required",
      "Hauling the old unit away",
    ],
  },
  "gas-tankless": {
    // Tankless is treated as specialty equipment and carries a higher markup,
    // and the conversion work is where most of the money actually goes.
    markup: [1.4, 1.8],
    bundle: [2200, 5200],
    equipment: [1300, 2800],
    ruleOfThumb: "roughly 3 to 4 times the price of the unit on a conversion",
    hours: "4 to 8 hours, sometimes across two days and two trades",
    includes: [
      "Labour, a much longer job than a tank swap",
      "Permit and inspection",
      "New venting, which a conversion almost always needs",
      "Gas line work where the existing line cannot carry the unit",
      "A dedicated electrical circuit for condensing models",
      "Condensate routing",
    ],
  },
  "heat-pump": {
    markup: [1.4, 1.7],
    bundle: [1800, 4000],
    equipment: [1600, 3000],
    ruleOfThumb: "roughly 2.5 to 3 times the price of the unit",
    hours: "3 to 6 hours, longer if an electrician is needed",
    includes: [
      "Labour",
      "Permit and inspection",
      "Electrical work, the largest single variable",
      "Condensate routing",
      "Ducting where the space cannot draw air freely",
    ],
  },
};

/**
 * Installed range for a known retail equipment price.
 *
 * The portable half of the cost model. A homeowner in any market can price the
 * unit they want and get a defensible installed range without us having done
 * any local research.
 */
export function installedFromEquipment(
  tech: TechId,
  equipmentPrice: number,
): [number, number] {
  const m = PRICE_MODEL[tech];
  return [
    Math.round((equipmentPrice * m.markup[0] + m.bundle[0]) / 50) * 50,
    Math.round((equipmentPrice * m.markup[1] + m.bundle[1]) / 50) * 50,
  ];
}

/** Sanity-check band for the typical equipment in this category. */
export function typicalInstalled(tech: TechId): [number, number] {
  const m = PRICE_MODEL[tech];
  return [
    installedFromEquipment(tech, m.equipment[0])[0],
    installedFromEquipment(tech, m.equipment[1])[1],
  ];
}

export const PRICE_MODEL_BASIS =
  "Modelled from trade pricing norms (equipment markup, loaded labour rates and " +
  "typical job hours) and cross-checked against observed Modesto quotes. Equipment " +
  "prices are national and you can check them yourself. The labour portion moves " +
  "with local rates.";
