"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { RuledOut, VerdictCard } from "@/components/advisor/Verdict";
import { Callout } from "@/components/advisor/Panels";
import { AirVolumeDiagram } from "@/components/advisor/AirVolumeDiagram";
import { IdentifyDiagram } from "@/components/advisor/IdentifyDiagram";
import { Container } from "@/components/common/Layout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { recordSession } from "@/lib/leads";
import { saveHandoff } from "@/lib/quiz/handoff";
import { PRICE_MODEL } from "@/lib/pricing";
import { recommend } from "@/lib/quiz/engine";
import { activeQuestions, QUESTIONS, type Answers } from "@/lib/quiz/questions";
import { cn } from "@/lib/utils";

export default function QuizFlow() {
  // The homepage hero renders question one inline and sends the answer through
  // in the URL. Seeding from it means a homeowner who has already answered does
  // not get asked the same thing again on arrival.
  const params = useSearchParams();
  const seeded = params.get("status");
  const validSeed =
    seeded && (QUESTIONS[0].options ?? []).some((o) => o.value === seeded) ? seeded : null;

  const [answers, setAnswers] = useState<Answers>(
    validSeed ? { status: validSeed } : {},
  );
  const [step, setStep] = useState(validSeed ? 1 : 0);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The active list shrinks the moment someone reports a failed or leaking
  // heater, so it is recomputed each render rather than fixed at mount.
  const questions = activeQuestions(answers);
  const question = questions[Math.min(step, questions.length - 1)];
  const total = questions.length;

  // Focus moves to the new question heading on each step so keyboard and screen
  // reader users are not stranded where the previous answer button used to be.
  //
  // Two details matter. `preventScroll` stops the browser scrolling the heading
  // under the sticky header, and the window is reset to the top explicitly
  // instead. And the first render is skipped — grabbing focus on page load
  // would yank a visitor who is still reading the intro.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, done]);

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    const remaining = activeQuestions(next);
    if (step + 1 >= remaining.length) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) return <Results answers={answers} onRestart={restart} headingRef={headingRef} />;

  return (
    <Container width="narrow" className="py-12 sm:py-16">
      <Progress step={step} total={total} />

      <div className="mt-10">
        <p className="tabular mb-3 text-sm font-medium text-blue">
          Question {step + 1} of {total}
        </p>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl leading-tight outline-none sm:text-[2.125rem]"
        >
          {question.prompt}
        </h1>

        {/* Telling the homeowner why we are asking is not decoration. People
            answer more accurately when the question has a visible purpose, and
            it previews the reasoning that shows up in the result. */}
        <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-muted-foreground">
          {question.why}
        </p>

        {question.kind === "zip" ? (
          <ZipStep initial={answers.zip ?? ""} onSubmit={choose} />
        ) : (
        <div className="mt-8 space-y-3">
          {(question.options ?? []).map((opt) => {
            const selected = answers[question.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(opt.value)}
                className={cn(
                  "flex w-full min-h-14 flex-col justify-center rounded-lg border px-5 py-3.5 text-left",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright",
                  selected
                    ? "border-blue bg-blue/5"
                    : "border-input bg-card hover:border-blue/50 hover:bg-muted/40",
                )}
              >
                <span className="text-[1.0625rem] font-medium">{opt.label}</span>
                {opt.hint ? (
                  <span className="mt-0.5 text-sm text-muted-foreground">{opt.hint}</span>
                ) : null}
              </button>
            );
          })}
        </div>
        )}

        {/* Only on the question that has an "I am not sure" option doing real
            damage: the type answer drives more of the engine than any other,
            and an unsure answer widens every cost range downstream. */}
        {question.id === "current" ? <IdentifyDiagram /> : null}

        {/* Location looks like bookkeeping and is the most consequential answer
            after the technology itself — an interior closet eliminates heat pump
            outright in the engine. Worth showing why before they answer. */}
        {question.id === "location" ? <AirVolumeDiagram /> : null}

        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
        ) : null}
      </div>
    </Container>
  );
}

/**
 * The one free-text step. Validated to five digits client side because a
 * malformed postcode silently breaks utility lookup, which is the entire reason
 * the question exists.
 */
