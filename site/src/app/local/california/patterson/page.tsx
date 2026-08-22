import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { CostBreakdown } from "@/components/advisor/Cost";
import {
  EvidenceTable,
  FuelTable,
  IncentiveRow,
  LocalPageSchema,
  LocalReviewStatus,
} from "@/components/advisor/Local";
import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { CheckedStamp, SourceNote } from "@/components/advisor/Status";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { TID_PGE_RATES } from "@/lib/energy";
import { PATTERSON } from "@/lib/market";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/local/california/patterson" },
  title: "Water heaters in Patterson, California",
  description:
    "Patterson buys electricity from TID and gas from PG&E, and its own water report " +
    "runs harder than anywhere else we cover. What both facts do to the decision, with sources.",
};

const CHECKED = "21 Aug 2026";

/**
 * Patterson.
 *
 * The page exists to make one argument that no other page on the site can make:
 * TID's rebate and Patterson's water push in the same direction, and they push
 * for different reasons.
 *
 * What it deliberately does NOT do is re-run Turlock's conversion payback. Same
 * utility, same rebate, same published rates, so the arithmetic would come out
 * within rounding of the Turlock page, and two pages carrying the same sum is
 * the exact failure the territory model is supposed to prevent. It links there
 * instead and spends its own words on the water, which is the thing Turlock
 * cannot tell you.
 */
