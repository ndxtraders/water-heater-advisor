import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonTable } from "@/components/advisor/Comparison";
import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Navien vs Rinnai gas tankless",
  description:
    "Both publish a headline near 11 GPM. At a Central Valley winter they are 0.12 GPM " +
    "apart, so the decision sits everywhere else. Warranty, recirculation, venting and service.",
};

/**
 * The first head-to-head page.
 *
 * Its reason to exist is that the two manufacturers publish flow in different
 * units. Navien publishes by temperature rise, Rinnai by inlet temperature, so a
 * homeowner cannot lay the two tables side by side without doing a conversion
 * nobody has told them they need to do. Doing that conversion is the whole
 * service here, and the answer is that the spec war is a dead heat.
 *
 * The research record for this pairing sets `no_overall_winner: true`. This page
 * must not pick one.
 */
const CHECKED = "7 Aug 2026";

export default function NavienVsRinnaiPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Comparison</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              Navien vs Rinnai, once you convert the numbers
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              These are the two gas tankless brands most homeowners have already heard of,
              and the flow comparison everybody starts with turns out to be a dead heat. At
              the condition a Central Valley house actually runs in, the headline models
              land 0.12 gallons a minute apart. So the decision lives in the warranty
              conditions, the recirculation design, the venting limits and who services it
              locally.
            </p>
          </div>
        </Container>
      </Section>

      {/*
        The conversion is the reason this page exists. Two published tables in two
        different units cannot be compared by eye, and both manufacturers quote a
        headline figure measured at a temperature rise no house here ever asks for.
      */}
      <Section className="pt-12">
        <Container width="narrow">
          <Callout title="The two tables are not in the same units" tone="warn">
            <p>
              Navien publishes flow by <strong>temperature rise</strong>. Rinnai publishes
              flow by <strong>incoming water temperature</strong>. Lay the two spec sheets
              side by side and you are not comparing the same thing, which is how a
              shopper ends up choosing on a number that means nothing.
            </p>
            <p className="mt-4">
              Converted to one basis, a Central Valley winter with water arriving around
              55°F and delivered at 120°F, which is a 65°F rise:
            </p>
            <ul className="mt-4 space-y-1.5 pl-5 text-[0.9375rem] [&_li]:list-disc">
              <li>
                Navien NPE-240A2: about <strong>5.9 GPM</strong>, against an 11.2 headline
              </li>
              <li>
                Rinnai RX199: about <strong>6.0 GPM</strong>, against an 11.1 headline
              </li>
            </ul>
            <p className="mt-4">
              Both lose roughly half their headline figure at the condition that matters,
              and they finish within a rounding error of each other. Anyone selling you one
              of these over the other on flow is selling you a difference that is not
              there.
            </p>
          </Callout>
          <SourceNote
            source="Navien NPE-240A2 product data and Rinnai RX199iN ground water sizing guide, interpolated to a 65°F rise"
            checked={CHECKED}
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <ComparisonTable
            caption="Navien NPE-A2 compared with Rinnai RX and RXP"
            columns={["Navien NPE-A2", "Rinnai RX / RXP"]}
            rows={[
              {
                label: "Headline flow",
                cells: ["11.2 GPM at a 35°F rise", "11.1 GPM at the headline condition"],
              },
              {
                label: "Flow at a Central Valley winter",
                cells: ["About 5.9 GPM at a 65°F rise", "About 6.0 GPM from 55°F water"],
              },
              {
                label: "How flow is published",
                cells: [
                  { value: "yes", note: "By temperature rise, model level" },
                  { value: "yes", note: "By inlet temperature, with a sizing guide" },
                ],
              },
              {
                label: "Recirculation built in",
                cells: [
                  { value: "yes", note: "ComfortFlow buffer tank and pump on the NPE-A2" },
                  { value: "partial", note: "RXP has a pump and Smart-Circ. RX does not" },
                ],
              },
              {
                label: "Heat exchanger warranty",
                cells: ["15 years", "15 years"],
              },
              {
                label: "What quietly shortens it",
                cells: [
                  {
                    value: "no",
                    note: "Uncontrolled recirculation drops it to 5 years and parts to 3",
                  },
                  { value: "no", note: "A 12,000 burn hour cap, whichever arrives first" },
                ],
              },
              {
                label: "Runs on a 1/2 inch gas line",
                cells: [
                  { value: "yes", note: "Permitted when properly sized and calculated" },
                  { value: "partial", note: "Not stated in what we have verified" },
                ],
              },
              {
                label: "Published venting limits",
                cells: [
                  { value: "yes", note: "75 ft on 2 inch, 150 ft on 3 inch, before elbows" },
                  { value: "partial", note: "Condensing. Route and length per the manual" },
                ],
              },
              {
                label: "Also makes heat pumps",
                cells: [
                  { value: "yes", note: "NWP500, 4.03 UEF on the 65 gallon" },
                  { value: "yes", note: "REHP, 3.75 to 4.00 UEF across the range" },
                ],
              },
              {
                label: "Programme installer verified locally",
                cells: [
                  { value: "no", note: "No Modesto company confirmed on our check date" },
                  { value: "yes", note: "At least one Modesto ACE PRO in the directory" },
                ],
              },
            ]}
          />
          <SourceNote
            source="Navien and Rinnai product documentation, warranty terms and installer directories"
            checked={CHECKED}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Same 15 year warranty, two different ways to lose it</h2>
            <p>
              Both headline a 15 year heat exchanger term, and both attach a condition that
              a homeowner would have to read the warranty document to find.
            </p>
            <p>
              Navien&rsquo;s risk is recirculation. Run the NPE-A2 on standard or{" "}
              <strong>controlled</strong> recirculation and you keep 15 years. Run it{" "}
              <strong>uncontrolled</strong> and the same unit drops to 5 years on the heat
              exchanger and 3 on parts. That is a decision your installer makes on the day,
              often without discussing it, and it is worth thousands.
            </p>
            <p>
              Rinnai&rsquo;s risk is time. The 15 years carries a 12,000 burn hour cap and
              whichever limit arrives first ends the cover. A large household on a
              recirculation loop accumulates burn hours far faster than a small one, so the
              practical term is shortest for exactly the houses working the unit hardest.
            </p>
            <p>
              Neither is a trap, and both are ordinary industry practice. They are simply
              two different bets, and which one suits you depends on your household size and
              whether you want a recirculation loop at all.
            </p>

            <h2>Where the real difference sits</h2>
            <p>
              Navien publishes the more complete install envelope. It permits a 1/2 inch
              gas line when the sizing calculation supports it, and its venting limits are
              specific enough to check against your own house before anyone visits: 75
              feet on 2 inch pipe, 150 feet on 3 inch, before elbow deductions. On an
              awkward retrofit that is worth having in advance.
            </p>
            <p>
              On local service the position reverses. Rinnai&rsquo;s own directory listed
              at least one Modesto ACE PRO on our check date, while no Modesto company was
              confirmed as holding Navien Service Specialist status. Neither manufacturer
              requires programme membership to install, so treat it as a serviceability
              signal rather than a rule, and check both locators for your own postcode
              before you weigh it.
            </p>
            <p>
              Their recirculation designs differ as well. The NPE-A2 ships with a buffer
              tank and pump as part of the unit, whereas on the Rinnai side you choose it:
              RXP includes a pump and Smart-Circ, RX does not. So if you want
              recirculation, the fair comparison is the NPE-A2 against the RXP rather than
              against the RX.
            </p>
          </Prose>

          <Callout title="Our research does not name a winner here, and neither will we">
            <p>
              The head-to-head record for this pairing is explicitly marked as having no
              overall winner, and having done the conversion we agree. Choose{" "}
              <strong>Navien</strong> when the buffer and recirculation architecture suits
              you, or when the published gas and venting envelope solves a difficult
              install. Choose <strong>Rinnai</strong> when the RX or RXP meets your design
              flow and you value a verified local service path, or when you want the sizing
              guide that states flow at your own inlet temperature.
            </p>
          </Callout>

          <Prose>
            <h2>Before you pick either</h2>
            <p>
              Both of these are gas tankless units, so the brand question only matters if
              gas tankless is the right technology for your house in the first place. It
              often is not.{" "}
              <Link href="/water-heaters/tankless/not-right-for-you">
                We keep a page arguing the other side
              </Link>
              , and{" "}
              <Link href="/compare/tank-vs-tankless">
                the tank versus tankless comparison
              </Link>{" "}
              is the decision that comes before this one.
            </p>
            <p>
              If you have settled on tankless and want the third name in this market,{" "}
              <Link href="/brands/noritz">Noritz</Link> is built specifically around tank
              replacement geometry and holds the strongest local parts position of the
              three.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Check whether tankless is right first
            </ButtonLink>
            <ButtonLink href="/brands" variant="secondary" size="lg">
              Compare all brands
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
