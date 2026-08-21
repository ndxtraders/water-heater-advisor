import type { Metadata } from "next";

import { Callout } from "@/components/advisor/Panels";
import { Container, Prose, Section } from "@/components/common/Layout";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description:
    "What Water Heater Advisor collects, why the quiz is anonymous until you ask " +
    "for an introduction, who we share details with, and how to have data deleted.",
};

/**
 * Privacy policy.
 *
 * Written to describe what the system actually does rather than to cover every
 * eventuality, because a policy that does not match the code is worse than a
 * short one that does. Every claim here is checkable against
 * `supabase/schema.sql` and `src/lib/leads.ts`.
 *
 * NOT LEGAL ADVICE AND NOT REVIEWED BY COUNSEL. The blueprint flags California
 * referral structure, lead consent and data sharing as needing a lawyer before
 * paid routing begins. This is an honest description of current behaviour, not
 * a substitute for that review.
 */
const UPDATED = "7 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">Privacy</h1>
          <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-navy">
            Short, and accurate to what the site actually does. Last updated {UPDATED}.
          </p>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container width="narrow">
          <Prose>
            <h2>The quiz is anonymous until you ask for an introduction</h2>
            <p>
              This is the most important thing on the page, and it is a structural choice
              rather than a promise. Completed quizzes are recorded without any personal
              details: your answers, your postcode, and what we recommended. There is no
              name, email or phone attached, and we could not identify you from it.
            </p>
            <p>
              We keep that record so we can see where people drop out and whether the
              recommendations are any good. It sits in a separate table from anything
              identifiable.
            </p>

            <h2>What we collect when you do ask</h2>
            <p>
              Only on the introduction form, and only what an installer needs to contact
              you and quote sensibly:
            </p>
            <ul>
              <li>Your name, email and postcode</li>
              <li>Your phone number, if you give one. It is optional</li>
              <li>Anything you type into the notes box</li>
              <li>Your quiz answers and the recommendation they produced</li>
              <li>
                The exact consent wording you agreed to, and the date and time you agreed
              </li>
            </ul>
            <p>
              We store the consent wording verbatim rather than a yes or no, so there is
              never any question about what you actually agreed to.
            </p>

            <h2>Who we share it with</h2>
            <p>
              <strong>One local installer.</strong> Not several, not an auction, and not a
              list sold on to whoever will buy it. We are paid a percentage of work that
              completes, which means we have no reason to hand your details to four
              companies and hope.
            </p>
            <p>
              We show you exactly what will be sent before you submit it. Nothing goes
              across that you have not seen on that page.
            </p>
            <p>
              We also use a hosting provider and a database provider to run the site.
              They process data on our behalf and do not use it for anything else.
            </p>

            <h2>What we do not do</h2>
            <ul>
              <li>Sell your details to lead brokers or aggregators</li>
              <li>Share them with anyone you have not agreed to be introduced to</li>
              <li>Contact you about anything other than this project without asking</li>
              <li>Require consent in order to give you your recommendation</li>
            </ul>

            <h2>Your rights in California</h2>
            <p>
              You can ask us what we hold about you, ask us to delete it, ask us to
              correct it, and opt out of your information being shared with an installer.
              Because the anonymous quiz record and the contact record are separate,
              deleting your details is a single operation that leaves nothing identifiable
              behind.
            </p>
            <p>
              We honour Global Privacy Control signals. If your browser sends one, we
              treat it as an opt-out of sharing.
            </p>
            <p>
              To make any of these requests, email us and say what you want done. We do
              not charge for it and we will not make you create an account first.
            </p>

            <h2>How long we keep things</h2>
            <p>
              Contact records are kept while your project is live and for a reasonable
              period afterwards so we can follow up on how it went. Anonymous quiz records
              are kept indefinitely, because there is nothing in them that identifies
              anyone.
            </p>

            <h2>Cookies</h2>
            <p>
              The site does not use advertising or tracking cookies. Your quiz answers are
              held in your browser&rsquo;s session storage so they survive the step between
              the results page and the introduction form, and they are discarded when you
              close the tab.
            </p>
          </Prose>

          <Callout title="Being straight about where this stands" tone="warn">
            <p>
              This describes what the site does today and has not yet been reviewed by a
              lawyer. Whether an introduction for a fee counts as sharing under California
              law is a question we are taking advice on rather than guessing at. If that
              review changes anything here, we will update this page and say what changed.
            </p>
          </Callout>
        </Container>
      </Section>
    </>
  );
}
