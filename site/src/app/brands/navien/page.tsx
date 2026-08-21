import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { RebateStatus, SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: { canonical: "/brands/navien" },
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
const CHECKED = "7 Aug 2026";
/** Later desk pass. See research/BRAND-VERIFICATION-2026-08-20.md. */
const VERIFIED = "20 Aug 2026";

export default function NavienPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Brands</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">Navien</h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Best known for condensing gas tankless units and for recirculation built
              into the unit rather than bolted on afterwards. Since the NWP500 line they
              also make heat pump water heaters, which matters if you assumed choosing
              Navien meant choosing tankless. A strong choice in the right house, and an
              expensive mistake in the wrong one.
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
            title="The Navien brand record"
            rows={[
              {
                label: "Technologies made",
                value:
                  "Condensing gas tankless (NPE-A2 line) and heat pump water heaters (NWP500 line, 50, 65 and 80 gallon). Also produces combi boilers.",
                meta: <SourceNote source="Navien residential water heater range" checked={CHECKED} />,
              },
              {
                label: "Tankless output",
                value:
                  "NPE-240A2 is rated 11.2 GPM at a 35°F temperature rise and 5.6 GPM at around a 67°F rise. Size against the rise your winter groundwater actually requires, not the headline figure.",
                meta: <SourceNote source="Navien NPE-240A2 product specification" checked={CHECKED} />,
              },
              {
                label: "Heat pump sizing",
                value:
                  "NWP500-65 is rated around 63 gallons with an 80 gallon first hour rating. Unducted installation needs roughly 450 cubic feet of surrounding air, and it runs on a 208 to 240V, 30A circuit.",
                meta: <SourceNote source="Navien NWP500 series specification" checked={CHECKED} />,
              },
              {
                label: "Warranty, NPE-A2 residential",
                value: (
                  <div className="space-y-2">
                    <p>
                      With standard or <strong>controlled</strong> recirculation: 15 years
                      heat exchanger, 5 years parts, 1 year labour.
                    </p>
                    <p className="rounded-lg border-l-2 border-verdict-alt bg-muted px-4 py-3 text-[0.9375rem]">
                      With <strong>uncontrolled</strong> recirculation the same line drops
                      to 5 years heat exchanger and 3 years parts. If you are adding a
                      recirculation loop, this single detail is worth thousands.
                    </p>
                  </div>
                ),
                meta: (
                  <>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Line level, not model level, and conditions attach. Navien also
                      states that internet or e-commerce purchase can void cover. Ask for
                      the warranty document for the exact model you are quoted.
                    </p>
                    <SourceNote source="Navien NPE-A2 warranty terms" checked={CHECKED} />
                  </>
                ),
              },
              {
                label: "Installer programme",
                value:
                  "Navien Service Specialist (NSS). We found no blanket requirement that an installer hold it, but it is a useful serviceability signal.",
                meta: <SourceNote source="Navien NSS programme page" checked={CHECKED} />,
              },
              {
                label: "Local programme coverage",
                value: (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <RebateStatus state="verify" />
                      <span>Not established for the Modesto area.</span>
                    </div>
                    <p>
                      Navien&rsquo;s installer list cannot be read without first agreeing
                      that Navien may share your details with installers, so we have not
                      confirmed whether any local company holds NSS. Read that as unknown
                      rather than as evidence either way. Rinnai and Noritz both publish
                      theirs openly, and both show local coverage.
                    </p>
                  </div>
                ),
                meta: (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    We will not describe any installer as authorised, certified or trained
                    unless that exact status appears in the manufacturer&rsquo;s own
                    current directory.
                  </p>
                ),
              },
              {
                label: "Parts availability, Central Valley",
                value:
                  "Mixed. PACE Supply publicly lists Navien and states it carries a large Northern California tankless and repair parts inventory. Exact Modesto and Ripon stock still needs checking.",
                meta: <SourceNote source="PACE Supply water heater solutions listing" checked={CHECKED} />,
              },
              {
                label: "Consumer financing",
                value:
                  "None at manufacturer level in the United States. Navien runs a financing programme called NaviLend, but it is a Canadian programme launched with a Canadian lender, and Navien's US rebates and credits page carries no financing at all. Articles that list Navien financing as a US homeowner benefit are reading a Canadian announcement. Any financing on your quote will be your installer's own.",
                meta: (
                  <SourceNote
                    source="Navien US rebates and credits page, and the NaviLend Canada launch announcement"
                    checked={VERIFIED}
                  />
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Navien or Rinnai</h2>
            <p>
              The comparison most people arrive wanting. Both publish a headline near 11
              GPM and both land near 6 GPM at a Central Valley winter, so the flow question
              is a dead heat and the decision sits elsewhere.{" "}
              <Link href="/compare/navien-vs-rinnai">
                We converted the numbers and laid out the rest
              </Link>
              .
            </p>

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
