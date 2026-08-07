import { ArrowRight, Ban, Scale, ShieldCheck, Wallet } from "lucide-react";
import type { Metadata } from "next";

import { Callout } from "@/components/advisor/Panels";
import { RebateStatus } from "@/components/advisor/Status";
import {
  Card,
  Container,
  IconChip,
  Prose,
  Section,
  SectionHeading,
} from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { INDEPENDENCE_POLICY } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we make recommendations",
  description:
    "Our recommendation method, our conflicts of interest, and the rule that keeps " +
    "the two apart. Published in full because a claim of independence that cannot be " +
    "checked is worth nothing.",
};

/**
 * The published methodology and conflicts policy.
 *
 * This page exists because the site's entire commercial thesis is that its
 * advice is not for sale, and an unverifiable claim of independence is worth
 * nothing. Publishing the method, the money and the separation between them is
 * the only version of that claim a reader can actually check.
 *
 * It is also the natural home for the CSLB positioning. A referral service in
 * California may not present itself as performing the construction, and saying
 * so plainly on a public page is both the honest move and the defensible one.
 */

const STEPS = [
  {
    title: "Urgency and safety first",
    body: "A leaking or failed heater changes everything that follows. We shorten the questions and weight the answer toward what can realistically be installed quickly.",
  },
  {
    title: "Eliminate what will not physically work",
    body: "No gas service rules out gas options. A sealed interior closet rules out a heat pump. This step runs before any preference scoring and cannot be overridden by it.",
  },
  {
    title: "Calculate demand",
    body: "Household size, bathrooms and how often two hot taps run at once. Simultaneous demand, not headcount, is what determines the size you need.",
  },
  {
    title: "Estimate conversion complexity",
    body: "Gas line capacity, venting, electrical work, condensate routing. This is where most of the cost variation between two similar homes lives.",
  },
  {
    title: "Apply local conditions",
    body: "Utility territory, live rebate status, permit requirements and code. We use your postcode rather than your city because rebates follow utility boundaries.",
  },
  {
    title: "Apply your priorities",
    body: "Upfront cost, running cost, endless hot water, floor space, or getting off gas. Two technically valid options often split on this answer alone.",
  },
  {
    title: "Brand as a tie-breaker only",
    body: "A brand preference never overrides feasibility. If you want a brand that does not make what your house needs, we will say so rather than bend the recommendation.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">
            How we make recommendations, and how we get paid
          </h1>
          <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted-foreground">
            Both, on one page, because a claim of independence you cannot check is worth
            nothing. If you find something here that does not match what the site actually
            does, we want to hear about it.
          </p>
        </Container>
      </Section>

      {/* The money, first. Burying it under the method would be the tell. */}
      <Section className="pt-14">
        <Container width="narrow">
          <Card className="border-blue/30 bg-blue/[0.04] sm:p-8">
            <IconChip icon={Wallet} />
            <h2 className="mt-5 text-2xl">Where the money comes from</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{INDEPENDENCE_POLICY}</p>
            <p className="mt-4 leading-relaxed text-foreground/85">
              Specifically, we are paid a percentage of the value of work that actually
              completes. We are not paid per enquiry, we do not run an auction, and we do
              not sell the same homeowner to several contractors.
            </p>
          </Card>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Card>
              <IconChip icon={Scale} tone="green" />
              <h3 className="mt-4 text-lg">What payment can affect</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Which qualified installer receives an introduction, when more than one is
                capable of the job and serves your area.
              </p>
            </Card>
            <Card>
              <IconChip icon={Ban} tone="red" />
              <h3 className="mt-4 text-lg">What it can never affect</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                What we recommend. The engine that decides what suits your home has no
                access to who is paying us, and that separation is structural rather than
                a promise.
              </p>
            </Card>
          </div>

          <Callout title="Two separate engines, deliberately">
            <p>
              One engine works out what your home needs. A different one works out which
              contractor should hear about it. The first cannot see the second. It is the
              single most important design decision in this whole site, because every
              other trust signal here would be worthless without it.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            eyebrow="The method"
            title="How the recommendation is reached"
            lead="In this order, every time. Feasibility eliminates before preference scores, which is why the quiz will sometimes tell you that the thing you wanted is not the thing your house needs."
          />
          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Card>
                  <div className="flex items-start gap-4">
                    <span className="tabular mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-sm font-extrabold text-blue">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg leading-snug">{s.title}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <SectionHeading
            eyebrow="Sourcing"
            title="How we handle facts that go stale"
            lead="Rebates, codes and prices change. Treating them as evergreen content is how most sites in this category end up quietly wrong."
          />

          <div className="space-y-4">
            {[
              {
                state: "active" as const,
                text: "Confirmed available as of the date shown next to it.",
              },
              {
                state: "reserved" as const,
                text: "The programme exists but funds are committed and new projects are waitlisted.",
              },
              {
                state: "expired" as const,
                text: "No longer available. We leave these visible rather than deleting them, because a lot of published advice still references them.",
              },
              {
                state: "verify" as const,
                text: "We have not confirmed this ourselves. The badge is deliberately unfilled so you can tell at a glance which figures we stand behind.",
              },
            ].map((row) => (
              <div
                key={row.state}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card px-5 py-4"
              >
                <RebateStatus state={row.state} />
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {row.text}
                </p>
              </div>
            ))}
          </div>

          <Prose className="mt-10">
            <h2>Things we will not publish</h2>
            <ul>
              <li>
                A single average installed price. The evidence does not support that
                precision, and an average answers the wrong question anyway.
              </li>
              <li>
                A blanket warranty figure for a brand. Warranty varies by model, component
                and registration, and a homeowner relying on a headline number can lose
                coverage on a technicality.
              </li>
              <li>
                That any contractor is an authorised or certified installer, unless we
                have confirmed that exact status in the manufacturer&rsquo;s own
                directory.
              </li>
              <li>
                A citywide water hardness figure we cannot source. It varies by service
                zone, and it matters enough to tankless maintenance that guessing would be
                irresponsible.
              </li>
            </ul>
          </Prose>
        </Container>
      </Section>

      <Section tone="dark">
        <Container width="narrow">
          <IconChip icon={ShieldCheck} tone="dark" />
          <h2 className="mt-5 text-3xl text-white sm:text-4xl">What we are not</h2>
          <div aria-hidden className="mt-4 h-1 w-14 rounded-full bg-flag-red-light" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
            <p>
              Water Heater Advisor is an independent information and referral service. We
              are not a plumbing contractor and we do not perform installations.
            </p>
            <p>
              We do not quote construction work, we do not negotiate your installation
              agreement, and we do not take payment for the work itself. You contract
              directly with a licensed contractor and you pay them directly.
            </p>
            <p>
              California regulates who may hold themselves out as performing construction
              work, and requires licensed contractors to display their licence number in
              advertising. If you are ever unclear whether you are talking to us or to a
              contractor, ask, and check their licence with the CSLB.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow" className="text-center">
          <SectionHeading
            align="center"
            title="See it work"
            lead="The fastest way to judge whether any of this is true is to run the quiz and look at what it tells you, including what it rules out."
          />
          <div className="flex justify-center">
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
