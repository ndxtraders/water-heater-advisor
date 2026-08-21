import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  FileText,
  Scale,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { Container, Eyebrow, Section } from "@/components/common/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatResourceDate, type ResourceArticle } from "@/lib/resources";
import { site } from "@/lib/site";

type HubTone = "urgent" | "paper" | "tint";

interface HubLink {
  href: string;
  label: string;
}

interface HubPathway {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  paragraphs: string[];
  links: HubLink[];
  tone: HubTone;
  transitionAfter?: string;
  transitionTone?: "blue" | "red";
}

const pathways: HubPathway[] = [
  {
    id: "urgent-problem",
    icon: AlertTriangle,
    label: "Urgent problem",
    title: "Do you have an urgent problem?",
    paragraphs: [
      "Water on the floor, no hot water, signs of overheating, or a concern involving gas or combustion should not begin with a shopping guide.",
      "Use the emergency guide for immediate safety steps. If the unit is still working but something has changed, start with the diagnostic guides below.",
    ],
    links: [
      { href: "/emergency", label: "Water-heater emergency guide" },
      {
        href: "/resources/running-out-of-hot-water",
        label: "Why am I running out of hot water?",
      },
    ],
    tone: "urgent",
    transitionAfter:
      "Once the immediate risk is controlled, decide whether the current system is worth keeping.",
    transitionTone: "red",
  },
  {
    id: "repair-or-replace",
    icon: Scale,
    label: "Diagnose and decide",
    title: "Should you repair it or replace it?",
    paragraphs: [
      "Age matters. It just does not decide the answer by itself.",
      "A useful decision also considers where the failure occurred, whether the tank is sound, what the warranty covers, damage exposure, and whether the current system still fits the home.",
    ],
    links: [
      {
        href: "/resources/repair-or-replace-water-heater",
        label: "Should I repair or replace my water heater?",
      },
      {
        href: "/resources/how-long-water-heaters-last",
        label: "How long do water heaters last?",
      },
      {
        href: "/resources/water-heater-failure-warning-signs",
        label: "What are the warning signs of failure?",
      },
    ],
    tone: "paper",
    transitionAfter:
      "If replacement is plausible, determine what the household needs and what the house can support.",
  },
  {
    id: "type-and-size",
    icon: BadgeCheck,
    label: "System fit",
    title: "What type and size fit your home?",
    paragraphs: [
      "Tank gallons are only part of capacity. First-hour rating and recovery matter too. Tankless sizing uses simultaneous flow and temperature rise.",
      "Start with the full sizing guide, then use the narrower explainers when one rating or technology is holding up the decision.",
    ],
    links: [
      { href: "/resources/water-heater-sizing", label: "What size water heater do I need?" },
      { href: "/resources/first-hour-rating", label: "What is first-hour rating?" },
      {
        href: "/resources/water-heater-recovery-time",
        label: "How long does a water heater take to heat up?",
      },
      { href: "/compare/tank-vs-tankless", label: "Tank versus tankless" },
      {
        href: "/water-heaters/tankless/not-right-for-you",
        label: "When tankless is not your best choice",
      },
    ],
    tone: "tint",
    transitionAfter:
      "Once the right system is clear, price the complete installed job—not just the equipment.",
  },
  {
    id: "replacement-cost",
    icon: FileText,
    label: "Cost and quotes",
    title: "What will replacement cost?",
    paragraphs: [
      "One national average will not prepare you for a real quote. Equipment is only one line item.",
      "Access, removal, permits, code corrections, venting, gas or electrical work, condensate, drains, recirculation, and service terms can change the job.",
    ],
    links: [
      {
        href: "/resources/water-heater-replacement-cost",
        label: "What does water-heater replacement cost?",
      },
      {
        href: "/resources/compare-water-heater-quotes",
        label: "How to compare water-heater quotes",
      },
      { href: "/installers/how-to-choose", label: "How to choose a water-heater installer" },
      { href: "/local", label: "Local guidance by utility territory" },
    ],
    tone: "paper",
    transitionAfter:
      "If the current system stays, protect its remaining service life and understand its maintenance needs.",
  },
  {
    id: "maintenance",
    icon: Wrench,
    label: "Own and maintain",
    title: "How do you maintain the system you own?",
    paragraphs: [
      "The exact product manual controls. General advice can explain the job, but it cannot replace model-specific instructions.",
      "High-temperature, pressure, gas, combustion, and electrical work still require the correct safety steps and qualified help where appropriate.",
    ],
    links: [
      {
        href: "/resources/water-heater-temperature",
        label: "What temperature should my water heater be set to?",
      },
      { href: "/resources/water-heater-maintenance", label: "Water-heater maintenance schedule" },
      {
        href: "/resources/how-often-flush-water-heater",
        label: "How often should you flush a water heater?",
      },
      {
        href: "/resources/water-heater-anode-rod",
        label: "What does a water-heater anode rod do?",
      },
      {
        href: "/resources/hard-water-water-heater",
        label: "Does hard water damage a water heater?",
      },
    ],
    tone: "tint",
    transitionAfter:
      "Compare technologies and brands only after fit, ownership demands, and local support are understood.",
  },
  {
    id: "compare-systems",
    icon: BookOpen,
    label: "Compare choices",
    title: "Compare systems and brands",
    paragraphs: [
      "Technology comes before brand. A well-made product is still the wrong product when its fuel, space, airflow, electrical service, venting, demand, maintenance, or local service network does not fit the house.",
    ],
    links: [
      { href: "/water-heaters", label: "Compare water-heater technologies" },
      { href: "/brands", label: "Compare water-heater brands" },
      { href: "/compare/navien-vs-rinnai", label: "Navien versus Rinnai" },
    ],
    tone: "paper",
  },
];

