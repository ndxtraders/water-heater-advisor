import { AlertTriangle, ArrowRight, Droplets, Flame, Zap } from "lucide-react";
import type { Metadata } from "next";

import { LeakPointDiagram } from "@/components/advisor/LeakPointDiagram";
import { Callout } from "@/components/advisor/Panels";
import { RuledOut, VerdictBadge } from "@/components/advisor/Verdict";
import {
  Card,
  Container,
  IconChip,
  Prose,
  Section,
  SectionHeading,
} from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Water heater leaking or no hot water",
  description:
    "What to shut off first, whether it can be repaired, and how to decide between a " +
    "fast replacement and the upgrade you were thinking about anyway.",
};

/**
 * The emergency funnel.
 *
 * This page exists for the homeowner standing over a leaking tank, and the
 * writing has to respect that. Safety actions come first, above any commercial
 * consideration and above any education. The repair-versus-replace reasoning is
 * second. The recommendation quiz is last, and framed as the thing to do while
 * they wait rather than a hurdle before help.
 *
 * The emergency bar on every page links here, so this is the most-linked route
 * on the site.
 */

const STEPS = [
  {
    icon: Droplets,
    title: "Turn off the water to the heater",
    body: "There is a valve on the cold inlet pipe at the top of the unit. Turn it clockwise until it stops. If you cannot find it or it will not move, shut off the main water supply to the house.",
  },
  {
    icon: Flame,
    title: "If it is gas, turn the gas control to off",
    body: "The dial or switch is on the control box near the bottom of the tank. If you smell gas at any point, do not touch anything electrical. Leave the house and call your gas utility from outside.",
  },
  {
    icon: Zap,
    title: "If it is electric, switch off its breaker",
    body: "Find the breaker labelled for the water heater and switch it off. An electric element left powered in a drained tank will burn out within minutes, which turns a leak into a bigger repair.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      {/* Safety first, above everything. No eyebrow, no positioning, no CTA
          until the water is off. */}
      <section className="border-b border-flag-red/20 bg-verdict-unfit-bg py-12 sm:py-16">
        <Container width="narrow">
          <span className="inline-flex items-center gap-2 rounded-full bg-flag-red/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-flag-red">
            <AlertTriangle aria-hidden className="size-3.5" />
            Do this first
          </span>
          <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Leaking tank or no hot water
          </h1>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-foreground">
            If water is actively leaking, do these three things before you read anything
            else or call anyone. They take about two minutes and they stop a bad day
            becoming an expensive one.
          </p>
        </Container>
      </section>

      <Section className="pt-12">
        <Container width="narrow">
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Card className="sm:p-7">
                  <div className="flex items-start gap-4">
                    <IconChip icon={s.icon} tone="red" />
                    <div>
                      <h2 className="text-xl leading-snug">
                        <span className="tabular mr-2 text-muted-foreground">{i + 1}.</span>
                        {s.title}
                      </h2>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>

          <Callout title="When to stop reading and call somebody" tone="warn">
            <p>
              Gas smell, water near electrical panels or outlets, scalding water coming
              from taps, or a tank that is visibly bulging. Any of those, leave it to a
              licensed contractor and get out of the way. Everything below can wait.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            eyebrow="The first decision"
            title="Can it be repaired, or does it need replacing?"
            lead="Worth two minutes even in an emergency, because the answer is usually clearer than people expect and getting it wrong is expensive in both directions."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <VerdictBadge verdict="fit" label="Often repairable" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>No hot water but the tank itself is dry</li>
                <li>Pilot will not stay lit on an otherwise sound unit</li>
                <li>A single failed heating element or thermostat</li>
                <li>Leaking from a fitting or valve rather than the tank body</li>
                <li>The unit is under about eight years old</li>
              </ul>
            </Card>
            <Card>
              <VerdictBadge verdict="unfit" label="Replace it" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>Water is coming from the tank body itself</li>
                <li>Rusty or discoloured hot water</li>
                <li>The unit is past about twelve years old</li>
                <li>You have already paid for a repair in the last two years</li>
                <li>The repair quote is more than about half a replacement</li>
              </ul>
            </Card>
          </div>

          {/* The cards above name the distinction; this answers it. A homeowner
              with water on the floor cannot tell a drain valve from a corroded
              tank, and that judgement is worth the difference between a service
              call and a replacement. */}
          <LeakPointDiagram />

          <Callout title="The twelve year rule">
            <p>
              A tank leaking from its body cannot be repaired. That is corrosion, not a
              part, and no plumber can patch it. Past roughly twelve years, paying for any
              significant repair is usually money spent twice, because you will be buying
              the replacement within a year or two anyway.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            eyebrow="The second decision"
            title="Same again, or the upgrade you were considering anyway?"
            lead="This is the moment most homeowners get pushed into a decision by circumstance. It is worth knowing which options are realistically on the table today and which are not."
          />

          <RuledOut
            items={[
              {
                technology: "Tank to tankless conversion, today",
                reason:
                  "Realistically not a same-day job. Permits, venting, often gas and electrical work, sometimes a second trade. Worth planning properly, not deciding on while the family has no hot water.",
              },
              {
                technology: "Heat pump, today",
                reason:
                  "Same problem. It may well be the right long-term answer for your home, and utility rebates can be substantial, but it needs electrical capacity checked and a condensate route planned.",
              },
            ]}
          />

          <Prose className="mt-8">
            <h2>What that leaves</h2>
            <p>
              For most people with a dead heater, a like for like replacement is the
              honest answer. It is fastest, it is cheapest, and it does not force a
              multi-thousand dollar decision under pressure.
            </p>
            <p>
              There are two exceptions worth knowing about. If your unit sits in a garage
              or utility room with room around it, a heat pump can sometimes be fitted
              nearly as quickly as a tank and may attract a rebate that changes the maths
              considerably. And if you were already planning to convert within the year,
              doing it now saves paying for installation twice.
            </p>
            <p>
              Ask your contractor both questions directly. A good one will give you a
              straight answer about what is achievable today.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="dark">
        <Container width="narrow">
          <SectionHeading
            eyebrow="While you wait"
            tone="dark"
            title="Two minutes that make the next conversation shorter"
            lead="Our questions shorten automatically when you tell us the heater has already failed. You get a recommendation, a realistic cost range and the questions to ask, which is a much better position to be in when a contractor is standing in your garage."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz?status=leaking" size="lg">
              Start the short version
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="onDark" size="lg">
              How to check a contractor
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            We are not a plumbing company and we do not perform installations. We help you
            work out what you need, then introduce you to a licensed local contractor who
            does that work.
          </p>
        </Container>
      </Section>
    </>
  );
}
