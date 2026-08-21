import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { CheckedStamp } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { MARKETS } from "@/lib/market";

export const metadata: Metadata = {
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
          <DecisionPath current="Local rules" />
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
            lead="Each one carries its own rebate status, permit rules, utility rates and local conditions, and each figure on those pages carries a source and the date we last checked it."
          />

          <div className="space-y-5">
            {MARKETS.map((entry) => (
              <article
                key={entry.href}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(11,33,67,0.16)] sm:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="text-2xl">
                    <Link href={entry.href} className="after:absolute after:inset-0">
                      {entry.market.city}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.market.state}
                  </p>
                </div>

                <p className="mt-1.5 text-sm font-medium text-blue">
                  {entry.electricUtilityShort} electricity, {entry.gasUtility} gas
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
              Two markets are published today, both in Stanislaus County, so that will be
              most people reading this. It means we have not done the work for your city
              yet, and we would rather say so than publish a page with your city name
              pasted into someone else&rsquo;s research. The quiz does not depend on
              having a local page for you: the technology, sizing and feasibility
              questions are identical in every market, and the one genuinely local input
              it needs, your postcode, it asks for directly.
            </p>
            <p>
              Markets are added by utility territory, working outward from the ones above.{" "}
              <Link href="/methodology">Our method explains how</Link>, including what we
              will not publish and why.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
