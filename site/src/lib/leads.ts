import type { Recommendation } from "@/lib/quiz/engine";
import type { Answers } from "@/lib/quiz/questions";
import { readUtm } from "@/lib/quiz/utm";

/**
 * The browser's half of the data layer.
 *
 * There is no Supabase client here and no Supabase key in the bundle. Both
 * functions post to a Next.js route handler, which writes to Postgres with the
 * service role from the server.
 *
 * That is the whole point of the arrangement. An anon key shipped to the
 * browser can be lifted out of the bundle by anyone with devtools, and while
 * row level security stops them *reading*, an insert policy of `with check
 * (true)` lets them write forever — unlimited junk rows, no rate limit, no
 * validation. Moving the write server-side removes that vector rather than
 * mitigating it, and lets the server validate, rate-limit and de-duplicate
 * before anything reaches the database.
 */

/**
 * Record a completed quiz, anonymously, the moment results render.
 *
 * Written before any contact capture and containing no personal data. This is
 * what makes the drop-off funnel measurable: how many people reach a
 * recommendation, and how many of those go on to ask for an installer.
 *
 * Returns null on any failure, and that is never surfaced. The recommendation
 * on screen is the thing the homeowner came for and it is already correct.
 */
export async function recordSession(
  answers: Answers,
  rec: Recommendation,
): Promise<string | null> {
  try {
    const res = await fetch("/api/quiz-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        // Only the fields the row stores. The full Recommendation object holds
        // rendered prose the database has no use for.
        recommendation: {
          urgent: rec.urgent,
          primaryId: rec.primary.id,
          alternativeId: rec.alternative?.id ?? null,
          ruledOut: rec.ruledOut,
          confidence: rec.confidence,
          score: rec.score,
          category: rec.category,
        },
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
        utm: readUtm(),
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { sessionId: string | null };
    return data.sessionId ?? null;
  } catch (err) {
    console.error("session record failed", err);
    return null;
  }
}

export interface LeadInput {
  sessionId: string | null;
  fullName: string;
  email: string;
  phone?: string;
  zip: string;
  /** The homeowner's own words, raw and unmixed with anything generated. */
  notes?: string;
  /** Engine-generated summary, stored in its own column. */
  recommendationSummary?: string;
  urgent: boolean;
  consent: boolean;
  consentText: string;
}

/** Written only when someone explicitly asks to be introduced to an installer. */
export async function submitLead(
  input: LeadInput,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    return data;
  } catch (err) {
    console.error("lead submit failed", err);
    return {
      ok: false,
      error:
        "We could not send that just now. Nothing has been lost, so please try again " +
        "in a few minutes. If it keeps failing, your recommendation above is still " +
        "yours to take straight to a contractor.",
    };
  }
}
