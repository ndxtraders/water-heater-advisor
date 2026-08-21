import Link from "next/link";

import { INDEPENDENCE_POLICY, site } from "@/lib/site";

const COLUMNS = [
  { heading: "Making the decision", links: site.footer.decide },
  { heading: "Local markets", links: site.footer.local },
  { heading: "About this site", links: site.footer.about },
] as const;

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {col.heading}
              </h2>
              <ul className="space-y-2">
                {/* Keyed by label, not href: two About entries point at
                    /methodology on purpose, and keying by href collided. */}
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/75 hover:text-blue hover:underline hover:underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/*
          The disclosure is given real estate and real type, not 10px grey legal
          text at the bottom of the page.

          Two reasons. It is a CSLB matter — a referral service may not present
          itself as performing the construction — and it is the brand. A site
          whose entire pitch is independence should be the one site willing to
          state its own commercial interest plainly.
        */}
        <section
          aria-labelledby="independence"
          className="mt-14 border-t border-border pt-8"
        >
          <h2 id="independence" className="font-heading text-lg">
            How we make money
          </h2>
          <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted-foreground">
            {INDEPENDENCE_POLICY}{" "}
            <Link
              href="/methodology"
              className="text-blue underline underline-offset-4 hover:text-blue-bright"
            >
              Read the full method and our conflicts policy
            </Link>
            .
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Guidance only. Always confirm
            requirements with your local building department and a licensed contractor.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
