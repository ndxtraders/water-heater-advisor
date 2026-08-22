import { createHash } from "node:crypto";

import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Per-IP submission limits.
 *
 * Deliberately simple and not bulletproof — a distributed attacker with many
 * IPs gets through. It stops the realistic threat, which is one bored person
 * with a loop, at near-zero cost and with no extra vendor. If this is ever
 * genuinely attacked, that is the moment to add Turnstile, not before.
 */
const LIMITS = { session: 20, lead: 5 } as const;
const WINDOW_MS = 60 * 60 * 1000;

export type SubmissionKind = keyof typeof LIMITS;

/**
 * Salted SHA-256 of the caller's IP. Never the raw IP — that is personal data
 * under CCPA and buys nothing the hash does not.
 *
 * Returns null when the salt is unset, which disables rate limiting rather than
 * silently hashing with a constant. A missing salt is a configuration problem
 * to fix, not a security control to fake.
 */
export function hashIp(req: Request): string | null {
  const salt = process.env.SUBMISSION_IP_SALT;
  if (!salt) return null;

  // x-forwarded-for is a comma-separated chain; the client is the first entry.
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  if (!ip) return null;

  return createHash("sha256").update(ip + salt).digest("hex");
}

/** True when the caller is over the limit and the request should be refused. */
export async function overLimit(
  db: SupabaseClient,
  ipHash: string | null,
  kind: SubmissionKind,
): Promise<boolean> {
  if (!ipHash) return false;

  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count, error } = await db
    .from("submission_log")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq("kind", kind)
    .gte("created_at", since);

  // Fail open. A broken limiter must not stop a real homeowner submitting, and
  // the insert itself is still the thing that matters.
  if (error) {
    console.error(`rate limit check failed (${kind})`, error.message);
    return false;
  }
  return (count ?? 0) >= LIMITS[kind];
}

export async function logSubmission(
  db: SupabaseClient,
  ipHash: string | null,
  kind: SubmissionKind,
): Promise<void> {
  if (!ipHash) return;
  const { error } = await db.from("submission_log").insert({ ip_hash: ipHash, kind });
  if (error) console.error(`submission log insert failed (${kind})`, error.message);
}
