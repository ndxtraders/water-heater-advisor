import { NextResponse } from "next/server";
import { z } from "zod";

import { notifyLead } from "@/lib/server/notify";
import { hashIp, logSubmission, overLimit } from "@/lib/server/rate-limit";
import { serviceClient } from "@/lib/server/supabase";

export const runtime = "nodejs";

/**
 * Written only when someone explicitly asks to be introduced to an installer.
 *
 * This route takes the opposite posture to /api/quiz-session on failure. A
 * missing configuration is a hard error the homeowner sees, because a silently
 * dropped lead is worse than a visible one: they walk away believing a call is
 * coming that never will.
 *
 * Order of operations is non-negotiable — insert first, notify second. See
 * notify.ts for why.
 */

const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

// Mirrors the database check constraints exactly. Two layers saying the same
// thing is deliberate: this one returns a readable message, the database one
// is the guarantee.
const bodySchema = z.strictObject({
  sessionId: z.string().uuid().nullable(),
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().max(320).regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/),
  phone: z.string().trim().max(40).optional(),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/),
  notes: z.string().max(5000).optional(),
  recommendationSummary: z.string().max(5000).optional(),
  urgent: z.boolean(),
  consent: z.boolean(),
  consentText: z.string().max(2000),
});

// Homeowner-facing wording. They did not do anything wrong and should not be
// shown our configuration state, but they do need to know the submission did
// not land so they can act rather than sit waiting.
const UNAVAILABLE =
  "We could not send that just now. Nothing has been lost, so please try again " +
  "in a few minutes. If it keeps failing, your recommendation above is still " +
  "yours to take straight to a contractor.";

export async function POST(req: Request) {
  const db = serviceClient();
  if (!db) {
    console.error("lead: Supabase is not configured — lead NOT saved");
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That did not arrive in a form we could read. Please try again." },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please check the name, email and ZIP code fields — one of them did not " +
          "look right to us.",
      },
      { status: 400 },
    );
  }
  const input = parsed.data;
  const ipHash = hashIp(req);

  if (await overLimit(db, ipHash, "lead")) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "That is more requests than we can accept from one connection in an hour. " +
          "If this is a mistake, email us directly.",
      },
      { status: 429 },
    );
  }

  // A double-click must look like success to the homeowner and must not produce
  // a second row — otherwise Rev calls the same person twice.
  const since = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
  const { data: dupe, error: dupeError } = await db
    .from("leads")
    .select("id")
    .eq("email", input.email)
    .eq("zip", input.zip)
    .gte("created_at", since)
    .limit(1)
    .maybeSingle();

  if (dupeError) {
    // Fail open: a broken dedupe check must not stop a real submission. The
    // cost of being wrong here is one duplicate row, not a lost lead.
    console.error("lead dedupe check failed", dupeError.message);
  } else if (dupe) {
    return NextResponse.json({ ok: true });
  }

  const { data, error } = await db
    .from("leads")
    .insert({
      session_id: input.sessionId,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone || null,
      zip: input.zip,
      notes: input.notes || null,
      recommendation_summary: input.recommendationSummary || null,
      contact_consent: input.consent,
      // The exact wording consented to, stored alongside the timestamp. A bare
      // boolean is not defensible if consent is ever challenged.
      consent_text: input.consentText,
      consent_at: input.consent ? new Date().toISOString() : null,
      urgent: input.urgent,
      ip_hash: ipHash,
    })
    .select("id")
    .single();

  if (error) {
    console.error("lead insert failed", error.message);
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 500 });
  }

  await logSubmission(db, ipHash, "lead");

  // The lead is durable from here. Everything below is best-effort and cannot
  // change what the homeowner sees.
  const leadId = data!.id as string;
  let leadScore: number | null = null;
  let recommendedTech: string | null = null;
  if (input.sessionId) {
    const { data: session } = await db
      .from("quiz_sessions")
      .select("lead_score, recommended_tech")
      .eq("id", input.sessionId)
      .maybeSingle();
    leadScore = (session?.lead_score as number | null) ?? null;
    recommendedTech = (session?.recommended_tech as string | null) ?? null;
  }

  await notifyLead({
    id: leadId,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone || null,
    zip: input.zip,
    urgent: input.urgent,
    leadScore,
    recommendedTech,
    recommendationSummary: input.recommendationSummary ?? null,
    notes: input.notes ?? null,
    consentText: input.consentText,
    consentAt: input.consent ? new Date().toISOString() : null,
  });

  return NextResponse.json({ ok: true });
}
