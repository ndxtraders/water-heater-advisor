"use client";

import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { QUESTIONS } from "@/lib/quiz/questions";
import { cn } from "@/lib/utils";

const Q1 = QUESTIONS[0];

/**
 * Question one, live in the hero.
 *
 * This is the "you are in the right place" signal. A contractor site earns that
 * with a photograph of a van and a crew; we have neither, and faking one would
 * imply we perform the work. What we have instead is the quiz, so the quiz is
 * what goes above the fold — not a button promising a quiz.
 *
 * Answering here navigates to /quiz with the answer already in the URL, so the
 * homeowner lands on question two rather than repeating themselves. One click
 * removed from the funnel, and the first interaction happens before any page
 * transition.
 */
export function HeroQuizStart() {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  function choose(value: string) {
    setPending(value);
    router.push(`/quiz?status=${encodeURIComponent(value)}`);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_12px_40px_-12px_rgba(11,33,67,0.22)] sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-blue">
          Start here
        </span>
        <span className="tabular text-xs font-medium text-muted-foreground">
          Question 1 of 15
        </span>
      </div>

      {/* Progress is at 0 deliberately. Showing a filled first segment before
          they have answered anything is the dark-pattern version of this. */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full w-0 rounded-full bg-blue" />
      </div>

      <h2 className="text-xl leading-snug sm:text-[1.375rem]">{Q1.prompt}</h2>

      <div className="mt-5 space-y-2">
        {(Q1.options ?? []).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => choose(opt.value)}
            disabled={pending !== null}
            className={cn(
              "group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright",
              "disabled:opacity-60",
              pending === opt.value
                ? "border-blue bg-blue/5"
                : "border-input bg-card hover:border-blue/60 hover:bg-tint",
            )}
          >
            <span className="text-[0.9375rem] font-medium">{opt.label}</span>
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground/50 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-blue"
            />
          </button>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        Free, and no contact details until you have seen your recommendation.
      </p>
    </div>
  );
}
