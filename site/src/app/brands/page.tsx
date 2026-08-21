import type { Metadata } from "next";
import Link from "next/link";

import { Callout, DecisionPath } from "@/components/advisor/Panels";
import { RebateStatus, SourceNote } from "@/components/advisor/Status";
import { Container, Eyebrow, Prose, Section, SectionHeading } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import {
  BRAND_DIRECTORY,
  BRAND_NAMES,
  type BrandId,
  RESEARCH_CHECKED_AT,
  brandsMaking,
} from "@/lib/brands";
import type { TechId } from "@/lib/quiz/engine";

export const metadata: Metadata = {
  title: "Water heater brands",
  description:
    "Which brands make which technologies, what we have verified about each, and why " +
    "brand should be the last decision rather than the first.",
};

/** Ordered by how often the decision actually comes up, not alphabetically. */
const BY_TECH: { id: TechId; label: string; note: string }[] = [
  {
    id: "gas-tank",
    label: "Gas storage tank",
    note: "The volume replacement. Fewest brands, because it is the least differentiated product on this page.",
  },
  {
    id: "heat-pump",
    label: "Heat pump",
    note: "Every one of the six now makes one, which was not true a few years ago.",
  },
  {
    id: "gas-tankless",
    label: "Gas tankless",
    note: "Where brand genuinely matters most, because service coverage and descaling support vary.",
  },
  {
    id: "electric-tank",
    label: "Electric storage tank",
    note: "Usually a like-for-like replacement decision rather than a brand decision.",
  },
];

export default function BrandsHubPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <DecisionPath current="Technology" />
          <div className="mt-8">
            <Eyebrow>Brands</Eyebrow>
            <h1 className="text-4xl leading-tight sm:text-[2.75rem]">
              Brand is the last decision, not the first
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              Choosing a brand before choosing a technology is the most common expensive
              mistake in this category. If a heat pump is right for your house, the best
              tankless brand on the market is still the wrong purchase. Settle the
              technology, then let local service coverage narrow the brand, and use these
              pages for that second step rather than the first.
            </p>
          </div>
        </Container>
      </Section>

      {/*
        Grouped by technology before it is listed alphabetically.

        A plain A-to-Z of six logos invites exactly the brand-first shopping the
        page opens by arguing against. Leading with "who makes what" answers the
        question a reader can actually act on once they know their technology.
      */}
      <Section className="pt-14">
        <Container width="narrow">
          <SectionHeading
            title="Who makes what"
            lead="Worth checking before you get attached to a name. Two of the six are tankless specialists, and a preference for one of those quietly rules out a heat pump you might well be better off with."
          />

          <div className="space-y-5">
            {BY_TECH.map((tech) => {
              const makers = brandsMaking(tech.id);
              return (
                <div key={tech.id} className="rounded-lg border border-border bg-card p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg">{tech.label}</h3>
                    <p className="apparatus text-sm text-muted-foreground">
                      {makers.length} of {BRAND_DIRECTORY.length}
                    </p>
                  </div>
                  <p className="mt-1.5 max-w-measure text-sm leading-relaxed text-muted-foreground">
                    {tech.note}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {makers.map((id: BrandId) => (
                      <li
                        key={id}
                        className="rounded-full bg-muted px-3 py-1 text-sm font-medium"
                      >
                        {BRAND_NAMES[id]}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <SourceNote
            source="Water Heater Advisor brand and product research, brand technology matrix"
            checked={RESEARCH_CHECKED_AT}
          />

          <Callout title="Electric tankless is missing on purpose" tone="warn">
            <p>
              Three of the six sell one, and they are not the same product. Rheem and
              A. O. Smith both make whole-home electric tankless units. Bradford
              White&rsquo;s current KwickShot line is point-of-use, built to feed a single
              fixture, and the whole-home line it used to sell is discontinued.
            </p>
            <p className="mt-4">
              What rules all of them out of the list above is the same in each case.
              Electrical service capacity is a hard gate on this technology, and our quiz
              does not yet ask the panel and load questions that would settle it. Listing
              them beside gas tankless would imply a straight swap that a lot of Central
              Valley panels cannot carry. If somebody quotes you whole-home electric
              tankless, ask what the panel has to supply and what upgrading it costs.
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading
            title="The six brands"
            lead="Three pages are written, and all three are gas tankless brands, because that is where the research is deepest and where the brand choice genuinely changes the outcome. The other three carry research but not yet a page, and rather than link you to something that does not exist, each card says where it stands."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {BRAND_DIRECTORY.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Prose>
            <h2>What we will and will not say about a brand</h2>
            <p>
              Brand pages are the easiest place on a site like this to sound authoritative
              while saying nothing checkable, so these rules come from the research itself
              rather than from a style guide.
            </p>
            <h3>We will not call an installer authorised, certified or trained</h3>
            <p>
              Not unless that exact status appears in the manufacturer&rsquo;s own current
              directory. It is a claim about somebody else&rsquo;s business and it changes
              without notice.
            </p>
            <h3>We will not publish a blanket warranty term</h3>
            <p>
              Warranty cover varies by model line, by component, by whether the unit is
              registered, and in at least one case by whether a recirculation loop is
              controlled or uncontrolled. That last detail is worth thousands and a single
              headline number would bury it.
            </p>
            <h3>We will not rank the six on reliability</h3>
            <p>
              Brand-specific comparative failure rates are on our unverified list, and so
              are known bad production years. Nobody has the data to rank these six
              honestly, and the sites that do it anyway are guessing.
            </p>
            <h3>We will not use brand as a budget filter</h3>
            <p>
              Brand-specific installed price bands are not verified locally yet. Until they
              are, sorting brands by price would be inventing precision.
            </p>
            <p>
              Unknown is preferable to invented precision, which is the rule the whole
              dataset was built on.{" "}
              <Link href="/methodology">Our method covers the rest</Link>.
            </p>
          </Prose>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" size="lg">
              Settle the technology first
            </ButtonLink>
            <ButtonLink href="/installers/how-to-choose" variant="secondary" size="lg">
              How to choose an installer
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

const STATUS_COPY: Record<string, string> = {
  researched:
    "Researched, page not written yet. Product lines, warranty terms and service coverage are in the dataset.",
  thin:
    "Researched for specifications, but we do not yet hold enough to say when this brand is the wrong choice, which is the part worth publishing.",
};

function BrandCard({ brand }: { brand: (typeof BRAND_DIRECTORY)[number] }) {
  const published = brand.href !== null;

  return (
    <article
      className={
        published
          ? "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(11,33,67,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(11,33,67,0.16)]"
          : "relative flex flex-col rounded-2xl border border-dashed border-input bg-card/60 p-6"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl">
          {published ? (
            <Link href={brand.href!} className="after:absolute after:inset-0">
              {brand.name}
            </Link>
          ) : (
            brand.name
          )}
        </h3>
        {published ? null : <RebateStatus state="verify" />}
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {brand.makes.map((m) => (
          <li
            key={m}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {m}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
        {brand.positioning}
      </p>

      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {published
          ? "Full brand record, including warranty conditions and what we have not verified."
          : STATUS_COPY[brand.status]}
      </p>
    </article>
  );
}
