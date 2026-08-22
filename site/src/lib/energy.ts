import { type Market, meanInletF } from "@/lib/market";
import type { TechId } from "@/lib/quiz/engine";

/**
 * What it costs to make hot water in a specific utility territory.
 *
 * ## Why this exists
 *
 * Every water heater article on the internet answers "is gas or electric
 * cheaper?" with a national average, and the national average is useless,
 * because the two fuels are sold by two different companies at prices that vary
 * by hundreds of percent across the country. In most of California one company
 * sells you both, so the comparison at least sits inside one billing
 * relationship. Turlock is not most of California. TID sells the electricity,
 * PG&E sells the gas, and neither one is quoting a rate designed to compete
 * with the other.
 *
 * That is what makes the sum worth doing here. With both published rates in
 * hand the answer stops being a claim and becomes arithmetic.
 *
 * ## What the model does and does not do
 *
 * It converts a household's yearly hot water demand into delivered heat, then
 * divides by the efficiency of each technology to get purchased energy, then
 * multiplies by the local price of that energy. That is the whole model. It is
 * deliberately simple, because every extra term would be another number nobody
 * has measured.
 *
 * It does not model standby losses beyond what the efficiency ratings already
 * capture, ambient temperature effects on a heat pump, recirculation losses, or
 * the fixed monthly customer charge, which you pay whether you heat water with
 * that fuel or not.
 *
 * ## The one number a homeowner should distrust
 *
 * Draw volume. We use the federal test procedure's medium draw pattern because
 * it is the load the published efficiency ratings are measured against, which
 * keeps the comparison internally consistent. A household that uses half that
 * much halves every figure below. The ranking does not move; the gaps do.
 */

/**
 * Federal test procedure medium draw pattern, gallons per day.
 *
 * Chosen over a household survey figure on purpose. UEF ratings are measured
 * against this exact load, so using it means the efficiency numbers and the
 * demand number describe the same thing.
 */
export const DAILY_DRAW_GALLONS = 55;

/** Weight of water, pounds per gallon. One BTU raises one pound by one °F. */
const LB_PER_GALLON = 8.34;
const BTU_PER_THERM = 100_000;
const BTU_PER_KWH = 3412;

export interface FuelRates {
  electricUtility: string;
  gasUtility: string;
  /**
   * Cheapest and dearest published residential energy tiers, $/kWh.
   *
   * A range rather than an average, and the range is the point. Water heating
   * is a marginal load stacked on top of everything else the house already
   * draws, so which tier it lands in depends on the rest of the house. A
   * Central Valley home running air conditioning through a July afternoon is
   * already past the lower tiers before the water heater switches on.
   */
  kWh: [number, number];
  /** Published bundled residential rate, $/therm. */
  therm: number;
  /** Delivery temperature the model assumes at the tap. */
  setpointF: number;
}

/**
 * TID electricity, PG&E gas.
 *
 * TID rates are the 2026 residential schedule. The low bound is the winter
 * first-700 kWh tier, the high bound is the summer above-1,100 kWh tier. The
 * $26 monthly customer charge is deliberately excluded, because it does not
 * change when you change water heaters.
 *
 * The gas figure is PG&E's January 2026 bundled non-CARE residential average. A
 * CARE household pays $2.205 and should read every gas figure on the page as
 * roughly a fifth lower. Gas commodity prices move, so this needs re-checking
 * on a schedule rather than being treated as settled.
 *
 * Named for the territory rather than for Turlock, because the territory is
 * what the rates belong to. Patterson buys from the same two utilities off the
 * same two published schedules, so it reads the same card. That is the whole
 * argument for organising this site by utility rather than by city, expressed
 * as one shared constant instead of two identical ones drifting apart.
 */
export const TID_PGE_RATES: FuelRates = {
  electricUtility: "Turlock Irrigation District",
  gasUtility: "PG&E",
  kWh: [0.1338, 0.1891],
  therm: 2.784,
  setpointF: 120,
};

/** @deprecated Use {@link TID_PGE_RATES}. Kept while callers migrate. */
export const TURLOCK_RATES = TID_PGE_RATES;

export interface Efficiency {
  /** Uniform Energy Factor, or its coefficient-of-performance equivalent. */
  uef: number;
  fuel: "gas" | "electric";
  /** What this rating describes, in the homeowner's terms. */
  basis: string;
}

/**
 * Efficiency assumptions, one per technology.
 *
 * Mid-market figures, not best-in-class. Publishing the top of each range would
 * flatter every option equally and mislead about the absolute numbers, and the
 * heat pump does not need the help.
 */
export const EFFICIENCY: Record<TechId, Efficiency> = {
  "gas-tank": {
    uef: 0.6,
    fuel: "gas",
    basis: "A standard atmospheric vent 40 to 50 gallon tank, the volume seller",
  },
  "electric-tank": {
    uef: 0.92,
    fuel: "electric",
    basis: "A standard resistance element tank",
  },
  "gas-tankless": {
    uef: 0.93,
    fuel: "gas",
    basis: "A condensing unit. A non-condensing one runs nearer 0.81",
  },
  "heat-pump": {
    uef: 3.45,
    fuel: "electric",
    basis:
      "A typical ENERGY STAR 50 gallon unit in heat pump mode. Cold mornings in an unheated garage pull it down; hot afternoons push it up",
  },
};

/** Yearly heat the household actually needs at the tap, in BTU. */
export function annualHeatBtu(market: Market, rates: FuelRates): number {
  const riseF = rates.setpointF - meanInletF(market);
  return DAILY_DRAW_GALLONS * LB_PER_GALLON * riseF * 365;
}

export interface FuelCost {
  /** Yearly fuel cost, low and high. Identical for gas, which has no tiers here. */
  range: [number, number];
  /** Purchased energy per year, with its unit. */
  purchased: string;
}

/**
 * Yearly fuel cost for one technology in one market.
 *
 * Gas returns a single figure twice, because we hold one published bundled
 * rate. That asymmetry is real and is stated on the page rather than papered
 * over with a fake range.
 */
export function annualFuelCost(
  id: TechId,
  market: Market,
  rates: FuelRates = TID_PGE_RATES,
): FuelCost {
  const heat = annualHeatBtu(market, rates);
  const eff = EFFICIENCY[id];

  if (eff.fuel === "gas") {
    const therms = heat / BTU_PER_THERM / eff.uef;
    const cost = therms * rates.therm;
    return { range: [cost, cost], purchased: `${Math.round(therms)} therms` };
  }

  const kwh = heat / BTU_PER_KWH / eff.uef;
  return {
    range: [kwh * rates.kWh[0], kwh * rates.kWh[1]],
    purchased: `${Math.round(kwh).toLocaleString("en-US")} kWh`,
  };
}

/** Rounded to the nearest dollar. Cents on an annual estimate would be a lie. */
export const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** A cost range, collapsed to one figure when both ends match. */
export function usdRange([low, high]: [number, number]): string {
  return Math.round(low) === Math.round(high)
    ? usd(low)
    : `${usd(low)} to ${usd(high)}`;
}
