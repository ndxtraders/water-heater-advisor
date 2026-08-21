import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * robots.txt.
 *
 * The site had a sitemap and nothing pointing crawlers at it. This is the
 * pointer, and it is generated from `site.url` so it can never drift from the
 * canonical host the way a hand-written file would.
 *
 * Nothing is disallowed. There is no admin area, no search-result pages and no
 * faceted URLs to keep out of an index, and blocking paths we do not have would
 * be cargo cult.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
