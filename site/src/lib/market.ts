/**
 * Per-market physical assumptions.
 *
 * Everything here is a modelled assumption rather than a measured local value,
 * and it is kept in one place so that expanding to Turlock, Stockton or Fresno
 * means adding a record rather than hunting through the engine for hard-coded
 * numbers.
 *
 * The design rule: a homeowner is never asked for anything they cannot
 * reasonably know. Nobody knows their incoming water temperature. So we model
 * it, state the assumption on screen, and tell the installer to confirm it.
 */

export interface MarketClimate {
  /**
   * Coldest month incoming mains temperature, °F, as a **range**.
   *
   * A range rather than a point because the honest answer is a range. Mains
   * temperature moves with the weather, with depth of bury, and with which
   * source the system is drawing from that week. Publishing one number implied
   * a precision nobody has, and it implied it at the warm end, which is the
   * wrong end to be wrong at when the site's own rule is to size on the coldest
   * case.
   */
  winterInletF: [number, number];
  /** Warmest month incoming mains temperature, °F. Context only, so a point. */
  summerInletF: number;
  /** Delivery temperature a tankless unit is set to. */
  setpointF: number;
  /** How much confidence the winter figure carries. */
  confidence: "measured" | "modelled" | "estimated";
  basis: string;
}

export interface Market {
  slug: string;
  city: string;
  state: string;
  climate: MarketClimate;
}

/**
 * Modesto, Central Valley.
 *
 * Groundwater in the Valley runs warmer than most of the country year round,
 * which is genuinely good news for tankless here and is worth saying, because
 * national tankless sizing advice is written for colder inlet temperatures.
 *
 * Confidence is "modelled", not "measured". The brand research explicitly lists
 * exact Modesto inlet temperature by season and ZIP as unverified. A single
 * reading from the local water provider would upgrade this, and it is one of
 * the highest-leverage unverified facts on the whole site because tankless
 * sizing depends on it directly.
 */
export const MODESTO: Market = {
  slug: "modesto",
  city: "Modesto",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Central Valley groundwater and surface-blend supply, modelled seasonally. Not measured locally.",
  },
};

/** The coldest end of the winter range. The number sizing must survive. */
export function designInletF(market: Market = MODESTO): number {
  return market.climate.winterInletF[0];
}

/**
 * Sizing always uses the coldest case, which is the cold end of the winter
 * range rather than its midpoint. A unit sized for July runs cold in January,
 * and a unit sized for a mild January runs cold in a hard one.
 */
export function designRiseF(market: Market = MODESTO): number {
  return market.climate.setpointF - designInletF(market);
}

/** The winter rise as a range, mild end first. For pages that show both ends. */
export function winterRiseRangeF(market: Market = MODESTO): [number, number] {
  const [lo, hi] = market.climate.winterInletF;
  return [market.climate.setpointF - hi, market.climate.setpointF - lo];
}

export function summerRiseF(market: Market = MODESTO): number {
  return market.climate.setpointF - market.climate.summerInletF;
}

/**
 * Plain-language explanation of the assumption, for the results page.
 *
 * Stated rather than buried, because the number materially changes which unit
 * a homeowner should buy and they have no way to check it themselves.
 */
export function riseExplanation(market: Market = MODESTO): string {
  const [lo, hi] = market.climate.winterInletF;
  const [mildRise, coldRise] = winterRiseRangeF(market);
  const summer = summerRiseF(market);
  return (
    `We size on the coldest case. In ${market.city} incoming water runs somewhere around ` +
    `${lo}°F to ${hi}°F through the winter and about ${market.climate.summerInletF}°F in ` +
    `summer, against a ${market.climate.setpointF}°F setting. That is a ${mildRise}°F to ` +
    `${coldRise}°F rise in winter and roughly ${summer}°F in summer, and we size against ` +
    `the ${coldRise}°F end. You do not need to know any of this, but your installer should ` +
    `confirm it for your address, because a unit sized for July runs cold in January and a ` +
    `unit sized for a mild January runs cold in a hard one.`
  );
}

/**
 * Turlock, Stanislaus County.
 *
 * The reason Turlock is the second market is not its size. It is that a Turlock
 * house buys electricity from Turlock Irrigation District and gas from PG&E,
 * which means the gas-versus-electric question has a real local answer rather
 * than a statewide one. See `lib/energy.ts`.
 *
 * Inlet temperature is inherited from the Modesto model and carries the same
 * "modelled" confidence, for the same reason: nobody has measured it. Turlock's
 * supply is a blend of fifteen groundwater wells and Tuolumne River surface
 * water bought through the Stanislaus Regional Water Authority, so the real
 * figure almost certainly moves by service zone as well as by season.
 */
export const TURLOCK: Market = {
  slug: "turlock",
  city: "Turlock",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Central Valley groundwater blended with Tuolumne River surface water, modelled seasonally from the Modesto record. Not measured locally.",
  },
};

/**
 * Mean inlet across the year. The annual **energy** case, not the sizing case.
 *
 * Uses the midpoint of the winter range rather than its cold end, because
 * annual consumption is driven by a typical winter and not by the worst week of
 * one. Sizing and energy genuinely want different numbers out of the same
 * record, which is why they are separate functions.
 */
export function meanInletF(market: Market): number {
  const [lo, hi] = market.climate.winterInletF;
  const typicalWinter = (lo + hi) / 2;
  return (typicalWinter + market.climate.summerInletF) / 2;
}

/**
 * Hub-facing description of a market.
 *
 * Separate from `Market` on purpose. `Market` holds the physical assumptions the
 * quiz engine reasons over; this holds what a reader needs to pick a city off an
 * index. Keeping them apart means adding a market to the directory cannot
 * accidentally change a recommendation.
 */
export interface MarketEntry {
  market: Market;
  href: string;
  /** The electric utility, which is what actually defines the territory. */
  electricUtility: string;
  electricUtilityShort: string;
  gasUtility: string;
  /** Why this market is not the one next door. One sentence, no marketing. */
  distinctive: string;
  checked: string;
}

/**
 * Every market with a published page.
 *
 * The order is publication order rather than population, because a reader
 * scanning this list is looking for their own city and the second entry is not
 * more important than the first.
 *
 * A city only belongs here once its page exists. The site's standing rule is
 * that navigation never points at a route that has not been built, and an index
 * of places we have not researched would be the most damaging place to break it.
 */
export const MARKETS: MarketEntry[] = [
  {
    market: MODESTO,
    href: "/local/california/modesto",
    electricUtility: "Modesto Irrigation District",
    electricUtilityShort: "MID",
    gasUtility: "PG&E",
    distinctive:
      "The first market, and the one the whole method was built against. Itemised local job costs, online permitting, and the reason we will not publish a single average price.",
    checked: "7 Aug 2026",
  },
  {
    market: TURLOCK,
    href: "/local/california/turlock",
    electricUtility: "Turlock Irrigation District",
    electricUtilityShort: "TID",
    gasUtility: "PG&E",
    distinctive:
      "Two utilities in one house, so the gas versus electric question has a real answer here. Published rates, a worked fuel comparison, and the strongest rebate position we have found anywhere.",
    checked: "20 Aug 2026",
  },
];
