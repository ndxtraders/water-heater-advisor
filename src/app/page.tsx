import { ArrowRight, ClipboardList, MapPin, Users } from "lucide-react";
import Link from "next/link";

import { Callout, EmergencyBar, TechnologyCard } from "@/components/advisor/Panels";
import { CheckedStamp, RebateStatus, SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

const TECHNOLOGIES = [
  {
    name: "Gas storage tank",
    href: "/water-heaters/gas-storage",
    summary:
      "The default replacement. Lowest upfront cost and the fastest job when your old tank has already failed.",
    fits: [
      "Your gas tank died and you need hot water today",
      "You want the smallest possible upfront bill",
      "Like for like swap, no gas or venting changes",
    ],
    cautions: [
      "Operating cost is the highest of the gas options",
      "You are planning to electrify the house later",
    ],
  },
  {
    name: "Gas tankless",
    href: "/water-heaters/tankless",
    summary:
      "Endless hot water and a much smaller footprint, but the install is where the money goes, not the unit.",
    fits: [
      "Several showers or fixtures run at once",
      "You want the floor space back",
      "Gas service is already adequate",
    ],
    cautions: [
      "Gas line, venting or electrical work can double the job",
      "Needs descaling, and hard water makes that non optional",
    ],
  },
  {
    name: "Heat pump",
    href: "/water-heaters/heat-pump",
    summary:
      "By far the cheapest to run in most Central Valley homes. It needs space, air and the right electrical service.",
    fits: [
      "Garage or utility room with room to breathe",
      "Lower energy bills matter more than upfront cost",
      "You already have solar, or you are heading that way",
    ],
    cautions: [
      "A tight closet will not work without ducting",
      "Panel capacity and a condensate route both have to check out",
    ],
  },
  {
    name: "Electric storage tank",
    href: "/water-heaters/electric-storage",
    summary:
      "Simple and cheap to install. Usually the right answer only when a heat pump genuinely will not fit.",
    fits: [
      "Replacing an existing electric tank",
      "No room or airflow for a heat pump",
      "Upfront budget is the binding constraint",
    ],
    cautions: [
      "Running cost is high on most rate plans",
      "You may be leaving a utility rebate on the table",
    ],
  },
];

const STEPS = [
  {
    Icon: ClipboardList,
    title: "Answer ten questions",
    body: "Your current setup, your household, where the unit lives, and what you actually care about. Two minutes.",
  },
  {
    Icon: MapPin,
    title: "Get a real recommendation",
    body: "A system type and size, what it should cost in a house like yours, the rebates worth chasing, and what we ruled out.",
  },
  {
    Icon: Users,
    title: "Then, if you want it, an installer",
    body: "We introduce you to one local contractor who does that specific work. Not four of them calling you at dinner.",
  },
];

export default function HomePage() {
  return (
    <>
      <EmergencyBar />

      {/* Hero. No stock photography of a smiling technician, because that is
          the visual grammar of the contractor sites this one has to be legibly
          different from. The claim is the hero. */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <Container>
          <Eyebrow>Independent guidance</Eyebrow>
          <h1 className="max-w-4xl text-4xl leading-[1.1] sm:text-5xl">
            Almost every water heater recommendation you will read comes from someone who
            profits from the answer.
          </h1>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted-foreground">
            We do not install anything. We help you work out what your house actually
            needs, then introduce you to a local contractor who does that kind of work.
            Often the right answer is the boring, cheaper tank, and we will tell you so.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my home
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/compare/tank-vs-tankless" size="lg" variant="secondary">
              Just show me the comparison
            </ButtonLink>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Ten questions, about two minutes. You see the recommendation before we ask for
            anything.
          </p>
        </Container>
      </section>

      {/* How it works */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="How this works"
            title="Recommendation first. Contact details later, and only if you want them."
            lead="Every lead site in this category collects your phone number and then figures out what to tell you. We think that is backwards, and it is why their advice is worthless."
          />
          <ol className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="tabular inline-flex size-8 items-center justify-center rounded-full bg-copper text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <step.Icon aria-hidden className="size-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Technologies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="The question is not which tankless to buy"
            lead="It is which kind of water heating makes sense for your house. Four options cover almost every home, and the honest answer depends on things most articles never ask you about."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {TECHNOLOGIES.map((tech) => (
              <TechnologyCard key={tech.name} {...tech} />
            ))}
          </div>
        </Container>
      </Section>

      {/* The contrarian position. This is the site's strongest editorial asset
          and it gets a full section, not a footnote. */}
      <Section tone="muted">
        <Container width="narrow">
          <Eyebrow>Where we differ</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            Sometimes we will tell you not to go tankless
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Every plumber with a dedicated tankless page has an economic reason to
            emphasise the benefits. We do not. If your household uses modest amounts of
            hot water, your gas line needs upsizing, and the unit lives in a spot that
            makes venting awkward, the payback maths simply does not work, and a good
            contractor will quietly agree.
          </p>
          <Callout title="The number nobody quotes you">
            <p>
              A tankless unit is often the cheapest line on a tankless quote. Gas line
              work, venting, a dedicated circuit and condensate routing regularly add more
              than the appliance costs. That is why a national average price is close to
              useless, and why we itemise the job instead of publishing one figure.
            </p>
          </Callout>
          <Link
            href="/water-heaters/tankless/not-right-for-you"
            className="inline-flex items-center gap-1.5 font-medium text-copper hover:underline hover:underline-offset-4"
          >
            When tankless is the wrong call
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Container>
      </Section>

      {/* Local proof. Generic advice is what everyone else has, so the local
          block leads with a fact that changes the answer. */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <Eyebrow>Modesto, California</Eyebrow>
              <h2 className="text-3xl sm:text-4xl">
                Your utility changes the recommendation
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Not the city. The utility. A Modesto home on MID and a Turlock home
                fifteen miles away sit in different rebate territories, which can move a
                heat pump from marginal to obvious. Any page that treats a metro as one
                market is guessing.
              </p>
              <div className="mt-7">
                <ButtonLink href="/local/california/modesto" variant="secondary" size="lg">
                  Modesto rebates, permits and prices
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-5">
                <CheckedStamp date="7 Aug 2026" />
              </div>
              <ul className="space-y-4 text-[0.9375rem]">
                <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <span>Turlock Irrigation District, heat pump</span>
                  <span className="flex items-center gap-2.5">
                    <span className="tabular font-semibold">$1,000</span>
                    <RebateStatus state="active" />
                  </span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <span>Modesto Irrigation District, heat pump</span>
                  <RebateStatus state="verify" />
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <span>California HEEHRA, single family</span>
                  <RebateStatus state="reserved" />
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Federal 25C tax credit</span>
                  <RebateStatus state="expired" />
                </li>
              </ul>
              <SourceNote
                source="TID rebate application, IRS, California HEEHRA program status"
                checked="7 Aug 2026"
              />
              <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                An outlined badge means we have not confirmed it ourselves yet. We would
                rather show you that than quietly present a guess as a fact.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="muted">
        <Container width="narrow" className="text-center">
          <h2 className="text-3xl sm:text-4xl">Find out what your house needs</h2>
          <p className="mx-auto mt-5 max-w-measure text-lg leading-relaxed text-muted-foreground">
            Ten questions. You get the recommendation, the likely cost range and the
            rebates worth chasing before we ask for a single contact detail.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/quiz" size="lg">
              Start the two minute check
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
