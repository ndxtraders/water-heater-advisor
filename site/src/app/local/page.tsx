import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { CheckedStamp } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { MARKETS, type MarketEntry } from "@/lib/market";
import { Breadcrumb } from "@/components/common/Breadcrumb";

/**
 * Markets grouped by territory, in first-published order within each group.
 *
 * Derived rather than hand-maintained so that adding a market to `MARKETS` puts
 * it in the right group automatically. An index that has to be updated in two
 * places is an index that eventually disagrees with itself.
 */
const TERRITORIES: { territory: string; markets: MarketEntry[] }[] = MARKETS.reduce(
  (groups, entry) => {
    const existing = groups.find((g) => g.territory === entry.territory);
    if (existing) existing.markets.push(entry);
    else groups.push({ territory: entry.territory, markets: [entry] });
    return groups;
  },
  [] as { territory: string; markets: MarketEntry[] }[],
);

/**
 * Counts spelled out, derived rather than typed.
 *
 * The copy below used to read "Two markets are published today, both in
 * Stanislaus County". It was true when it was written and it was wrong by the
 * time four more markets shipped, which is the failure mode of any sentence
 * that counts something in prose. Deriving it means the paragraph cannot
 * disagree with the list directly above it.
 *
 * Spelled out because a numeral mid-sentence reads like a spec sheet, and the
 * fallback keeps the sentence grammatical rather than correct-looking if this
 * ever passes twelve.
 */
const WORDS = [
  "No",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
] as const;
const spell = (n: number) => WORDS[n] ?? String(n);

const MARKET_COUNT = spell(MARKETS.length);
const TERRITORY_COUNT = spell(TERRITORIES.length).toLowerCase();

export const metadata: Metadata = {
  alternates: { canonical: "/local" },
  title: "Local water heater guidance by market",
  description:
    "Rebates, permits, utility rates and local conditions, researched per market. " +
    "We localise by utility territory rather than by city name.",
};

export default function LocalHubPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <Breadcrumb trail={[{ label: "Locations" }]} />
          <div className="mt-6">
            <DecisionPath current="Local rules" />
          </div>
          <div className="mt-8">
            <Eyebrow>Local guidance</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              We research markets by utility, not by city name
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Two homes fifteen miles apart can sit in different rebate territories, pay a
              different price for the same kilowatt hour, and get a different answer to
              the same question. A Modesto house on MID and a Turlock house on TID are
              exactly that pair, which is why each market below is researched on its own
              rather than assembled by swapping a city name into a template.
            </p>
          </div>
        </Container>
      </Section>

      {/*
        The market index.

        Only cities with a published page appear. An index is the most damaging
        place to break the site's rule about never linking at a route that does
        not exist, because a reader arrives here specifically looking for their
        own city.
      */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="Markets we have researched"
            lead="Grouped by the utility territory they sit in, because that is the thing that actually decides the answer. Each market carries its own rebate status, permit rules and local conditions, and each figure on those pages carries a source and the date we last checked it."
          />

          {/*
            Grouped rather than listed.

            A flat list of cities quietly argues that the city is the unit,
            which is the opposite of what this page says in its own headline.
            Grouping also does real work for the reader who has not yet realised
            that their city is the wrong thing to be searching on: seeing
            Patterson filed under Turlock Irrigation District explains the site's
            whole model faster than the paragraph above it does.
          */}
          <div className="space-y-12">
            {TERRITORIES.map(({ territory, markets }) => (
              <div key={territory}>
                <h3 className="apparatus mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {territory}
                </h3>
                <div className="space-y-5">
                  {markets.map((entry) => (
                    <article
                      key={entry.href}
                      className="group relative rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(11,33,67,0.16)] sm:p-7"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                        <h4 className="font-heading text-2xl">
                          <Link href={entry.href} className="after:absolute after:inset-0">
                            {entry.market.city}
                          </Link>
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {entry.market.state}
                        </p>
                      </div>

                      <p className="mt-1.5 text-sm font-medium text-blue">
                        {entry.electricLine ??
                          `${entry.electricUtilityShort} electricity, ${entry.gasUtility} gas`}
                      </p>

                      <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {entry.distinctive}
                      </p>

                      <div className="mt-5">
                        <CheckedStamp date={entry.checked} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Callout title="Why the utility matters more than the postcode">
            <p>
              Rebates and rates follow utility territory, and territory does not respect
              city limits. Part of eastern Modesto sits inside Turlock Irrigation
              District, which means those households get the rebates listed on the Turlock
              page rather than the ones on the Modesto page. If you are near a boundary,
              read both and check your own bill for the supplier name.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="What gets researched locally, and what does not" />
          <Prose>
            <p>
              Most of what matters about a water heater is not local at all. How the
              technologies work, how to size them, what goes wrong with each one, what a
              warranty actually covers: none of that changes between one Central Valley
              city and the next, and pretending otherwise is how thin local pages get
              made.
            </p>
            <h3>Researched per market</h3>
            <ul>
              <li>Electric and gas utility, and the published rates behind them</li>
              <li>Rebates and incentives, with a live status on each one</li>
              <li>Permit requirements and the building department that runs them</li>
              <li>Adopted building codes and climate zone</li>
              <li>Water source and hardness, which drives tankless maintenance</li>
              <li>Local job costs, where a real local observation exists</li>
            </ul>
            <h3>Shared across every market</h3>
            <ul>
              <li>How each technology works and who it suits</li>
              <li>Sizing principles and the questions that settle them</li>
              <li>Brand research, warranties and service coverage</li>
              <li>How to choose an installer and what to ask</li>
            </ul>
            <p>
              When a figure is borrowed from a neighbouring market rather than measured
              locally, the page says so where the figure appears. The Turlock cost tables
              are labelled that way right now, because no first-party Turlock quote has
              been collected yet.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Your city is not listed</h2>
            <p>
              {MARKET_COUNT} markets are published today, across {TERRITORY_COUNT}{" "}
              utility territories in the Central Valley. That leaves out most of
              California, so
              for a lot of people reading this the honest answer is that we have not done
              the work for your city yet. We would rather say so than publish a page with
              your city name pasted into someone else&rsquo;s research.
            </p>
            <p>
              None of that stops the quiz working for you. The technology, sizing and
              feasibility questions are identical in every market, and the one genuinely
              local input it needs, your postcode, it asks for directly.
            </p>
            <p>
              Markets are added by utility territory rather than by population, working
              outward from the ones above.{" "}
              <Link href="/methodology">Our method explains how</Link>, including what we
              will not publish and why.
            </p>
          </Prose>

        </Container>
      </Section>

      <Section tone="dark" className="py-14 sm:py-20">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="apparatus text-xs font-medium uppercase tracking-[0.08em] text-white/65">
                Local where it matters
              </p>
              <h2 className="mt-3 max-w-[24ch] text-3xl text-white sm:text-4xl">
                Most of the answer is the same everywhere. We ask for the part that is not
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                Sizing, feasibility and technology do not change between one Central
                Valley city and the next. Your postcode does, because rebates and rates
                follow utility territory, so that is the one local thing the quiz asks
                for.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                When you are ready to collect quotes,{" "}
                <Link
                  href="/installers/how-to-choose"
                  className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  choosing an installer
                </Link>{" "}
                covers what to ask and what a good answer sounds like.
              </p>
            </div>
            <ButtonLink href="/quiz" size="lg" className="w-full sm:w-auto">
              Find the right system for my home
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
