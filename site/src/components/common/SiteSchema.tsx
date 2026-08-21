import { site } from "@/lib/site";

/**
 * Site identity, declared once on the homepage.
 *
 * The homepage was emitting no structured data at all, so nothing told a
 * search engine what this site *is*. Every other page carries a BreadcrumbList
 * and the resources routes carry Article or CollectionPage, but the publisher
 * behind them existed only as a bare name nested inside those records.
 *
 * ## Why Organization and not something more specific
 *
 * Schema.org has richer types available, and every one of them is wrong here.
 * LocalBusiness, Plumber and HomeAndConstructionBusiness all assert that the
 * entity performs the work, which is the one claim this site must never make:
 * a CSLB-registered referral service may not present itself as performing the
 * construction. That constraint is why there is no NAP block, no address and no
 * telephone in this record either. Generic Organization is not a compromise, it
 * is the accurate type.
 *
 * The two nodes are joined with @id so the WebSite points at the Organization
 * rather than repeating it.
 */
export function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        description: site.tagline,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.tagline,
        inLanguage: "en-US",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
