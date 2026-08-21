import type { Metadata } from "next";
import {
  ArrowRight,
  Flame,
  MapPin,
  Snowflake,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { HeroSplit, TrustBar } from "@/components/advisor/Hero";
import { HeroQuizStart } from "@/components/advisor/HeroQuizStart";
import { TechnologyCard } from "@/components/advisor/Panels";
import { CheckedStamp, RebateStatus, SourceNote } from "@/components/advisor/Status";
import {
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { SiteSchema } from "@/components/common/SiteSchema";

const TECHNOLOGIES = [
  {
    name: "Gas storage tank",
    icon: Flame,
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
    icon: Wind,
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
    icon: Snowflake,
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
    icon: Zap,
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
    title: "Answer fifteen questions",
    body: "Your current setup, your household, where the unit lives, and what you actually care about. Two minutes.",
  },
  {
    title: "Get a real recommendation",
    body: "A system type and size, what it should cost in a house like yours, the rebates worth chasing, and what we ruled out.",
  },
  {
    title: "Then, if you want it, an installer",
    body: "We introduce you to one local contractor who does that specific work. Not four of them calling you at dinner.",
  },
];

/**
 * Hero copy.
 *
 * Kept as named constants because these three strings carry more weight than
 * anything else on the site and get revised on their own schedule. SUBHEADING
 * is a placeholder pending Rev's final wording.
 */
const HERO_TAGLINE = "Your trusted source for expert, local water heater advice";

const HERO_HEADING = "Which water heater is right for your home?";

// Deliberately one short line. The long version pushed the quiz card below the
// fold on phones, and the tagline above plus the card's own footnote already
// carry the trust and no-contact-required claims. This line only has to make
// the next action obvious.
const HERO_SUBHEADING =
  "Answer a few simple questions and get personalized recommendations in 2 minutes.";

/**
 * The homepage needs its own canonical like every other route.
 *
 * It cannot be inherited from the root layout: a canonical set there would be
 * inherited by every page that does not override it, pointing the whole site at
 * "/". So each route declares its own, resolved against `metadataBase`.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteSchema />
      <HeroSplit
        tagline={HERO_TAGLINE}
        heading={HERO_HEADING}
        subheading={HERO_SUBHEADING}
        aside={<HeroQuizStart />}
      />

      <TrustBar />

      {/* How it works */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            eyebrow="How this works"
            title="Recommendation first. Contact details later, and only if you want them."
            lead="Every lead site in this category collects your phone number and then figures out what to tell you. We think that is backwards, and it is why their advice is worthless."
          />
          <ol className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full">
                  {/* The steps are a real sequence, so the number carries
                      information and stays. What went is the icon chip beside
                      it: two anchors competing for the same corner, one of them
                      a 20%-opacity numeral that was decoration pretending to be
                      structure. One anchor, at full contrast, small. */}
                  <span className="apparatus text-sm font-semibold text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl">{step.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </Card>
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
            title="What kind of water heating makes sense for your house?"
            lead="Four options cover almost every home, and the best answer depends on your home and current situation."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {TECHNOLOGIES.map((tech) => (
              <TechnologyCard key={tech.name} {...tech} />
            ))}
          </div>
        </Container>
      </Section>

      {/* The contrarian position, on a dark band so it lands as the turn in the
          page rather than another equal-weight section. */}
      <Section tone="dark">
        <Container width="narrow">
          {/* The old hero headline, relocated. It is a strong line but it is an
              argument about us, which makes it the wrong thing to meet a
              homeowner with at the door and the right thing to hit them with
              once they are invested. */}
          <SectionHeading
            eyebrow="Where we differ"
            tone="dark"
            title="Almost every water heater recommendation you read comes from someone who profits from the answer"
            lead="We do not install anything, so we have nothing to gain from talking you into the expensive option. Every plumber with a dedicated tankless page has an economic reason to emphasise the benefits. If your household uses modest amounts of hot water, your gas line needs upsizing and venting is awkward, the payback maths does not work, and we will say so."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl text-white">The number nobody quotes you</h3>
            <p className="mt-3 leading-relaxed text-white/70">
              A tankless unit is often the cheapest line on a tankless quote. Gas line
              work, venting, a dedicated circuit and condensate routing regularly add more
              than the appliance costs. That is why a national average price is close to
              useless, and why we itemise the job instead of publishing one figure.
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink href="/water-heaters/tankless/not-right-for-you" variant="onDark" size="lg">
              When tankless is the wrong call
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Local proof */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Modesto, California"
                eyebrowIcon={MapPin}
                title="Your utility changes the recommendation"
                lead="Not the city. The utility. A Modesto home on MID and a Turlock home fifteen miles away sit in different rebate territories, which can move a heat pump from marginal to obvious. Any page that treats a metro as one market is guessing."
              />
              <ButtonLink href="/local/california/modesto" variant="secondary" size="lg">
                Modesto rebates, permits and prices
              </ButtonLink>
            </div>

            <Card className="p-6 sm:p-7">
              <div className="mb-5">
                <CheckedStamp date="7 Aug 2026" />
              </div>
              <ul className="space-y-4 text-[0.9375rem]">
                <li className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <span>Turlock Irrigation District, heat pump</span>
                  <span className="flex items-center gap-2.5">
                    <span className="tabular font-bold">$1,000</span>
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
            </Card>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="tint">
        <Container width="narrow" className="text-center">
          <SectionHeading
            align="center"
            title="Find out what your house needs"
            lead="Fifteen questions. You get the recommendation, the likely cost range and the rebates worth chasing before we ask for a single contact detail."
          />
          <div className="flex justify-center">
            <ButtonLink href="/quiz" size="lg">
              Start the two minute check
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Not ready?{" "}
            <Link href="/compare/tank-vs-tankless" className="text-blue underline underline-offset-4">
              Read the comparison first
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
