import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";

import { ConversionRunsDiagram } from "@/components/advisor/ConversionRunsDiagram";
import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import {
  Card,
  Container,
  Prose,
  Section,
  SectionHeading,
} from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "When tankless is not your best choice",
  description:
    "Six situations where a tankless water heater is the wrong purchase, written by " +
    "a site that does not install them and has nothing to gain either way.",
};

/**
 * The site's defining editorial piece.
 *
 * Every plumber with a dedicated tankless page has an economic reason to
 * emphasise the benefits. This page exists because we do not, and because the
 * cheapest way to prove independence is to publish the argument against the
 * expensive option.
 *
 * It is deliberately not anti-tankless. A page that simply attacked the
 * technology would be as untrustworthy as one that only sold it, and the
 * closing section says plainly who should buy one.
 */

const CASES = [
  {
    title: "Your household barely uses hot water",
    body: "One or two people who rarely run two hot taps at once will never recover the conversion cost. Tankless earns its money on continuous demand. Without that demand you have paid a premium for a capability you do not use, and the payback period can outlast the unit.",
  },
  {
    title: "Your gas line cannot carry it",
    body: "A whole-home tankless unit needs far more gas than a storage tank. If your existing line or meter cannot supply it, you are paying for gas work before you pay for the water heater. This one line item regularly adds hundreds to a couple of thousand dollars, and it is the single most common reason a tankless quote lands far above what the homeowner expected.",
  },
  {
    title: "Your heater has already failed",
    body: "A conversion needs permits, venting, possibly gas and electrical work, and sometimes a second trade. A like for like tank swap can often happen the same day. Deciding to convert while your family has no hot water is how people end up rushing a decision they later regret. Replace the tank now, and plan the conversion properly for next time.",
  },
  {
    title: "You will not keep up with descaling",
    body: "Tankless units need periodic flushing, and hard water shortens the interval. Skipped maintenance shows up as reduced flow, error codes and a shortened life. If nobody in the house is going to book that service, a storage tank is the more honest choice.",
  },
  {
    title: "The venting run is awkward",
    body: "Condensing tankless units need their own venting, and an interior location a long way from an exterior wall makes that expensive. If the unit can go outside or on an exterior wall, the maths changes considerably. If it cannot, price the venting before you commit to the idea.",
  },
  {
    title: "A heat pump would suit you better",
    body: "This is the one most often missed. If you have a garage or utility room with room to breathe, a heat pump water heater is usually much cheaper to run than gas tankless and may attract a utility rebate that tankless does not. Homeowners arrive set on tankless because it is the upgrade they have heard of, not because it is the best fit for their house.",
  },
];

export default function NotRightForYouPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <VerdictBadge verdict="unfit" label="The case against" />
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              When tankless is not your best choice
            </h1>
            <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-navy">
              We do not install water heaters, so we have nothing to gain from talking you
              into the expensive option. Here are six situations where converting to
              tankless is the wrong call, written plainly because almost nobody else in
              this market has a reason to write it.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container width="narrow">
          <div className="space-y-5">
            {CASES.map((c, i) => (
              <Card key={c.title} className="sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="tabular mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-flag-red/10 text-sm font-extrabold text-flag-red">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="text-xl leading-snug">{c.title}</h2>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container width="narrow">
          <SectionHeading
            eyebrow="The real question"
            tone="dark"
            title="What does tankless cost is the wrong question"
            lead="The unit is frequently the cheapest line on a tankless quote. Gas line work, venting, a dedicated circuit and condensate routing regularly add more than the appliance. That is why two identical houses on the same street can get quotes thousands of dollars apart, and why a national average price tells you almost nothing about your own home."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-white/85">
              The question worth asking is{" "}
              <strong className="font-bold text-white">
                what would tankless cost in my house
              </strong>
              , and the answer depends on things a contractor can only establish by
              looking at your gas line, your venting route and where the unit would sit.
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink href="/local/california/modesto" variant="onDark" size="lg">
              See the itemised job breakdown
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* The dark band above makes the argument — the answer depends on your gas
          line, your venting route and where the unit sits. This is that answer,
          drawn. All four costs are runs, and run length is what separates two
          identical houses by thousands. */}
      <Section>
        <Container width="narrow">
          <ConversionRunsDiagram />
        </Container>
      </Section>

      {/* A page that only attacked tankless would be as untrustworthy as one
          that only sold it. Saying plainly who should buy one is what makes the
          argument above credible. */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            eyebrow="In fairness"
            title="Who genuinely should go tankless"
            lead="This is not an argument against the technology. In the right house it is clearly the better buy, and we will tell you so."
          />
          <Card className="sm:p-7">
            <VerdictBadge verdict="fit" label="Strong candidates" />
            <ul className="mt-5 space-y-3">
              {[
                "Households where showers, laundry and dishes regularly overlap",
                "Homes where the existing gas line is already adequate",
                "Units that sit outside or on an exterior wall, which cuts the venting cost sharply",
                "Anyone who wants the floor space a tank occupies",
                "People staying in the house long enough to see the longer service life pay off",
                "Homeowners who will actually book the annual descaling",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-verdict-fit"
                    strokeWidth={2.75}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Callout title="Our position, stated plainly">
            <p>
              Tankless is a good technology sold to a lot of people it does not suit. We
              are not against it. We are against selling it to the household that runs one
              shower a day and needs a gas line upgrade to make it work.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <Prose>
            <h2>How to pressure test a tankless quote</h2>
            <p>
              If you are already holding a quote, these four questions separate a real
              number from an optimistic one. A good contractor will answer all of them
              without hesitating.
            </p>
            <ul>
              <li>Is my existing gas line adequate, or does it need upsizing, and is that in this price?</li>
              <li>What venting does this unit need, and is the full run included?</li>
              <li>Does it need a dedicated electrical circuit, and who is running it?</li>
              <li>Is the permit included, and will you schedule the inspection?</li>
            </ul>
            <p>
              A quote that goes quiet on any of these is not a quote. It is an opening
              position.
            </p>
          </Prose>
          <SourceNote
            source="ENERGY STAR heat pump water heater design considerations; 2026 consumer cost data for gas line, venting and electrical work"
            checked="7 Aug 2026"
          />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find out what suits my home
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/compare/tank-vs-tankless" variant="secondary" size="lg">
              Compare tank and tankless
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
