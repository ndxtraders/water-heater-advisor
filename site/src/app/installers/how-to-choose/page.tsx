import { ArrowRight, BadgeCheck, FileText, Phone, Wrench } from "lucide-react";
import type { Metadata } from "next";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
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
  alternates: { canonical: "/installers/how-to-choose" },
  title: "How to choose a water heater installer",
  description:
    "How to check a California contractor's licence, what a complete quote contains, " +
    "and the questions that separate a real installer from a cheap number.",
};

/**
 * Installer selection.
 *
 * Deliberately written so it is useful to someone who never contacts us. The
 * homeowner who reads this, hires someone independently and gets a good job is
 * still a win for the site's standing, and a page that only funnelled toward
 * our own introductions would be transparently self-serving.
 */

const CHECKS = [
  {
    icon: BadgeCheck,
    title: "Check the licence yourself",
    body: "California licensed contractors must include their licence number in advertising. Do not take it from their website. Look it up on the CSLB site, confirm the status is active, confirm the classification covers this work, and confirm the name matches who is actually turning up.",
  },
  {
    icon: Wrench,
    title: "Ask how many they have installed",
    body: "Specifically of the thing you are buying, in the last year. A general plumber who does two tankless conversions a year is a different proposition from one who does two a week. This matters far more for tankless and heat pump work than for a like for like tank swap.",
  },
  {
    icon: FileText,
    title: "Get the quote in writing, itemised",
    body: "Unit, labour, permit, haul away, and every upgrade line separately. A single number with no breakdown cannot be compared against anything, and it is where surprise charges hide.",
  },
  {
    icon: Phone,
    title: "Find out who services it afterwards",
    body: "The installer, the manufacturer, or a third party. Ask before you buy, because the answer determines what happens the first time it throws an error code.",
  },
];

export default function HowToChoosePage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Installer" />
          <div className="mt-8">
            <h1 className="text-4xl leading-[1.1] sm:text-5xl">
              How to choose a water heater installer
            </h1>
            <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-navy">
              The cheapest quote is not automatically the best one, and the most expensive
              is not automatically thorough. Here is how to tell the difference, whether
              or not you ever use us to find someone.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Before you sign anything"
            title="Four checks worth doing"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {CHECKS.map((c) => (
              <Card key={c.title}>
                <IconChip icon={c.icon} />
                <h3 className="mt-5 text-lg leading-snug">{c.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
          <SourceNote
            source="California Contractors State License Board guidance on licence verification and advertising requirements"
            checked="7 Aug 2026"
          />
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Comparing quotes"
            title="Why the cheapest number is often the incomplete one"
            lead="Two quotes for the same job can differ by thousands, and it is usually not margin. It is what one of them has left out."
          />
          <Prose>
            <p>
              On a conversion, the lines that move the total are rarely the appliance. Gas
              line capacity, venting, a dedicated electrical circuit, condensate routing
              and the permit are where the money is, and a quote that omits them is not
              cheaper. It is unfinished.
            </p>
            <p>
              When you compare two numbers, the useful question is not{" "}
              <strong>which is lower</strong>. It is{" "}
              <strong>what is in each one that is not in the other</strong>. Ask the
              cheaper contractor directly what they have assumed about your gas line and
              your venting. The answer tells you whether the price is real.
            </p>
          </Prose>

          <Callout title="A quote is not a quote if it goes quiet on the permit">
            <p>
              A water heater replacement needs a permit, and the inspection is what catches
              seismic strapping, the temperature and pressure relief line, venting and
              combustion air. All of those are safety items. If a contractor tells you a
              permit is unnecessary for a like for like swap, treat that as information
              about the contractor rather than about the permit.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Questions worth asking every contractor</h2>
            <ul>
              <li>Is the permit included, and will you schedule the inspection?</li>
              <li>What have you assumed about my gas line, and did you look at it?</li>
              <li>What venting does this need, and is the whole run in this price?</li>
              <li>Does it need a dedicated circuit, and who runs it?</li>
              <li>Is haul away of the old unit included?</li>
              <li>What is the warranty on parts, and separately on your labour?</li>
              <li>Who do I call in two years when something goes wrong?</li>
              <li>Would you put this system in your own house? Why?</li>
            </ul>

            <h2>On manufacturer certifications</h2>
            <p>
              Brands run contractor programmes, and being in one can genuinely mean better
              training and better warranty support. But the status changes, tiers differ,
              and plenty of excellent installers are in no programme at all.
            </p>
            <p>
              If a contractor says they are authorised or certified for a brand, ask which
              programme and check it in the manufacturer&rsquo;s own directory. We apply
              the same rule to ourselves and never describe an installer that way unless
              we have verified it.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Work out what you need first
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/methodology" variant="secondary" size="lg">
              How we choose who to introduce
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Work out the technology before you shortlist contractors. Asking three
            companies to quote three different systems produces three numbers you cannot
            compare.
          </p>
        </Container>
      </Section>
    </>
  );
}