export default function PattersonPage() {
  return (
    <>
      <LocalPageSchema
        title="Water heaters in Patterson, California"
        description="TID rebates, PG&E gas rates, and the hardest municipal water on the site."
        url={`${site.url}/local/california/patterson`}
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
              { label: "Patterson" },
            ]}
          />
          <div className="mt-6">
            <DecisionPath current="Local rules" />
          </div>
          <div className="mt-8">
            <Eyebrow icon={MapPin}>Patterson, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              The best rebate on this site, and the hardest water
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Turlock Irrigation District will pay a Patterson household $1,000 to move
              off gas, which is the largest single incentive we have found anywhere. The
              City&rsquo;s own 2025 water report puts hardness between 323 and 517 mg/L,
              which is harder than any other supply we have looked at. Both of those are
              true at the same address, and together they narrow the field more than
              either does alone.
            </p>
            <div className="mt-6">
              <CheckedStamp date={CHECKED} />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Water leads. On the Turlock page the fuel arithmetic leads, because in
        Turlock the money is the whole story. Here the money has already been
        worked out fifteen miles away and the water is what is new.
      */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="Start with the water, because it is the unusual part"
            lead="Patterson pumps its drinking water entirely from the lower aquifer of the Delta-Mendota Subbasin. Groundwater with no surface supply blended into it is the hard case, and Patterson's numbers say so."
          />

          <EvidenceTable
            caption="Total hardness reported by the City of Patterson municipal system"
            columns={["Reported total hardness", "As calcium carbonate", "Measurement period"]}
            align={[1]}
            rows={[
              ["Average across the system", "402 mg/L", "2022 to 2025"],
              ["Lowest detected", "323 mg/L", "2022 to 2025"],
              ["Highest detected", "517 mg/L", "2022 to 2025"],
            ]}
            note={
              <>
                For a sense of scale, Turlock&rsquo;s groundwater wells run 26.2 to 154
                mg/L and Tracy&rsquo;s treated surface water measures 23. Patterson&rsquo;s
                softest reading is more than twice Turlock&rsquo;s hardest one.
              </>
            }
          />
          <SourceNote
            source="City of Patterson 2025 Consumer Confidence Report"
            href="https://www.pattersonca.gov/DocumentCenter/View/14373/2025-Consumer-Confidence-Report-PDF"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <h3>What that does, and what it does not do</h3>
            <p>
              Hard water is a mineral load, and the minerals come out of solution on the
              hottest surface they touch. In a storage tank that surface is a large
              element or a large flue, the deposit builds slowly, and flushing manages it.
              In a tankless unit the same minerals land on a small heat exchanger that the
              whole flow passes through, and the deposit narrows the passage it is sitting
              in. Same water, same chemistry, and a much shorter interval before somebody
              has to do something about it.
            </p>
            <p>
              So the honest reading of 402 mg/L is that it raises the running cost of a
              tankless unit in Patterson rather than ruling one out. If you want tankless
              here, budget for descaling on a real schedule, ask the installer what
              interval the specific model&rsquo;s manual requires at this hardness, and
              check what the warranty says about scale. Several manufacturers void on it.
            </p>
            <p>
              What the number cannot do is measure your tap. It describes the City system
              over a sampling period that ran from 2022 to 2025. If the property is on a
              private well, none of it applies. If a decision turns on the exact figure,
              test the property. Our{" "}
              <Link href="/resources/hard-water-water-heater">
                guide to hard water and water heaters
              </Link>{" "}
              covers the mechanism, and{" "}
              <Link href="/resources/how-often-flush-water-heater">
                how often to flush a water heater
              </Link>{" "}
              covers what to actually do about it.
            </p>
          </Prose>

          <Callout title="Where this leaves gas tankless in Patterson">
            <p>
              Tankless is the technology this water treats worst, and it is also the one
              TID pays nothing toward. Those are unrelated facts that happen to point the
              same way, which is the closest thing to a clear signal a page like this can
              give you. It is still not a rule: a household that runs out of hot water on
              a winter evening has a problem that a bigger tank solves badly and tankless
              solves well.{" "}
              <Link href="/water-heaters/tankless/not-right-for-you">
                We keep a whole page on when tankless is the wrong buy
              </Link>
              , and hard water is one item on it rather than the whole case.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Rebates. TID is the strongest position on the site and Patterson shares it. */}
      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="What TID will pay a Patterson household"
            lead="Patterson buys electricity from Turlock Irrigation District and gas from PG&E, which is the same pairing as Turlock and a different one from Modesto. Your electric rebates come from TID, and the PG&E-account programmes do not apply to you."
          />

          <div className="space-y-4">
            <IncentiveRow
              name="TID, gas or propane to electric heat pump conversion"
              amount="$1,000"
              state="active"
              checked={CHECKED}
              source="TID electrification rebates"
              href="https://www.tid.org/customer-service/rebates-and-savings/electrification/"
              detail={
                <>
                  The large one, and it only pays if you are leaving gas or propane behind.
                  TID requires the contractor&rsquo;s invoice to document that the gas or
                  propane connection was capped or removed, so this is a line your
                  installer has to write down rather than something you claim afterwards.
                  There are also equipment conditions, including a first-hour-rating floor
                  and a requirement that the unit sits outside conditioned living space.
                  Read the current thresholds off TID&rsquo;s own form before you buy a
                  model, because we are not going to quote a number that may have moved.
                </>
              }
            />
            <IncentiveRow
              name="TID, ENERGY STAR heat pump water heater"
              amount="$500"
              state="active"
              checked={CHECKED}
              source="TID residential rebates"
              href="https://www.tid.org/customer-service/rebates-and-savings/residential-rebates/"
              detail={
                <>
                  The standard path, for a qualifying ENERGY STAR heat pump unit where no
                  fuel conversion is involved. If you already heat water with electricity,
                  this is the one that applies to you. Do not assume the $500 and the
                  $1,000 stack. TID says funding is not guaranteed and that programmes can
                  change without notice, which is a sentence worth taking literally.
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
                  Listed here so you can rule it out. This one runs on a qualifying active
                  electric account at a participating utility, and in Patterson your
                  electric account is TID. It is the programme that applies to PG&amp;E
                  electric customers in Stockton, Tracy and much of Merced, which is why
                  it appears on those pages and not really on this one. The current guide
                  also excludes new construction and tankless replacements.
                </>
              }
            />
            <IncentiveRow
              name="California HEEHRA, single family"
              state="reserved"
              checked={CHECKED}
              source="TECH Clean California single family incentives"
              href="https://techcleanca.com/incentives/single-family-incentives/"
              detail="Statewide single family funds were fully reserved as of 24 February 2026. New projects go on a waitlist, and a waitlist is not an approval. Worth rechecking rather than writing off, because reservations do get released."
            />
            <IncentiveRow
              name="Federal 25C energy efficient home improvement credit"
              state="expired"
              checked={CHECKED}
              source="IRS guidance on the Energy Efficient Home Improvement Credit"
              href="https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit"
              detail="Applied to qualifying improvements through 31 December 2025 and no further. A great many articles still quote the old 30 percent figure as though it were live, so if a contractor includes it in a quote, ask them to show you the current IRS page."
            />
          </div>

          <Callout title="We are not going to do the payback sum twice" tone="warn">
            <p>
              Patterson and Turlock buy from the same two utilities off the same two
              published rate schedules, so the conversion arithmetic comes out the same in
              both places, and we already worked it through in detail on the Turlock page.
              Running it again here with a Patterson heading would be a copy wearing a
              different city name.{" "}
              <Link href="/local/california/turlock">
                Read the Turlock version of the sum
              </Link>
              , and note its conclusion, which holds here: the answer turns on your
              electrical panel far more than on the technologies.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* The fuel model. Context for the rebate section rather than the spine. */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            title="What a year of hot water costs at Patterson rates"
            lead="Same two utilities as Turlock, so the same published rates and the same sum. It is here because the rebates above only make sense next to the running costs below."
          />

          <FuelTable
            market={PATTERSON}
            rates={TID_PGE_RATES}
            title="Yearly fuel cost, TID electricity and PG&E gas"
            note={
              <p>
                The electric rows carry a range because TID prices in tiers and water
                heating is a marginal load stacked on top of whatever else the house is
                drawing. Patterson averages 3.78 people per household, the highest of the
                markets we have researched, which pushes more households toward the upper
                tier and toward the upper end of every electric figure here.
              </p>
            }
          />
          <SourceNote
            source="TID 2026 residential rate schedule and PG&E January 2026 bundled residential gas rate"
            checked={CHECKED}
          />
          <SourceNote
            source="Census QuickFacts, Patterson: 6,525 households, 71.3% owner occupied, 3.78 persons per household"
            href="https://www.census.gov/quickfacts/fact/table/pattersoncitycalifornia/PST045224"
            checked={CHECKED}
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Patterson market record"
            rows={[
              {
                label: "Electric utility",
                value:
                  "Turlock Irrigation District, the same publicly owned utility that serves Turlock twenty miles east. Your rebates come from TID rather than from any PG&E programme.",
                meta: (
                  <SourceNote
                    source="City of Patterson utility service providers"
                    href="https://www.pattersonca.gov/270/Utility-Service-Providers"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Gas utility",
                value:
                  "PG&E. The January 2026 bundled residential average was $2.784 per therm for a non-CARE household and $2.205 on CARE. Gas commodity prices move, so read this as a figure with a date on it.",
                meta: (
                  <SourceNote source="PG&E residential gas rates" checked={CHECKED} />
                ),
              },
              {
                label: "Water supply",
                value:
                  "All groundwater, from seven potable wells in the lower aquifer of the Delta-Mendota Subbasin. At the time of the 2025 report one well was on standby and one was out of service.",
                meta: (
                  <SourceNote
                    source="City of Patterson 2025 Consumer Confidence Report"
                    href="https://www.pattersonca.gov/DocumentCenter/View/14373/2025-Consumer-Confidence-Report-PDF"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Water hardness",
                value:
                  "323 to 517 mg/L as calcium carbonate, averaging 402, across the 2022 to 2025 sampling period. The hardest municipal supply on this site by a wide margin. Private wells are not covered by the City report.",
                meta: (
                  <SourceNote
                    source="City of Patterson 2025 Consumer Confidence Report"
                    href="https://www.pattersonca.gov/DocumentCenter/View/14373/2025-Consumer-Confidence-Report-PDF"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Permits",
                value:
                  "The City publishes a dedicated HVAC, water heater and water softener permit application, and its building FAQ lists hot water heaters among the permits issued over the counter. We could not confirm a current total fee, so we are not publishing one.",
                meta: (
                  <SourceNote
                    source="City of Patterson permit requirements and building FAQ"
                    href="https://www.pattersonca.gov/141/Permit-Requirements-Applications"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Building code",
                value:
                  "The 2025 California codes took effect on 1 January 2026 statewide. Local amendments and the inspector's reading of your particular scope still control the job.",
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
                  "California Climate Zone 12, hot and dry through the summer, which suits a heat pump. A garage is usually the right room for one here, provided it has the air volume, the electrical capacity and somewhere for the condensate to go.",
                meta: (
                  <SourceNote
                    source="California Energy Commission climate zone tool, ZIP 95363"
                    href="https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/climate-zone-tool-maps-and"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Incoming water temperature",
                value: `Modelled at ${PATTERSON.climate.winterInletF[0]}°F to ${PATTERSON.climate.winterInletF[1]}°F through the winter and about ${PATTERSON.climate.summerInletF}°F in summer, inherited from our Modesto record. Sizing uses the cold end.`,
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: modelled, not measured. Climate Zone 12 describes air rather
                    than mains water, so it cannot supply this figure. One set of readings
                    from the City would settle it, and it matters because tankless sizing
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
          <SectionHeading
            title="What the job costs, with the same caveat we gave Turlock"
            lead="These ranges come from Stanislaus County contractor pricing collected around Modesto, about seventeen road miles east. We have not collected a first-party quote inside Patterson. They are the right order of magnitude and they are not a Patterson observation, and we would rather say so than let a borrowed number wear a local badge."
          />

          <CostBreakdown
            title="Gas tank converted to a heat pump water heater"
            lines={[
              { label: "Heat pump unit", low: 1600, high: 3200 },
              { label: "Installation labour", low: 900, high: 2000 },
              { label: "Permit and inspection", low: 150, high: 400 },
              {
                label: "Dedicated 240V circuit",
                low: 400,
                high: 1800,
                condition: "Distance to the panel drives this more than anything else",
                optional: true,
              },
              {
                label: "Electrical panel upgrade",
                low: 1500,
                high: 4000,
                condition: "Only if the panel has no capacity left",
                optional: true,
              },
              {
                label: "Condensate routing",
                low: 150,
                high: 600,
                condition: "A heat pump makes water and it has to go somewhere",
                optional: true,
              },
              {
                label: "Capping the gas line",
                low: 100,
                high: 400,
                condition: "Required, and documented, if you are claiming the TID $1,000",
              },
            ]}
            note="The gas capping line is small and it is the one that decides whether you get the $1,000, because TID wants it on the invoice. Ask for it in writing before the work starts rather than asking for a revised invoice afterwards."
          />
          <SourceNote
            source="Modelled from line items and regional Stanislaus County pricing. Not a Patterson observation"
            checked={CHECKED}
          />

          <Prose className="mt-10">
            <h3>What to ask a Westside installer</h3>
            <p>
              Patterson sits west of the river and out on its own a little, and the fact
              that a company lists Modesto or Turlock on its service page proves nothing
              about whether it will drive out here on a Tuesday. Ask directly whether they
              serve the address, then ask the questions this particular city makes worth
              asking.
            </p>
            <p>
              For a conversion, ask who does the electrical, who routes the condensate,
              who caps the gas and puts it on the invoice, and who files the TID
              paperwork. Those can be four different answers, and a job with four owners
              is the one that stalls. For tankless, ask what descaling interval they
              recommend at Patterson hardness and what they charge for it, because that is
              a real recurring cost here and a vague answer tells you something.
            </p>
            <p>
              We do not publish a Patterson installed price, and no authoritative one
              exists that we could find. Compare written scope instead. The{" "}
              <Link href="/resources/water-heater-replacement-cost">
                replacement cost guide
              </Link>{" "}
              lists what belongs in a quote and the{" "}
              <Link href="/resources/compare-water-heater-quotes">
                quote comparison guide
              </Link>{" "}
              puts competing bids in the same columns.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <Prose>
            <h2>Getting a permit in Patterson</h2>
            <p>
              Replacing a water heater needs a permit, and Patterson publishes a form
              specifically for it. The building FAQ lists hot water heaters among the
              permits the City issues over the counter, which means a straightforward
              swap should not involve a plan check.
            </p>
            <p>
              A conversion is a different animal. Moving from gas to a heat pump adds
              electrical work, a condensate route and a capped gas line, and any of those
              can change which permits you need and who has to inspect what. Confirm the
              scope with the City before the work is scheduled rather than after.
            </p>
            <p>
              We could not confirm a current total fee, so there is no fee on this page.
              Ask the City, or ask your contractor to show you the permit line on the
              quote and the receipt afterwards. A permit fee is never the installed
              project cost, and a quote that folds them together is hiding one of them.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Patterson home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Turlock buys from the same utility and gets the same rebates, and its water is
            nothing like this.{" "}
            <Link
              href="/local/california/turlock"
              className="text-blue underline underline-offset-4"
            >
              Read the Turlock page
            </Link>{" "}
            for the worked conversion sum, then come back here for what the water does to
            it.
          </p>

          <LocalReviewStatus
            city="Patterson"
            checked={CHECKED}
            unresolved={[
              "The current total City permit fee, and whether a gas to electric conversion stays over the counter or picks up extra review.",
              "Whether TID's $500 and $1,000 offers can be combined, and the exact first-hour-rating and efficiency thresholds on the current form.",
              "Any Patterson installed price. We have no first-party quote inside the city and the ranges above are borrowed from Modesto and labelled as such.",
              "Measured incoming water temperature. Ours is modelled from Modesto and tankless sizing depends on it.",
              "Which installers actually serve Patterson addresses, at what response time, with which technologies.",
              "Conditions on private wells, which the City report does not cover at all.",
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
