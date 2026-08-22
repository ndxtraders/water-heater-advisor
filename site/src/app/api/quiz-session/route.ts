import { NextResponse } from "next/server";
import { z } from "zod";

import { hashIp, logSubmission, overLimit } from "@/lib/server/rate-limit";
import { serviceClient } from "@/lib/server/supabase";
import { ENGINE_VERSION } from "@/lib/quiz/version";

// The service role client and node:crypto both need the Node runtime.
export const runtime = "nodejs";

/**
 * Record a completed quiz, anonymously, the moment results render.
 *
 * Written before any contact capture and containing no personal data. This is
 * what makes the drop-off funnel measurable: how many people reach a
 * recommendation, and how many of those go on to ask for an installer. Without
 * it the only visible number is submissions, which cannot distinguish a quiz
 * nobody finishes from one that finishes but does not convert.
 *
 * Every failure path here returns HTTP 200 with `sessionId: null`. A homeowner
 * must never lose their recommendation to a configuration error or a database
 * outage — what is on screen is the thing they came for and it is already
 * correct whether or not this write lands.
 */

// The real question ids, not arbitrary keys. `answers` is public input landing
// in jsonb, and accepting whatever arrives is how a 10MB payload gets stored.
const QUESTION_IDS = [
  "status", "age", "owner", "current", "fuel", "household", "bathrooms",
  "simultaneous", "location", "priority", "electrical", "brand", "zip",
  "timeline", "budget",
] as const;

const answersSchema = z.strictObject(
  Object.fromEntries(
    QUESTION_IDS.map((id) => [id, z.string().max(120).optional()]),
  ) as Record<(typeof QUESTION_IDS)[number], z.ZodOptional<z.ZodString>>,
);

const utmSchema = z.strictObject({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
});

const bodySchema = z.strictObject({
  answers: answersSchema,
  recommendation: z.strictObject({
    urgent: z.boolean(),
    primaryId: z.string().max(80),
    alternativeId: z.string().max(80).nullable().optional(),
    ruledOut: z
      .array(z.strictObject({ technology: z.string().max(120), reason: z.string().max(600) }))
      .max(20),
    confidence: z.enum(["High", "Moderate", "Low"]),
    score: z.number().int().min(0).max(100),
    category: z.string().max(80),
  }),
  referrer: z.string().max(600).nullable().optional(),
  utm: utmSchema.nullable().optional(),
});

const NO_SESSION = { sessionId: null } as const;

export async function POST(req: Request) {
  const db = serviceClient();
  if (!db) {
    console.warn("quiz-session: Supabase is not configured, session not recorded");
    return NextResponse.json(NO_SESSION);
  }

  let parsed;
  try {
    parsed = bodySchema.safeParse(await req.json());
  } catch {
    return NextResponse.json(NO_SESSION);
  }
  if (!parsed.success) {
    console.warn("quiz-session: rejected body", parsed.error.issues.slice(0, 3));
    return NextResponse.json(NO_SESSION);
  }

  const { answers, recommendation: rec, referrer, utm } = parsed.data;
  const ipHash = hashIp(req);

  if (await overLimit(db, ipHash, "session")) {
    return NextResponse.json(
      { sessionId: null, error: "Too many submissions from this connection. Try again shortly." },
      { status: 429 },
    );
  }

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
      recommended_tech: rec.primaryId,
      alternative_tech: rec.alternativeId ?? null,
      ruled_out: rec.ruledOut,
      confidence: rec.confidence,
      lead_score: rec.score,
      routing_category: rec.category,
      urgent: rec.urgent,
      // Written explicitly rather than left to the column default, so the row
      // records the engine that actually produced it.
      engine_version: ENGINE_VERSION,
      completed: true,
      referrer: referrer ?? null,
      utm: utm ?? null,
      ip_hash: ipHash,
    })
    .select("id")
    .single();

  if (error) {
    console.error("quiz-session insert failed", error.message);
    return NextResponse.json(NO_SESSION);
  }

  await logSubmission(db, ipHash, "session");
  return NextResponse.json({ sessionId: data?.id ?? null });
}
