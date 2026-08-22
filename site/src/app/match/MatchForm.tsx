"use client";

import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { Callout } from "@/components/advisor/Panels";
import { Card, Container, Section } from "@/components/common/Layout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { submitLead } from "@/lib/leads";
import { recommend } from "@/lib/quiz/engine";
import { clearHandoff, readHandoffOnce } from "@/lib/quiz/handoff";
import { cn } from "@/lib/utils";

/**
 * The exact wording the homeowner agrees to, stored verbatim alongside the
 * timestamp.
 *
 * A boolean `consent = true` is not defensible if consent is ever challenged,
 * because it does not record what was actually agreed. This string is written
 * into `leads.consent_text`, so if the wording changes later, old records still
 * carry the version their owner actually saw.
 *
 * Note what it does not do: it does not bundle consent with anything else, it
 * names one installer rather than a vague list of "partners", and it says
 * outright that agreeing is optional.
 */
export const CONSENT_TEXT =
  "I agree that Water Heater Advisor may share the details above with one local " +
  "installer, and that the installer may contact me by phone, text or email about " +
  "this project. I understand this is not required to keep my recommendation, and " +
  "that message and data rates may apply.";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/* Stable module-level callbacks for useSyncExternalStore. Inline arrows would be
   new identities on every render, which defeats the point. */
const subscribeNever = () => () => {};
const readNullOnServer = () => null;
const isTrue = () => true;
const isFalse = () => false;

