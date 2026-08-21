import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  alternates: { canonical: "/brands/noritz" },
  title: "Noritz water heaters",
  description:
    "Noritz makes gas tankless and nothing else. Who that suits, where it does not, " +
    "and the retrofit details that decide the cost of a conversion.",
};

/**
 * Follows the Navien template.
 *
 * Noritz is the specialist case in the set. It makes one technology, which means
 * this page carries a harder job than the others: saying plainly that a preference
 * for Noritz rules out three of the four technologies the quiz can recommend.
 */
const CHECKED = "7 Aug 2026";
/** Later desk pass. See research/BRAND-VERIFICATION-2026-08-20.md. */
const VERIFIED = "20 Aug 2026";

export default function NoritzPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <Breadcrumb trail={[{ label: "Brands", href: "/brands" }, { label: "Noritz" }]} />
          <div className="mt-6">
            <DecisionPath current="Technology" />
          </div>
          <div className="mt-8">
            <Eyebrow>Brands</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">Noritz</h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              A specialist rather than a full range manufacturer. Noritz makes gas tankless
              and nothing else, and it has built its current line around the specific job
              of replacing a storage tank. It also holds the strongest Central Valley parts
              position of the six brands we track, which matters more than most spec sheet
              differences on the day something fails.
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
                <li>You are converting a storage tank and the pipework is awkward</li>
                <li>Local parts availability matters more to you than badge preference</li>
                <li>Your existing gas line is 1/2 inch and upsizing looks expensive</li>
                <li>You want the longest heat exchanger term in this set</li>
                <li>You are replacing an existing Noritz unit</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="unfit" label="Look elsewhere if" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>A heat pump or a storage tank is the right technology for you</li>
                <li>You want one manufacturer across several technologies</li>
                <li>You will not keep up with annual descaling</li>
                <li>You are adding a recirculation loop and want the 25 year term</li>
                <li>Your gas service genuinely cannot support a tankless unit</li>
              </ul>
            </div>
          </div>

          {/*
            The gas line point is the most decision-changing fact on this page.
            Gas line upsizing is the widest conditional line on our conversion
            cost tables at $350 to $2,000, so a unit that can work on the existing
            half-inch pipe can move the whole job.
          */}
          <Callout title="The gas line is where a conversion gets expensive" tone="warn">
            <p>
              On our cost tables, upsizing the gas line is the widest conditional item in a
              tank to tankless conversion, running anywhere from $350 to $2,000. Noritz
              states that the EZ Pro line is compatible with 1/2 inch gas pipe, subject to
              the sizing conditions in the manual.
            </p>
            <p className="mt-4">
              If that holds for your house, it removes the most unpredictable line on the
              quote. Treat it as a question to put to your installer rather than a promise
              from us: pipe length, total connected load and every other appliance on the
              same run all feed into it, and only somebody standing in your garage can do
              that sum.
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
            title="The Noritz brand record"
            rows={[
              {
                label: "Technologies made",
                value:
                  "Gas tankless only. No storage tanks, no heat pumps, no electric. If the right answer for your house is any of those, a preference for Noritz has to give way, and that is worth knowing before you get attached to the brand.",
                meta: <SourceNote source="Noritz residential product range" checked={CHECKED} />,
              },
              {
                label: "Tankless flow, by temperature rise",
                value: (
                  <div className="space-y-2">
                    <p>
                      The EZ111 is rated 11.1 GPM at a 30°F rise. At a 60°F rise the same
                      unit gives 6.5 GPM, at 70°F it gives 5.6 GPM and at 80°F it gives
                      4.9 GPM. A Central Valley winter asks for a 65°F to 75°F rise, which
                      puts it between <strong>5.3 and 6.1 GPM</strong>. The smaller EZ98
                      gives 5.7 GPM at a 60°F rise and the EZ71 gives 5.2 GPM.
                    </p>
                    <p className="rounded-lg border-l-2 border-verdict-alt bg-muted px-4 py-3 text-[0.9375rem]">
                      Note what that means across the line. At the winter design condition
                      the three models are much closer together than their headline
                      numbers suggest, so paying up the range buys less than it looks like
                      it does.
                    </p>
                  </div>
                ),
                meta: <SourceNote source="Noritz EZ Series flow data by temperature rise" checked={CHECKED} />,
              },
              {
                label: "Retrofit design",
                value:
                  "The EZ Pro line is built around tank replacement: top mounted water connections so the existing pipework can often be met where it already is, field convertible between natural gas and propane, and indoor or outdoor configurations. Venting uses 2, 3 and 4 inch PVC or CPVC and approved systems, with flex vent retrofit supported using specified kits.",
                meta: <SourceNote source="Noritz EZ Series product documentation" checked={CHECKED} />,
              },
              {
                label: "Replacement bundles",
                value:
                  "EZTR40, EZTR50 and EZTR75 package the heater with specified vent and isolation hardware, positioned against 40, 50 and 75 gallon tanks respectively. That positioning is the manufacturer's, and it is not a substitute for sizing against what your household actually draws.",
                meta: <SourceNote source="Noritz EZTR bundle documentation" checked={CHECKED} />,
              },
              {
                label: "Warranty, EZ line residential",
                value: (
                  <div className="space-y-2">
                    <p>
                      Without recirculation: <strong>25 years</strong> heat exchanger, with
                      a 15,000 burn hour cap. That is the longest heat exchanger term of
                      any line in our set.
                    </p>
                    <p className="rounded-lg border-l-2 border-verdict-alt bg-muted px-4 py-3 text-[0.9375rem]">
                      With controlled recirculation it drops to <strong>15 years</strong>{" "}
                      and a 12,000 hour cap. Adding a recirculation loop costs you ten
                      years of cover, so decide on recirculation and on the brand in the
                      same conversation rather than one after the other.
                    </p>
                    <p>Parts 5 years, labour 1 year, on both configurations.</p>
                  </div>
                ),
                meta: (
                  <>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Where a burn hour cap applies, whichever limit arrives first is the
                      one that counts. The detailed warranty document controls. Ask for the
                      one covering the exact model you are quoted.
                    </p>
                    <SourceNote source="Noritz warranty terms, EZ71, EZ98 and EZ111" checked={CHECKED} />
                  </>
                ),
              },
              {
                label: "If you want recirculation",
                value:
                  "The NRCR Pro line carries an integrated pump, and Noritz states support for a 1/2 inch loop up to 200 feet or a 3/4 inch loop up to 500 feet, subject to installation requirements. Treat it as the recirculation specific candidate rather than adding a loop to an EZ and losing the longer term.",
                meta: <SourceNote source="Noritz NRCR series documentation" checked={CHECKED} />,
              },
              {
                label: "Installer programme",
                value:
                  "PROCard Select and VIP. We found no blanket requirement that an installer hold a programme status, so treat it as a signal that the brand is serviced in an area rather than as a rule about who may fit it.",
                meta: <SourceNote source="Noritz PROCard and Contractor Finder" checked={CHECKED} />,
              },
              {
                label: "Local programme coverage",
                value:
                  "The deepest local coverage of the three tankless brands we cover. On our check date the Modesto area showed multiple installers and servicers, partner tenure labels, and at least one company carrying an explicit Noritz trained designation. Combined with the parts position below, that is the strongest argument on this page. We do not publish company names, because a directory entry is a snapshot and a listing is not a recommendation from us.",
                meta: (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    We will not describe any installer as authorised, certified or trained
                    except where that exact status appears in the manufacturer&rsquo;s own
                    current directory, and we do not introduce homeowners to companies on
                    the strength of a directory listing alone.
                  </p>
                ),
              },
              {
                label: "Parts availability, Central Valley",
                value:
                  "Strong, and the best of the six brands we track. PACE Supply in Ripon appears in the manufacturer directory, and Noritz's own support store shows active genuine parts inventory. On a brand that lives or dies on how fast a part arrives, this is the row that matters most.",
                meta: <SourceNote source="Noritz contractor directory and parts store" checked={CHECKED} />,
              },
              {
                label: "Consumer financing",
                value:
                  "None found at manufacturer level. Any payment plan on a Noritz quote will be your installer's own arrangement, so compare it on its own terms rather than treating it as a manufacturer benefit.",
                meta: <SourceNote source="Noritz public product and programme pages" checked={VERIFIED} />,
              },
              {
                label: "Known failure modes",
                value:
                  "Noritz documents Code 90 as a combustion or airflow abnormality. On a new installation it points at gas supply, venting, condensate and configuration. On an established unit it also points at dirt, maintenance and condensate blockage. Noritz itself hedges on cause, and we will not turn a diagnostic code into a reliability claim about the brand.",
                meta: <SourceNote source="Noritz Code 90 knowledge base article" checked={CHECKED} />,
              },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>Noritz or Rinnai</h2>
            <p>
              The research does not name an overall winner between these two, and neither
              will we. It splits on what the hard part of your job actually is.
            </p>
            <p>
              <strong>Noritz</strong> when the retrofit geometry is the problem: top
              mounted connections, flex vent compatibility, bundled replacement kits and
              the deepest local parts and service coverage in the set.{" "}
              <Link href="/brands/rinnai">Rinnai</Link> when the RX or RXP meets your
              design flow and the recirculation feature set or the local service path
              matters more than how the pipework lands.
            </p>
            <p>
              And if you are still deciding whether tankless is right at all, that is the
              question to settle first.{" "}
              <Link href="/water-heaters/tankless/not-right-for-you">
                We have a page arguing the other side
              </Link>
              , which is worth reading before you shortlist any brand on this page.
            </p>

            <h2>Ask your installer these before committing to the brand</h2>
            <ul>
              <li>Will this run on my existing gas line, or does it need upsizing?</li>
              <li>What flow does this model give at my winter design rise?</li>
              <li>Does my recirculation choice change the warranty term?</li>
              <li>How many of these have you installed in the last year?</li>
              <li>Are parts held locally, or ordered in?</li>
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