const panelStyles: Record<HubTone, string> = {
  urgent: "bg-card",
  paper: "bg-card",
  tint: "bg-tint",
};

const labelStyles: Record<HubTone, string> = {
  urgent: "text-flag-red",
  paper: "text-blue",
  tint: "text-blue",
};

function HubResourceLink({ link, tone }: { link: HubLink; tone: HubTone }) {
  return (
    <li className="border-t border-border/80">
      <Link
        href={link.href}
        className="group flex min-h-12 items-center justify-between gap-4 py-3 text-[0.975rem] font-semibold leading-snug text-navy underline decoration-blue/35 underline-offset-4 transition-colors hover:bg-blue/5 hover:text-blue hover:decoration-blue"
      >
        <span>{link.label}</span>
        <ArrowRight
          aria-hidden
          className={cn(
            "size-4 shrink-0 transition-transform group-hover:translate-x-0.5",
            tone === "urgent" ? "text-flag-red" : "text-blue",
          )}
        />
      </Link>
    </li>
  );
}

function DecisionPanel({ pathway }: { pathway: HubPathway }) {
  const Icon = pathway.icon;

  return (
    <article
      id={pathway.id}
      className={cn(
        "scroll-mt-24 border-y border-border p-6 sm:p-8 lg:p-10",
        panelStyles[pathway.tone],
        pathway.tone === "urgent" && "border-l-4 border-l-flag-red",
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:gap-14">
        <div>
          <header className="flex items-start gap-4">
            <span
              className={cn(
                "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-md",
                pathway.tone === "urgent"
                  ? "bg-flag-red/10 text-flag-red"
                  : "bg-blue/10 text-blue",
              )}
            >
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className={cn("apparatus text-xs font-medium uppercase tracking-[0.08em]", labelStyles[pathway.tone])}>
                {pathway.label}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl">
                {pathway.title}
              </h2>
            </div>
          </header>

          <div className="mt-5 space-y-4 leading-relaxed text-foreground">
            {pathway.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="lg:border-l lg:border-border lg:pl-10">
          {pathway.links.map((link) => (
            <HubResourceLink key={`${link.href}-${link.label}`} link={link} tone={pathway.tone} />
          ))}
        </ul>
      </div>
    </article>
  );
}

function DecisionTransition({
  children,
  tone = "blue",
}: {
  children: string;
  tone?: "blue" | "red";
}) {
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-4 px-3 py-1 sm:px-6">
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-full border bg-card",
          tone === "red"
            ? "border-flag-red/30 text-flag-red"
            : "border-blue/25 text-blue",
        )}
      >
        <ArrowDown aria-hidden className="size-4" />
      </span>
      <div>
        <p
          className={cn(
            "apparatus text-[0.7rem] font-medium uppercase tracking-[0.09em]",
            tone === "red" ? "text-flag-red" : "text-blue",
          )}
        >
          Decision shift
        </p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-navy sm:text-base">
          {children}
        </p>
      </div>
    </div>
  );
}

function ResourceBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-blue hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page">Resources</li>
      </ol>
    </nav>
  );
}

