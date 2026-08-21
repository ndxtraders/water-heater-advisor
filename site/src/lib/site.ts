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
 * The editorial promise, rendered in the footer and referenced on the results
 * page. It is a commercial policy before it is a piece of copy: contractor
 * payment may affect *which eligible installer* receives an introduction, and
 * may never affect *what the site recommends*.
 */
export const INDEPENDENCE_POLICY =
  "Water Heater Advisor is not a plumbing company and does not perform installations. " +
  "We are paid by the installers we introduce you to. That payment affects which " +
  "qualified installer we match you with. It never affects what we recommend.";
