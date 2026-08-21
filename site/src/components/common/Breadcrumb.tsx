import Link from "next/link";

import { site } from "@/lib/site";

export interface Crumb {
  label: string;
  /** Omit on the final crumb. The current page is not a link to itself. */
  href?: string;
}

/**
 * Breadcrumb trail, with its structured data.
 *
 * Home is implicit and always first, so callers pass only what follows it.
 *
 * Two reasons this exists as one component rather than per-page markup. The
 * resources routes had their own copy and nothing else on the site had any, so
 * pages two and three levels deep offered a reader no way back up except the
 * header. And a visible trail without `BreadcrumbList` markup wastes the half
 * of the work a search engine can actually read.
 *
 * The JSON-LD uses absolute URLs built from `site.url`, so it follows the
 * canonical host rather than drifting from it.
 */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const items = [{ label: "Home", href: "/" }, ...trail];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {c.href ? (
                <Link href={c.href} className="hover:text-blue hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
