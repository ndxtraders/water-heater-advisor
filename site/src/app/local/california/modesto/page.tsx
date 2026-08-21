import type { Metadata } from "next";
import Link from "next/link";

import { CostBreakdown } from "@/components/advisor/Cost";
import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { CheckedStamp, RebateStatus, SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: { canonical: "/local/california/modesto" },
  title: "Water heaters in Modesto, California",
  description:
    "Modesto water heater costs, permits, utility rebates and local conditions. " +
    "Every figure carries a source and the date we last checked it.",
};

const CHECKED = "7 Aug 2026";

export default function ModestoPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Local rules" />
          <div className="mt-8">
            <Eyebrow>Modesto, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              What actually changes the answer in Modesto
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Not the city name. The utility territory, the permit process, and which
              rebates are genuinely funded this week. A page that swaps a city name into
              generic advice is worth nothing, so here is the local detail that moves a
              recommendation.
            </p>
            <div className="mt-6">
              <CheckedStamp date={CHECKED} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Rebates. The whole point of the four-state badge lives here. */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="Rebates and incentives"
            lead="Incentives are live data, not evergreen content. An outlined Verify badge means we have not confirmed it ourselves, and we would rather show you that than present a guess as a fact."
          />

          <div className="space-y-4">
            <IncentiveRow
              name="Turlock Irrigation District, heat pump water heater"
              detail="This is a gas or propane to electric conversion rebate for a qualifying ENERGY STAR heat pump unit. If you already have an electric tank, this specific programme is not the one that applies to you. A slice of eastern Modesto sits inside TID territory, and the full qualifying conditions live on our Turlock page."
              amount="$1,000"
              state="active"
              source="TID residential gas-to-electric rebate application, 2026"
            />
            <IncentiveRow
              name="Modesto Irrigation District, heat pump water heater"
              detail="For qualifying heat pump water heater replacements. Confirm current eligibility and funding directly with MID before counting on it."
              amount="$500"
              state="active"
              source="California Switch Is On incentive listing for MID"
            />
            <IncentiveRow
              name="California HEEHRA, single family"
              detail="The programme exists but statewide funds are committed. New single family projects are being waitlisted rather than funded."
              state="reserved"
              source="California HEEHRA programme status"
            />
            <IncentiveRow
              name="Federal 25C energy efficient home improvement credit"
              detail="Cannot be claimed for property placed in service after 31 December 2025. Many articles still quote the old 30 percent figure."
              state="expired"
              source="IRS guidance on the Energy Efficient Home Improvement Credit"
            />
          </div>

          <Callout title="Why your utility matters more than your city" tone="warn">
            <p>
              A Modesto home on MID and a Turlock home fifteen miles down the road sit in
              different rebate territories. That difference can move a heat pump from
              marginal to obviously worth it. Any calculator that treats the greater
              Modesto area as one market is guessing, which is why we ask for your
              postcode rather than your city.{" "}
              <Link
                href="/local/california/turlock"
                className="text-blue underline underline-offset-4"
              >
                The Turlock page shows what that difference is worth in dollars
              </Link>
              , because TID publishes both the rates and the rebates.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Local conditions */}
      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Modesto market record"
            rows={[
              {
                label: "Electric utility",
                value: "Modesto Irrigation District serves the greater Modesto territory.",
                meta: (
                  <SourceNote source="Modesto Irrigation District" checked={CHECKED} />
                ),
              },
              {
                label: "Permits",
                value:
                  "The City of Modesto allows homeowners and licensed contractors to apply, pay for and obtain water heater permits online, and to book inspections online.",
                meta: <SourceNote source="City of Modesto online permitting" checked={CHECKED} />,
              },
              {
                label: "Building code",
                value:
                  "Modesto adopted the 2025 California Mechanical Code with an effective date of 11 June 2026. The 2025 Energy Code applies to permit applications filed on or after 1 January 2026.",
                meta: <SourceNote source="City of Modesto code adoption" checked={CHECKED} />,
              },
              {
                label: "New construction",
                value:
                  "New single family homes using gas or propane water heating carry heat pump ready requirements, including designated space, electrical provision and condensate routing.",
                meta: <SourceNote source="2025 California Energy Code" checked={CHECKED} />,
              },
              {
                label: "Water hardness",
                value:
                  "Varies by source and service zone. We have not found a source authoritative enough to publish a single citywide figure, so we will not invent one. If you are considering tankless, ask your installer what they see locally.",
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: unverified by service zone. This matters because hard water
                    drives tankless descaling frequency.
                  </p>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      {/* Cost */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            title="What a Modesto job actually costs"
            lead="We will not publish an average. The evidence does not support that precision, and an average answers the wrong question anyway. Here is the job broken into parts instead."
          />
          {/* Tank replacement first. It is the volume job, it is what most
              visitors are actually buying, and it is the one figure we have a
              real local quote for. */}
          <CostBreakdown
            title="Gas tank replacement, like for like"
            lines={[
              {
                label: "Water heater unit",
                low: 950,
                high: 2200,
                condition: "Entry level 40 gallon up to a premium contractor line",
              },
              { label: "Installation labour", low: 650, high: 1300 },
              { label: "Permit and inspection", low: 150, high: 400 },
              {
                label: "Code compliance items",
                low: 150,
                high: 500,
                condition: "Expansion tank, seismic strapping, relief discharge, drain pan",
              },
              { label: "Haul away of the old unit", low: 50, high: 150 },
              {
                label: "Venting corrections",
                low: 300,
                high: 900,
                condition: "If the existing flue does not meet current code",
                optional: true,
              },
              {
                label: "Re-piping or relocation",
                low: 200,
                high: 800,
                condition: "If the new unit does not match the old footprint",
                optional: true,
              },
            ]}
            note="Most of the spread sits in the first line. A basic 40 gallon unit and a premium contractor-channel model are the same job to install and roughly $1,200 apart to buy. For reference, one Modesto company currently quotes around $2,700 for a Bradford White installation, and a local water heater specialist advertises $1,995 to $2,495 for a standard 40 gallon replacement."
          />
          <SourceNote
            source="Local Modesto contractor quote and advertised specialist pricing, collected directly"
            checked={CHECKED}
          />

          {/* The single most common homeowner misunderstanding in this
              category, and cheap to clear up. */}
          <Callout title="Why the $900 water heater costs $2,700 installed">
            <p>
              A tank on the shelf at a big box store starts around $900, and that number
              is what most people have in their head when they call a plumber. The gap is
              not markup. It is labour, the permit and inspection, the code items an
              inspector will actually look for, hauling the old unit away, and in many
              cases a better unit than the entry level one on display. A quote that comes
              in near the shelf price is usually missing several of those.
            </p>
          </Callout>

          <div className="mt-10">
            <CostBreakdown
              title="Tank to gas tankless conversion"
              lines={[
                { label: "Tankless unit", low: 1300, high: 2800 },
                { label: "Installation labour", low: 1200, high: 2400 },
                { label: "Permit and inspection", low: 150, high: 400 },
                {
                  label: "Gas line upsizing",
                  low: 350,
                  high: 2000,
                  condition: "If the existing line cannot carry the unit",
                  optional: true,
                },
                {
                  label: "New venting",
                  low: 400,
                  high: 1500,
                  condition: "Almost always required on a conversion",
                  optional: true,
                },
                {
                  label: "Dedicated electrical circuit",
                  low: 250,
                  high: 900,
                  condition: "Condensing units need power",
                  optional: true,
                },
                {
                  label: "Condensate routing",
                  low: 150,
                  high: 600,
                  condition: "Depends on where the unit sits",
                  optional: true,
                },
                {
                  label: "Recirculation pump",
                  low: 400,
                  high: 1600,
                  condition: "Only if you want instant hot water at distant taps",
                  optional: true,
                },
              ]}
              note="A conversion is a different job from a swap, and the conditional lines are where two houses on the same street end up thousands apart. National sources put tankless installation lower than this, but those figures largely describe replacing an existing tankless unit rather than converting from a tank."
            />
          </div>
          <SourceNote
            source="2026 consumer cost guides, cross-checked against Modesto contractor pricing"
            checked={CHECKED}
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <Prose>
            <h2>Getting a permit in Modesto</h2>
            <p>
              A water heater replacement needs a permit. This is not a formality that
              conscientious contractors invent. It is how the inspection catches seismic
              strapping, the temperature and pressure relief line, venting and combustion
              air, all of which are safety items.
            </p>
            <p>
              Modesto runs this online, which makes it unusually easy to verify. If a
              contractor tells you a permit is unnecessary for a like for like swap, treat
              that as information about the contractor.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Modesto home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Expanding beyond Modesto? We localise by utility territory rather than by
            city, which is why{" "}
            <Link
              href="/local/california/turlock"
              className="text-blue underline underline-offset-4"
            >
              Turlock gets its own research
            </Link>{" "}
            rather than a find and replace.
          </p>
        </Container>
      </Section>
    </>
  );
}

function IncentiveRow({
  name,
  detail,
  amount,
  state,
  source,
}: {
  name: string;
  detail: string;
  amount?: string;
  state: "active" | "reserved" | "expired" | "verify";
  source: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-md text-lg leading-snug">{name}</h3>
        <div className="flex items-center gap-3">
          {amount ? <span className="tabular text-lg font-semibold">{amount}</span> : null}
          <RebateStatus state={state} />
        </div>
      </div>
      <p className="mt-2.5 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
        {detail}
      </p>
      <SourceNote source={source} checked={CHECKED} />
    </article>
  );
}
