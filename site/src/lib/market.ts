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
  /** Coldest month incoming mains temperature, °F. The sizing case. */
  winterInletF: number;
  /** Warmest month incoming mains temperature, °F. Context only. */
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
    winterInletF: 55,
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Central Valley groundwater and surface-blend supply, modelled seasonally. Not measured locally.",
  },
};

/** Sizing always uses the winter case. A unit sized for July runs cold in January. */
export function designRiseF(market: Market = MODESTO): number {
  return market.climate.setpointF - market.climate.winterInletF;
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
  const winter = designRiseF(market);
  const summer = summerRiseF(market);
  return (
    `We size on the coldest case. In ${market.city} we assume incoming water around ` +
    `${market.climate.winterInletF}°F in winter and about ${market.climate.summerInletF}°F ` +
    `in summer, against a ${market.climate.setpointF}°F setting. That is a ${winter}°F rise ` +
    `in winter and roughly ${summer}°F in summer. You do not need to know any of this, ` +
    `but your installer should confirm it, because a unit sized for July runs cold in January.`
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
    winterInletF: 55,
    summerInletF: 72,
    setpointF: 120,
    confidence: "modelled",
    basis:
      "Central Valley groundwater blended with Tuolumne River surface water, modelled seasonally from the Modesto record. Not measured locally.",
  },
};

/** Mean of the seasonal inlet figures. The annual energy case, not the sizing case. */
export function meanInletF(market: Market): number {
  return (market.climate.winterInletF + market.climate.summerInletF) / 2;
}