export default function MatchForm() {
  // sessionStorage is an external store, so it is read through
  // useSyncExternalStore rather than an effect that calls setState. Reading it
  // in an effect worked, but it triggered a cascading render on every mount and
  // React rightly complains about it.
  //
  // Nothing ever writes to the store while this page is open, so the subscribe
  // function is a no-op. The server snapshot is null, which is also what an
  // unmounted client looks like, hence the separate `mounted` flag below to
  // avoid flashing the "we do not have your answers" warning during hydration.
  const handoff = useSyncExternalStore(subscribeNever, readHandoffOnce, readNullOnServer);
  const mounted = useSyncExternalStore(subscribeNever, isTrue, isFalse);
  const loaded = mounted;

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Prefilled from the quiz, overridden the moment the homeowner types. Derived
  // rather than an effect, so there is no state to synchronise.
  const [zipEdited, setZipEdited] = useState<string | null>(null);
  const zip = zipEdited ?? handoff?.answers.zip ?? "";
  const setZip = (v: string) => setZipEdited(v);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const rec = useMemo(
    () => (handoff ? recommend(handoff.answers) : null),
    [handoff],
  );

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const zipOk = /^\d{5}$/.test(zip);
  // Consent is deliberately NOT part of this. It authorises passing details to
  // an installer, and requiring it to submit meant everybody still deciding -
  // most people researching a purchase - left no trace and got nothing back.
  // They asked for their recommendation; that is reason enough to accept the
  // form.
  const canSubmit = fullName.trim().length > 1 && emailOk && zipOk && !busy;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError(null);

    // A readable snapshot travels with the lead. When the session row was
    // written it holds the structured version, but the contractor-facing
    // summary should survive even if that link is missing.
    //
    // This deliberately no longer folds the homeowner's own notes into the
    // summary. Composed into one string the two can never be separated again,
    // and what the homeowner said in their own words is the more valuable half.
    // The route stores them in two columns and recombines them for the email.
    const summary = rec
      ? [
          `Recommended: ${rec.primary.name}`,
          `Size: ${rec.sizing}`,
          `Range: ${usd(rec.costRange[0])} to ${usd(rec.costRange[1])}`,
          `Category: ${rec.category}`,
          `Lead score: ${rec.score}`,
          rec.ruledOut.length
            ? `Ruled out: ${rec.ruledOut.map((r) => r.technology).join(", ")}`
            : null,
        ]
          .filter(Boolean)
          .join("\n")
      : undefined;

    const result = await submitLead({
      sessionId: handoff?.sessionId ?? null,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      zip,
      notes: notes.trim() || undefined,
      recommendationSummary: summary,
      // Drives the urgent-lead SMS. The engine sets this for the no-hot-water
      // and leaking-tank paths.
      urgent: rec?.urgent ?? false,
      consent,
      consentText: CONSENT_TEXT,
    });

    setBusy(false);
    if (!result.ok) {
      setError(
        result.error ??
          "Something went wrong sending that. Please try again in a moment.",
      );
      return;
    }
    clearHandoff();
    setDone(true);
  }

  if (done) {
    return (
      <Section className="pt-12 sm:pt-16">
        <Container width="narrow">
          <Card className="sm:p-8">
            <CheckCircle2
              aria-hidden
              className="size-10 text-verdict-fit"
              strokeWidth={2}
            />
            <h1 className="mt-5 text-3xl">Check your email</h1>
            <p className="mt-4 leading-relaxed text-foreground">
              Your recommendation is on its way to{" "}
              <strong className="font-semibold">{email.trim()}</strong>, from Water Heater
              Advisor. It has the system, the size, the expected cost and the questions
              worth asking before you sign anything.
            </p>
            {/* Gmail files most first-contact mail under Promotions, and a new
                sending domain lands in spam often enough that saying so is more
                use than a polished sentence that leaves them waiting. */}
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If it is not there in a few minutes, check your <strong>Promotions</strong>{" "}
              tab, then <strong>Spam</strong> and <strong>Trash</strong>. It sometimes
              lands in one of those the first time. Marking it &ldquo;not spam&rdquo;
              means anything we send later reaches you properly.
            </p>
            {consent ? (
              <p className="mt-4 leading-relaxed text-foreground">
                You also asked for an installer introduction. We will look at your
                answers and put you in touch with one contractor who does this specific
                work, within one working day.
              </p>
            ) : (
              <p className="mt-4 leading-relaxed text-muted-foreground">
                You did not ask for an installer, so we have not passed your details to
                anyone. The recommendation is yours to take to any contractor you like.
                That was the point of it.
              </p>
            )}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/installers/how-to-choose" size="lg">
                How to check a contractor
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/" variant="secondary" size="lg">
                Back to the guides
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-12 sm:pt-16">
      <Container width="narrow">
        <h1 className="text-4xl leading-[1.1] sm:text-[2.75rem]">
          Get your recommendation by email
        </h1>
        <div aria-hidden className="mt-5 h-1 w-14 rounded-full bg-blue" />
        <p className="mt-6 max-w-measure text-lg leading-relaxed text-navy">
          We will send you everything above in writing, plus the questions worth asking
          before you sign anything. If you also want an introduction to one local
          installer, tick the box. That part is optional.
        </p>

        {/* Showing exactly what gets sent, before it is sent. Every lead site in
            this category hides this, and hiding it is why homeowners assume the
            worst about all of them. */}
        {loaded && rec ? (
          <Card className="mt-9 sm:p-7">
            <h2 className="text-xl">What we will send you</h2>
            <p className="mt-2 text-[0.9375rem] text-muted-foreground">
              Taken from your answers. If you ask for an installer introduction, this is
              also exactly what they receive - it is why a contractor can give you a
              useful number instead of asking you everything again.
            </p>
            <dl className="mt-5 space-y-3 border-t border-border pt-5">
              {[
                ["Recommended system", rec.primary.name],
                ["Suggested size", rec.sizing],
                [
                  "Expected range",
                  `${usd(rec.costRange[0])} to ${usd(rec.costRange[1])}`,
                ],
                ["Installer type needed", rec.installerType],
                rec.ruledOut.length
                  ? [
                      "Already ruled out",
                      rec.ruledOut.map((r) => r.technology).join(", "),
                    ]
                  : null,
              ]
                .filter(Boolean)
                .map((row) => {
                  const [label, value] = row as [string, string];
                  return (
                    <div key={label} className="sm:flex sm:gap-6">
                      <dt className="text-sm font-medium text-muted-foreground sm:w-44 sm:shrink-0">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-[0.9375rem] sm:mt-0">{value}</dd>
                    </div>
                  );
                })}
            </dl>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              We do not send anyone anything you have not seen here.
            </p>
          </Card>
        ) : null}

        {loaded && !rec ? (
          <Callout title="We do not have your answers" tone="warn">
            <p>
              It looks like you came here directly, or the tab was reopened. You can still
              leave your details and we will follow up, but the two minute check makes the
              introduction far more useful.{" "}
              <Link href="/quiz" className="text-blue underline underline-offset-4">
                Run it first
              </Link>
              .
            </p>
          </Callout>
        ) : null}

        <form onSubmit={onSubmit} className="mt-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="name"
              label="Your name"
              value={fullName}
              onChange={setName}
              autoComplete="name"
              required
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
              invalid={email.length > 3 && !emailOk}
              hint={email.length > 3 && !emailOk ? "That does not look right" : undefined}
            />
            <Field
              id="phone"
              label="Phone"
              type="tel"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
              hint="Optional, but it is how most installers prefer to reach you"
            />
            <Field
              id="zip"
              label="ZIP code"
              value={zip}
              onChange={(v) => setZip(v.replace(/\D/g, "").slice(0, 5))}
              autoComplete="postal-code"
              inputMode="numeric"
              required
            />
          </div>

          <div className="mt-5">
            <label htmlFor="notes" className="block text-sm font-medium">
              Anything else worth knowing?
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Access, timing, something unusual about the install. Optional.
            </p>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-[0.9375rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright"
            />
          </div>

          {/* Unchecked by default, and the full wording is visible rather than
              hidden behind a link. Pre-ticking this would not be consent.
              Leaving it unticked is a complete, valid submission - they get
              their recommendation and nobody calls them. */}
          <div className="mt-7 rounded-xl border border-border bg-tint p-5">
            <p className="mb-3 text-sm font-medium">Optional: want an installer too?</p>
            <label className="flex cursor-pointer gap-3.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-5 shrink-0 rounded border-input accent-blue"
              />
              <span className="text-[0.9375rem] leading-relaxed">{CONSENT_TEXT}</span>
            </label>
            <p className="mt-3 pl-9 text-xs leading-relaxed text-muted-foreground">
              We store the date you agreed and this exact wording. See our{" "}
              <Link href="/privacy" className="text-blue underline underline-offset-4">
                privacy policy
              </Link>{" "}
              for what we keep and how to have it deleted.
            </p>
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-flag-red/30 bg-verdict-unfit-bg px-4 py-3 text-[0.9375rem] text-foreground"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-7">
            <Button type="submit" size="lg" disabled={!canSubmit}>
              {busy ? "Sending…" : "Send my recommendation"}
              {!busy ? <ArrowRight aria-hidden className="size-4" /> : null}
            </Button>
          </div>

          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            We are paid by the installer we introduce you to. That is how this is free, and
            it does not change what we recommended.
          </p>
        </form>
      </Container>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  hint,
  invalid,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  invalid?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? null : (
          <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-2 min-h-12 w-full rounded-lg border bg-card px-4 text-[0.9375rem]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright",
          invalid ? "border-flag-red" : "border-input",
        )}
        {...rest}
      />
      {hint ? (
        <p
          id={`${id}-hint`}
          className={cn(
            "mt-1.5 text-xs",
            invalid ? "text-flag-red" : "text-muted-foreground",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