function ZipStep({
  initial,
  onSubmit,
}: {
  initial: string;
  onSubmit: (v: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const valid = /^\d{5}$/.test(value);

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(value);
      }}
    >
      <label htmlFor="zip" className="sr-only">
        ZIP code
      </label>
      <input
        id="zip"
        name="zip"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
        placeholder="95350"
        className="tabular w-full max-w-[12rem] rounded-lg border border-input bg-card px-5 py-3.5 text-2xl tracking-widest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright"
      />
      <div className="mt-6">
        <Button type="submit" size="lg" disabled={!valid}>
          Continue
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </form>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Question ${step + 1} of ${total}`}
        className="h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-blue transition-[width] duration-250 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* Politely announced so screen reader users get progress without the
          visual bar. */}
      <p aria-live="polite" className="sr-only">
        Question {step + 1} of {total}
      </p>
    </div>
  );
}

function Results({
  answers,
  onRestart,
  headingRef,
}: {
  answers: Answers;
  onRestart: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const r = recommend(answers);
  const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
  const model = PRICE_MODEL[r.primary.id];

  // Record the completed quiz anonymously, once, as the results render. This is
  // what makes drop-off measurable — how many people reach a recommendation
  // versus how many go on to ask for an installer. A failure here is swallowed
  // on purpose: the homeowner came for what is on screen, and it is already
  // correct whether or not the write succeeded.
  const recorded = useRef(false);
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    // Hand the answers to /match immediately, so the introduction carries the
    // recommendation even if the session write never lands.
    saveHandoff(answers, null);
    void recordSession(answers, r).then((sessionId) => {
      if (sessionId) saveHandoff(answers, sessionId);
    });
  }, [answers, r]);

  return (
    <Container width="narrow" className="py-12 sm:py-16">
      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue">
        Your result
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl leading-tight outline-none sm:text-[2.125rem]"
      >
        {r.urgent
          ? "Here is what we would do in your situation"
          : "Here is what makes sense for your home"}
      </h1>
      <p className="mt-3 max-w-measure leading-relaxed text-muted-foreground">
        Based on what you told us. Nothing here is a sales pitch, and we have not asked
        for your contact details.
      </p>

      <div className="mt-10 space-y-6">
        <VerdictCard
          verdict="fit"
          technology={r.primary.name}
          summary={r.summary}
          confidence={r.confidence}
          detail={[
            { label: "Suggested size", value: r.sizing },
            { label: "Typical installed range", value: `${usd(r.costRange[0])} to ${usd(r.costRange[1])}` },
            { label: "Installer you need", value: r.installerType },
          ]}
        >
          {r.primary.reasons.length > 1 ? (
            <ul className="space-y-2 border-t border-border pt-5">
              {r.primary.reasons.slice(1).map((reason) => (
                <li key={reason} className="flex gap-2.5 text-[0.9375rem] text-foreground">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-verdict-fit" />
                  {reason}
                </li>
              ))}
            </ul>
          ) : null}
        </VerdictCard>

        {r.alternative ? (
          <VerdictCard
            verdict="alternative"
            technology={r.alternative.name}
            summary={
              r.alternative.reasons[0] ??
              "A defensible second choice if the recommendation above does not suit you."
            }
          />
        ) : null}

        {r.ruledOut.length ? <RuledOut items={r.ruledOut} /> : null}

        {/* The portable half of the cost advice. The absolute range above is
            Modesto-specific; this works anywhere, because the homeowner can
            price the equipment themselves and what they cannot work out is
            everything that gets added to it. */}
        <section className="rounded-lg border border-border bg-card p-6 sm:p-7">
          <h2 className="text-xl">How to sanity check any quote you are given</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
            Look up what the unit itself sells for, then apply the trade&rsquo;s own rule
            of thumb: installed comes out at{" "}
            <strong className="font-semibold text-foreground">{model.ruleOfThumb}</strong>.
            Contractors price roughly a third materials, a third labour, a third overhead
            and profit, which is where that lands.
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            Expect {model.hours}. What the extra buys:
          </p>
          <ul className="mt-3 space-y-2">
            {model.includes.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-blue"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
            A quote much below that usually has something left out rather than being a
            better deal. Ask which of the items above is not included.
          </p>
        </section>

        {/* Naming the gap rather than quietly downgrading the recommendation.
            A homeowner who finds out later that the site steered them cheap
            because of one budget answer has every reason to distrust the rest. */}
        {r.budgetGap ? (
          <Callout title="This costs more than the budget you gave" tone="warn">
            <p>
              You said up to {usd(r.budgetGap.ceiling)}, and this option realistically
              starts around {usd(r.budgetGap.floor)}. We are still showing it because it
              is what suits your home. Two things worth knowing: most installers here
              offer financing, and the alternative shown above is the honest cheaper
              answer if the number is firm.
            </p>
          </Callout>
        ) : null}

        {/* Honouring the brand answer without letting it override feasibility.
            Silently dropping what someone told us would be its own small
            dishonesty, and the alternatives list makes the note useful rather
            than just a refusal. */}
        {r.brandNote ? (
          <Callout title={`${r.brandNote.brandName} does not make this type`}>
            <p>
              You told us you were leaning toward {r.brandNote.brandName}, and we have not
              ignored that. They do not currently make a {r.primary.name.toLowerCase()} for
              homes, so sticking with the brand would mean choosing a system that suits
              your house less well.
              {r.brandNote.alternatives.length > 0 ? (
                <>
                  {" "}
                  Brands that do make one include{" "}
                  {r.brandNote.alternatives.slice(0, 4).join(", ")}.
                </>
              ) : null}{" "}
              If the brand matters more to you than the type, say so when you talk to an
              installer and ask them to price both.
            </p>
          </Callout>
        ) : null}

        {r.needsOwner ? (
          <Callout title="You will need the owner involved">
            <p>
              A water heater replacement needs a permit pulled by the property owner, so
              a landlord has to authorise this. Everything above is still worth having.
              Sending it to them is usually a faster route to a new heater than asking
              for one without it.
            </p>
          </Callout>
        ) : null}

        {r.confidence === "Low" ? (
          <Callout title="We are less certain than usual here" tone="warn">
            <p>
              A few of your answers were unknowns, or the top two options came out close.
              That is normal. An installer can settle it on site in about ten minutes, and
              you should treat the range above as wider than usual.
            </p>
          </Callout>
        ) : null}

        {/* Brand comes last and stays a shortlist, never a winner. The research
            is explicit that the evidence does not support ranking these six on
            reliability, and installed price is driven by the house rather than
            the badge. */}
        {r.brandFits.length > 0 ? (
          <section className="rounded-lg border border-border bg-card p-6 sm:p-7">
            <h2 className="text-xl">Brands worth shortlisting for this job</h2>
            <p className="mt-2 text-[0.9375rem] text-muted-foreground">
              Not a ranking, and not the most important decision you are making. These
              suit your particular situation for the reasons given.
            </p>
            <ul className="mt-5 space-y-5">
              {r.brandFits.map((b) => (
                <li key={b.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
                  <h3 className="text-lg">{b.name}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {b.reasons.map((reason) => (
                      <li
                        key={reason}
                        className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-verdict-fit"
                        />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  {b.caution ? (
                    <p className="mt-2.5 flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      <span
                        aria-hidden
                        className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-verdict-alt"
                      />
                      {b.caution}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              We do not rank these brands on reliability, because the public evidence does
              not support it. Who services them near you is the more useful question, and
              it is worth asking your installer directly.
            </p>
          </section>
        ) : null}

        <section className="rounded-lg border border-border bg-card p-6 sm:p-7">
          <h2 className="text-xl">Before you accept a quote</h2>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            Ask every contractor these. The answers separate a real quote from a number
            on the back of a card.
          </p>
          <ol className="mt-5 space-y-3">
            {r.questionsToAsk.map((q, i) => (
              <li key={q} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                <span className="tabular mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ol>

          {r.watchFor.length ? (
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-base">Watch for</h3>
              <ul className="mt-3 space-y-2">
                {r.watchFor.map((w) => (
                  <li key={w} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-verdict-alt" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* Contact capture comes last and stays optional. The homeowner has
            already received everything above for free, which is the entire
            reason this lead is worth more than a form fill. */}
        <section className="rounded-lg border border-blue/30 bg-blue/[0.04] p-6 sm:p-8">
          <h2 className="text-2xl">Want an installer who does this specific work?</h2>
          <p className="mt-3 max-w-measure leading-relaxed text-foreground">
            We will introduce you to one local contractor suited to this job. One, not
            four. You keep everything above either way.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/match" size="lg">
              Introduce me to an installer
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <Button variant="secondary" size="lg" onClick={onRestart}>
              <RotateCcw aria-hidden className="size-4" />
              Start over
            </Button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            We are paid by the installer we introduce you to. That is how this is free.
            It does not change what we recommended above.
          </p>
        </section>
      </div>
    </Container>
  );
}
