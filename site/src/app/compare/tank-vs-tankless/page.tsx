import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonTable } from "@/components/advisor/Comparison";
import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { Container, Eyebrow, Prose, Section } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: { canonical: "/compare/tank-vs-tankless" },
  title: "Tank vs tankless water heater",
  description:
    "An honest comparison of storage tank and tankless water heaters, including the " +
    "conversion costs most articles leave out, and who each one genuinely suits.",
};

export default function TankVsTanklessPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Comparison</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              Tank vs tankless, without the sales pitch
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Tankless is better at some things and worse at others. Which matters depends
              almost entirely on how much hot water your household uses at once, and on
              what your house needs before a tankless unit can be fitted at all.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container>
          <ComparisonTable
            caption="Storage tank compared with gas tankless"
            columns={["Storage tank", "Gas tankless"]}
            rows={[
              {
                label: "Typical installed cost",
                cells: ["$1,600 to $3,100", "$3,200 to $8,000"],
              },
              {
                label: "Runs out of hot water",
                cells: [
                  { value: "partial", note: "Yes, once the tank is drained" },
                  { value: "no", note: "No, flow rate is the limit instead" },
                ],
              },
              {
                label: "Two showers at once",
                cells: [
                  { value: "partial", note: "Depends on tank size" },
                  { value: "yes", note: "Yes, if sized properly" },
                ],
              },
              {
                label: "Floor space used",
                cells: ["Roughly the footprint of a bin", "Wall mounted, frees the floor"],
              },
              {
                label: "Gas line work likely",
                cells: [
                  { value: "no", note: "Rarely on a like for like swap" },
                  { value: "yes", note: "Often, and it is expensive" },
                ],
              },
              {
                label: "New venting needed",
                cells: [
                  { value: "no", note: "Usually reuses existing" },
                  { value: "yes", note: "Almost always" },
                ],
              },
              {
                label: "Annual maintenance",
                cells: [
                  "Flush occasionally, easy to neglect",
                  "Descaling matters, more so in hard water",
                ],
              },
              {
                label: "Expected life",
                cells: ["10 to 13 years", "15 to 20 years if maintained"],
              },
              {
                label: "Emergency replacement",
                cells: [
                  { value: "yes", note: "Same day is realistic" },
                  { value: "no", note: "Permits and parts take longer" },
                ],
              },
            ]}
          />
        </Container>
      </Section>

      <Section tone="tint" className="py-16">
        <Container width="narrow">
          <Prose>
            <h2>The number that decides it</h2>
            <p>
              Most comparisons stop at the price of the appliance, which is the least
              useful figure available. A tankless unit is frequently the cheapest line on
              a tankless quote. The expensive parts are the gas line, the venting, the
              dedicated circuit and the condensate route, and none of them appear until a
              contractor has looked at your house.
            </p>
            <p>
              So the real question is not what tankless costs. It is what tankless costs{" "}
              <strong>in your house</strong>, and that number varies by several thousand
              dollars between two homes on the same street.
            </p>

            <h2>Who should genuinely go tankless</h2>
            <ul>
              <li>Households where showers, laundry and dishes regularly overlap</li>
              <li>Homes where the existing gas line is already adequate</li>
              <li>Anyone whose unit sits outside or on an exterior wall, which cuts the venting cost</li>
              <li>People who plan to stay long enough to see the longer life pay off</li>
            </ul>

            <h2>Who should not</h2>
            <ul>
              <li>One or two people who rarely run two hot taps at once</li>
              <li>Homes that would need a gas line upgrade to support it</li>
              <li>Anyone replacing a failed heater today, where the conversion time is a real cost</li>
              <li>Households that will not keep up with descaling, particularly in hard water</li>
            </ul>
          </Prose>

          <Callout title="What a plumber will not usually volunteer">
            <p>
              If your household is small and your gas line needs upsizing, the payback
              period on a tankless conversion can be longer than the unit lasts. That is
              not an argument against tankless. It is an argument against tankless{" "}
              <em>for that house</em>, and a good contractor will say so if you ask
              directly.
            </p>
          </Callout>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Work out which one suits my home
            </ButtonLink>
            {/* Was pointing at /compare/tankless-vs-heat-pump, which has never
                existed. The technologies hub now runs the four-way comparison
                including the heat pump, so it answers the same question. */}
            <ButtonLink href="/water-heaters" variant="secondary" size="lg">
              Now bring the heat pump into it
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Not sure a heat pump belongs in the conversation? In most Central Valley homes
            it is the cheapest option to run, which makes it{" "}
            <Link
              href="/water-heaters/heat-pump"
              className="text-blue underline underline-offset-4"
            >
              worth understanding before you commit
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
