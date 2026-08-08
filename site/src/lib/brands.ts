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
