-- Rate limiting.
--
-- Route handlers count rows for the caller's ip_hash in the trailing hour
-- before inserting: 20 sessions, 5 leads. Over the limit is a 429.
--
-- Deliberately simple and not bulletproof. A distributed attacker with many
-- IPs gets through. This stops the realistic threat — one bored person with a
-- loop — at near-zero cost and with no extra vendor. If it is ever genuinely
-- attacked, that is the point to add Turnstile, not before.

create table if not exists submission_log (
  id         bigserial primary key,
  created_at timestamptz not null default now(),
  ip_hash    text not null,
  kind       text not null check (kind in ('session','lead'))
);

create index if not exists submission_log_lookup_idx
  on submission_log (ip_hash, kind, created_at desc);

-- Same posture as the four data tables: service role only.
alter table submission_log enable row level security;

comment on table submission_log is
  'RLS enabled with zero policies, deliberately. Written and read only by the '
  'service role in Next.js route handlers.';
