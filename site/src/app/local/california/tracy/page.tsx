import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import {
  EvidenceTable,
  IncentiveRow,
  LocalPageSchema,
  LocalReviewStatus,
} from "@/components/advisor/Local";
import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { CheckedStamp, SourceNote } from "@/components/advisor/Status";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { TRACY } from "@/lib/market";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/local/california/tracy" },
  title: "Water heaters in Tracy, California",
  description:
    "Tracy's own report puts one water source seventeen times harder than the other, and " +
    "the permit price turns on how the job is classified. Rates, rebates and permits, each with a source.",
};

const CHECKED = "21 Aug 2026";

/**
 * Tracy.
 *
 * Two facts run this page and they rhyme, which is why they share it. Tracy's
 * water is either very soft or very hard depending on which source reaches the
 * house, and Tracy's permit is either $57 or $305 depending on how the Building
 * Department classifies the job. In both cases the homeowner is on the
 * receiving end of a label they did not choose, and in both cases asking one
 * question in advance changes the outcome.
 *
 * The Ava explanation is kept deliberately short here. Stockton runs the fuller
 * version because Stockton's transition is recent and its targeted programmes
 * need the room. Two pages, one shared structure, and the shared part sized
 * differently on each so neither reads as the other's copy.
 */
export default function TracyPage() {
  return (
    <>
      <LocalPageSchema
        title="Water heaters in Tracy, California"
        description="Source-dependent water hardness, the like-for-like permit distinction, and the Ava and PG&E bill."
        url={`${site.url}/local/california/tracy`}
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
              { label: "Tracy" },
            ]}
          />
          <div className="mt-6">
            <DecisionPath current="Local rules" />
          </div>
          <div className="mt-8">
            <Eyebrow icon={MapPin}>Tracy, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              There is no such thing as Tracy water
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              The City&rsquo;s own report puts treated surface water at 23 mg/L and well
              water anywhere from 58 to 390. That is a seventeenfold spread inside one set
              of city limits, and it decides how often somebody has to descale a tankless
              unit at your address. Nobody selling you a water heater in Tracy is going to
              raise it, so here it is first.
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
            title="Two supplies, and the gap between them is the whole point"
            lead="Tracy blends treated surface water with water from its own wells, and the two are not remotely alike. Which one reaches a particular house, and in what proportion, is a question for the City rather than something you can read off a map."
          />

          <EvidenceTable
            caption="Total hardness by source, City of Tracy 2024 report"
            columns={["Source", "Total hardness as calcium carbonate", "What that means in practice"]}
            align={[1]}
            rows={[
              [
                <strong key="s">Treated surface water</strong>,
                "23 mg/L",
                "Soft. Scale is close to a non-issue, and a tankless unit here would be in about the friendliest water on this site.",
              ],
              [
                <strong key="w">Well water, average</strong>,
                "264 mg/L",
                "Hard. Descaling moves from an occasional job to a scheduled one, and the model manual's interval starts to matter.",
              ],
              [
                <strong key="wr">Well water, full range</strong>,
                "58 to 390 mg/L",
                "The top of this range is harder than anything in Turlock or Merced and approaches Patterson territory.",
              ],
            ]}
            note={
              <>
                These describe the City&rsquo;s sources during the 2024 reporting period.
                They do not tell you what arrives at your tap today, which is a different
                question and one the City can answer for your address.
              </>
            }
          />
          <SourceNote
            source="City of Tracy 2024 Consumer Confidence Report"
            href="https://www.cityoftracy.org/home/showpublisheddocument/20364/638846180217670000"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <h3>Why we will not average these</h3>
            <p>
              You could take the surface figure and the well average, split the difference,
              and publish a single Tracy hardness number. It would be a real number and it
              would describe almost nobody. A house on 23 mg/L and a house on 390 are
              being given opposite advice about whether tankless is a low-maintenance
              choice, and an average hides exactly the thing the reader needs.
            </p>
            <p>
              So the useful move is a phone call. Ask the City which source or blend serves
              the address, and whether a newer report has replaced the 2024 one. If the
              answer points to the well end and you are considering tankless, ask the
              installer what descaling interval the specific model requires at that
              hardness and what they charge to do it, because that is a recurring cost that
              belongs in the comparison rather than in a surprise two years later.
            </p>
            <p>
              What hardness does not do is make water unsafe, set one maintenance schedule
              for everybody, or rule a technology in or out on its own. Our guide to{" "}
              <Link href="/resources/hard-water-water-heater">
                hard water and water heaters
              </Link>{" "}
              covers the mechanism and its limits, and{" "}
              <Link href="/water-heaters/tankless/not-right-for-you">
                when tankless is the wrong buy
              </Link>{" "}
              treats scale as one item among several rather than the deciding one.
            </p>
          </Prose>
        </Container>
      </Section>

      {/*
        The permit section. Tracy is the only market on the site where we hold
        two current, published, materially different fee categories for what a
        homeowner would describe as the same job.
      */}
      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="The same water heater, at $57 or at $305"
            lead="Tracy publishes both figures in its adopted fee schedule, and the difference between them is a classification made by the Building Department rather than a choice you get to make. It is the clearest example on this site of why the scope on the paperwork matters."
          />

          <EvidenceTable
            caption="Residential water heater permit categories, City of Tracy FY 2026 to 27 fee schedule"
            columns={["Listed category", "Fee", "What tends to fall here"]}
            align={[1]}
            rows={[
              [
                <strong key="l">
                  Residential like for like, storage or tankless
                </strong>,
                "$57",
                "Taking one water heater out and putting an equivalent one back in the same place. The City lists water heater replacement on its online residential permit path.",
              ],
              [
                <strong key="n">New water heater installation</strong>,
                "$305",
                "A category the City prices separately. Where a relocation, a fuel conversion or a first installation lands is a question for Building Safety about your specific scope.",
              ],
            ]}
            note={
              <>
                Both are permit fees. Neither is the installed project cost, and a quote
                that folds the permit into a single total is hiding which one you are
                paying.
              </>
            }
          />
          <SourceNote
            source="City of Tracy adopted FY 2026 to 27 citywide master fee schedule"
            href="https://www.cityoftracy.org/files/assets/city/v/3/finance/documents/budget-amp-financial-documents/master-fee-schedule/approved-fy2026-2027-citywide-master-fee-schedule.pdf"
            checked={CHECKED}
          />
          <SourceNote
            source="City of Tracy eTRAKiT residential online permitting"
            href="https://www.cityoftracy.org/Departments/Community-and-Economic-Development/Building-Safety/eTRAKiT-Residential-Online-Permitting"
            checked={CHECKED}
          />

          <Callout title="What to do with this before you sign anything">
            <p>
              Describe the actual job to Building Safety and ask which category it falls
              into, then ask your contractor which one they have budgeted for. If those two
              answers differ, you have found the discrepancy while it is still a
              conversation rather than a change order. Tracy is unusual in publishing both
              numbers plainly enough for a homeowner to do this, and it takes one call.
            </p>
          </Callout>

          <Prose className="mt-8">
            <p>
              The permit is also what gets seismic strapping, the temperature and pressure
              relief discharge, venting and combustion air inspected by somebody who is not
              being paid by the installer. If a contractor tells you a straight swap does
              not need one, treat that as information about the contractor.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            title="Your electricity comes from two companies at once"
            lead="Tracy joined Ava Community Energy in 2021. Ava buys the generation, PG&E still runs the wires, the meter and the bill, and you get one bill with both parts shown on it."
          />

          <Prose>
            <p>
              The practical consequence is small and it catches people anyway. Ava has not
              replaced PG&amp;E at your house, so a rebate that requires a PG&amp;E
              electric account is not automatically off the table. It also runs the other
              way: living in Tracy does not prove which enrolment you are on, because
              customers can opt out and some have. The bill is the evidence. Look at it
              before you assume anything on this page applies to you.
            </p>
            <p>
              We looked for an Ava-funded heat pump water heater rebate for Tracy
              households and did not verify one. Ava publishes homeowner education and an
              incentive finder, and an older contractor agreement that ended in March 2025
              still turns up in search results. An expired agreement is not a rebate, so
              treat anything you find with that shape carefully and check the date on it.
            </p>
          </Prose>
          <SourceNote
            source="Ava Community Energy Tracy service page and CPUC community choice aggregation overview"
            href="https://avaenergy.org/community/who-we-serve/tracy/"
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
                  Runs on a qualifying active PG&amp;E electric account, which most Tracy
                  households have even while Ava supplies the generation. The amount
                  depends on the product, its capacity and efficiency, what it replaces,
                  and whether it came through a participating distributor or contractor.
                  The current guide excludes new construction and tankless replacements.
                  Funding is first come, first served, so check the balance rather than the
                  headline.
                </>
              }
            />
            <IncentiveRow
              name="City of Tracy water rebates"
              state="verify"
              checked={CHECKED}
              source="City of Tracy water rebates and incentives page"
              href="https://www.cityoftracy.org/Departments/Public-Works/Conservation-Sustainability/Water-Rebates-and-Incentives"
              detail="Listed so you can rule it out. The City's rebate page covers water conservation measures. We did not find a water heater incentive on it, and a page with the word rebate in the title is worth checking yourself rather than taking our word for."
            />
            <IncentiveRow
              name="California HEEHRA, single family"
              state="reserved"
              checked={CHECKED}
              source="TECH Clean California single family incentives"
              href="https://techcleanca.com/incentives/single-family-incentives/"
              detail="Statewide single family funds were fully reserved as of 24 February 2026. A waitlist place is not a rebate. Worth rechecking rather than writing off."
            />
            <IncentiveRow
              name="Federal 25C energy efficient home improvement credit"
              state="expired"
              checked={CHECKED}
              source="IRS guidance on the Energy Efficient Home Improvement Credit"
              href="https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit"
              detail="Applied to qualifying improvements through 31 December 2025 and no further. Plenty of articles still quote the old 30 percent figure as live."
            />
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Tracy market record"
            rows={[
              {
                label: "Electric utility",
                value:
                  "Ava Community Energy supplies generation for enrolled accounts; PG&E handles delivery, metering and billing. Tracy joined in 2021. Customers can opt out, so the bill decides rather than the city.",
                meta: (
                  <SourceNote
                    source="Ava Community Energy Tracy page"
                    href="https://avaenergy.org/community/who-we-serve/tracy/"
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
                label: "Water supply",
                value:
                  "A blend of treated surface water and City wells, in proportions that vary by address. The City can tell you which serves yours.",
                meta: (
                  <SourceNote
                    source="City of Tracy water quality and supply"
                    href="https://www.cityoftracy.org/Departments/Public-Works/Water-Sewer-Stormwater/Water-Quality-Supply"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Water hardness",
                value:
                  "23 mg/L in treated surface water, and 58 to 390 mg/L in well water with an average of 264. The widest source split we have found anywhere, and the reason there is no single Tracy figure on this page.",
                meta: (
                  <SourceNote
                    source="City of Tracy 2024 Consumer Confidence Report"
                    href="https://www.cityoftracy.org/home/showpublisheddocument/20364/638846180217670000"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Permits",
                value:
                  "Water heater replacement is available on the City's online residential permit path. The adopted FY 2026 to 27 schedule lists $57 for a residential like for like storage or tankless permit and $305 for a new water heater installation.",
                meta: (
                  <SourceNote
                    source="City of Tracy master fee schedule and eTRAKiT"
                    href="https://www.cityoftracy.org/files/assets/city/v/3/finance/documents/budget-amp-financial-documents/master-fee-schedule/approved-fy2026-2027-citywide-master-fee-schedule.pdf"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Building code",
                value:
                  "The City's Building Safety FAQ puts the 2025 California codes into effect on 1 January 2026. A conversion pulls in more of that code than a swap does, because it adds electrical, gas or venting work.",
                meta: (
                  <SourceNote
                    source="City of Tracy Building Safety FAQ"
                    href="https://www.cityoftracy.org/Departments/Community-and-Economic-Development/Building-Safety/Building-Safety-Process-FAQ"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Climate zone",
                value:
                  "California Climate Zone 12. Warm summers help a heat pump, and a garage is usually the right room for one provided it has the air volume, the electrical capacity and a condensate route.",
                meta: (
                  <SourceNote
                    source="California Energy Commission climate zone tool"
                    href="https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/climate-zone-tool-maps-and"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Incoming water temperature",
                value: `Modelled at ${TRACY.climate.winterInletF[0]}°F to ${TRACY.climate.winterInletF[1]}°F through the winter and about ${TRACY.climate.summerInletF}°F in summer, inherited from our Modesto record. Sizing uses the cold end.`,
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: modelled, not measured. Tracy is the market where this
                    assumption is shakiest, because surface water and well water do not
                    arrive at the same temperature and the blend moves. Tankless sizing
                    depends on it directly.
                  </p>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>What a Tracy job costs</h2>
            <p>
              We do not publish a Tracy installed price. There is no representative local
              figure we would stand behind, and the two permit categories above are the
              only current local money on this page. Everything else about the cost of the
              job is national, and we have it in two places rather than dressed up as a
              local claim.
            </p>
            <p>
              The{" "}
              <Link href="/resources/water-heater-replacement-cost">
                replacement cost guide
              </Link>{" "}
              breaks the job into parts and shows where the variance actually lives, which
              is in the conditional lines rather than in the appliance. The{" "}
              <Link href="/resources/compare-water-heater-quotes">
                quote comparison guide
              </Link>{" "}
              puts competing bids into the same columns, which is how you find the bid
              that is cheap because it left something out.
            </p>
            <p>
              Tracy sits between the Central Valley and Tri-Valley service markets, so a
              lot of companies list it. A service page is not a promise of response time or
              capacity at your address, and it says nothing about whether they have done
              your particular job recently. Ask.{" "}
              <Link href="/installers/how-to-choose">
                Our guide to choosing an installer
              </Link>{" "}
              has the questions worth asking, and the licence check takes two minutes.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Tracy home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Stockton has the same Ava and PG&amp;E arrangement and a harder water question
            than this one, because there the uncertainty is which company supplies the
            water at all.{" "}
            <Link
              href="/local/california/stockton"
              className="text-blue underline underline-offset-4"
            >
              Read the Stockton page
            </Link>{" "}
            if you are near the boundary or shopping across both.
          </p>

          <LocalReviewStatus
            city="Tracy"
            checked={CHECKED}
            unresolved={[
              "Which source or blend reaches any particular address, and whether a newer report has replaced the 2024 one.",
              "Where a relocation, a fuel conversion or a tank to tankless job lands between the $57 and $305 categories. Only Building Safety can classify your scope.",
              "Whether the Golden State offer is currently funded and what your account qualifies for.",
              "Any Tracy installed price. We found no representative local figure and did not borrow one.",
              "Measured incoming water temperature, which matters more here than in most markets because the blend moves.",
              "Which installers genuinely cover Tracy addresses rather than listing the city on a service page.",
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
