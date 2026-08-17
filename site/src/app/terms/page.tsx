import type { Metadata } from "next";

import { Container, Prose, Section } from "@/components/common/Layout";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "What Water Heater Advisor is, what it is not, and the limits of the guidance " +
    "it gives.",
};

/**
 * Terms of use.
 *
 * The substantive part is the first section: we are not a contractor, we do not
 * perform or contract for the work, and you hire and pay the installer directly.
 * That is a CSLB positioning statement as much as a legal one, and it is the
 * reason this page exists rather than being a formality.
 *
 * NOT REVIEWED BY COUNSEL. See the note at the foot of the page.
 */
const UPDATED = "7 August 2026";

export default function TermsPage() {
  return (
    <>
      <Section className="pb-0 pt-12 sm:pb-0 sm:pt-16">
        <Container width="narrow">
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">Terms</h1>
          <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-navy">
            Last updated {UPDATED}.
          </p>
        </Container>
      </Section>

      <Section className="pt-12">
        <Container width="narrow">
          <Prose>
            <h2>We are not a plumbing contractor</h2>
            <p>
              Water Heater Advisor is an independent information and referral service. We
              do not install, repair or service water heaters, we do not hold a
              contractor&rsquo;s licence, and we do not hold ourselves out as able to
              perform construction work.
            </p>
            <p>
              We do not quote construction work, negotiate your installation agreement on
              anyone&rsquo;s behalf, or take payment for the work itself. You contract
              directly with a licensed contractor and you pay that contractor directly.
              Their licence, their insurance, their warranty, their work.
            </p>

            <h2>Guidance, not a specification</h2>
            <p>
              Our recommendations are produced from the answers you give us and from
              modelled assumptions about your local conditions. They are a well-informed
              starting point for a conversation with a contractor. They are not a
              site survey, an engineering specification, or a substitute for someone
              looking at your actual gas line, panel and venting.
            </p>
            <p>
              Prices we show are ranges and planning tools, not quotes, and nobody is
              bound by them. Rebate and code information is checked on the date shown next
              to it and can change without notice.
            </p>

            <h2>How we are paid</h2>
            <p>
              Installers pay us a share of work that completes. That payment can affect
              which qualified installer we introduce you to. It does not affect what we
              recommend, and the two are separated in how the site is built rather than
              only in what we say. There is a fuller explanation on our methodology page.
            </p>

            <h2>Choosing and using a contractor</h2>
            <p>
              An introduction is not an endorsement, a guarantee of workmanship, or a
              warranty of any kind. Verify any contractor&rsquo;s licence with the CSLB
              before work begins, satisfy yourself about their insurance, and get the
              scope in writing. Our installer guide explains what to check.
            </p>
            <p>
              Any dispute about the work itself is between you and the contractor.
            </p>

            <h2>Safety</h2>
            <p>
              Nothing on this site is instructions to do gas, electrical or plumbing work
              yourself. If you smell gas, leave the building and call your gas utility
              from outside.
            </p>

            <h2>Changes</h2>
            <p>
              We update these terms as the service changes, and the date at the top tells
              you when we last did.
            </p>

            <hr />

            <p>
              <em>
                These terms describe how the service currently works and have not yet been
                reviewed by counsel. Where they turn out to be wrong, the actual law wins
                and we will correct the page.
              </em>
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
