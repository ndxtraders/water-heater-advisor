-- Quiz sessions — anonymous.
--
-- Written when results render, before any contact capture, and holding no
-- personal data. Keeping this apart from `leads` means the drop-off funnel can
-- be analysed without holding personal data on people who never asked to be
-- contacted. Under CCPA the cheapest compliance posture is not collecting the
-- data in the first place, and the split makes "delete my data" a single-row
-- operation on `leads` that leaves the analytics intact.

create table if not exists quiz_sessions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- The archive. Kept whole so old sessions can be replayed against a newer
  -- engine to see whether the recommendation moved. Where this and the flat
  -- columns below disagree over time, this is authoritative.
  answers           jsonb not null,

  -- Denormalised from `answers` for querying without unpacking jsonb per row.
  zip               text,
  status            text,
  current_type      text,
  fuel              text,
  timeline          text,
  budget_band       text,
  owner_status      text,

  -- Engine output as it ran. Stored rather than recomputed, so a later logic
  -- change cannot silently rewrite history.
  recommended_tech  text,
  alternative_tech  text,
  ruled_out         jsonb,
  confidence        text,
  lead_score        int check (lead_score between 0 and 100),
  routing_category  text,

  -- Drives the urgent-lead SMS downstream. Set by the engine, copied onto the
  -- lead at submission.
  urgent            boolean not null default false,

  -- Written explicitly by the route handler, not left to this default, so a
  -- row always records the engine that actually produced it.
  engine_version    text not null default 'v1',

  completed         boolean not null default false,
  referrer          text,
  utm               jsonb,

  -- Salted SHA-256 of the caller's IP, never the raw IP. A raw IP is personal
  -- data under CCPA and buys nothing the hash does not.
  ip_hash           text
);

create index if not exists quiz_sessions_created_idx on quiz_sessions (created_at desc);
create index if not exists quiz_sessions_zip_idx on quiz_sessions (zip);
create index if not exists quiz_sessions_category_idx on quiz_sessions (routing_category);
create index if not exists quiz_sessions_ip_idx on quiz_sessions (ip_hash, created_at desc);
