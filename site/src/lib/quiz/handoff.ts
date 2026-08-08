import type { Answers } from "./questions";

const KEY = "wha.quiz.v1";

export interface Handoff {
  answers: Answers;
  /** Row id from quiz_sessions, when Supabase is configured. */
  sessionId: string | null;
  savedAt: number;
}

/**
 * Carries the completed quiz from the results page to /match.
 *
 * sessionStorage rather than a query string: the answer set is too long for a
 * URL and putting a homeowner's household details in one would leak them into
 * browser history, referrer headers and any analytics that logs full URLs.
 *
 * Only the raw answers are stored. The recommendation is deterministic, so
 * /match recomputes it rather than trusting a copy that could have been edited
 * in devtools.
 *
 * sessionStorage also means it dies with the tab, which is the right lifetime
 * for household data belonging to someone who has not yet asked us to contact
 * them.
 */
export function saveHandoff(answers: Answers, sessionId: string | null): void {
  if (typeof window === "undefined") return;
  try {
    const payload: Handoff = { answers, sessionId, savedAt: Date.now() };
    window.sessionStorage.setItem(KEY, JSON.stringify(payload));
    invalidateHandoffCache();
  } catch {
    // Private browsing and full quotas both throw here. Losing the handoff
    // degrades /match to a plain form, which is survivable.
  }
}

export function loadHandoff(): Handoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Handoff;
    if (!parsed?.answers) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Referentially stable read, for `useSyncExternalStore`.
 *
 * `getSnapshot` must return the same object identity between renders or React
 * loops forever, and `loadHandoff` parses fresh JSON every call. The value is
 * written once by the quiz and never changes within a page view, so caching it
 * for the lifetime of the module is safe.
 */
let cached: Handoff | null | undefined;

export function readHandoffOnce(): Handoff | null {
  if (cached === undefined) cached = loadHandoff();
  return cached;
}

/** Reset the cache too, so a resubmission does not resurrect a cleared handoff. */
export function invalidateHandoffCache(): void {
  cached = undefined;
}

export function clearHandoff(): void {
  invalidateHandoffCache();
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* nothing useful to do */
  }
}
