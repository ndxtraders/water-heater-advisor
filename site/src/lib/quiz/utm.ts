/**
 * Campaign attribution.
 *
 * Read from the URL on first load and stashed in sessionStorage, because the
 * homeowner lands on any page and completes the quiz several navigations later
 * — by then `location.search` is long gone.
 *
 * Without this there is no way to tell which channel produced a lead, which
 * makes every future spend decision a guess.
 */
const KEY = "wha.utm.v1";

const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Utm = Partial<Record<(typeof FIELDS)[number], string>>;

/** Call on first client render. Later calls never overwrite a captured set. */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const field of FIELDS) {
      const value = params.get(field);
      // Cap the length: these end up in jsonb and arrive from a public URL.
      if (value) found[field] = value.slice(0, 200);
    }
    if (Object.keys(found).length === 0) return;

    window.sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    // Private browsing throws. Losing attribution is survivable; losing the
    // quiz is not, so this never propagates.
  }
}

export function readUtm(): Utm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Utm) : null;
  } catch {
    return null;
  }
}
