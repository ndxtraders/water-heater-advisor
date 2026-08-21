import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { TURLOCK_RATES, annualFuelCost, usdRange } from "@/lib/energy";
import { TURLOCK } from "@/lib/market";
import { TECHNOLOGIES } from "@/lib/quiz/engine";
import { TECHNOLOGY_CONTENT, TECH_SLUGS } from "@/lib/technologies";

export const metadata: Metadata = {
  alternates: { canonical: "/water-heaters" },
  title: "Water heater technologies compared",
  description:
    "The four technologies worth considering, what each costs to buy and to run, and " +
    "which one suits which house. Settle this before you think about brands.",
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function TechnologiesHubPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Technologies</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              Four technologies, and the house decides which one
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              This is the decision that comes before everything else. Get it right and the
              brand barely matters. Get it wrong and the best unit on the market is still
              the wrong purchase, because the constraint was never the badge, it was your
              gas line, your panel or the cupboard the thing has to live in.
            </p>
          </div>
        </Container>
      </Section>

      {/*
        Buy cost and run cost side by side.

        Separating them is how this category misleads people. Tankless looks
        expensive on one axis and good on the other; the electric tank looks
        cheap and is the most expensive thing here to own. Neither number means
        much alone.
      */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="What each one costs to buy and to run"
            lead="Shown together on purpose. Quoting either figure on its own is how this category misleads people, because the cheapest thing to install is the most expensive thing to own."
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                Installed cost and yearly running cost by technology
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 text-sm font-medium text-muted-foreground">
                    Technology
                  </th>
                  <th scope="col" className="py-3 pr-4 text-right text-sm font-medium text-muted-foreground">
                    Typical installed
                  </th>
                  <th scope="col" className="py-3 text-right text-sm font-medium text-muted-foreground">
                    Fuel, a year
                  </th>
                </tr>
              </thead>
              <tbody>
                {TECH_SLUGS.map((slug) => {
                  const t = TECHNOLOGY_CONTENT[slug];
                  const [lo, hi] = TECHNOLOGIES[t.id].cost;
                  const fuel = annualFuelCost(t.id, TURLOCK);
                  return (
                    <tr key={slug} className="border-b border-border/70 last:border-0">
                      <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                        <Link
                          href={`/water-heaters/${slug}`}
                          className="text-[0.9375rem] font-medium text-blue underline underline-offset-4 hover:text-blue-bright"
                        >
                          {t.name}
                        </Link>
                      </th>
                      <td className="apparatus py-3.5 pr-4 text-right whitespace-nowrap">
                        {usd(lo)} to {usd(hi)}
                      </td>
                      <td className="apparatus py-3.5 text-right whitespace-nowrap font-semibold">
                        {usdRange(fuel.range)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <SourceNote
            source={`Water Heater Advisor price model, and the Turlock fuel model at ${TURLOCK_RATES.electricUtility} and ${TURLOCK_RATES.gasUtility} rates`}
            checked="20 Aug 2026"
          />

          <Callout title="Read those two columns against each other">
            <p>
              The electric tank is the cheapest thing here to install and the most
              expensive to own, and switching to one from gas can cost you money rather
              than save it. The heat pump is the reverse, expensive up front and roughly a
              third of the gas tank to run. Tankless sits closest to a gas tank on fuel and
              well above it on install, which is why it has to earn its price on endless
              hot water and floor space rather than on the bill.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="The four"
            lead="Each page carries how it works, who it suits, what the sales pitch leaves out, and what to ask an installer."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {TECH_SLUGS.map((slug) => {
              const t = TECHNOLOGY_CONTENT[slug];
              return (
                <article
                  key={slug}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(11,33,67,0.16)]"
                >
                  <h3 className="text-xl">
                    <Link href={`/water-heaters/${slug}`} className="after:absolute after:inset-0">
                      {t.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {t.lead}
                  </p>
                  <p className="mt-4 border-t border-border pt-4 text-sm font-medium text-blue">
                    {t.catchTitle}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>How to actually decide</h2>
            <p>
              In practice the choice is made by elimination rather than by preference, and
              it usually comes down to three physical questions about your house.
            </p>
            <h3>Where does it live?</h3>
            <p>
              A sealed interior cupboard rules out a heat pump unless you are prepared to
              duct it, because the unit needs a real volume of air to draw heat from. A
              garage or utility room opens everything back up, and in the Central Valley a
              garage is close to the ideal spot.
            </p>
            <h3>What is your electrical panel carrying?</h3>
            <p>
              This is the question that decides most heat pump conversions, and almost
              nobody asks it early enough. A panel with capacity to spare makes the
              conversion straightforward. A full panel adds thousands and turns a good
              decision into a marginal one.
            </p>
            <h3>How much hot water do you need at once?</h3>
            <p>
              Not how much in a day, how much at the same moment. A tank serves several
              fixtures at once from its stored reserve without any calculation. Tankless is
              limited by flow instead, and that limit is far lower in winter than the
              headline figure suggests.
            </p>
            <p>
              If your current unit has already failed and you need hot water today, that
              answers it for you. An emergency is not the moment to run a conversion, and{" "}
              <Link href="/emergency">the emergency page</Link> covers what to do instead.
            </p>
          </Prose>

          <Prose className="mt-10">
            <h2>Deeper comparisons</h2>
            <ul>
              <li>
                <Link href="/compare/tank-vs-tankless">Tank versus tankless</Link>, the
                most common version of this decision
              </li>
              <li>
                <Link href="/water-heaters/tankless/not-right-for-you">
                  When tankless is the wrong buy
                </Link>
                , which is more often than the category admits
              </li>
              <li>
                <Link href="/local/california/turlock">
                  What the fuel actually costs locally
                </Link>
                , with published utility rates rather than national averages
              </li>
            </ul>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Answer a few questions and we will narrow it
            </ButtonLink>
            <ButtonLink href="/brands" variant="secondary" size="lg">
              Then look at brands
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
