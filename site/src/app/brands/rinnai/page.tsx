import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { RebateStatus, SourceNote } from "@/components/advisor/Status";
import { VerdictBadge } from "@/components/advisor/Verdict";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Rinnai water heaters",
  description:
    "Who Rinnai tankless and heat pump water heaters suit, where they do not, and what " +
    "to confirm with a local installer before committing to the brand.",
};

/**
 * Follows the Navien template. See that file's header for the editorial rule:
 * positioning above the fold, everything volatile in the data panel with its own
 * verification state.
 *
 * The one thing this page does that Navien's does not is publish the flow figure
 * at the local design condition next to the headline figure. Rinnai's own sizing
 * guide supplies flow by inlet temperature, which makes the gap checkable rather
 * than merely asserted, and the gap is roughly a factor of two.
 */
const CHECKED = "7 Aug 2026";

export default function RinnaiPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Brands</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">Rinnai</h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              The other name most homeowners have already heard for gas tankless, and the
              one manufacturer of the six that publishes usable flow figures at real inlet
              temperatures rather than only a headline number. Also makes heat pump water
              heaters, and says plainly that it does not make electric tankless, which
              settles a question a lot of people arrive with.
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
                <li>You are converting to gas tankless and want recirculation built in</li>
                <li>You want the flow you are buying stated at your own inlet temperature</li>
                <li>An experienced Rinnai installer works your area</li>
                <li>You are replacing an existing Rinnai unit</li>
                <li>You want one manufacturer across tankless and heat pump</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <VerdictBadge verdict="unfit" label="Look elsewhere if" />
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed">
                <li>Your retrofit geometry is awkward and connection layout matters</li>
                <li>Nobody local services the brand well</li>
                <li>You will not keep up with annual descaling</li>
                <li>You were sold on a headline flow figure you will never see</li>
                <li>A storage tank is the better technology for your house anyway</li>
              </ul>
            </div>
          </div>

          {/* The single most useful thing this page can tell a Central Valley
              homeowner, and the reason the research forbids sizing from the
              headline number. */}
          <Callout title="The 11.1 figure is not the flow you will get" tone="warn">
            <p>
              The RX199 is advertised at 11.1 gallons per minute. Rinnai&rsquo;s own sizing
              guide puts the same unit between <strong>5.2 and 6.0 GPM</strong> once the
              incoming water is somewhere in its winter range of 45°F to 55°F and you want
              it delivered at 120°F. The headline figure describes a much smaller
              temperature rise than any house here asks for in January.
            </p>
            <p className="mt-4">
              Six gallons a minute is a useful amount of hot water, roughly two showers at
              once with a little to spare. Five is closer to one shower and a sink. The
              trouble is only that neither one is eleven, and sizing a house on eleven is
              how people end up with a unit that runs cold when two taps open on a cold
              morning. Ask your installer for the flow at your design rise, in writing, and
              check they have used the cold end of the range rather than the mild one.
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
            title="The Rinnai brand record"
            rows={[
              {
                label: "Technologies made",
                value:
                  "Condensing gas tankless (SENSEI RX and RXP, plus the RUCS and RUS families), non-condensing gas tankless (RE and REP), and heat pump water heaters (REHP, 50, 65 and 80 gallon). Rinnai states it does not make electric tankless.",
                meta: <SourceNote source="Rinnai residential tankless water heater range" checked={CHECKED} />,
              },
              {
                label: "Tankless flow, by inlet temperature",
                value: (
                  <div className="space-y-2">
                    <p>
                      RX199 and RXP199 are rated 11.1 GPM at the headline condition. At a
                      120°F setpoint the same unit delivers about 5.0 GPM from 42°F
                      incoming water, 5.7 GPM from 52°F, 6.2 GPM from 57°F and 8.1 GPM
                      from 72°F.
                    </p>
                    <p className="rounded-lg border-l-2 border-verdict-alt bg-muted px-4 py-3 text-[0.9375rem]">
                      Size on the cold end of the winter range, not its middle. A unit
                      sized on the summer number runs cold in January, and a unit sized on
                      a mild January runs cold in a hard one.
                    </p>
                  </div>
                ),
                meta: <SourceNote source="Rinnai RX199iN product data and ground water sizing guide" checked={CHECKED} />,
              },
              {
                label: "Recirculation",
                value:
                  "RX is recirculation capable. RXP adds a built-in pump and Smart-Circ. On the non-condensing side, REP includes a pump and RE does not.",
                meta: <SourceNote source="Rinnai RE and REP model series" checked={CHECKED} />,
              },
              {
                label: "Warranty, RX199 residential",
                value: (
                  <div className="space-y-2">
                    <p>
                      15 years heat exchanger, 5 years parts, 1 year labour. The heat
                      exchanger term also carries a <strong>12,000 burn hour cap</strong>,
                      and whichever limit arrives first is the one that applies.
                    </p>
                    <p className="rounded-lg border-l-2 border-verdict-alt bg-muted px-4 py-3 text-[0.9375rem]">
                      A burn hour cap is not the same thing as a 15 year warranty. A large
                      household running a recirculation loop accumulates burn hours far
                      faster than a small one, so the practical term is shorter for exactly
                      the houses that use the unit hardest.
                    </p>
                  </div>
                ),
                meta: (
                  <>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Line level, not model level. Registration and promotional labour
                      extensions vary. Ask for the warranty document for the exact model
                      you are quoted.
                    </p>
                    <SourceNote source="Rinnai RX199iN warranty summary" checked={CHECKED} />
                  </>
                ),
              },
              {
                label: "Heat pump sizing and efficiency",
                value:
                  "REHP comes in 50, 65 and 80 gallon nominal sizes, rated at 46, 61 and 74 gallons, with first hour ratings of 73, 80 and 91 gallons. Published UEF runs about 3.75, 3.90 and 4.00 across the three, which is at the strong end of the current market. Runs on 208 to 240V single phase, 30A breaker, 21.5A maximum, with a 3/4 inch condensate connection.",
                meta: <SourceNote source="Rinnai REHP50, REHP65 and REHP80 product data" checked={CHECKED} />,
              },
              {
                label: "Heat pump ambient limits",
                value: (
                  <div className="flex flex-wrap items-center gap-2">
                    <RebateStatus state="verify" />
                    <span>
                      Rinnai&rsquo;s public product material and a retrieved spec sheet
                      disagreed slightly on the upper ambient limit, 109°F against 107°F.
                      Use the installation manual for the exact model rather than any
                      brand wide number, including this one.
                    </span>
                  </div>
                ),
              },
              {
                label: "Warranty, REHP residential",
                value:
                  "Product material summarises 1 year labour and 10 years parts, and the current spec sheet also identifies tank coverage at 10 years. The manual controls.",
                meta: <SourceNote source="Rinnai REHP50 product page and spec sheet" checked={CHECKED} />,
              },
              {
                label: "Installer programme",
                value:
                  "Rinnai PRO and ACE PRO. We found no blanket requirement that an installer hold either, but it is a useful serviceability signal, and Rinnai runs a public locator you can check for your own postcode.",
                meta: <SourceNote source="Rinnai Find a PRO locator" checked={CHECKED} />,
              },
              {
                label: "Local programme coverage",
                value:
                  "Rinnai's own directory listed at least one Modesto company as an ACE PRO on our check date. We are not naming it, because a directory entry is a snapshot and because a listing is not a recommendation from us. Check the locator for the current list.",
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
                  "Mixed to strong. PACE Supply publicly carries Rinnai tankless products and parts. Exact Modesto and Ripon shelf stock still needs checking.",
                meta: <SourceNote source="PACE Supply Rinnai brand listing" checked={CHECKED} />,
              },
              {
                label: "Known failure modes",
                value:
                  "Rinnai's current diagnostic guide documents Code 25 for a condensate pump error or a clogged or frozen drain. That is a description of a failure category, not evidence of how often it happens, and we will not present it as one.",
                meta: <SourceNote source="Rinnai tankless diagnostic code guide" checked={CHECKED} />,
              },
              {
                label: "Consumer financing",
                value:
                  "Available at manufacturer level, which makes Rinnai one of only two brands in our set where that is true today. Worth asking about, and worth comparing against whatever your installer offers rather than assuming the manufacturer programme is the cheaper of the two.",
                meta: <SourceNote source="Rinnai consumer financing" checked={CHECKED} />,
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
              We converted both manufacturers&rsquo; published flow tables onto one basis,
              because they are not published in the same units, and at a Central Valley
              winter the two headline models land 0.12 GPM apart.{" "}
              <Link href="/compare/navien-vs-rinnai">
                The full head to head is here
              </Link>
              , including the two different ways that shared 15 year warranty gets cut
              short.
            </p>

            <h2>Rinnai or Noritz</h2>
            <p>
              These are the two most common gas tankless shortlists in this market after
              Navien, and the research does not name an overall winner, because there
              isn&rsquo;t one. What decides it is your house rather than the badge.
            </p>
            <p>
              <strong>Rinnai</strong> when the RX or RXP meets your design flow and you
              value the recirculation feature set or a nearby service path.{" "}
              <Link href="/brands/noritz">Noritz</Link> when the retrofit geometry is the
              hard part: top mounted water connections, flex vent compatibility and
              bundled replacement kits are built for exactly that problem, and its
              Central Valley parts position is the strongest of the six.
            </p>

            <h2>Ask your installer these before committing to the brand</h2>
            <ul>
              <li>What flow does this model give at my winter inlet temperature?</li>
              <li>How many of these have you installed in the last year?</li>
              <li>Who services it when it throws a code, you or someone else?</li>
              <li>Are parts held locally, or ordered in?</li>
              <li>Does a recirculation loop change my warranty or my burn hours?</li>
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
