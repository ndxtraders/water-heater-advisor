import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Recommendation } from "@/lib/quiz/engine";
import type { Answers } from "@/lib/quiz/questions";

/**
 * Supabase access.
 *
 * The anon key is public by design — it ships to the browser and anyone can
 * read it out of the bundle. Everything that keeps data safe lives in the row
 * level security policies in `supabase/schema.sql`, where the anon role has
 * insert and nothing else. Do not add a select policy to make a dashboard
 * easier; build the dashboard server side with the service role instead.
 */
let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Missing config is not fatal. The quiz is useful with or without a backend,
  // and a homeowner should never lose their recommendation because an
  // environment variable is absent.
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

/**
 * Record a completed quiz, anonymously, the moment results render.
 *
 * Written before any contact capture and containing no personal data. This is
 * what makes the drop-off funnel measurable: how many people reach a
 * recommendation, and how many of those go on to ask for an installer. Without
 * it the only visible number is submissions, which cannot distinguish a quiz
 * nobody finishes from one that finishes but does not convert.
 */
export async function recordSession(
  answers: Answers,
  rec: Recommendation,
): Promise<string | null> {
  const db = supabase();
  if (!db) return null;

  const { data, error } = await db
    .from("quiz_sessions")
    .insert({
      answers,
      zip: answers.zip ?? null,
      status: answers.status ?? null,
      current_type: answers.current ?? null,
      fuel: answers.fuel ?? null,
      timeline: answers.timeline ?? null,
      budget_band: answers.budget ?? null,
      owner_status: answers.owner ?? null,
      recommended_tech: rec.primary.id,
      alternative_tech: rec.alternative?.id ?? null,
      ruled_out: rec.ruledOut,
      confidence: rec.confidence,
      lead_score: rec.score,
      routing_category: rec.category,
      completed: true,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    })
    .select("id")
    .single();

  if (error) {
    // Never surface this. The recommendation on screen is the thing the
    // homeowner came for and it is already correct.
    console.error("session insert failed", error.message);
    return null;
  }
  return data?.id ?? null;
}

export interface LeadInput {
  sessionId: string | null;
  fullName: string;
  email: string;
  phone?: string;
  zip: string;
  notes?: string;
  consent: boolean;
  consentText: string;
}

/** Written only when someone explicitly asks to be introduced to an installer. */
export async function submitLead(input: LeadInput): Promise<{ ok: boolean; error?: string }> {
  const db = supabase();
  if (!db) return { ok: false, error: "Lead capture is not configured yet." };

  const { error } = await db.from("leads").insert({
    session_id: input.sessionId,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone || null,
    zip: input.zip,
    notes: input.notes || null,
    contact_consent: input.consent,
    // The exact wording consented to, stored alongside the timestamp. A bare
    // boolean is not defensible if consent is ever challenged.
    consent_text: input.consentText,
    consent_at: input.consent ? new Date().toISOString() : null,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
