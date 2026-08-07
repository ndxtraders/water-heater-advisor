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

  nav: [
    { label: "Water Heaters", href: "/water-heaters" },
    { label: "Compare", href: "/compare" },
    { label: "Costs", href: "/cost" },
    { label: "Brands", href: "/brands" },
    { label: "Modesto", href: "/local/california/modesto" },
  ],

  footer: {
    guides: [
      { label: "Gas storage", href: "/water-heaters/gas-storage" },
      { label: "Electric storage", href: "/water-heaters/electric-storage" },
      { label: "Gas tankless", href: "/water-heaters/tankless" },
      { label: "Heat pump", href: "/water-heaters/heat-pump" },
    ],
    decide: [
      { label: "Tank vs tankless", href: "/compare/tank-vs-tankless" },
      { label: "Tankless vs heat pump", href: "/compare/tankless-vs-heat-pump" },
      { label: "What size do I need?", href: "/sizing" },
      { label: "When tankless is wrong", href: "/water-heaters/tankless/not-right-for-you" },
    ],
    local: [
      { label: "Modesto overview", href: "/local/california/modesto" },
      { label: "Modesto rebates", href: "/local/california/modesto/rebates" },
      { label: "Modesto permits", href: "/local/california/modesto/permits" },
      { label: "Choosing an installer", href: "/installers/how-to-choose" },
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
