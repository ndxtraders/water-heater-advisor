import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import {
  EvidenceTable,
  IncentiveRow,
  LocalPageSchema,
  LocalReviewStatus,
  ProviderFork,
} from "@/components/advisor/Local";
import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { CheckedStamp, SourceNote } from "@/components/advisor/Status";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { STOCKTON } from "@/lib/market";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/local/california/stockton" },
  title: "Water heaters in Stockton, California",
  description:
    "Stockton has more than one water company and two companies on the electricity bill. " +
    "What each one changes, which rebates actually apply, and the permit fee we will not guess at.",
};

const CHECKED = "21 Aug 2026";

/**
 * Stockton.
 *
 * The largest market on the site and the one where the most is unsettled by an
 * address. Two companies on the electricity bill, more than one company selling
 * the water, and a permit fee we could not confirm.
 *
 * Its water section is the counterpart to Tracy's rather than a copy of it.
 * Tracy's uncertainty is which *source* reaches a house inside one system.
 * Stockton's is which *company* runs the system at all, which is a different
 * question with a different first step, and the pages are shaped around that
 * difference on purpose.
 *
 * The targeted-assistance section has no equivalent anywhere else on the site.
 * It is means-tested rather than a rebate, it is easy to get wrong, and no
 * contractor page in this market mentions it at all.
 */
