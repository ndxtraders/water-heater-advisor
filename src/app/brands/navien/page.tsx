import type { Metadata } from "next";

import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { RebateStatus, SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Navien water heaters",
  description:
    "Who Navien tankless water heaters suit, where they do not, and what to confirm " +
    "with a local installer before committing to the brand.",
};

/**
 * Brand page template. Navien is the worked example; the other five follow this
 * shape exactly.
 *
 * The structure encodes an editorial rule. Everything above the fold is
 * *positioning* — who the brand suits and who it does not — which is stable,
 * defensible and genuinely useful. Everything volatile (warranty terms, current
 * model lines, installer programme status, local coverage) sits in the data
 * panel below, where each row carries its own verification state.
 *
 * Nothing here should ever describe an installer as "authorised" or "certified"
 * unless that exact status has been checked against the manufacturer's own
 * directory. That is a claim about someone else's business and it changes
 * without notice.
 */
export default function NavienPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Brands</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">Navien</h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-muted-foreground">
              Best known for condensing gas tankless units and for recirculation built
              into the unit rather than bolted on afterwards. A strong choice in the
              right house, and an expensive mistake in the wrong one.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container width="narrow">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="fit" label="Worth shortlisting if" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>You are converting to gas tankless and want recirculation</li>
                <li>Your household runs several fixtures at once</li>
                <li>There are experienced Navien installers near you</li>
                <li>You are replacing an existing Navien unit</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="unfit" label="Look elsewhere if" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>Nobody local services the brand well</li>
                <li>You will not keep up with annual descaling</li>
                <li>A storage tank or heat pump is the better technology anyway</li>
                <li>Your gas service cannot support a tankless unit</li>
              </ul>
            </div>
          </div>

          <Callout title="Brand is the last decision, not the first">
            <p>
              Choosing a brand before choosing a technology is the most common expensive
              mistake we see. If a heat pump is right for your home, the best tankless
              brand on the market is still the wrong purchase. Settle the technology
              first, then let local service coverage narrow the brand.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="What we have verified, and what we have not"
            lead="Warranty terms, model lines and installer programmes change without notice, and they vary by model, registration and installation type. Rather than publish a number that quietly goes stale, each row shows its own state."
          />
          <LocalDataPanel
            title="Navien — brand record"
            rows={[
              {
                label: "Product focus",
                value:
                  "Condensing gas tankless, including models with integrated recirculation. Also produces combi boilers.",
                meta: <SourceNote source="Manufacturer product literature" checked="7 Aug 2026" />,
              },
              {
                label: "Homeowner positioning",
                value:
                  "Navien directs homeowners to professional installation and operates a contractor and service locator.",
                meta: <SourceNote source="Manufacturer homeowner resources" checked="7 Aug 2026" />,
              },
              {
                label: "Warranty terms",
                value: (
                  <div className="flex flex-wrap items-center gap-2">
                    <RebateStatus state="verify" />
                    <span>Varies by model, component, registration and installation type.</span>
                  </div>
                ),
                meta: (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    We will not publish a single figure such as &ldquo;15 years&rdquo;.
                    Warranty is a model-level fact with conditions attached, and a
                    homeowner who relies on a blanket number can lose coverage on a
                    technicality. Ask for the warranty document for the exact model quoted.
                  </p>
                ),
              },
              {
                label: "Current model lines",
                value: (
                  <div className="flex flex-wrap items-center gap-2">
                    <RebateStatus state="verify" />
                    <span>Not yet confirmed against current manufacturer documentation.</span>
                  </div>
                ),
              },
              {
                label: "Installer programme",
                value: (
                  <div className="flex flex-wrap items-center gap-2">
                    <RebateStatus state="verify" />
                    <span>
                      Navien operates contractor programmes. We have not verified which
                      local companies hold which status.
                    </span>
                  </div>
                ),
                meta: (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    We will never describe an installer as authorised or certified until
                    that status is confirmed in the manufacturer&rsquo;s own directory.
                  </p>
                ),
              },
              {
                label: "Local service coverage, Modesto",
                value: (
                  <div className="flex flex-wrap items-center gap-2">
                    <RebateStatus state="verify" />
                    <span>Being researched.</span>
                  </div>
                ),
                meta: (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    The most important field on this page. The best unit on paper is the
                    wrong purchase if nobody within thirty miles services it properly.
                  </p>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Ask your installer these before committing to the brand</h2>
            <ul>
              <li>How many of these have you installed in the last year?</li>
              <li>Who services it when it throws a code, you or someone else?</li>
              <li>Are parts held locally, or ordered in?</li>
              <li>What does the warranty require me to do to keep it valid?</li>
              <li>Would you put this brand in your own house, and why?</li>
            </ul>
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
