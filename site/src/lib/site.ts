/**
 * Site-wide configuration.
 *
 * Deliberately not a "business" record. Water Heater Advisor is a referral and
 * education service, not a contractor, and CSLB rules are explicit that a
 * referral service may not present itself as performing the construction. There
 * is no NAP block here and no LocalBusiness schema anywhere in the codebase —
 * that markup would tell Google exactly the thing the site must never claim.
 */
export const site = {
  name: "Water Heater Advisor",
  tagline: "Independent water heater guidance for homeowners",
  url: "https://waterheateradvisor.com",

  /** The first market. Expansion is by utility territory, not population. */
  market: {
    city: "Modesto",
    state: "California",
    stateAbbr: "CA",
    slug: "/local/california/modesto",
  },

  /**
   * Navigation links only ever point at routes that exist.
   *
   * The first pass listed the intended information architecture, which meant
   * most of the header and footer led to 404s. A dead link on a site whose
   * whole pitch is that it is more careful than the competition is a worse
   * problem here than a thin menu. Add entries as the pages land.
   */
  nav: [
    { label: "Resources", href: "/resources" },
    { label: "Technologies", href: "/water-heaters" },
    { label: "Brands", href: "/brands" },
    { label: "Locations", href: "/local" },
    { label: "Choosing an installer", href: "/installers/how-to-choose" },
  ],

  footer: {
    decide: [
      { label: "All four technologies", href: "/water-heaters" },
      { label: "Tank vs tankless", href: "/compare/tank-vs-tankless" },
      { label: "When tankless is wrong", href: "/water-heaters/tankless/not-right-for-you" },
      { label: "Find my system", href: "/quiz" },
    ],
    // Two markets now, and they are not interchangeable: MID and TID are
    // different rebate territories, which is the whole reason the site
    // localises by utility rather than by city name.
    local: [
      { label: "All locations", href: "/local" },
      { label: "Modesto, on MID", href: "/local/california/modesto" },
      { label: "Turlock, on TID", href: "/local/california/turlock" },
    ],
    about: [
      { label: "How we make recommendations", href: "/methodology" },
      { label: "How we get paid", href: "/methodology" },
      { label: "All brands", href: "/brands" },
    ],
  },
} as const;

/**
 * Emergency routing: OFF.
 *
 * The EmergencyBar promises "Skip the research, get help today". That is a
 * promise about capacity, not about content, and right now we cannot keep it:
 * no partner installer has agreed to take emergency work and there is no
 * monitored phone line or intake path behind it.
 *
 * Making that promise to somebody standing over a leaking tank at 6am, on the
 * one surface built for exactly that person, is the single worst place on the
 * site to be writing a cheque we cannot cash. So the bar is hidden until the
 * capacity is real.
 *
 * ## Turning it back on
 *
 * Set this to `true`. That is the whole change, and it restores the bar on
 * every route except /emergency itself.
 *
 * Flip it only when BOTH of these are true:
 *
 *   1. At least one partner installer has agreed to take emergency work, and
 *      knows leads will arrive that way.
 *   2. A phone number or intake path is live and answered during the hours the
 *      wording implies. "Today" means today.
 *
 * If the wording changes to something softer that does not promise same-day
 * help, this flag can go and the bar can simply ship. The flag exists because
 * the current wording is a commitment.
 *
 * /emergency stays published either way. Its safety guidance is useful with or
 * without anybody to route to, and it is reachable from the quiz and from
 * search. Only the site-wide interrupt is gated.
 */
export const EMERGENCY_ROUTING_LIVE = false;

/**
 * The editorial promise, rendered in the footer and referenced on the results
 * page. It is a commercial policy before it is a piece of copy: contractor
 * payment may affect *which eligible installer* receives an introduction, and
 * may never affect *what the site recommends*.
 */
export const INDEPENDENCE_POLICY =
  "Water Heater Advisor is not a plumbing company and does not perform installations. " +
  "We are paid by the installers we introduce you to. That payment affects which " +
  "qualified installer we match you with. It never affects what we recommend.";
