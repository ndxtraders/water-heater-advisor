import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase access, using the service role.
 *
 * The service role key bypasses row level security entirely — it can read,
 * write and delete every row in every table. That is deliberate and it is why
 * the tables carry RLS with zero policies: nothing but this client can reach
 * them, and this client only ever runs inside a route handler.
 *
 * The one rule: the key must never be prefixed `NEXT_PUBLIC_`. Anything with
 * that prefix is inlined into the browser bundle at build time, which would
 * publish full read/write access to the database on the public internet. If it
 * ever happens, rotate the key in the Supabase dashboard and redeploy.
 *
 * Importing this file from a client component is a build error, which is the
 * point.
 */
import "server-only";

let client: SupabaseClient | null = null;

export function serviceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      // No session to persist and no token to refresh: this process is not a
      // user agent, it is a server making authenticated writes.
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
