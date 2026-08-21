import type { Metadata } from "next";
import Link from "next/link";

import { CostBreakdown } from "@/components/advisor/Cost";
import { Callout, DecisionPath, LocalDataPanel } from "@/components/advisor/Panels";
import { CheckedStamp, RebateStatus, SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import {
  DAILY_DRAW_GALLONS,
  EFFICIENCY,
  TURLOCK_RATES,
  annualFuelCost,
  usdRange,
} from "@/lib/energy";
import { TURLOCK, meanInletF } from "@/lib/market";
import type { TechId } from "@/lib/quiz/engine";

export const metadata: Metadata = {
  title: "Water heaters in Turlock, California",
  description:
    "Turlock runs on TID electricity and PG&E gas, so the gas versus electric question " +
    "has a real local answer. Rates, rebates, permits and water conditions, each with a source.",
};

const CHECKED = "20 Aug 2026";

export default function TurlockPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Local rules" />
          <div className="mt-8">
            <Eyebrow>Turlock, California</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              Your electricity and your gas come from two different companies
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Turlock Irrigation District sells you the power. PG&amp;E sells you the gas.
              Neither one prices against the other, and that is what makes the gas versus
              electric question answerable here instead of a matter of opinion. Both
              published rates are below, inside the sum, with every assumption shown.
            </p>
            <div className="mt-6">
              <CheckedStamp date={CHECKED} />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        The fuel comparison leads the page rather than the rebate list.

        Every local page in this category opens with rebates because rebates are
        the easiest thing to look up. The arithmetic below is the thing a
        homeowner cannot do for themselves, and it is the only section on this
        site that could not be written for any other city.
      */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="What a year of hot water costs to buy"
            lead="One house, one household's worth of hot water, four ways of making it. The only things changing from row to row are the technology and the price of the fuel it runs on."
          />

          <FuelTable />

          <Prose className="mt-10">
            <h3>The three things this table says</h3>

            <p>
              <strong>The heat pump wins, and by less than the category advertises.</strong>{" "}
              Against a standard gas tank it saves somewhere around $290 to $330 a year.
              That is real money and it is not a fortune. On fuel alone it does not pay
              back a four thousand dollar job quickly, which means the TID rebate below is
              doing more work in the first few years than the efficiency is. Anyone
              selling you a heat pump on energy savings alone has not done this division.
            </p>

            <p>
              <strong>Electric on its own is not the cheaper fuel here.</strong> Swap a gas
              tank for a plain resistance electric tank in Turlock and at the bottom TID
              tier you break about even, while at the top tier you are roughly $130 a year
              worse off than the tank you replaced. When people say electrification saves
              money, the saving is coming from the efficiency of the heat pump rather than
              from the price of TID electricity.
            </p>

            <p>
              <strong>Tankless saves about $156 a year on gas.</strong> A tank to tankless
              conversion costs a few thousand dollars more than a straight tank swap, so
              do that division before you commit. Tankless earns its price on endless hot
              water and on the floor space it gives back. In Turlock it does not earn its
              price on the gas bill.{" "}
              <Link href="/water-heaters/tankless/not-right-for-you">
                We have a whole page on when tankless is the wrong buy
              </Link>
              , and this is the local number behind it.
            </p>
          </Prose>

          <Callout title="What this model does not include">
            <p>
              Standby losses beyond what the efficiency ratings already capture, the
              effect of a cold garage on a heat pump in January, recirculation losses, and
              the fixed monthly customer charge, which you pay whether or not you heat
              water with that fuel. It also assumes the federal test procedure&rsquo;s
              medium draw of {DAILY_DRAW_GALLONS} gallons a day. Use half that much hot
              water and every figure above halves with you. The order of the rows does not
              move. The gaps between them do.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Rebates. Turlock is the strongest rebate position on the site so far. */}
      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="Rebates, and the conditions nobody prints"
            lead="Two live programmes from one utility, which is the best position of any market we cover. The amounts are easy to find anywhere. The qualifying conditions are where homeowners get caught, so they are here as well."
          />

          <div className="space-y-4">
            <IncentiveRow
              name="TID rebate, ENERGY STAR heat pump water heater"
              detail="The standard programme, open to a qualifying heat pump replacement. Read the conditions below before you count on it, because two of them disqualify a good number of houses."
              amount="$500"
              state="active"
              source="Turlock Irrigation District residential rebate programme"
            />
            <IncentiveRow
              name="TID rebate, gas or propane converted to heat pump"
              detail="For a qualifying conversion away from gas or propane, and the largest single incentive available in Turlock. TID wants the contractor invoice to document two specific things: that the gas or propane connection was removed or capped, and that the electric connection was installed. Agree that wording with your installer before the work starts, because a finished job with a vague invoice turns into a $1,000 argument."
              amount="$1,000"
              state="active"
              source="Turlock Irrigation District gas-to-electric rebate application"
            />
            <IncentiveRow
              name="California HEEHRA, single family"
              detail="Fully reserved statewide. Northern California projects that were not approved are being waitlisted against funding that may or may not appear. Articles still describing this as money you can apply for today are out of date."
              state="reserved"
              source="California HEEHRA programme status"
            />
            <IncentiveRow
              name="TECH Clean California, single family heat pump water heater"
              detail="Also fully reserved and not taking new reservations."
              state="reserved"
              source="TECH Clean California programme status"
            />
            <IncentiveRow
              name="Federal 25C energy efficient home improvement credit"
              detail="Cannot be claimed for property placed in service after 31 December 2025. A great deal of water heater writing still quotes the old 30 percent figure as though it were current."
              state="expired"
              source="IRS guidance on the Energy Efficient Home Improvement Credit"
            />
            <IncentiveRow
              name="GoGreen Home financing"
              detail="Financing rather than a rebate, so it lowers the monthly cost rather than the price. TID customers can take part because the programme was extended to customers of publicly owned utilities. We have not confirmed current rates or eligibility ourselves."
              state="verify"
              source="GoGreen Home programme, California"
            />
          </div>

          <Callout title="Four conditions on the TID heat pump rebates" tone="warn">
            <p>
              The unit has to be ENERGY STAR certified, it has to carry an efficiency
              factor of at least 2.0, it has to have a first hour rating of at least 50
              gallons, and it has to be installed outside conditioned living space, which
              in most Turlock houses means the garage. That last one is the condition that
              catches people, because a water heater sitting in a hallway cupboard inside
              the insulated envelope does not qualify where it stands.
            </p>
            <p className="mt-4">
              TID also asks for the application within six months of purchase, funds it
              first come first served, and reserves the right to change the programme
              without notice. We have not confirmed whether the $500 and the $1,000 can be
              claimed together on one job, so do not build a budget on the assumption that
              they stack. Ask TID directly.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Water. The best local finding in the research, and the reason we publish
          a range where every competing page publishes an average. */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            title="Why we will not print one hardness number for Turlock"
            lead="There is no single Turlock water. The city blends two supplies, and the difference between them is large enough to change what your installer should be telling you about maintenance."
          />

          <Prose>
            <p>
              Turlock draws from fifteen active wells and also buys treated surface water
              originating on the Tuolumne River through the Stanislaus Regional Water
              Authority. Those two supplies are not similar. In the city&rsquo;s 2025
              testing, groundwater total hardness ran from{" "}
              <strong>26.2 to 154 ppm as calcium carbonate</strong>, and dissolved solids
              measured 237 ppm in the groundwater against 35 ppm in the surface supply.
            </p>
            <p>
              Average those groundwater readings and you get 89 ppm, which is a number we
              could put in a headline and which would be true of almost nobody. A house at
              154 ppm and a house at 26 ppm are not being given the same advice about a
              tankless heat exchanger. So the honest version is the range, plus the
              question that actually resolves it.
            </p>
            <p>
              The city says the same thing in its own words: hardness varies with geology
              and groundwater conditions, and hard water causes scale in water heaters,
              pipes and appliances. If you are weighing tankless, this is the local fact
              that sets your descaling interval, and a house at the 154 ppm end of that
              range does not get the same maintenance schedule as one at 26.2 ppm. The
              people who can settle it for your address are your water provider and an
              installer who works your street.
            </p>
          </Prose>
          <SourceNote
            source="City of Turlock 2025 annual water quality report"
            checked={CHECKED}
          />

          <div className="mt-9">
            <ButtonLink href="/quiz" size="lg">
              Tell us your postcode and we will use the right numbers
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading title="Local conditions that change the recommendation" />
          <LocalDataPanel
            title="Turlock market record"
            rows={[
              {
                label: "Electric utility",
                value:
                  "Turlock Irrigation District, a publicly owned not-for-profit utility. Winter billing runs December through May, summer runs June through November, and the tier you land in depends on what the rest of the house is drawing.",
                meta: (
                  <SourceNote
                    source="TID 2026 residential rate schedule"
                    checked={CHECKED}
                  />
                ),
              },
              {
                label: "Gas utility",
                value:
                  "PG&E. The January 2026 bundled residential average was $2.784 per therm for a non-CARE household and $2.205 for a CARE household. Gas commodity prices move, so treat this as a figure with a date on it rather than a constant.",
                meta: <SourceNote source="PG&E residential gas rates" checked={CHECKED} />,
              },
              {
                label: "Permits",
                value:
                  "The City of Turlock states that replacing a water heater requires a building permit. We have not found a current fixed permit fee we would stand behind, so we are not publishing one. Ask Building and Safety, or ask your contractor to show you the line on the quote.",
                meta: (
                  <SourceNote source="City of Turlock Building and Safety" checked={CHECKED} />
                ),
              },
              {
                label: "Building code",
                value:
                  "Turlock lists the 2025 California Residential, Electrical, Mechanical, Plumbing and Energy Codes as enacted. A conversion pulls in more of that list than a swap does, because it adds electrical, gas, venting or mechanical work that all has to meet current code.",
                meta: <SourceNote source="City of Turlock adopted codes" checked={CHECKED} />,
              },
              {
                label: "Climate zone",
                value:
                  "California Climate Zone 12, hot and dry through the summer. That helps a heat pump, which pulls its heat out of the surrounding air and works better the warmer that air is. A garage in Turlock is close to the ideal spot for one, provided it has the air volume, the electrical capacity and somewhere for the condensate to go.",
                meta: <SourceNote source="City of Turlock, California Energy Code" checked={CHECKED} />,
              },
              {
                label: "Incoming water temperature",
                value: `Modelled at ${TURLOCK.climate.winterInletF}°F in winter and ${TURLOCK.climate.summerInletF}°F in summer, inherited from our Modesto record. This is an assumption, not a measurement, and it matters because tankless sizing depends on it directly. One reading from the water provider would settle it.`,
                meta: (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Status: modelled, not measured. Stated here rather than buried because
                    it changes which unit is the right size.
                  </p>
                ),
              },
              {
                label: "Water hardness",
                value:
                  "26.2 to 154 ppm across the city's groundwater wells, with surface water from the Stanislaus Regional Water Authority materially softer. Varies by service area, so it is a postcode question rather than a city question.",
                meta: (
                  <SourceNote
                    source="City of Turlock 2025 annual water quality report"
                    checked={CHECKED}
                  />
                ),
              },
            ]}
          />
        </Container>
      </Section>

      {/*
        Cost, explicitly marked as regional rather than local.

        research/LOCAL-PRICE-OBSERVATIONS.md is the authority for every price on
        this site and it holds no Turlock observation. Reusing the Modesto
        figures silently under a Turlock heading is exactly the failure that file
        exists to prevent, so the borrowing is stated at the top of the section.
      */}
      <Section>
        <Container width="narrow">
          <SectionHeading
            title="What a Turlock job costs, with a caveat we would rather you read first"
            lead="These ranges come from Stanislaus County contractor pricing collected around Modesto, fifteen miles up the road. We have not yet collected a first-party quote inside Turlock. They are the right order of magnitude and they are not a Turlock observation, and we would rather tell you that than let a borrowed number wear a local badge."
          />

          <CostBreakdown
            title="Gas tank replacement, like for like"
            lines={[
              {
                label: "Water heater unit",
                low: 950,
                high: 2200,
                condition: "Entry level 40 gallon up to a premium contractor line",
              },
              { label: "Installation labour", low: 650, high: 1300 },
              { label: "Permit and inspection", low: 150, high: 400 },
              {
                label: "Code compliance items",
                low: 150,
                high: 500,
                condition: "Expansion tank, seismic strapping, relief discharge, drain pan",
              },
              { label: "Haul away of the old unit", low: 50, high: 150 },
              {
                label: "Venting corrections",
                low: 300,
                high: 900,
                condition: "If the existing flue does not meet current code",
                optional: true,
              },
            ]}
            note="Most of the spread sits in the first line. An entry level 40 gallon unit and a premium contractor channel model are the same job to install and roughly $1,200 apart to buy."
          />
          <SourceNote
            source="Stanislaus County contractor pricing, collected around Modesto. No Turlock first-party observation yet"
            checked={CHECKED}
          />

          <div className="mt-10">
            <CostBreakdown
              title="Gas tank converted to a heat pump water heater"
              lines={[
                { label: "Heat pump unit", low: 1600, high: 3200 },
                { label: "Installation labour", low: 900, high: 2000 },
                { label: "Permit and inspection", low: 150, high: 400 },
                {
                  label: "Dedicated 240V circuit",
                  low: 400,
                  high: 1800,
                  condition: "Distance to the panel drives this more than anything else",
                  optional: true,
                },
                {
                  label: "Electrical panel upgrade",
                  low: 1500,
                  high: 4000,
                  condition: "Only if the panel has no capacity left",
                  optional: true,
                },
                {
                  label: "Condensate routing",
                  low: 150,
                  high: 600,
                  condition: "A heat pump makes water and it has to go somewhere",
                  optional: true,
                },
                {
                  label: "Capping the gas line",
                  low: 100,
                  high: 400,
                  condition: "Required, and documented, if you are claiming the TID $1,000",
                },
              ]}
              note="The panel line is the whole story on a conversion. Two identical houses on the same street land thousands apart on it, and it is the first thing to have an installer check, because it decides whether the TID rebate makes this an easy decision or a marginal one."
            />
          </div>
          <SourceNote
            source="Modelled from line items and regional pricing. Not a Turlock observation"
            checked={CHECKED}
          />

          {/*
            The synthesis, and the reason the page exists.

            Everything above is an input. A homeowner reading a fuel table and
            two cost tables still has to do the division themselves, and most
            will not. Placed here rather than earlier because it needs both the
            rebate and the job costs already on the page.
          */}
          <Prose className="mt-12">
            <h3>Putting the two together, which is where it gets interesting</h3>
            <p>
              Take the required lines from both tables above. Replacing the gas tank runs
              about <strong>$1,950 to $4,550</strong>. Converting to a heat pump runs about{" "}
              <strong>$2,750 to $6,000</strong>. So the conversion costs somewhere around
              $800 to $1,450 more than the thing you were going to buy anyway.
            </p>
            <p>
              Then apply the TID $1,000. That lands the heat pump between roughly two
              hundred dollars cheaper and four hundred and fifty dollars dearer than
              replacing the gas tank. On a straightforward job the rebate very nearly
              cancels the price difference, and the $300 a year that follows is close to
              free money.
            </p>
            <p>
              That is the good case, and it depends entirely on one thing: whether the
              electrical is already there. Add a dedicated 240V circuit at $400 to $1,800
              and the payback stretches to roughly three to seven years. Add a panel
              upgrade at $1,500 to $4,000 on top of that and it runs from about six years
              out to twenty, and twenty years is most of the unit&rsquo;s life. Same
              house, same rebate, same rates, and a completely different answer.
            </p>
            <p>
              So the thing to check first is your electrical panel: what capacity it has
              left, and how far it sits from the garage. That single answer settles this
              decision more reliably than any comparison of the two technologies. Get an
              installer to look at it before you get attached to either option, and read{" "}
              <Link href="/compare/tank-vs-tankless">our tank versus tankless comparison</Link>{" "}
              if a third option is still on your list.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <Prose>
            <h2>Getting a permit in Turlock</h2>
            <p>
              The City is unambiguous about this. Replacing a water heater requires a
              building permit. That is not a formality invented by conscientious
              contractors, it is how an inspection catches seismic strapping, the
              temperature and pressure relief discharge, venting and combustion air, which
              are the items that hurt somebody when they are wrong.
            </p>
            <p>
              A conversion pulls in more than a swap does. Moving from gas to a heat pump
              adds electrical work and condensate routing. Moving from a tank to tankless
              adds venting, gas capacity and usually electrical. All of it has to meet the
              2025 code Turlock has adopted, and all of it is easier to get right the first
              time than to correct at inspection.
            </p>
            <p>
              If a contractor tells you a permit is unnecessary for a like for like swap,
              treat that as information about the contractor.
            </p>
            <p>
              What we will not do is stand in for the Building Department. Anything that
              needs a code interpretation for your particular house is a question for them
              and for a licensed contractor who has seen it.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Find the right system for my Turlock home
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Fifteen miles north the answer changes, because the utility changes.{" "}
            <Link
              href="/local/california/modesto"
              className="text-blue underline underline-offset-4"
            >
              See the Modesto page
            </Link>{" "}
            for that market, and note that a slice of eastern Modesto sits inside TID
            territory and gets the rebates on this page rather than the ones on that one.
          </p>
        </Container>
      </Section>
    </>
  );
}

