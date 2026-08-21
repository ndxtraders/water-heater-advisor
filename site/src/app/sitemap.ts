import type { MetadataRoute } from "next";

import { getAllResources } from "@/lib/resources";
import { site } from "@/lib/site";

const EXISTING_INDEXABLE_ROUTES = [
  "",
  "/brands",
  "/brands/navien",
  "/brands/noritz",
  "/brands/rinnai",
  "/compare/navien-vs-rinnai",
  "/compare/tank-vs-tankless",
  "/emergency",
  "/installers/how-to-choose",
  "/local",
  "/local/california/modesto",
  "/local/california/turlock",
  "/methodology",
  "/privacy",
  "/quiz",
  "/terms",
  "/water-heaters",
  "/water-heaters/electric-storage",
  "/water-heaters/gas-storage",
  "/water-heaters/heat-pump",
  "/water-heaters/tankless",
  "/water-heaters/tankless/not-right-for-you",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const existing: MetadataRoute.Sitemap = EXISTING_INDEXABLE_ROUTES.map((route) => ({
    url: `${site.url}${route}`,
  }));

  const resources: MetadataRoute.Sitemap = getAllResources({ includeDrafts: false }).map(
    (resource) => ({
      url: `${site.url}${resource.slug}`,
      lastModified: resource.lastChecked,
    }),
  );

  return [...existing, ...resources];
}
