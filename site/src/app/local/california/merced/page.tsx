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
import { MERCED } from "@/lib/market";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/local/california/merced" },
  title: "Water heaters in Merced, California",
  description:
    "In Merced your electricity comes from Merced Irrigation District or from PG&E " +
    "depending on the address, and the heat pump rebate has a condition most homes fail. " +
    "Every figure carries a source.",
};

const CHECKED = "21 Aug 2026";

/**
 * Merced.
 *
 * Two things make this page worth building, and neither is the city.
 *
 * The first is that Merced is the only market on the site where we cannot name
 * the electric utility. It depends on the address. So the page opens on a fork
 * rather than on a fact, which is a shape no other local page here uses.
 *
 * The second is the initials. Merced Irrigation District and Modesto Irrigation
 * District both shorten to MID, both pay $500 for a heat pump water heater, and
 * both set different technical thresholds to get it. A Merced homeowner who
 * lands on the Modesto catalogue reads a real rebate with the wrong numbers
 * attached, and nothing on either utility's site warns them. That is a genuine
 * hazard we can clear up in one table, and it is the most useful thing this
 * page does.
 */
export default function MercedPage() {
  return (
    <>
      <LocalPageSchema
        title="Water heaters in Merced, California"
        description="The Merced Irrigation District and PG&E fork, the rebate condition most homes fail, and City versus County permits."
        url={`${site.url}/local/california/merced`}
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
              { label: "Merced" },
            ]}
          />
          <div className="mt-6">
            <DecisionPath current="Local rules" />
          </div>
          <div className="mt-8">
            <Eyebrow icon={MapPin}>Merced, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              We cannot tell you who sells you electricity in Merced
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Every other city on this site has one electric utility and we can name it.
              Merced has two, Merced Irrigation District and PG&amp;E, and which one you
              are on depends on where the house sits rather than on the city limits. That
              single answer changes which rebate you can claim, and both of the rebates
              involved carry a condition that most Merced homes fail.
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
            title="Which company is on the bill"
            lead="This is the first question and it settles the rest of the page. It is also the one question we genuinely cannot answer from here, because the district's own service map says availability depends on the location, the distance to existing lines and the capacity on them."
          />

          <ProviderFork
            question="Who sends you the electric bill?"
            how={
              <>
                Look at the last one. The utility name is at the top. If you have moved in
                recently and have not seen a bill yet, call Merced Irrigation District and
                give them the address, because their published map is a general reference
                rather than a boundary you can measure yourself.
              </>
            }
            branches={[
              {
                label: "If it says Merced Irrigation District",
                heading: "Use the district's rebate, and read the fine print first",
                body: (
                  <>
                    <p>
                      The district lists $500 for a qualifying heat pump water heater. The
                      condition that catches people is that it pays to replace an{" "}
                      <strong>electric</strong> storage water heater. If you heat water
                      with gas today, this offer is not for you, and we found no gas to
                      electric conversion offer from the district to go with it.
                    </p>
                    <p>
                      The PG&amp;E programmes below do not apply to you either, because
                      they run on a PG&amp;E electric account.
                    </p>
                  </>
                ),
              },
              {
                label: "If it says PG&E",
                heading: "You are on the statewide path instead",
                body: (
                  <>
                    <p>
                      A qualifying active PG&amp;E electric account may be eligible for
                      Golden State Rebates, listed at up to $700 depending on the product,
                      what it replaces, and where you buy it. The current guide excludes
                      new construction and tankless replacements.
                    </p>
                    <p>
                      The Merced Irrigation District $500 is not available on a PG&amp;E
                      account, and an address inside the city is not proof of either
                      account.
                    </p>
                  </>
                ),
              },
            ]}
          />
          <SourceNote
            source="Merced Irrigation District electric service area map and service rules"
            href="https://mercedid.org/power/"
            checked={CHECKED}
          />

          <Callout title="Two irrigation districts, both called MID" tone="warn">
            <p>
              Merced Irrigation District and Modesto Irrigation District are separate
              organisations sixty miles apart. Both abbreviate to MID. Both currently pay
              $500 for a heat pump water heater. Both require you to be replacing an
              electric tank. And they set different technical thresholds to qualify, so a
              Merced homeowner working from the Modesto catalogue can buy a unit that
              meets one district&rsquo;s rules and misses the other&rsquo;s. Neither
              utility warns you about the other. Here they are side by side.
            </p>
          </Callout>

          <EvidenceTable
            caption="Heat pump water heater rebates at three Central Valley irrigation districts"
            columns={["District", "Offer", "What it must replace", "Equipment conditions"]}
            rows={[
              [
                <strong key="m">Merced Irrigation District</strong>,
                "$500",
                "An electric storage water heater",
                "ENERGY STAR, energy factor of at least 2, 45 to 55 gallons, installed outside conditioned living space",
              ],
              [
                <strong key="mo">Modesto Irrigation District</strong>,
                "$500",
                "An electric tank storage water heater",
                "ENERGY STAR, UEF of at least 2.2, capacity over 40 gallons, installed outside conditioned living space, one per household, apply within 90 days",
              ],
              [
                <strong key="t">Turlock Irrigation District</strong>,
                "$500, or $1,000",
                "Nothing in particular for the $500. The $1,000 requires you to be leaving gas or propane",
                "ENERGY STAR, a first-hour-rating floor, installed outside conditioned living space. The conversion path needs the capped gas line documented on the invoice",
              ],
            ]}
            note={
              <>
                Turlock is in the table because it shows what the other two do not offer.
                A Turlock or Patterson household on gas gets $1,000 to switch. A Merced
                household on gas gets nothing from its district for the same change of
                fuel. Same technology, same valley, opposite answer.
              </>
            }
          />
          <SourceNote
            source="Merced Irrigation District rebates page and linked residential appliance application"
            href="https://mercedid.org/power/rebates/"
            checked={CHECKED}
          />
          <SourceNote
            source="Modesto Irrigation District 2026 Home Rebate Catalog"
            href="https://www.mid.org/wp-content/uploads/MID_Residential_Rebate_Catalog_2026.pdf"
            checked={CHECKED}
          />
          <SourceNote
            source="Turlock Irrigation District residential and electrification rebate pages"
            href="https://www.tid.org/customer-service/rebates-and-savings/residential-rebates/"
            checked={CHECKED}
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="Every incentive we could find, with what we know about each"
            lead="An outlined Verify badge means we have not confirmed it ourselves. On this page one of them matters more than usual, because the district's own application form carries an older revision date than the page linking to it."
          />

          <div className="space-y-4">
            <IncentiveRow
              name="Merced Irrigation District, heat pump water heater"
              amount="$500"
              state="verify"
              checked={CHECKED}
              source="Merced Irrigation District rebates page and linked application"
              href="https://mercedid.org/power/rebates/"
              detail={
                <>
                  Verify rather than Active, and here is exactly why. The district&rsquo;s
                  rebate landing page is current and it links a residential appliance
                  application whose own revision date is from 2024. A live page pointing at
                  an older form is not proof that the money is still there, so we are not
                  going to badge it as confirmed. Call the district, ask whether the form
                  is current and whether the fund still has a balance, then buy. The offer
                  needs you to be replacing an electric storage tank.
                </>
              }
            />
            <IncentiveRow
              name="Golden State Rebates, heat pump water heater"
              amount="Up to $700"
              state="verify"
              checked={CHECKED}
              source="Golden State Rebates heat pump water heater programme"
              href="https://goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/"
              detail={
                <>
                  For a qualifying active PG&amp;E electric account, so this is the
                  PG&amp;E branch of the fork above. The amount moves with the product,
                  the size, what it replaces, and whether you bought through a
                  participating distributor or contractor. The current guide excludes new
                  construction and tankless replacements. Funding is first come, first
                  served, which is the part that changes without anyone announcing it.
                </>
              }
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
              detail="Applied to qualifying improvements through 31 December 2025 and no further. If it appears in a quote as a live saving, ask the contractor to show you the current IRS page."
            />
          </div>

          <Prose className="mt-10">
            <h3>What this means if you heat water with gas today</h3>
            <p>
              A large share of Central Valley homes do, and the honest summary for a
              Merced household on gas is that the rebate landscape is thinner here than it
              is twenty miles up the road. The district offer wants an electric tank
              coming out. The PG&amp;E offer wants a PG&amp;E account. The federal credit
              is gone and the state programme is reserved.
            </p>
            <p>
              That does not make a heat pump the wrong choice in Merced. It means the
              choice has to stand on the running costs and on how long you plan to own the
              house, without a subsidy carrying the first two years of it. Read the{" "}
              <Link href="/water-heaters/heat-pump">heat pump water heater guide</Link>{" "}
              for what the house has to provide, and check the panel before you get
              attached to the idea, because the electrical is what usually decides it.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            title="City or County decides your permit, and the address decides that"
            lead="Merced has the same jurisdiction question as its utilities, and the mailing address does not settle it. The two paths are different enough to be worth checking before anyone schedules the work."
          />

          <EvidenceTable
            caption="Water heater permit paths in and around Merced"
            columns={["Jurisdiction", "What we could confirm", "What we could not"]}
            rows={[
              [
                <strong key="c">City of Merced</strong>,
                "The current fee schedule lists water heater add or replace, and tankless add or replace, as over the counter permits with components of $43 processing plus $172 inspection. The City runs an online permits portal.",
                "Whether $215 is the whole of it for your scope, and what a conversion, a relocation, a new circuit or panel work adds on top.",
              ],
              [
                <strong key="co">Merced County</strong>,
                "The County's residential guide states plainly that replacing a water heater always requires a building permit.",
                "The current County fee, the process, and how it handles the scopes above. Confirm the parcel is actually outside City jurisdiction first.",
              ],
            ]}
            note="These are permit fees. They are not the installed project cost, and a quote that folds the two together is hiding one of them."
          />
          <SourceNote
            source="City of Merced fee schedule"
            href="https://www.cityofmerced.gov/home/showpublisheddocument/24880/639167054289400000"
            checked={CHECKED}
          />
          <SourceNote
            source="Merced County, when is a permit required"
            href="https://www.countyofmerced.com/DocumentCenter/View/1411/When-is-a-Permit-Required-PDF"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <p>
              Worth noticing in that table: the City charges the same listed components for
              a tankless install as for a storage swap. Some cities price a tankless
              conversion as a bigger job on the permit alone. Merced does not appear to,
              which takes one variable out of a comparison that has plenty left in it.
            </p>
            <p>
              A permit is also the mechanism that gets seismic strapping, the temperature
              and pressure relief discharge, venting and combustion air looked at by
              somebody other than the person you paid. If a contractor tells you a like
              for like swap does not need one, treat that as information about the
              contractor.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="Merced water, and the year on the label"
            lead="The City system runs entirely on wells, and the official hardness table we could find carries measurements from 2022. That is old enough to state as history rather than as a current reading."
          />

          <EvidenceTable
            caption="Total hardness reported for the City of Merced municipal system"
            columns={["Reported total hardness", "As calcium carbonate", "Measurement year"]}
            align={[1]}
            rows={[
              ["Average across the system", "115.4 mg/L", "2022"],
              ["Lowest reported", "59 mg/L", "2022"],
              ["Highest reported", "260 mg/L", "2022"],
            ]}
            note={
              <>
                A four to one spread inside one city system, which is why the average is
                the least useful number in the table. A house at 260 mg/L and a house at
                59 do not get the same advice about a tankless heat exchanger, and the
                average describes neither of them.
              </>
            }
          />
          <SourceNote
            source="City of Merced water quality table, measurements identified as 2022"
            href="https://www.cityofmerced.gov/home/showpublisheddocument/22729/638866147517070000"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <p>
              Merced is not a hard water city by Central Valley standards. Patterson runs
              three to four times these figures. But the spread inside Merced is wide
              enough that the city number cannot answer the question for your street, and
              the measurements are four years old on top of that. Check the current
              consumer confidence report on the City site, and if a model choice or a
              maintenance plan turns on the answer, test the property.
            </p>
            <p>
              Our national guide to{" "}
              <Link href="/resources/hard-water-water-heater">
                hard water and water heaters
              </Link>{" "}
              covers what the measurement changes and what it does not. The short version
              is that it moves your maintenance interval rather than choosing your
              technology.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Merced market record"
            rows={[
              {
                label: "Electric utility",
                value:
                  "Merced Irrigation District or PG&E, depending on the address. The district's published service map is a general reference and says availability depends on location, distance to existing lines and capacity. Not something to settle from a map.",
                meta: (
                  <SourceNote
                    source="Merced Irrigation District power and electric service rules"
                    href="https://mercedid.org/power/"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Gas utility",
                value: "PG&E, where gas service is available.",
                meta: (
                  <SourceNote source="PG&E service area" checked={CHECKED} />
                ),
              },
              {
                label: "Water supply",
                value:
                  "Groundwater, from wells in the Merced Groundwater Subbasin. No surface supply is blended in, which makes the supply steadier across a year than a blended system.",
                meta: (
                  <SourceNote
                    source="City of Merced water quality reporting"
                    href="https://www.cityofmerced.gov/utilities-services/water/water-quality-control/ccr-water-quality-report"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Water hardness",
                value:
                  "59 to 260 mg/L as calcium carbonate, averaging 115.4, from measurements identified as 2022. Old enough that we treat it as history. Check the current report.",
                meta: (
                  <SourceNote
                    source="City of Merced water quality table"
                    href="https://www.cityofmerced.gov/home/showpublisheddocument/22729/638866147517070000"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Permits",
                value:
                  "City of Merced or Merced County, by parcel. City lists storage and tankless add or replace as over the counter, at $43 processing plus $172 inspection. The County says replacement always requires a permit.",
                meta: (
                  <SourceNote
                    source="City of Merced fee schedule and Merced County permit guide"
                    href="https://www.cityofmerced.gov/home/showpublisheddocument/24880/639167054289400000"
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
                label: "Housing",
                value:
                  "27,950 households and 45.9 percent owner occupied, the lowest owner occupancy of the markets we have researched. If you rent, a water heater replacement is your landlord's decision to make and this page is still the right thing to send them.",
                meta: (
                  <SourceNote
                    source="Census QuickFacts, Merced"
                    href="https://www.census.gov/quickfacts/mercedcitycalifornia"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Incoming water temperature",
                value: `Modelled at ${MERCED.climate.winterInletF[0]}°F to ${MERCED.climate.winterInletF[1]}°F through the winter and about ${MERCED.climate.summerInletF}°F in summer, inherited from our Modesto record. Sizing uses the cold end.`,
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: modelled, not measured. An all groundwater system is the
                    steadier case across a year, which makes the model a little safer here
                    than elsewhere and still leaves it a model.
                  </p>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <Prose>
            <h2>What a Merced job costs</h2>
            <p>
              We do not publish a Merced installed price. We looked for a representative
              one and did not find anything we would stand behind, and putting a national
              average under a Merced heading is the specific thing this site exists not to
              do.
            </p>
            <p>
              What we can tell you is where the money actually goes, and that a
              like for like swap and a conversion are different jobs that should never be
              compared as though they were the same one. The{" "}
              <Link href="/resources/water-heater-replacement-cost">
                replacement cost guide
              </Link>{" "}
              breaks the job into parts, and the{" "}
              <Link href="/resources/compare-water-heater-quotes">
                quote comparison guide
              </Link>{" "}
              puts competing bids into the same columns so you can see which one is missing
              a line rather than which one is cheaper.
            </p>
            <p>
              One Merced-specific thing to put in writing before anyone starts: which
              utility account the installer is filing rebate paperwork against. On a street
              where both utilities operate, a contractor who works mostly on the other side
              of town can fill in the wrong form in good faith.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Merced home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Sixty miles north there is a different utility with the same initials.{" "}
            <Link
              href="/local/california/modesto"
              className="text-blue underline underline-offset-4"
            >
              The Modesto page
            </Link>{" "}
            covers Modesto Irrigation District, and nothing on it applies to a Merced
            Irrigation District account.
          </p>

          <LocalReviewStatus
            city="Merced"
            checked={CHECKED}
            unresolved={[
              "Whether the Merced Irrigation District $500 is currently funded, and whether the 2024 application form is still the right one. This is why the badge says Verify.",
              "The exact electric provider at any given address. The district's own map will not settle it and neither will we.",
              "A current City of Merced consumer confidence report. Our hardness figures are from 2022 measurements.",
              "Whether $215 is the full City permit cost for a defined scope, and what the County charges.",
              "Any Merced installed price. We found no representative local figure and did not invent one.",
              "Measured incoming water temperature, which tankless sizing depends on directly.",
              "Which installers serve which side of the utility line, and who files which rebate form.",
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