export function ResourcesHubPage({ article }: { article: ResourceArticle }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: article.title,
    description: article.description,
    url: `${site.url}${article.slug}`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Section className="pb-0 pt-10 sm:pt-14">
        <Container width="wide">
          <ResourceBreadcrumb />
          <div className="mt-8 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:items-end lg:pb-16">
            <div>
              <Eyebrow icon={BookOpen}>Homeowner library</Eyebrow>
              <h1 className="max-w-[18ch] text-4xl leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-[42rem] text-lg leading-relaxed text-navy">
                {article.description}
              </p>
            </div>

            <aside className="border-l-4 border-flag-red bg-verdict-unfit-bg p-6 sm:p-7">
              <p className="apparatus text-xs font-medium uppercase tracking-[0.08em] text-flag-red">
                Start with the right question
              </p>
              <p className="mt-3 font-heading text-2xl font-extrabold leading-tight text-foreground">
                A water-heater decision gets expensive when the wrong question comes first.
              </p>
              <p className="mt-4 leading-relaxed text-foreground">
                A leak needs a different answer than a system that runs out of hot water. A failed older tank creates a different decision than a working heater in a planned remodel.
              </p>
            </aside>
          </div>
        </Container>

        <nav aria-label="Resource decision topics" className="border-y border-border bg-card">
          <Container width="wide" className="px-0 sm:px-8">
            {/*
              Rules come from a 1px grid gap over a border-coloured background,
              not from per-cell borders.

              The previous version fought nth-child arithmetic at three
              breakpoints and lost: `lg:[&:nth-child(3n)]:border-r` and
              `lg:last:border-r-0` have equal specificity and both match cell
              six, so the strip rendered a rule hanging off its right end with
              none at its left. At 2 columns, cells two and four put borders
              exactly on the viewport edge.

              A gap only ever falls *between* cells, so this is correct at every
              column count with no cancelling classes.
            */}
            <ul className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
              {pathways.map((pathway) => (
                <li key={pathway.id} className="bg-card">
                  <a
                    href={`#${pathway.id}`}
                    className={cn(
                      "group flex h-full min-h-20 items-center justify-between gap-3 border-t-2 px-4 py-4 text-sm font-semibold text-navy transition-colors hover:bg-tint hover:text-blue sm:px-5",
                      pathway.tone === "urgent" ? "border-t-flag-red" : "border-t-blue",
                    )}
                  >
                    <span>{pathway.label}</span>
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-blue transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </Section>

      <Section tone="tint" className="py-14 sm:py-20">
        <Container width="wide">
          <header className="mb-10 max-w-3xl">
            <p className="apparatus text-xs font-medium uppercase tracking-[0.08em] text-blue">
              Decision pathways
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Start with what is happening now</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy">
              Choose the situation closest to yours. You will get the general answer first, then the household, home, and local details that can change it.
            </p>
          </header>

          <div className="space-y-7 sm:space-y-9">
            {pathways.map((pathway) => (
              <Fragment key={pathway.id}>
                <DecisionPanel pathway={pathway} />
                {pathway.transitionAfter ? (
                  <DecisionTransition tone={pathway.transitionTone}>
                    {pathway.transitionAfter}
                  </DecisionTransition>
                ) : null}
              </Fragment>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="py-14 sm:py-20">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="apparatus text-xs font-medium uppercase tracking-[0.08em] text-white/65">
                Recommendation before contact
              </p>
              <h2 className="mt-3 max-w-[22ch] text-3xl text-white sm:text-4xl">
                Get a recommendation for your home
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                These guides explain the rules. The quiz applies them to where your heater sits, peak hot-water demand, available fuel and electrical capacity, and what your household values most.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                You will receive the recommendation, size direction, cost range, ruled-out options, and installer questions before you are asked for contact information.
              </p>
            </div>
            <ButtonLink href="/quiz" size="lg" className="w-full sm:w-auto">
              Find the right system for my home
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="py-14 sm:py-20">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)]">
            <div>
              <p className="apparatus text-xs font-medium uppercase tracking-[0.08em] text-blue">
                Independent guidance
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">How this guidance is built</h2>
              <div className="mt-5 max-w-measure space-y-5 text-[1.0625rem] leading-[1.75]">
                <p>
                  Water Heater Advisor is an independent education, recommendation, and installer-matching site. It is not a plumbing company and does not perform installation or repair work.
                </p>
                <p>
                  Installer payment may affect which eligible installer receives an introduction. It never affects the system recommendation. Read{" "}
                  <Link href="/methodology" className="font-medium text-navy underline decoration-blue/35 underline-offset-4 hover:text-blue hover:decoration-blue">
                    how the recommendation works
                  </Link>
                  , including the evidence and conflicts policy.
                </p>
              </div>
            </div>

            <aside aria-labelledby="hub-review-status" className="border border-blue/20 bg-tint p-6 sm:p-7">
              <div className="flex gap-3">
                <CalendarCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
                <div>
                  <h2 id="hub-review-status" className="text-xl">Evidence and review status</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    Written by {article.author}. Sources last checked{" "}
                    <span className="apparatus">{formatResourceDate(article.lastChecked)}</span>.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    This hub organizes the published library and contains no claim of professional technical review. Each linked article carries its own sources, checked date, limitations, and review status.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
