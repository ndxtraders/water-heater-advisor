import Link from "next/link";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND_DIRECTORY, brandsMaking } from "@/lib/brands";
import { TECHNOLOGIES } from "@/lib/quiz/engine";
import { PRICE_MODEL } from "@/lib/pricing";
import { TECHNOLOGY_CONTENT, type TechContent } from "@/lib/technologies";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Shared layout for the four technology pages.
 *
 * The structure is shared because the argument is the same shape every time:
 * how it works, who it suits, what the pitch leaves out, what it costs to buy,
 * what it costs to run, who makes it. The copy is written per technology in
 * lib/technologies.ts and none of it is generated.
 *
 * Running costs are quoted from the Turlock model and labelled as such, because
 * they are the only market where we hold both published utility rates. Quoting
 * them as national figures would be exactly the borrowed-number problem the
 * local pages exist to avoid.
 */
export function TechnologyPage({ tech }: { tech: TechContent }) {
  const price = PRICE_MODEL[tech.id];
  const makers = brandsMaking(tech.id);
  // The published range comes from the engine, not from the price model.
  // research/LOCAL-PRICE-OBSERVATIONS.md is the authority for every price on
  // the site and those figures are calibrated against real local quotes; the
  // model's derived range runs below the observed floor at the bottom end,
  // which is the exact bug that file records fixing. The model still explains
  // the *relationship* between shelf price and installed price, which is its job.
  const [installedLow, installedHigh] = TECHNOLOGIES[tech.id].cost;

  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <Breadcrumb
            trail={[
              { label: "Technologies", href: "/water-heaters" },
              { label: tech.name },
            ]}
          />
          <div className="mt-6">
            <DecisionPath current="Technology" />
          </div>
          <div className="mt-8">
            <Eyebrow>Technologies</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">{tech.h1}</h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              {tech.lead}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container width="narrow">
          <Prose>
            <h2>How it works</h2>
            {tech.howItWorks.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Prose>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="fit" label="Good fit when" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                {tech.fits.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="unfit" label="Think twice when" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                {tech.cautions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Every one of these is sold hard by somebody. This is the section
              that pays for the page. */}
          <Callout title={tech.catchTitle} tone="warn">
            {tech.theCatch.map((p, i) => (
              <p key={p.slice(0, 40)} className={i > 0 ? "mt-4" : undefined}>
                {p}
              </p>
            ))}
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="What it costs"
            lead="We model the installed price from the equipment price, because you can look up the box and you cannot look up everything that gets added to it. Ranges only, and never a single average."
          />

          <div className="rounded-lg border border-border bg-card p-6 sm:p-7">
            <dl className="divide-y divide-border">
              <Row label="Rule of thumb" value={price.ruleOfThumb} />
              <Row
                label="Equipment, retail"
                value={`${usd(price.equipment[0])} to ${usd(price.equipment[1])}`}
              />
              <Row
                label="Typical installed"
                value={`${usd(installedLow)} to ${usd(installedHigh)}`}
              />
              <Row label="Time on site" value={price.hours} />
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                What the work portion buys
              </p>
              <ul className="space-y-1.5">
                {price.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.9375rem] leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-blue"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <SourceNote
            source="Water Heater Advisor price model, calibrated against Stanislaus County contractor pricing"
            checked="7 Aug 2026"
          />

          <Prose className="mt-10">
            <h3>What it costs to run</h3>
            <p>{tech.runningCost}</p>
            <p>
              Those figures come from our{" "}
              <Link href="/local/california/turlock">Turlock fuel model</Link>, which is
              the one market where we hold both published utility rates. They will be in
              the right region for anywhere nearby and they are not a national average, so
              treat them as a comparison between technologies rather than a prediction of
              your bill.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            title="Who makes it"
            lead="Brand comes after technology, always. Once you have settled on this one, these are the manufacturers we hold research for."
          />
          <ul className="flex flex-wrap gap-2.5">
            {makers.map((id) => {
              const entry = BRAND_DIRECTORY.find((b) => b.id === id);
              if (!entry) return null;
              return (
                <li key={id}>
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="inline-flex rounded-full border border-blue/30 bg-blue/5 px-4 py-1.5 text-sm font-medium text-blue hover:bg-blue/10"
                    >
                      {entry.name}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-full border border-dashed border-input px-4 py-1.5 text-sm font-medium text-muted-foreground">
                      {entry.name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Solid entries have a page. Dashed entries are in the research but not yet
            written up, and we would rather show you that than link you nowhere.{" "}
            <Link href="/brands" className="text-blue underline underline-offset-4">
              All brands
            </Link>
          </p>

          <Prose className="mt-12">
            <h2>Ask your installer these</h2>
            <ul>
              {tech.askInstaller.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my home
            </ButtonLink>
            <ButtonLink href="/water-heaters" variant="secondary" size="lg">
              Compare all four technologies
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 sm:flex sm:gap-6">
      <dt className="text-sm font-medium text-muted-foreground sm:w-44 sm:shrink-0">
        {label}
      </dt>
      <dd className="mt-0.5 text-[0.9375rem] sm:mt-0">{value}</dd>
    </div>
  );
}

/** Route helper so each of the four page files stays a handful of lines. */
export function techBySlug(slug: string): TechContent {
  const tech = TECHNOLOGY_CONTENT[slug];
  if (!tech) throw new Error(`Unknown technology slug: ${slug}`);
  return tech;
}
