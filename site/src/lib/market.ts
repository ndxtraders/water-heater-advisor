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
 * Wave 1: Stockton, Tracy, Merced, Patterson.
 *
 * Every one of these inherits Modesto's modelled inlet range, and none of them
 * has measured it. The expansion research is explicit on the point and it is
 * worth restating here, because it is the assumption most likely to be quietly
 * upgraded to a fact by a later editor: all four cities sit in California
 * Building Climate Zone 12, and **climate zone does not give you an inlet
 * temperature**. It describes air, not mains water, and mains water answers to
 * source, depth of bury and season instead.
 *
 * So the confidence stays `modelled` everywhere below, the basis line says what
 * the supply actually is, and the pages say so on screen. One set of readings
 * from any of these water providers would upgrade the record for that city and
 * nothing else.
 */

/**
 * Stockton, San Joaquin County.
 *
 * The one city on the site with more than one retail *water* provider, which is
 * why the record's basis line names a system rather than a blend. The City
 * system runs groundwater considerably harder than either surface source, and a
 * Cal Water address is a different system again.
 */
export const STOCKTON: Market = {
  slug: "stockton",
  city: "Stockton",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Modelled from the Modesto record. Stockton has more than one retail water provider and the City system mixes groundwater with two surface sources, so a measured figure would likely differ by provider as well as by season.",
  },
};

/**
 * Tracy, San Joaquin County.
 *
 * The widest verified source split in the candidate set: treated surface water
 * at 23 mg/L against well water running to 390. Inlet temperature almost
 * certainly moves with that same source question, which is a second reason the
 * figure below is modelled rather than measured.
 */
export const TRACY: Market = {
  slug: "tracy",
  city: "Tracy",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Modelled from the Modesto record. Tracy blends treated surface water with well water in proportions that vary by address, and surface and groundwater do not arrive at the same temperature.",
  },
};

/**
 * Merced, Merced County.
 *
 * An all-groundwater municipal system, which makes the modelled figure a little
 * less shaky here than in the blended cities: groundwater temperature is the
 * steadier of the two inputs across a year.
 */
export const MERCED: Market = {
  slug: "merced",
  city: "Merced",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Modelled from the Modesto record. The City system is supplied entirely by wells in the Merced Groundwater Subbasin, and groundwater swings less across a year than a surface blend does.",
  },
};

/**
 * Patterson, Stanislaus County, on the Westside.
 *
 * TID electricity and PG&E gas, the same pairing as Turlock, which is why
 * Patterson can run the fuel arithmetic. Its water is nothing like Turlock's.
 */
export const PATTERSON: Market = {
  slug: "patterson",
  city: "Patterson",
  state: "California",
  climate: {
    winterInletF: [45, 55],
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Modelled from the Modesto record. Patterson draws entirely on the lower aquifer of the Delta-Mendota Subbasin, which is a different source from anything else on the site and has not been measured for temperature.",
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
  /**
   * Overrides the index's "X electricity, Y gas" line.
   *
   * Half the markets on this site cannot answer "who sells you electricity"
   * with one name. Stockton and Tracy have a generation supplier and a separate
   * delivery utility on one bill; Merced's answer depends on the address. A
   * single string flattens all of that into a claim the site cannot support,
   * so the ambiguous markets write their own line.
   */
  electricLine?: string;
  /**
   * The utility territory the market belongs to, used to group the index.
   *
   * The site's whole expansion argument is that territory beats city name, and
   * an index sorted by city quietly argues the opposite. Grouping by territory
   * also does real work for the reader who has not yet realised their city is
   * the wrong unit to search on.
   */
  territory: string;
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
    territory: "Modesto Irrigation District",
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
    territory: "Turlock Irrigation District",
    distinctive:
      "Two utilities in one house, so the gas versus electric question has a real answer here. Published rates, a worked fuel comparison, and the strongest rebate position we have found anywhere.",
    checked: "20 Aug 2026",
  },
  {
    market: PATTERSON,
    href: "/local/california/patterson",
    electricUtility: "Turlock Irrigation District",
    electricUtilityShort: "TID",
    gasUtility: "PG&E",
    territory: "Turlock Irrigation District",
    distinctive:
      "The same two utilities as Turlock and the same fuel arithmetic, running against the hardest municipal water we have found anywhere on the site. The rebate and the water pull in opposite directions.",
    checked: "21 Aug 2026",
  },
  {
    market: STOCKTON,
    href: "/local/california/stockton",
    electricUtility: "Ava Community Energy generation, PG&E delivery",
    electricUtilityShort: "Ava and PG&E",
    gasUtility: "PG&E",
    electricLine: "Ava generation on a PG&E bill, PG&E gas",
    territory: "Ava Community Energy and PG&E",
    distinctive:
      "Two companies on one electricity bill, and more than one water company in one city. The largest market we cover and the one where an address settles the most.",
    checked: "21 Aug 2026",
  },
  {
    market: TRACY,
    href: "/local/california/tracy",
    electricUtility: "Ava Community Energy generation, PG&E delivery",
    electricUtilityShort: "Ava and PG&E",
    gasUtility: "PG&E",
    electricLine: "Ava generation on a PG&E bill, PG&E gas",
    territory: "Ava Community Energy and PG&E",
    distinctive:
      "The city's own report puts one water source seventeen times harder than the other, and the permit price turns on a single word in how the job is written up.",
    checked: "21 Aug 2026",
  },
  {
    market: MERCED,
    href: "/local/california/merced",
    electricUtility: "Merced Irrigation District or PG&E, by address",
    electricUtilityShort: "Merced ID or PG&E",
    gasUtility: "PG&E",
    electricLine: "Merced Irrigation District or PG&E by address, PG&E gas",
    territory: "Merced Irrigation District and PG&E",
    distinctive:
      "Which company sells you electricity depends on the address, not the city, and the rebate that follows has a condition most homeowners fail without knowing it.",
    checked: "21 Aug 2026",
  },
];