export default function StocktonPage() {
  return (
    <>
      <LocalPageSchema
        title="Water heaters in Stockton, California"
        description="Multiple retail water providers, the Ava and PG&E bill, targeted assistance programmes, and an unresolved permit fee."
        url={`${site.url}/local/california/stockton`}
        modified="2026-08-21"
        siteName={site.name}
        siteUrl={site.url}
      />

      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <Breadcrumb
            trail={[
              { label: "Locations", href: "/local" },
              { label: "California" },
              { label: "Stockton" },
            ]}
          />
          <div className="mt-6">
            <DecisionPath current="Local rules" />
          </div>
          <div className="mt-8">
            <Eyebrow icon={MapPin}>Stockton, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              More than one company sells water in Stockton
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              That is unusual, and it is why the City publishes an address lookup for
              something most cities treat as settled. Within the City system alone,
              reported hardness runs from 53 mg/L on one source to 351 on another. Your
              electricity bill has two companies on it as well. This is the largest market
              we cover and the one where an address decides the most.
            </p>
            <div className="mt-6">
              <CheckedStamp date={CHECKED} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="First, find out who sells you the water"
            lead="Most local water heater pages open with rebates, because rebates are the easiest thing to look up. In Stockton the provider question comes first, because getting it wrong means applying a real number from the wrong system to your house."
          />

          <ProviderFork
            question="Who is on your water bill?"
            how={
              <>
                The City publishes an address tool on its water quality page, which exists
                precisely because the answer is not the same everywhere. Check it, then open
                the current report belonging to whichever provider comes back.
              </>
            }
            branches={[
              {
                label: "If it is the City of Stockton",
                heading: "Use the City system's report, and note the source",
                body: (
                  <>
                    <p>
                      The City draws on groundwater and on two named surface sources, and
                      the difference between them is large. The table below is the City
                      system, broken out by source rather than averaged into one figure.
                    </p>
                    <p>
                      Ask which source, or which blend, serves your address. The answer
                      changes the maintenance conversation considerably.
                    </p>
                  </>
                ),
              },
              {
                label: "If it is California Water Service",
                heading: "Different company, different report",
                body: (
                  <>
                    <p>
                      Cal Water publishes its own Stockton district report and its figures
                      show material source variation too. Do not apply a City system number
                      to a Cal Water address, and do not go the other way either.
                    </p>
                    <p>
                      Their public report was for 2024 when we checked, so ask whether a
                      newer one exists before relying on a figure from it.
                    </p>
                  </>
                ),
              },
            ]}
          />
          <SourceNote
            source="City of Stockton water quality page and address lookup"
            href="https://www.stocktonca.gov/services/water,_sewer___stormwater/water_quality.php"
            checked={CHECKED}
          />

          <EvidenceTable
            caption="Total hardness by source, City of Stockton 2025 report"
            columns={["Source", "Total hardness as calcium carbonate", "Note"]}
            align={[1]}
            rows={[
              [
                <strong key="g">Groundwater</strong>,
                "117 to 351 mg/L, averaging 242",
                "Hard, and the range inside it is wide enough that the average describes few houses well.",
              ],
              [
                <strong key="d">Delta Water Treatment Plant</strong>,
                "About 53 mg/L",
                "Soft. Roughly a fifth of the groundwater average.",
              ],
              [
                <strong key="s">Stockton East Water District</strong>,
                "About 58 mg/L",
                "Soft, and close enough to the Delta figure that the two surface sources behave alike.",
              ],
            ]}
            note={
              <>
                A house on groundwater and a house on treated surface water are in the same
                city, on the same utility, and in completely different water. That is the
                fact this page exists to hand you, and it is the one no citywide average
                can carry.
              </>
            }
          />
          <SourceNote
            source="City of Stockton 2025 Consumer Confidence Report"
            href="https://www.stocktonca.gov/Documents/Services/Water,%20Sewer%20&%20Stormwater/Water/Water%20Quality/2025_ccr.pdf"
            checked={CHECKED}
          />
          <SourceNote
            source="California Water Service Stockton district report, 2024"
            href="https://www.calwater.com/ccrs/stk-stk-2024/"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <p>
              What to do with it: if the answer comes back groundwater and you are
              considering tankless, the descaling interval belongs in the quote
              conversation rather than in a surprise later. Ask what the specific
              model&rsquo;s manual requires at that hardness and what the installer charges
              to do it. If the answer comes back surface water, scale is a much smaller
              part of your decision and you can spend the attention elsewhere.
            </p>
            <p>
              Our national guide to{" "}
              <Link href="/resources/hard-water-water-heater">
                hard water and water heaters
              </Link>{" "}
              explains the mechanism and where the evidence stops, which is well short of
              telling you which technology to buy.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="Two companies on one electricity bill"
            lead="Stockton began receiving Ava Community Energy service in April 2025. Ava buys the generation, PG&E still owns the wires, the meter and the billing, and it all arrives as one bill with the two parts shown separately."
          />

          <Prose>
            <p>
              This trips people up in a specific way, so it is worth being plain about.
              Ava has not replaced PG&amp;E at your house. That means a programme requiring
              a PG&amp;E electric account is not automatically closed to you. It also means
              a Stockton address does not prove which enrolment you are on, because
              customers can opt out and the transition is recent enough that plenty of
              bills changed shape in the last year or so.
            </p>
            <p>
              Look at the bill before you assume any of this applies. Generation and
              delivery are itemised on it, which makes it the fastest way to settle the
              question.
            </p>
            <p>
              We looked for an Ava-funded heat pump water heater rebate for Stockton
              households and did not verify one. Ava publishes homeowner education and an
              incentive finder, and an older contractor cooperative agreement that ended in
              March 2025 is still findable. An expired agreement is not a rebate. Check the
              date on anything you find with that shape.
            </p>
          </Prose>
          <SourceNote
            source="Ava Community Energy Stockton service page and CPUC community choice aggregation overview"
            href="https://avaenergy.org/community/who-we-serve/stockton/"
            checked={CHECKED}
          />

          <div className="mt-10 space-y-4">
            <IncentiveRow
              name="Golden State Rebates, heat pump water heater"
              amount="Up to $700"
              state="verify"
              checked={CHECKED}
              source="Golden State Rebates heat pump water heater programme"
              href="https://goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/"
              detail={
                <>
                  Runs on a qualifying active electric account at a participating utility,
                  PG&amp;E included, which most Stockton households have even with Ava
                  supplying generation. The amount moves with the product, its capacity and
                  efficiency, what it is replacing, and the purchase channel. The current
                  guide excludes new construction and tankless replacements. Funds are
                  first come, first served.
                </>
              }
            />
            <IncentiveRow
              name="California HEEHRA, single family"
              state="reserved"
              checked={CHECKED}
              source="TECH Clean California single family incentives"
              href="https://techcleanca.com/incentives/single-family-incentives/"
              detail="Statewide single family funds were fully reserved as of 24 February 2026. A waitlist place is not a rebate. Worth rechecking rather than writing off, because reservations do get released."
            />
            <IncentiveRow
              name="Federal 25C energy efficient home improvement credit"
              state="expired"
              checked={CHECKED}
              source="IRS guidance on the Energy Efficient Home Improvement Credit"
              href="https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit"
              detail="Applied to qualifying improvements through 31 December 2025 and no further. A lot of Stockton contractor pages still quote the old 30 percent figure as though it were live."
            />
          </div>
        </Container>
      </Section>

      {/*
        Targeted assistance. Nothing else on the site carries this, and no
        competitor page in the market mentions it at all.
      */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            title="There are two paths here that are not rebates"
            lead="Both are means tested, both are bounded by geography or income rather than open to the city, and both can cover a water heater outright. They are worth ten minutes of anybody's time before spending four thousand dollars."
          />

          <Prose>
            <p>
              San Joaquin County runs a weatherization programme that says eligible county
              residents may receive repair or replacement of a water heater. This is
              assistance rather than a discount, so it turns on income, tenure and the
              current funding position rather than on which unit you pick.
            </p>
            <p>
              Separately, there is a defined project area inside Stockton where a
              Transformative Climate Communities programme has offered no-cost appliance
              measures, heat pump water heaters among them. This one is geographically
              bounded, so the first question is whether the address falls inside it, and the
              second is whether intake is currently open.
            </p>
            <p>
              We are flagging both rather than vouching for either. Verify the current
              intake, the geography, the income and tenure rules, the equipment covered and
              the installation terms directly with the programme before counting on it.
              Neither is a citywide benefit and neither should appear in a contractor quote
              as an assumed discount.
            </p>
          </Prose>

          <div className="mt-8 space-y-4">
            <IncentiveRow
              name="San Joaquin County weatherization"
              state="verify"
              checked={CHECKED}
              source="San Joaquin County Human Services Agency weatherization"
              href="https://www.sjchsa.org/Benefits-and-Assistance/Housing-Assistance/Weatherization"
              detail="Means tested. The County states that eligible residents may receive repair or replacement of a water heater. Eligibility, funding and scope are individual, and the County is the only place that can tell you where you stand."
            />
            <IncentiveRow
              name="Stockton project area, no-cost appliance measures"
              state="verify"
              checked={CHECKED}
              source="Rising Sun programme intake form"
              href="https://risingsun.tfaforms.net/5"
              detail="Bounded to a defined Transformative Climate Communities project area rather than the whole city, and it is an intake form rather than a published programme page, which is why the badge is outlined. Confirm the geography, current intake, income and tenure rules and the equipment before relying on it."
            />
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Stockton market record"
            rows={[
              {
                label: "Electric utility",
                value:
                  "Ava Community Energy supplies generation for enrolled accounts; PG&E handles delivery, metering and billing. Stockton service began in April 2025. Customers can opt out, so the bill decides rather than the city.",
                meta: (
                  <SourceNote
                    source="Ava Community Energy Stockton page"
                    href="https://avaenergy.org/community/who-we-serve/stockton/"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Gas utility",
                value: "PG&E.",
                meta: <SourceNote source="PG&E service area" checked={CHECKED} />,
              },
              {
                label: "Water provider",
                value:
                  "More than one. The City municipal system and California Water Service both serve parts of Stockton, and county maintenance districts appear in the area as well. The City publishes an address lookup because of it.",
                meta: (
                  <SourceNote
                    source="City of Stockton water quality page and San Joaquin LAFCO documentation"
                    href="https://www.stocktonca.gov/services/water,_sewer___stormwater/water_quality.php"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Water hardness",
                value:
                  "In the City system, 117 to 351 mg/L on groundwater against roughly 53 and 58 mg/L on the two surface sources. Cal Water addresses have their own report. There is no single Stockton figure and we are not going to publish one.",
                meta: (
                  <SourceNote
                    source="City of Stockton 2025 Consumer Confidence Report"
                    href="https://www.stocktonca.gov/Documents/Services/Water,%20Sewer%20&%20Stormwater/Water/Water%20Quality/2025_ccr.pdf"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Permits",
                value:
                  "Water heater work is a City permit category and Community Development is the issuing agency inside city limits. The only fee schedule we could locate was FY 2024 to 25, which is too old to publish as a current fee, so there is no permit number on this page. Addresses outside city limits may fall under San Joaquin County.",
                meta: (
                  <SourceNote
                    source="City of Stockton development information"
                    href="https://data.stocktonca.gov/stories/s/Development/kc7p-zqfj/"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Building code",
                value:
                  "The 2025 California codes took effect on 1 January 2026 statewide. Local amendments and the inspector's reading of your scope still control the job.",
                meta: (
                  <SourceNote
                    source="California Building Standards Commission"
                    href="https://www.dgs.ca.gov/BSC/Codes"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Climate zone",
                value:
                  "California Climate Zone 12. Warm summers suit a heat pump, and a garage is usually the right room for one provided it has the air volume, the electrical capacity and a condensate route.",
                meta: (
                  <SourceNote
                    source="California Energy Commission climate zone tool"
                    href="https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/climate-zone-tool-maps-and"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Housing",
                value:
                  "99,093 households and 53.9 percent owner occupied, the largest market on this site by a wide margin. That is an audience figure and it proves nothing about how old the water heaters are or what fuel they burn.",
                meta: (
                  <SourceNote
                    source="Census QuickFacts, Stockton"
                    href="https://www.census.gov/quickfacts/fact/table/stocktoncitycalifornia/COM100223"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Incoming water temperature",
                value: `Modelled at ${STOCKTON.climate.winterInletF[0]}°F to ${STOCKTON.climate.winterInletF[1]}°F through the winter and about ${STOCKTON.climate.summerInletF}°F in summer, inherited from our Modesto record. Sizing uses the cold end.`,
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: modelled, not measured. With more than one provider and three
                    sources in play, a measured Stockton figure would likely differ by
                    address as well as by season. Tankless sizing depends on it directly.
                  </p>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            title="What a Stockton job costs, and the number we are missing"
            lead="No representative Stockton installed price exists that we would stand behind, and the current permit fee is the one piece of local money we went looking for and could not confirm."
          />

          <Callout title="Why there is no permit fee on this page" tone="warn">
            <p>
              Water heater work is plainly a City permit category. The only adopted fee
              schedule we could locate was FY 2024 to 25, which is a year out of date, and
              publishing a stale fee is worse than publishing none because a homeowner
              would take it into a quote conversation as a fact. Tracy publishes current
              numbers and we quote them on the Tracy page. Stockton may well publish them
              too and we did not find them. Ask the City, and if you get a current figure,
              it is worth more than anything on this line.
            </p>
          </Callout>

          <Prose className="mt-8">
            <p>
              On the rest of the cost, the useful move is to compare written scope rather
              than headline totals. A like for like swap and a conversion are different
              jobs, and most of the difference between two Stockton quotes will sit in the
              conditional lines: venting, gas capacity, a dedicated circuit, the panel,
              condensate routing, code corrections the inspector will actually look for.
            </p>
            <p>
              The{" "}
              <Link href="/resources/water-heater-replacement-cost">
                replacement cost guide
              </Link>{" "}
              lists what belongs in the quote, and the{" "}
              <Link href="/resources/compare-water-heater-quotes">
                quote comparison guide
              </Link>{" "}
              puts competing bids into the same columns so a cheap bid that left something
              out stops looking cheap.
            </p>
            <p>
              Stockton has the densest field of contractors of any market we cover, which
              is good for choice and does nothing for verification. A company appearing in
              search results proves presence rather than capacity, licensing or experience
              with your particular job.{" "}
              <Link href="/installers/how-to-choose">
                Our guide to choosing an installer
              </Link>{" "}
              covers what to check and how, and the licence lookup takes two minutes.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Stockton home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Tracy has the same Ava and PG&amp;E arrangement, one water company, and the
            widest split between two sources we have found anywhere.{" "}
            <Link
              href="/local/california/tracy"
              className="text-blue underline underline-offset-4"
            >
              Read the Tracy page
            </Link>{" "}
            for how the same electricity structure produces a different water question.
          </p>

          <LocalReviewStatus
            city="Stockton"
            checked={CHECKED}
            unresolved={[
              "The current City permit fee for a defined scope, and how City and County jurisdiction is settled for addresses near the edge. This is the biggest gap on the page.",
              "Which retail water provider and which source serves any particular address. The City lookup answers it and we cannot.",
              "Whether a newer California Water Service report has replaced the 2024 one.",
              "Whether the Golden State offer is currently funded and what your account qualifies for.",
              "Current intake, geography and eligibility for both targeted assistance paths.",
              "Any Stockton installed price. We found no representative local figure and did not borrow one.",
              "Measured incoming water temperature, which is likely to vary by provider here as well as by season.",
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
