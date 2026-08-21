import research from "@/data/brand-research.json";

import type { TechId } from "@/lib/quiz/engine";

/**
 * Typed access to the brand research dataset.
 *
 * The JSON is the deliverable of a separate deep research pass, checked
 * 2026-08-07, and it is treated as read-only source data. Corrections belong
 * upstream in the research file, not patched here, so that the `checked_at`
 * dates on every record stay meaningful.
 */

export type BrandId =
  | "navien"
  | "rinnai"
  | "rheem"
  | "ao-smith"
  | "noritz"
  | "bradford-white";

export const BRAND_NAMES: Record<BrandId, string> = {
  navien: "Navien",
  rinnai: "Rinnai",
  rheem: "Rheem",
  "ao-smith": "A. O. Smith",
  noritz: "Noritz",
  "bradford-white": "Bradford White",
};

export const RESEARCH_CHECKED_AT = research.meta.checked_at;

/**
 * Which technologies each brand actually makes for residential use.
 *
 * This corrects an assumption baked into the earlier build, that Navien and
 * Rinnai were tankless-only. Both now have current heat pump lines, which means
 * a homeowner who prefers one of them should not silently lose that preference
 * when the engine lands on a heat pump.
 */
export function brandMakes(brand: BrandId, tech: TechId): boolean {
  const row = research.brand_technology_matrix.find((b) => b.brand === brand);
  if (!row) return false;
  return Boolean((row.technologies as Record<string, boolean>)[tech]);
}

export function brandsMaking(tech: TechId): BrandId[] {
  return research.brand_technology_matrix
    .filter((b) => Boolean((b.technologies as Record<string, boolean>)[tech]))
    .map((b) => b.brand as BrandId);
}

/**
 * Explains a brand-versus-technology mismatch in plain language.
 *
 * Returns null when there is no conflict. The rule from the research is that a
 * preference must never revive a technically eliminated technology, but silently
 * ignoring what the homeowner asked for is its own kind of dishonesty. So the
 * engine keeps the recommendation and says why the brand does not apply.
 */
export function brandMismatch(
  brand: string | undefined,
  tech: TechId,
): { brandName: string; alternatives: string[] } | null {
  if (!brand || brand === "none" || brand === "other") return null;
  if (!(brand in BRAND_NAMES)) return null;
  const id = brand as BrandId;
  if (brandMakes(id, tech)) return null;
  return {
    brandName: BRAND_NAMES[id],
    alternatives: brandsMaking(tech).map((b) => BRAND_NAMES[b]),
  };
}

export interface WarrantyProfile {
  brand: string;
  line: string;
  residential?: Record<string, Record<string, number>>;
  conditions?: string[];
  source_urls?: string[];
  checked_at?: string;
}

export function warrantyFor(brand: BrandId): WarrantyProfile[] {
  return research.warranty_profiles.filter(
    (w) => w.brand === brand,
  ) as unknown as WarrantyProfile[];
}

export interface RoutingSignal {
  brand: string;
  installer_program?: string | null;
  manufacturer_locator_url?: string | null;
  parts_availability_central_valley?: string | null;
  local_evidence?: string | null;
  checked_at?: string;
}

export function routingFor(brand: BrandId): RoutingSignal | undefined {
  return research.routing_signals.find((r) => r.brand === brand) as
    | RoutingSignal
    | undefined;
}

export function productLinesFor(brand: BrandId) {
  return research.product_lines.filter((p) => p.brand === brand);
}

/** Items the research explicitly could not verify. Never publish these as fact. */
export const UNVERIFIED: string[] = research.unverified.map((u) =>
  typeof u === "string" ? u : ((u as { item?: string }).item ?? JSON.stringify(u)),
);

export type BrandPageStatus = "published" | "researched" | "thin";

export interface BrandEntry {
  id: BrandId;
  name: string;
  /** Null until the page exists. The index renders those as plain cards. */
  href: string | null;
  status: BrandPageStatus;
  /** One line of positioning. What the brand is for, not what it claims. */
  positioning: string;
  /** Technologies, in the reader's words rather than the engine's ids. */
  makes: string[];
}

/**
 * The brand directory.
 *
 * `status` is the honest part. The research dataset covers all six brands for
 * product lines, warranties and routing signals, but its *selection rules* are
 * heavily skewed: Navien, Noritz and Rinnai carry enough to say when a homeowner
 * should and should not pick them, while A. O. Smith and Bradford White
 * currently carry none at all.
 *
 * That gap decides what may be published. A brand page whose whole job is
 * "worth shortlisting if / look elsewhere if" cannot be written from a spec
 * sheet, and writing one anyway would produce exactly the confident, sourceless
 * brand page this site exists to be better than. So "thin" is recorded here
 * rather than quietly papered over, and the index says so on the card.
 */
export const BRAND_DIRECTORY: BrandEntry[] = [
  {
    id: "navien",
    name: "Navien",
    href: "/brands/navien",
    status: "published",
    positioning:
      "Condensing gas tankless with recirculation built into the unit rather than bolted on. Since the NWP500 line, heat pumps too.",
    makes: ["Gas tankless", "Heat pump"],
  },
  {
    id: "rinnai",
    name: "Rinnai",
    href: "/brands/rinnai",
    status: "published",
    positioning:
      "The other name most homeowners have heard for gas tankless. Sells heat pumps as well, and states plainly that it does not make electric tankless.",
    makes: ["Gas tankless", "Heat pump"],
  },
  {
    id: "noritz",
    name: "Noritz",
    href: "/brands/noritz",
    status: "published",
    positioning:
      "Gas tankless only, and the strongest Central Valley parts position of the six. A specialist rather than a full-range manufacturer.",
    makes: ["Gas tankless"],
  },
  {
    id: "rheem",
    name: "Rheem",
    href: null,
    status: "researched",
    positioning:
      "Full range, tanks through heat pumps, and widely stocked. Its 120V heat pump option can change whether a conversion is feasible at all.",
    makes: ["Gas tank", "Electric tank", "Gas tankless", "Electric tankless", "Heat pump"],
  },
  {
    id: "ao-smith",
    name: "A. O. Smith",
    href: null,
    status: "thin",
    positioning:
      "Full range, and the largest catalogue in the dataset. Also has a current 120V heat pump option worth knowing about on a difficult conversion.",
    makes: ["Gas tank", "Electric tank", "Gas tankless", "Electric tankless", "Heat pump"],
  },
  {
    id: "bradford-white",
    name: "Bradford White",
    href: null,
    status: "thin",
    positioning:
      "Contractor channel only, so it is never the box you priced at a big box store. Full range, though its electric tankless is point-of-use rather than whole-home.",
    makes: ["Gas tank", "Electric tank", "Gas tankless", "Heat pump"],
  },
];