/**
 * The fuel comparison.
 *
 * Kept in this file rather than lifted into `components/advisor` because
 * Turlock is the only market with both published rates in hand. It moves out
 * when a second market earns it.
 */
const ROWS: { id: TechId; name: string }[] = [
  { id: "gas-tank", name: "Gas storage tank" },
  { id: "gas-tankless", name: "Gas tankless, condensing" },
  { id: "electric-tank", name: "Electric resistance tank" },
  { id: "heat-pump", name: "Heat pump water heater" },
];

function FuelTable() {
  return (
    <div data-print="keep" className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-5 sm:px-6">
        <h3 className="text-xl">Yearly fuel cost, Turlock rates</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {/* Cents, because that is the unit TID publishes and $0.1338 makes a
              reader count decimal places to compare two numbers. */}
          {TURLOCK_RATES.electricUtility} electricity at{" "}
          {(TURLOCK_RATES.kWh[0] * 100).toFixed(2)}¢ to{" "}
          {(TURLOCK_RATES.kWh[1] * 100).toFixed(2)}¢ per kWh.{" "}
          {TURLOCK_RATES.gasUtility} gas at ${TURLOCK_RATES.therm.toFixed(3)} per therm.
        </p>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Estimated yearly fuel cost by water heater technology at Turlock rates
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-3 pl-4 pr-3 text-sm font-medium text-muted-foreground sm:pl-6">
              Technology
            </th>
            <th scope="col" className="py-3 pr-3 text-right text-sm font-medium text-muted-foreground">
              Energy bought
            </th>
            <th scope="col" className="py-3 pr-4 text-right text-sm font-medium text-muted-foreground sm:pr-6">
              Cost a year
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ id, name }) => {
            const cost = annualFuelCost(id, TURLOCK);
            return (
              <tr key={id} className="border-b border-border/70 last:border-0">
                <th scope="row" className="py-3.5 pl-4 pr-3 text-left font-normal align-top sm:pl-6">
                  <span className="text-[0.9375rem]">{name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {EFFICIENCY[id].basis}. Rated {EFFICIENCY[id].uef.toFixed(2)}.
                  </span>
                </th>
                <td className="apparatus py-3.5 pr-3 text-right align-top whitespace-nowrap text-muted-foreground">
                  {cost.purchased}
                </td>
                <td className="apparatus py-3.5 pr-4 text-right align-top whitespace-nowrap font-semibold sm:pr-6">
                  {usdRange(cost.range)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
        The electric rows carry a range because TID prices in tiers and water heating is a
        marginal load stacked on top of whatever else the house is drawing. A Central
        Valley home running air conditioning through a July afternoon is already past the
        cheap tiers before the water heater switches on. The gas row is a single figure
        because we hold one published bundled average, which is a weaker piece of evidence
        and is shown as it is rather than dressed up as a range. Assumes{" "}
        {DAILY_DRAW_GALLONS} gallons a day at {TURLOCK_RATES.setpointF}°F against a{" "}
        {meanInletF(TURLOCK)}°F yearly mean incoming temperature, and a non-CARE gas
        household. On CARE, read every gas figure here as roughly a fifth lower, which
        narrows the gap to the heat pump without closing it.
      </p>
    </div>
  );
}

function IncentiveRow({
  name,
  detail,
  amount,
  state,
  source,
}: {
  name: string;
  detail: string;
  amount?: string;
  state: "active" | "reserved" | "expired" | "verify";
  source: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-md text-lg leading-snug">{name}</h3>
        <div className="flex items-center gap-3">
          {amount ? <span className="tabular text-lg font-semibold">{amount}</span> : null}
          <RebateStatus state={state} />
        </div>
      </div>
      <p className="mt-2.5 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
        {detail}
      </p>
      <SourceNote source={source} checked={CHECKED} />
    </article>
  );
}
