-- Row level security: enabled everywhere, with zero policies, deliberately.
--
-- This is a complete lockout, not an oversight. With RLS on and no policies,
-- the `anon` and `authenticated` roles can do nothing to these tables at all.
-- The service role bypasses RLS, so the Next.js route handlers still work.
--
-- The old "anon can record a quiz session" and "anon can submit a lead"
-- policies are deleted rather than migrated: the browser no longer holds a
-- Supabase key, so nothing needs them. Dropping them explicitly matters for
-- the live database, which may still carry them from an earlier apply.

alter table quiz_sessions enable row level security;
alter table leads         enable row level security;
alter table partners      enable row level security;
alter table job_outcomes  enable row level security;

drop policy if exists "anon can record a quiz session" on quiz_sessions;
drop policy if exists "anon can submit a lead" on leads;

comment on table quiz_sessions is
  'RLS enabled with zero policies, deliberately. All access is via the service '
  'role in Next.js route handlers. Do not add an anon policy to make something '
  'easier - the anon key is public and any policy here is a public policy.';

comment on table leads is
  'RLS enabled with zero policies, deliberately. All access is via the service '
  'role in Next.js route handlers. Do not add an anon policy to make something '
  'easier - the anon key is public and any policy here is a public policy.';

comment on table partners is
  'RLS enabled with zero policies, deliberately. All access is via the service '
  'role in Next.js route handlers. Do not add an anon policy to make something '
  'easier - the anon key is public and any policy here is a public policy.';

comment on table job_outcomes is
  'RLS enabled with zero policies, deliberately. All access is via the service '
  'role in Next.js route handlers. Do not add an anon policy to make something '
  'easier - the anon key is public and any policy here is a public policy.';
